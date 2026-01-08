import { useGame } from '../context/GameContext'

// Points badge component - shows current points total
export default function PointsBadge({ className = '' }) {
  const { points } = useGame()

  return (
    <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-primary-blue to-primary-green text-white px-4 py-2 rounded-full font-bold shadow-lg ${className}`}>
      <span className="text-xl">⭐</span>
      <span>{points} Points</span>
    </div>
  )
}
