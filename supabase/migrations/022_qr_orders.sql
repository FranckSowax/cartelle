-- ============================================================================
-- Migration 022: QR Code Support Orders
-- Merchants can order printed QR code supports (paper, plexiglas, DTF)
-- ============================================================================

CREATE TABLE IF NOT EXISTS qr_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  merchant_email TEXT,
  merchant_name TEXT,
  support_type TEXT NOT NULL CHECK (support_type IN ('paper', 'plexiglas', 'dtf')),
  quantity INTEGER NOT NULL DEFAULT 1,
  amount_xaf INTEGER NOT NULL DEFAULT 0,
  shipping_address TEXT,
  phone TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'production', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_qr_orders_merchant_id ON qr_orders (merchant_id);
CREATE INDEX IF NOT EXISTS idx_qr_orders_status ON qr_orders (status);

ALTER TABLE qr_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Merchants can view own qr_orders"
  ON qr_orders FOR SELECT
  USING (auth.uid()::text = merchant_id::text);

CREATE POLICY "Service role full access on qr_orders"
  ON qr_orders FOR ALL
  USING (auth.role() = 'service_role');
