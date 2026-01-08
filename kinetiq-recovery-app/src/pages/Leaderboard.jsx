import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import Card from '../components/Card'
import PointsBadge from '../components/PointsBadge'
import { getLeaderboardView, initializeLeaderboard, updateUserPoints } from '../data/leaderboard'
import { getPoints } from '../services/pointsService'

export default function Leaderboard() {
  const navigate = useNavigate()
  const { points } = useGame()
  const [activeTab, setActiveTab] = useState('weekly')
  const [leaderboardData, setLeaderboardData] = useState(null)

  useEffect(() => {
    initializeLeaderboard()
    // Update user's all-time points
    updateUserPoints(points, getPoints())
    setLeaderboardData(getLeaderboardView(activeTab))
  }, [activeTab, points])

  if (!leaderboardData) {
    return <div className="min-h-screen p-6">Loading...</div>
  }

  const { top10, user, context } = leaderboardData

  const getRankEmoji = (rank) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  const renderUserRow = (userData, isCurrentUser = false) => {
    const rankDisplay = getRankEmoji(userData.rank)
    return (
      <div
        key={userData.id}
        className={`flex items-center justify-between p-4 rounded-2xl ${
          isCurrentUser
            ? 'bg-gradient-to-r from-primary-blue to-primary-green text-white font-bold'
            : 'bg-white'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold w-12 text-center">{rankDisplay}</div>
          <div>
            <div className={`font-bold ${isCurrentUser ? 'text-white' : 'text-gray-800'}`}>
              {userData.displayName}
            </div>
            {isCurrentUser && (
              <div className="text-sm opacity-90">That's you!</div>
            )}
          </div>
        </div>
        <div className={`text-xl font-bold ${isCurrentUser ? 'text-white' : 'text-primary-blue'}`}>
          {userData.points.toLocaleString()} pts
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/hub')}
            className="text-primary-blue font-bold hover:underline"
          >
            ← Back to Hub
          </button>
          <PointsBadge />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-primary-blue text-center">
          Leaderboard
        </h1>
        <p className="text-center text-gray-700 text-lg">
          See where you rank among other athletes!
        </p>

        {/* Tabs */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all ${
              activeTab === 'weekly'
                ? 'bg-primary-blue text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setActiveTab('allTime')}
            className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all ${
              activeTab === 'allTime'
                ? 'bg-primary-blue text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All-Time
          </button>
        </div>

        {/* Top 10 */}
        <Card>
          <h2 className="text-2xl font-bold text-primary-blue mb-4">Top 10</h2>
          <div className="space-y-2">
            {top10.map((userData) => {
              const isCurrentUser = userData.id === user.id
              return renderUserRow(userData, isCurrentUser)
            })}
          </div>
        </Card>

        {/* Your Position */}
        {user.rank > 10 && (
          <Card>
            <h2 className="text-2xl font-bold text-primary-blue mb-4">Your Position</h2>
            {renderUserRow(user, true)}
          </Card>
        )}

        {/* Context (2 above, 2 below) */}
        {context.length > 0 && (
          <Card>
            <h2 className="text-2xl font-bold text-primary-blue mb-4">Near You</h2>
            <div className="space-y-2">
              {context.map((userData) => renderUserRow(userData, false))}
            </div>
          </Card>
        )}

        {/* Info */}
        <Card className="bg-blue-50">
          <p className="text-gray-700 text-center">
            <strong>Weekly leaderboard resets every Monday.</strong> Keep playing to climb the ranks!
          </p>
        </Card>
      </div>
    </div>
  )
}
