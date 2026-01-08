// Progress bar component for showing progress toward goals
export default function ProgressBar({ current, max, label, className = '' }) {
  const percentage = Math.min((current / max) * 100, 100)

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">{label}</span>
          <span className="text-sm font-bold text-primary-blue">{current}/{max}</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-blue to-primary-green rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
