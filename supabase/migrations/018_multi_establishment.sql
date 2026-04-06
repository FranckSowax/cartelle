-- CARTELLE - Migration 018: Multi-établissement
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS parent_merchant_id UUID REFERENCES merchants(id);
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS location_name TEXT;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS location_address TEXT;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS is_headquarters BOOLEAN DEFAULT true;
CREATE INDEX IF NOT EXISTS idx_merchants_parent ON merchants(parent_merchant_id);
