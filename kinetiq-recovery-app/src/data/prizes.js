// Prizes/rewards data for redemption system

export const prizes = [
  // Featured Prizes
  {
    id: 'prize-featured-1',
    name: 'KinetIQ Sample Pack',
    description: 'Try our complete line of recovery products! Includes protein, hydration, and recovery supplements.',
    imageSrc: '📦',
    pointsCost: 700,
    category: 'Products',
    featured: true,
    stock: 50,
  },
  {
    id: 'prize-featured-2',
    name: 'Full KinetIQ Product',
    description: 'Get a full-size product of your choice from our recovery line.',
    imageSrc: '💊',
    pointsCost: 1200,
    category: 'Products',
    featured: true,
    stock: 30,
  },
  
  // Low Tier (100-400 pts)
  {
    id: 'prize-1',
    name: 'Sticker Pack',
    description: 'Cool KinetIQ stickers to show your recovery pride!',
    imageSrc: '🎨',
    pointsCost: 100,
    category: 'Gear',
    featured: false,
  },
  {
    id: 'prize-2',
    name: 'Digital Badge',
    description: 'Exclusive digital badge for your profile.',
    imageSrc: '🏅',
    pointsCost: 100,
    category: 'Gear',
    featured: false,
  },
  {
    id: 'prize-3',
    name: 'Shaker Bottle',
    description: 'High-quality protein shaker bottle with KinetIQ branding.',
    imageSrc: '🥤',
    pointsCost: 250,
    category: 'Gear',
    featured: false,
  },
  {
    id: 'prize-4',
    name: 'Athletic Socks',
    description: 'Comfortable performance socks for training and recovery.',
    imageSrc: '🧦',
    pointsCost: 300,
    category: 'Gear',
    featured: false,
  },
  {
    id: 'prize-5',
    name: 'Grip Tape',
    description: 'Premium grip tape for better performance.',
    imageSrc: '🎯',
    pointsCost: 350,
    category: 'Gear',
    featured: false,
  },
  {
    id: 'prize-6',
    name: '5% Off Code',
    description: 'Get 5% off your next KinetIQ purchase!',
    imageSrc: '💰',
    pointsCost: 200,
    category: 'Discounts',
    featured: false,
  },
  {
    id: 'prize-7',
    name: '10% Off Code',
    description: 'Get 10% off your next KinetIQ purchase!',
    imageSrc: '💵',
    pointsCost: 400,
    category: 'Discounts',
    featured: false,
  },
  
  // Mid Tier (700-1200 pts)
  {
    id: 'prize-8',
    name: 'Recovery Foam Roller',
    description: 'Professional foam roller for post-workout recovery.',
    imageSrc: '🧘',
    pointsCost: 800,
    category: 'Gear',
    featured: false,
  },
  
  // High Tier (2000-3000 pts)
  {
    id: 'prize-9',
    name: 'Basketball',
    description: 'Official game basketball for practice and games.',
    imageSrc: '🏀',
    pointsCost: 2000,
    category: 'Gear',
    featured: false,
  },
  {
    id: 'prize-10',
    name: 'Soccer Ball',
    description: 'Professional soccer ball for training.',
    imageSrc: '⚽',
    pointsCost: 2000,
    category: 'Gear',
    featured: false,
  },
  {
    id: 'prize-11',
    name: 'Athletic Gear Bundle',
    description: 'Complete gear bundle: bag, water bottle, and accessories.',
    imageSrc: '🎒',
    pointsCost: 2500,
    category: 'Gear',
    featured: false,
  },
  
  // Premium Tier (5000+ pts)
  {
    id: 'prize-12',
    name: 'Sports Game Tickets',
    description: 'Tickets to a local professional sports game (subject to availability).',
    imageSrc: '🎫',
    pointsCost: 5000,
    category: 'Experiences',
    featured: false,
    stock: 10,
  },
]

// Generate claim code
export function generateClaimCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Exclude confusing chars
  let code = 'KIQ-'
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  code += '-'
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

// Get redemptions from localStorage
export function getRedemptions() {
  const saved = localStorage.getItem('kinetiq_redemptions')
  return saved ? JSON.parse(saved) : []
}

// Add redemption
export function addRedemption(prizeId, claimCode) {
  const redemptions = getRedemptions()
  const newRedemption = {
    id: `redemption-${Date.now()}`,
    prizeId,
    redeemedAt: new Date().toISOString(),
    claimCode,
  }
  redemptions.push(newRedemption)
  localStorage.setItem('kinetiq_redemptions', JSON.stringify(redemptions))
  return newRedemption
}

// Get prize by ID
export function getPrizeById(prizeId) {
  return prizes.find(p => p.id === prizeId)
}
