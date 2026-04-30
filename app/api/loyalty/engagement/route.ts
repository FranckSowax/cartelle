import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ALLOWED_PLATFORMS = ['google_maps', 'tripadvisor', 'tiktok', 'instagram', 'whatsapp_channel'] as const;
type Platform = typeof ALLOWED_PLATFORMS[number];

const BONUS_POINTS = 50;

/**
 * GET /api/loyalty/engagement?merchantId=...&userToken=...
 * Liste les plateformes déjà engagées par ce user pour ce merchant.
 */
export async function GET(request: NextRequest) {
  try {
    const merchantId = request.nextUrl.searchParams.get('merchantId');
    const userToken = request.nextUrl.searchParams.get('userToken');

    if (!merchantId || !userToken) {
      return NextResponse.json({ error: 'merchantId et userToken requis' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('engagement_bonuses')
      .select('platform, points_awarded, created_at')
      .eq('merchant_id', merchantId)
      .eq('user_token', userToken);

    if (error) {
      return NextResponse.json({ engagements: [] });
    }

    return NextResponse.json({
      engagements: data || [],
      platforms: (data || []).map((d) => d.platform),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * POST /api/loyalty/engagement
 * Body: { merchantId, userToken, platform }
 * Crédite +50 points sur la carte fidélité du client (si elle existe) et
 * enregistre l'engagement. Idempotent : un même (merchant, user, platform)
 * ne crédite qu'une seule fois.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, userToken, platform } = body as {
      merchantId: string;
      userToken: string;
      platform: Platform;
    };

    if (!merchantId || !userToken || !platform) {
      return NextResponse.json(
        { error: 'merchantId, userToken et platform requis' },
        { status: 400 }
      );
    }

    if (!ALLOWED_PLATFORMS.includes(platform)) {
      return NextResponse.json({ error: 'Plateforme invalide' }, { status: 400 });
    }

    // Vérifier si déjà engagé sur cette plateforme
    const { data: existing } = await supabaseAdmin
      .from('engagement_bonuses')
      .select('id')
      .eq('merchant_id', merchantId)
      .eq('user_token', userToken)
      .eq('platform', platform)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({
        success: false,
        alreadyEngaged: true,
        message: 'Bonus déjà accordé pour cette plateforme',
      });
    }

    // Trouver le loyalty_client correspondant (s'il existe)
    const { data: client } = await supabaseAdmin
      .from('loyalty_clients')
      .select('id, points')
      .eq('merchant_id', merchantId)
      .eq('user_token', userToken)
      .maybeSingle();

    let pointsBalance = 0;

    if (client) {
      // Créditer la carte fidélité
      pointsBalance = (client.points || 0) + BONUS_POINTS;
      await supabaseAdmin
        .from('loyalty_clients')
        .update({ points: pointsBalance })
        .eq('id', client.id);

      // Tracer la transaction
      await supabaseAdmin.from('points_transactions').insert({
        client_id: client.id,
        merchant_id: merchantId,
        type: 'bonus',
        points: BONUS_POINTS,
        balance_after: pointsBalance,
        description: `Bonus engagement ${platform}`,
      });
    }

    // Enregistrer l'engagement (idempotent grâce à la contrainte UNIQUE)
    const { error: insertError } = await supabaseAdmin
      .from('engagement_bonuses')
      .insert({
        merchant_id: merchantId,
        user_token: userToken,
        platform,
        loyalty_client_id: client?.id || null,
        points_awarded: BONUS_POINTS,
      });

    if (insertError && !insertError.message.includes('duplicate')) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      pointsAwarded: BONUS_POINTS,
      newBalance: pointsBalance,
      hasLoyaltyCard: !!client,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
