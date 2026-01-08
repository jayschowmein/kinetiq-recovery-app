import { useEffect, useState } from 'react'

// Confetti animation component for celebrations
export default function Confetti({ trigger }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (trigger) {
      // Generate 50 confetti particles
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 0.5 + Math.random() * 0.5,
        color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 5)],
      }))
      setParticles(newParticles)

      // Clear particles after animation
      setTimeout(() => setParticles([]), 2000)
    }
  }, [trigger])

  if (particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${particle.left}%`,
            bottom: '-10px',
            backgroundColor: particle.color,
            animation: `confetti ${particle.duration}s ease-out ${particle.delay}s forwards`,
          }}
        />
      ))}
    </div>
  )
}
