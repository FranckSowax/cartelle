-- CARTELLE - Migration 020: Automatisations WhatsApp
ALTER TABLE loyalty_clients ADD COLUMN IF NOT EXISTS last_birthday_message_at TIMESTAMPTZ;
ALTER TABLE loyalty_clients ADD COLUMN IF NOT EXISTS last_inactivity_reminder_at TIMESTAMPTZ;
ALTER TABLE loyalty_clients ADD COLUMN IF NOT EXISTS last_milestone_notified INTEGER DEFAULT 0;

ALTER TABLE merchants ADD COLUMN IF NOT EXISTS auto_birthday_enabled BOOLEAN DEFAULT false;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS auto_inactivity_enabled BOOLEAN DEFAULT false;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS inactivity_threshold_days INTEGER DEFAULT 30;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS auto_milestone_enabled BOOLEAN DEFAULT false;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS points_milestones JSONB DEFAULT '[50,100,200,500]'::jsonb;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS auto_coupon_expiry_enabled BOOLEAN DEFAULT false;
