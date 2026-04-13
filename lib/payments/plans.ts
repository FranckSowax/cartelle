export interface SubscriptionPlan {
  key: string;
  name: string;
  price_xaf: number;
  period: string;
  description: string;
  max_locations: number;
  monthly_credits: number;
  features: string[];
  popular?: boolean;
  accent?: boolean;
}

export const PLANS: Record<string, SubscriptionPlan> = {
  essentiel: {
    key: 'essentiel',
    name: 'Essentiel',
    price_xaf: 65000,
    period: 'FCFA / mois',
    description: 'Le plus choisi par nos clients',
    max_locations: 1,
    monthly_credits: 100,
    popular: true,
    features: [
      '1 établissement',
      'Roue + Carte fidélité',
      'QR Code personnalisé',
      '100 crédits WhatsApp / mois',
      'Statistiques avancées',
      'Support prioritaire',
    ],
  },
  premium: {
    key: 'premium',
    name: 'Premium',
    price_xaf: 150000,
    period: 'FCFA / mois',
    description: 'Performance maximale',
    max_locations: 3,
    monthly_credits: 500,
    features: [
      '3 établissements',
      'Toutes les fonctionnalités',
      '500 crédits WhatsApp / mois',
      'Branding personnalisé',
      'Wallet Apple & Google',
      'Gestionnaire dédié',
    ],
  },
  'sur-mesure': {
    key: 'sur-mesure',
    name: 'Sur mesure',
    price_xaf: 0,
    period: '',
    description: 'Réseaux multi-sites',
    max_locations: -1,
    monthly_credits: 0,
    accent: true,
    features: [
      'Établissements illimités',
      'Crédits WhatsApp sur mesure',
      'API & intégrations',
      'White label',
      'Accompagnement stratégique',
      'Formation équipes',
    ],
  },
};

export function getPlan(tier: string): SubscriptionPlan | undefined {
  return PLANS[tier];
}

export function getPlanPriceXAF(tier: string): number {
  return PLANS[tier]?.price_xaf ?? 0;
}
