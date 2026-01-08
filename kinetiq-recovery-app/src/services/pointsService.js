// Centralized points service for managing points across the app
// All point operations should go through this service

const POINTS_KEY = 'kinetiq_points'
const POINTS_HISTORY_KEY = 'kinetiq_pointsHistory'

// Get current points
export function getPoints() {
  const saved = localStorage.getItem(POINTS_KEY)
  return saved ? parseInt(saved, 10) : 0
}

// Add points with reason tracking
export function addPoints(reason, amount) {
  if (amount <= 0) return getPoints()
  
  const current = getPoints()
  const newTotal = current + amount
  
  localStorage.setItem(POINTS_KEY, newTotal.toString())
  
  // Track history (optional, for debugging/analytics)
  const history = JSON.parse(localStorage.getItem(POINTS_HISTORY_KEY) || '[]')
  history.push({
    reason,
    amount,
    timestamp: new Date().toISOString(),
    totalAfter: newTotal,
  })
  // Keep only last 50 entries
  if (history.length > 50) {
    history.shift()
  }
  localStorage.setItem(POINTS_HISTORY_KEY, JSON.stringify(history))
  
  return newTotal
}

// Spend points (prevents going negative)
export function spendPoints(reason, amount) {
  if (amount <= 0) return getPoints()
  
  const current = getPoints()
  if (current < amount) {
    return { success: false, remaining: current, error: 'Insufficient points' }
  }
  
  const newTotal = current - amount
  localStorage.setItem(POINTS_KEY, newTotal.toString())
  
  // Track history
  const history = JSON.parse(localStorage.getItem(POINTS_HISTORY_KEY) || '[]')
  history.push({
    reason,
    amount: -amount,
    timestamp: new Date().toISOString(),
    totalAfter: newTotal,
  })
  if (history.length > 50) {
    history.shift()
  }
  localStorage.setItem(POINTS_HISTORY_KEY, JSON.stringify(history))
  
  return { success: true, remaining: newTotal }
}

// Reset points (for testing/admin)
export function resetPoints() {
  localStorage.setItem(POINTS_KEY, '0')
  localStorage.setItem(POINTS_HISTORY_KEY, '[]')
  return 0
}
