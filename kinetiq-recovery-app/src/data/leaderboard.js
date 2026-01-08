// Leaderboard mock data and utilities
import { getPoints } from '../services/pointsService'

const LEADERBOARD_KEY = 'kinetiq_leaderboard'
const USER_DATA_KEY = 'kinetiq_userData'
const RESET_DATE_KEY = 'kinetiq_leaderboardResetDate'

// Mock users for leaderboard
const MOCK_USERS = [
  { id: 'user-1', displayName: 'Alex M.', weeklyPoints: 450, allTimePoints: 3200 },
  { id: 'user-2', displayName: 'Sam T.', weeklyPoints: 420, allTimePoints: 3100 },
  { id: 'user-3', displayName: 'Jordan K.', weeklyPoints: 380, allTimePoints: 2900 },
  { id: 'user-4', displayName: 'Casey L.', weeklyPoints: 350, allTimePoints: 2800 },
  { id: 'user-5', displayName: 'Riley P.', weeklyPoints: 320, allTimePoints: 2700 },
  { id: 'user-6', displayName: 'Morgan D.', weeklyPoints: 300, allTimePoints: 2600 },
  { id: 'user-7', displayName: 'Taylor R.', weeklyPoints: 280, allTimePoints: 2500 },
  { id: 'user-8', displayName: 'Jamie F.', weeklyPoints: 260, allTimePoints: 2400 },
  { id: 'user-9', displayName: 'Avery B.', weeklyPoints: 240, allTimePoints: 2300 },
  { id: 'user-10', displayName: 'Quinn N.', weeklyPoints: 220, allTimePoints: 2200 },
]

// Get or create user data
export function getUserData() {
  const saved = localStorage.getItem(USER_DATA_KEY)
  if (saved) {
    return JSON.parse(saved)
  }
  
  // Create new user data
  const userData = {
    id: 'current-user',
    displayName: localStorage.getItem('kinetiq_userDisplayName') || 'You',
    weeklyPoints: 0,
    allTimePoints: getPoints(),
  }
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))
  return userData
}

// Update user points
export function updateUserPoints(weeklyPoints, allTimePoints) {
  const userData = getUserData()
  userData.weeklyPoints = weeklyPoints
  userData.allTimePoints = allTimePoints || getPoints()
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))
  return userData
}

// Get reset date (Monday of current week)
export function getResetDate() {
  const saved = localStorage.getItem(RESET_DATE_KEY)
  if (saved) {
    return new Date(saved)
  }
  
  // Set to next Monday
  const today = new Date()
  const dayOfWeek = today.getDay()
  const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek
  const nextMonday = new Date(today)
  nextMonday.setDate(today.getDate() + daysUntilMonday)
  nextMonday.setHours(0, 0, 0, 0)
  
  localStorage.setItem(RESET_DATE_KEY, nextMonday.toISOString())
  return nextMonday
}

// Check if weekly reset is needed
export function checkWeeklyReset() {
  const resetDate = getResetDate()
  const today = new Date()
  
  if (today >= resetDate) {
    // Reset weekly points
    const userData = getUserData()
    userData.weeklyPoints = 0
    
    // Reset mock users' weekly points (add some randomness)
    const resetMockUsers = MOCK_USERS.map(user => ({
      ...user,
      weeklyPoints: Math.floor(Math.random() * 100) + 50,
    }))
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(resetMockUsers))
    
    // Set next reset date (next Monday)
    const nextMonday = new Date(resetDate)
    nextMonday.setDate(resetDate.getDate() + 7)
    localStorage.setItem(RESET_DATE_KEY, nextMonday.toISOString())
    
    updateUserPoints(0, userData.allTimePoints)
    
    return true
  }
  return false
}

// Get leaderboard data
export function getLeaderboard(type = 'weekly') {
  checkWeeklyReset()
  
  const userData = getUserData()
  const saved = localStorage.getItem(LEADERBOARD_KEY)
  const mockUsers = saved ? JSON.parse(saved) : MOCK_USERS
  
  // Combine mock users with current user
  const allUsers = [...mockUsers, userData]
  
  // Sort by points
  const sorted = allUsers.sort((a, b) => {
    const pointsA = type === 'weekly' ? a.weeklyPoints : a.allTimePoints
    const pointsB = type === 'weekly' ? b.weeklyPoints : b.allTimePoints
    return pointsB - pointsA
  })
  
  // Add ranks
  const ranked = sorted.map((user, index) => ({
    ...user,
    rank: index + 1,
    points: type === 'weekly' ? user.weeklyPoints : user.allTimePoints,
  }))
  
  return ranked
}

// Get user's position and context (top 10, user, 2 above, 2 below)
export function getLeaderboardView(type = 'weekly') {
  const leaderboard = getLeaderboard(type)
  const userData = getUserData()
  const userIndex = leaderboard.findIndex(u => u.id === userData.id)
  
  if (userIndex === -1) {
    // User not found, add them
    return {
      top10: leaderboard.slice(0, 10),
      user: { ...userData, rank: leaderboard.length, points: type === 'weekly' ? userData.weeklyPoints : userData.allTimePoints },
      context: [],
    }
  }
  
  const top10 = leaderboard.slice(0, 10)
  const user = leaderboard[userIndex]
  
  // Get 2 above and 2 below
  const start = Math.max(0, userIndex - 2)
  const end = Math.min(leaderboard.length, userIndex + 3)
  const context = leaderboard.slice(start, end).filter(u => u.id !== userData.id && !top10.some(t => t.id === u.id))
  
  return {
    top10,
    user,
    context,
  }
}

// Initialize leaderboard if needed
export function initializeLeaderboard() {
  if (!localStorage.getItem(LEADERBOARD_KEY)) {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(MOCK_USERS))
  }
  checkWeeklyReset()
}
