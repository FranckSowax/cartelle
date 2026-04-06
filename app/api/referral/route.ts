import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * GET /api/referral?merchantId=X
 * Return referral code, list of referrals, and total credits earned
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
    }

    // Get merchant referral code
    const { data: merchant, error: merchantError } = await supabaseAdmin
      .from('merchants')
      .select('id, referral_code, business_name')
      .eq('id', merchantId)
      .single();

    if (merchantError || !merchant) {
      return NextResponse.json({ error: 'Merchant not found' }, { status: 404 });
    }

    // Get referrals where this merchant is the referrer
    const { data: referrals, error: referralsError } = await supabaseAdmin
      .from('referrals')
      .select(`
        id,
        referred_id,
        status,
        credit_amount,
        created_at
      `)
      .eq('referrer_id', merchantId)
      .order('created_at', { ascending: false });

    if (referralsError) {
      console.error('[REFERRAL GET] Referrals error:', referralsError);
    }

    // Enrich referrals with referred merchant names
    const enrichedReferrals = [];
    for (const ref of referrals || []) {
      const { data: referred } = await supabaseAdmin
        .from('merchants')
        .select('business_name')
        .eq('id', ref.referred_id)
        .single();

      enrichedReferrals.push({
        ...ref,
        referred_business_name: referred?.business_name || 'Commerce inconnu',
      });
    }

    const totalCredits = (referrals || []).reduce(
      (sum, r) => sum + (r.credit_amount || 0),
      0
    );

    return NextResponse.json({
      referralCode: merchant.referral_code,
      referrals: enrichedReferrals,
      totalCredits,
    });
  } catch (error) {
    console.error('[REFERRAL GET] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/referral
 * Validate a referral code and return the referrer's business name
 * Body: { code }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: 'code is required' }, { status: 400 });
    }

    const { data: referrer, error } = await supabaseAdmin
      .from('merchants')
      .select('id, business_name')
      .eq('referral_code', code.toUpperCase())
      .single();

    if (error || !referrer) {
      return NextResponse.json({ error: 'Code de parrainage invalide' }, { status: 404 });
    }

    return NextResponse.json({
      valid: true,
      businessName: referrer.business_name,
    });
  } catch (error) {
    console.error('[REFERRAL POST] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
