// Tiered rewards system
export const rewards = [
  // Bronze tier (0-100 points)
  {
    id: 'bronze-1',
    name: '10% Off Recovery Products',
    description: 'Get 10% off your next purchase of recovery supplements',
    cost: 50,
    tier: 'bronze',
    icon: '🥉',
  },
  {
    id: 'bronze-2',
    name: 'Recovery Guide PDF',
    description: 'Download our complete recovery guide for young athletes',
    cost: 30,
    tier: 'bronze',
    icon: '📄',
  },
  {
    id: 'bronze-3',
    name: 'Sticker Pack',
    description: 'Get a cool KinetIQ sticker pack in the mail',
    cost: 40,
    tier: 'bronze',
    icon: '🎨',
  },
  // Silver tier (101-250 points)
  {
    id: 'silver-1',
    name: '20% Off Recovery Products',
    description: 'Get 20% off your next purchase of recovery supplements',
    cost: 150,
    tier: 'silver',
    icon: '🥈',
  },
  {
    id: 'silver-2',
    name: 'Recovery Sample Pack',
    description: 'Try our recovery products with a free sample pack',
    cost: 120,
    tier: 'silver',
    icon: '📦',
  },
  {
    id: 'silver-3',
    name: 'Custom Recovery Plan',
    description: 'Get a personalized recovery plan from our experts',
    cost: 180,
    tier: 'silver',
    icon: '📋',
  },
  {
    id: 'silver-4',
    name: 'KinetIQ Water Bottle',
    description: 'Get a branded water bottle to stay hydrated',
    cost: 100,
    tier: 'silver',
    icon: '💧',
  },
  // Gold tier (251+ points)
  {
    id: 'gold-1',
    name: '30% Off Recovery Products',
    description: 'Get 30% off your next purchase of recovery supplements',
    cost: 300,
    tier: 'gold',
    icon: '🥇',
  },
  {
    id: 'gold-2',
    name: 'Full Recovery Kit',
    description: 'Get a complete recovery kit with products and gear',
    cost: 400,
    tier: 'gold',
    icon: '🎁',
  },
  {
    id: 'gold-3',
    name: '1-on-1 Recovery Consultation',
    description: 'Schedule a personal consultation with a recovery expert',
    cost: 350,
    tier: 'gold',
    icon: '👨‍⚕️',
  },
  {
    id: 'gold-4',
    name: 'KinetIQ Merch Bundle',
    description: 'Get a bundle of KinetIQ merchandise (shirt, hat, bag)',
    cost: 250,
    tier: 'gold',
    icon: '👕',
  },
]

// Calculate tier based on points
export function getTier(points) {
  if (points >= 251) return 'gold'
  if (points >= 101) return 'silver'
  return 'bronze'
}

// Get rewards for a specific tier
export function getRewardsByTier(tier) {
  return rewards.filter(r => r.tier === tier)
}

// Get next tier threshold
export function getNextTierThreshold(points) {
  if (points < 101) return { tier: 'silver', threshold: 101, progress: points / 101 }
  if (points < 251) return { tier: 'gold', threshold: 251, progress: points / 251 }
  return { tier: 'max', threshold: null, progress: 1 }
}
