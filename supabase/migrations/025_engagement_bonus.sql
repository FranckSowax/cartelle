-- ============================================================================
-- Migration 025: Tracking des engagements bonus (réseaux sociaux)
-- Permet de créditer +50 points par plateforme additionnelle engagée
-- ============================================================================

CREATE TABLE IF NOT EXISTS engagement_bonuses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  user_token TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('google_maps', 'tripadvisor', 'tiktok', 'instagram', 'whatsapp_channel')),
  loyalty_client_id UUID REFERENCES loyalty_clients(id) ON DELETE SET NULL,
  points_awarded INTEGER NOT NULL DEFAULT 50,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Un seul bonus par (merchant, user, platform)
  UNIQUE (merchant_id, user_token, platform)
);

CREATE INDEX IF NOT EXISTS idx_engagement_bonuses_merchant_user
  ON engagement_bonuses (merchant_id, user_token);

ALTER TABLE engagement_bonuses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on engagement_bonuses"
  ON engagement_bonuses FOR ALL
  USING (auth.role() = 'service_role');
