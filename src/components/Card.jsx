// Reusable card component with rounded corners
export default function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 ${onClick ? 'cursor-pointer transform hover:scale-105' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
