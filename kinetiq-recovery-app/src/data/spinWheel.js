// Spin the Wheel data and utilities

const LAST_SPIN_DATE_KEY = 'kinetiq_lastSpinDate'
const STREAK_SHIELD_KEY = 'kinetiq_streakShieldAvailable'
const NEXT_TRIVIA_MULTIPLIER_KEY = 'kinetiq_nextTriviaMultiplier'

// Spin rewards with weights (higher weight = more common)
export const spinRewards = [
  {
    label: '+5 Points',
    type: 'points',
    value: 5,
    weight: 30, // 30% chance
    color: '#3B82F6', // Blue
  },
  {
    label: '+10 Points',
    type: 'points',
    value: 10,
    weight: 30, // 30% chance
    color: '#10B981', // Green
  },
  {
    label: '+15 Points',
    type: 'points',
    value: 15,
    weight: 20, // 20% chance
    color: '#F59E0B', // Orange
  },
  {
    label: '+25 Points',
    type: 'points',
    value: 25,
    weight: 10, // 10% chance
    color: '#EF4444', // Red
  },
  {
    label: 'Streak Shield',
    type: 'streakShield',
    value: 1,
    weight: 5, // 5% chance
    color: '#8B5CF6', // Purple
  },
  {
    label: '2x Next Trivia',
    type: 'triviaMultiplier',
    value: 2,
    weight: 5, // 5% chance
    color: '#EC4899', // Pink
  },
]

// Calculate total weight
const totalWeight = spinRewards.reduce((sum, reward) => sum + reward.weight, 0)

// Get weighted random reward
export function spinWheel() {
  let random = Math.random() * totalWeight
  
  for (const reward of spinRewards) {
    random -= reward.weight
    if (random <= 0) {
      return reward
    }
  }
  
  // Fallback to first reward
  return spinRewards[0]
}

// Check if user can spin today
export function canSpinToday() {
  const lastSpinDate = localStorage.getItem(LAST_SPIN_DATE_KEY)
  if (!lastSpinDate) return true
  
  const today = new Date().toDateString()
  const lastSpin = new Date(lastSpinDate).toDateString()
  
  return today !== lastSpin
}

// Mark spin as used for today
export function markSpinUsed() {
  localStorage.setItem(LAST_SPIN_DATE_KEY, new Date().toISOString())
}

// Get streak shield status
export function hasStreakShield() {
  return localStorage.getItem(STREAK_SHIELD_KEY) === 'true'
}

// Set streak shield
export function setStreakShield(available) {
  localStorage.setItem(STREAK_SHIELD_KEY, available ? 'true' : 'false')
}

// Use streak shield
export function useStreakShield() {
  setStreakShield(false)
}

// Get next trivia multiplier
export function getNextTriviaMultiplier() {
  const saved = localStorage.getItem(NEXT_TRIVIA_MULTIPLIER_KEY)
  return saved ? parseInt(saved, 10) : 1
}

// Set next trivia multiplier
export function setNextTriviaMultiplier(multiplier) {
  localStorage.setItem(NEXT_TRIVIA_MULTIPLIER_KEY, multiplier.toString())
}

// Reset trivia multiplier (after use)
export function resetTriviaMultiplier() {
  setNextTriviaMultiplier(1)
}
