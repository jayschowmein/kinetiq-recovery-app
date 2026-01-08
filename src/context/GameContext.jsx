import { createContext, useContext, useState, useEffect } from 'react'
import { getPoints, addPoints as addPointsService, spendPoints as spendPointsService } from '../services/pointsService'
import { hasStreakShield, useStreakShield } from '../data/spinWheel'

const GameContext = createContext()

export function GameProvider({ children }) {
  // Load from localStorage on mount using centralized service
  const [points, setPoints] = useState(() => getPoints())

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('kinetiq_streak')
    return saved ? parseInt(saved, 10) : 0
  })

  const [lastActivityDate, setLastActivityDate] = useState(() => {
    return localStorage.getItem('kinetiq_lastActivity') || null
  })

  const [completedVideos, setCompletedVideos] = useState(() => {
    const saved = localStorage.getItem('kinetiq_completedVideos')
    return saved ? JSON.parse(saved) : []
  })

  const [completedChallenges, setCompletedChallenges] = useState(() => {
    const saved = localStorage.getItem('kinetiq_completedChallenges')
    return saved ? JSON.parse(saved) : []
  })

  const [badges, setBadges] = useState(() => {
    const saved = localStorage.getItem('kinetiq_badges')
    return saved ? JSON.parse(saved) : []
  })

  const [lastTipDate, setLastTipDate] = useState(() => {
    return localStorage.getItem('kinetiq_lastTipDate') || null
  })

  // Function to update streak when activity happens
  const updateStreak = () => {
    const today = new Date().toDateString()
    if (lastActivityDate !== today) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toDateString()

      if (lastActivityDate === yesterdayStr) {
        // Consecutive day
        setStreak(prev => {
          const newStreak = prev + 1
          localStorage.setItem('kinetiq_streak', newStreak.toString())
          return newStreak
        })
      } else if (lastActivityDate && lastActivityDate !== today) {
        // Check for streak shield
        if (hasStreakShield()) {
          // Use streak shield instead of breaking streak
          useStreakShield()
          setStreak(prev => {
            localStorage.setItem('kinetiq_streak', prev.toString())
            return prev
          })
        } else {
          // Streak broken
          setStreak(1)
          localStorage.setItem('kinetiq_streak', '1')
        }
      } else if (!lastActivityDate) {
        // First activity ever
        setStreak(1)
        localStorage.setItem('kinetiq_streak', '1')
      }
      setLastActivityDate(today)
      localStorage.setItem('kinetiq_lastActivity', today)
    }
  }

  // Sync points from service (in case changed elsewhere)
  useEffect(() => {
    const currentPoints = getPoints()
    if (currentPoints !== points) {
      setPoints(currentPoints)
    }
  }, [points])

  // Save completed videos
  useEffect(() => {
    localStorage.setItem('kinetiq_completedVideos', JSON.stringify(completedVideos))
  }, [completedVideos])

  // Save completed challenges
  useEffect(() => {
    localStorage.setItem('kinetiq_completedChallenges', JSON.stringify(completedChallenges))
  }, [completedChallenges])

  // Save badges
  useEffect(() => {
    localStorage.setItem('kinetiq_badges', JSON.stringify(badges))
  }, [badges])

  // Save last tip date
  useEffect(() => {
    if (lastTipDate) {
      localStorage.setItem('kinetiq_lastTipDate', lastTipDate)
    }
  }, [lastTipDate])

  // Use centralized points service
  const addPoints = (reason, amount) => {
    const newTotal = addPointsService(reason, amount)
    setPoints(newTotal)
    return newTotal
  }

  const subtractPoints = (reason, amount) => {
    const result = spendPointsService(reason, amount)
    if (result.success) {
      setPoints(result.remaining)
    }
    return result
  }

  const markVideoComplete = (videoId) => {
    if (!completedVideos.includes(videoId)) {
      const isFirstVideo = completedVideos.length === 0
      setCompletedVideos(prev => [...prev, videoId])
      addPoints('video_complete', 20) // Base points for watching
      
      // Check for first video badge
      if (isFirstVideo) {
        addBadge('first-video')
      }
      
      // Update streak
      updateStreak()
    }
  }

  const markChallengeComplete = (challengeId) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges(prev => [...prev, challengeId])
      addPoints('challenge_complete', 15) // Base points for challenge
      
      // Check for streak bonus before updating (current streak)
      const shouldGetBonus = streak >= 3
      
      // Update streak
      updateStreak()
      
      // Apply streak bonus if eligible
      if (shouldGetBonus) {
        addPoints('streak_bonus', 5) // Streak bonus
      }
    }
  }

  const addBadge = (badgeId) => {
    if (!badges.includes(badgeId)) {
      setBadges(prev => [...prev, badgeId])
      addPoints('badge_earned', 25) // Bonus for earning badge
    }
  }

  const canShowTip = () => {
    const today = new Date().toDateString()
    return lastTipDate !== today
  }

  const markTipShown = () => {
    const today = new Date().toDateString()
    setLastTipDate(today)
    addPoints('tip_of_day', 5) // Small bonus for reading tip
    updateStreak() // Track activity
  }

  // Function to record any activity (for trivia, etc.)
  const recordActivity = () => {
    updateStreak()
  }

  return (
    <GameContext.Provider
      value={{
        points,
        streak,
        addPoints,
        subtractPoints,
        completedVideos,
        markVideoComplete,
        completedChallenges,
        markChallengeComplete,
        badges,
        addBadge,
        canShowTip,
        markTipShown,
        recordActivity,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within GameProvider')
  }
  return context
}
