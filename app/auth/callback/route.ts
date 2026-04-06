import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    // Client anon pour échanger le code auth
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Échanger le code contre une session
    const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error('Session exchange error:', sessionError);
      return NextResponse.redirect(`${origin}/auth/login?error=session_error`);
    }

    if (session?.user) {
      // Client service_role pour bypasser RLS et créer le profil marchand
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      // Vérifier si le profil marchand existe déjà
      const { data: existingMerchant } = await supabaseAdmin
        .from('merchants')
        .select('id')
        .eq('id', session.user.id)
        .single();

      if (!existingMerchant) {
        // Créer le profil marchand avec les métadonnées de l'utilisateur
        const businessName = session.user.user_metadata?.business_name || 'Mon Commerce';

        // Generate referral code: CART-XXXX (4 random uppercase letters)
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomBytes = new Uint8Array(4);
        crypto.getRandomValues(randomBytes);
        const suffix = Array.from(randomBytes).map(b => chars[b % chars.length]).join('');
        const referralCode = `CART-${suffix}`;

        const { error: merchantError } = await supabaseAdmin.from('merchants').insert({
          id: session.user.id,
          email: session.user.email,
          business_name: businessName,
          subscription_tier: 'starter',
          referral_code: referralCode,
          is_headquarters: true,
        });

        if (merchantError) {
          console.error('Merchant creation error:', merchantError);
        }

        // Process referral if user signed up with a referral code
        const incomingRefCode = session.user.user_metadata?.referral_code;
        if (incomingRefCode && !merchantError) {
          try {
            // Find the referrer merchant by referral_code
            const { data: referrer } = await supabaseAdmin
              .from('merchants')
              .select('id')
              .eq('referral_code', incomingRefCode.toUpperCase())
              .single();

            if (referrer) {
              // Insert referral row
              await supabaseAdmin.from('referrals').insert({
                referrer_id: referrer.id,
                referred_id: session.user.id,
                status: 'activated',
                credit_amount: 50,
              });

              // Credit referrer: +50 campaign_credits
              await supabaseAdmin.rpc('increment_campaign_credits', {
                merchant_id: referrer.id,
                amount: 50,
              }).then(async ({ error: rpcError }) => {
                // Fallback if RPC doesn't exist: direct update
                if (rpcError) {
                  const { data: referrerMerchant } = await supabaseAdmin
                    .from('merchants')
                    .select('campaign_credits')
                    .eq('id', referrer.id)
                    .single();
                  await supabaseAdmin
                    .from('merchants')
                    .update({ campaign_credits: (referrerMerchant?.campaign_credits || 0) + 50 })
                    .eq('id', referrer.id);
                }
              });

              // Credit referred (new merchant): +50 campaign_credits
              await supabaseAdmin
                .from('merchants')
                .update({ campaign_credits: 50, referred_by: referrer.id })
                .eq('id', session.user.id);
            }
          } catch (refError) {
            console.error('Referral processing error:', refError);
          }
        }
      }

      return NextResponse.redirect(`${origin}/dashboard`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/login`);
}
