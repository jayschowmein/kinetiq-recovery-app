import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import Card from '../components/Card'
import PointsBadge from '../components/PointsBadge'
import StreakIndicator from '../components/StreakIndicator'
import ProgressBar from '../components/ProgressBar'
import { getNextTierThreshold } from '../data/rewards'

export default function GameHub() {
  const navigate = useNavigate()
  const { points, streak } = useGame()
  const nextTier = getNextTierThreshold(points)

  const modes = [
    {
      id: 'trivia',
      title: 'Trivia',
      description: 'Test your recovery knowledge and earn points!',
      icon: '❓',
      color: 'from-primary-blue to-primary-lightBlue',
      path: '/trivia',
    },
    {
      id: 'watch',
      title: 'Watch & Learn',
      description: 'Learn from athlete videos and recovery experts',
      icon: '📺',
      color: 'from-primary-green to-primary-lightGreen',
      path: '/watch',
    },
    {
      id: 'challenges',
      title: 'Challenges',
      description: 'Complete daily and weekly recovery challenges',
      icon: '🎯',
      color: 'from-purple-500 to-pink-500',
      path: '/challenges',
    },
  ]

  return (
    <div className="min-h-screen p-6 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-blue">
            Game Hub
          </h1>
          <div className="flex flex-wrap justify-center gap-4">
            <PointsBadge />
            <StreakIndicator />
          </div>
        </div>

        {/* Progress to Next Tier */}
        {nextTier.tier !== 'max' && (
          <Card>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-gray-700">
                Progress to {nextTier.tier.charAt(0).toUpperCase() + nextTier.tier.slice(1)} Tier
              </h3>
              <ProgressBar
                current={points}
                max={nextTier.threshold}
                label={`${points} / ${nextTier.threshold} points`}
              />
            </div>
          </Card>
        )}

        {/* Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modes.map((mode) => (
            <Card
              key={mode.id}
              onClick={() => navigate(mode.path)}
              className="text-center space-y-4"
            >
              <div className={`text-6xl bg-gradient-to-br ${mode.color} rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow-lg`}>
                {mode.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{mode.title}</h2>
              <p className="text-gray-600">{mode.description}</p>
            </Card>
          ))}
        </div>

        {/* Additional Links */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/prizes')}
            className="text-primary-blue font-bold text-lg hover:underline"
          >
            View Prizes →
          </button>
          <button
            onClick={() => navigate('/leaderboard')}
            className="text-primary-green font-bold text-lg hover:underline"
          >
            Leaderboard →
          </button>
        </div>
      </div>
    </div>
  )
}
