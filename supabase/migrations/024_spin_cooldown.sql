-- ============================================================================
-- Migration 024: Configuration cooldown roue de la fortune
-- Permet au marchand de définir la fréquence de tours par client
-- ============================================================================

-- Délai en heures entre 2 tours de roue pour un même user_token sur le même merchant.
-- 24h = une fois par jour (défaut). 0 = illimité (mode démo).
ALTER TABLE merchants
  ADD COLUMN IF NOT EXISTS spin_cooldown_hours INTEGER DEFAULT 24;

-- Pour le compte démo, illimité
UPDATE merchants
SET spin_cooldown_hours = 0
WHERE LOWER(email) = 'demo@cartelle.io';
