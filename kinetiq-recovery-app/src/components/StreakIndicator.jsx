import { useGame } from '../context/GameContext'

// Streak indicator component
export default function StreakIndicator({ className = '' }) {
  const { streak } = useGame()

  return (
    <div className={`inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold ${className}`}>
      <span className="text-xl">🔥</span>
      <span>{streak} Day Streak!</span>
    </div>
  )
}
