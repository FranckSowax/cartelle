-- CARTELLE - Migration 019: Système de parrainage
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS referred_by UUID REFERENCES merchants(id);

CREATE TABLE IF NOT EXISTS referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    referred_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'activated', 'credited', 'expired')),
    credit_amount INTEGER DEFAULT 50,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred ON referrals(referred_id);
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access referrals" ON referrals FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Merchants view own referrals" ON referrals FOR SELECT TO authenticated USING (auth.uid() = referrer_id OR auth.uid() = referred_id);
