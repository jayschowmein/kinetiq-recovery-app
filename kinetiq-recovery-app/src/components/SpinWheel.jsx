import { useState, useEffect } from 'react'
import { spinRewards, spinWheel, canSpinToday, markSpinUsed, setStreakShield, setNextTriviaMultiplier } from '../data/spinWheel'
import { addPoints } from '../services/pointsService'
import Button from './Button'
import Modal from './Modal'
import Confetti from './Confetti'

export default function SpinWheel({ isOpen, onClose, onSpinComplete }) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [confetti, setConfetti] = useState(false)

  const canSpin = canSpinToday()

  const handleSpin = () => {
    if (!canSpin || isSpinning) return

    setIsSpinning(true)
    setResult(null)
    setConfetti(false)

    // Random rotation (multiple full spins + random angle)
    const baseRotation = 360 * 5 // 5 full spins
    const randomAngle = Math.random() * 360
    const finalRotation = baseRotation + randomAngle
    setRotation(finalRotation)

    // After animation, determine result
    setTimeout(() => {
      const reward = spinWheel()
      setResult(reward)
      setIsSpinning(false)
      setConfetti(true)

      // Apply reward
      if (reward.type === 'points') {
        addPoints('spin_wheel', reward.value)
      } else if (reward.type === 'streakShield') {
        setStreakShield(true)
      } else if (reward.type === 'triviaMultiplier') {
        setNextTriviaMultiplier(reward.value)
      }

      // Mark spin as used
      markSpinUsed()

      // Notify parent
      if (onSpinComplete) {
        onSpinComplete(reward)
      }
    }, 3000) // Match animation duration
  }

  const handleClose = () => {
    if (!isSpinning && result) {
      onClose()
      setResult(null)
      setRotation(0)
    }
  }

  // Calculate slice angle
  const sliceAngle = 360 / spinRewards.length

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Confetti trigger={confetti} />
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-primary-blue">Spin to Win!</h2>
        
        {!canSpin && !result && (
          <div className="bg-yellow-50 p-4 rounded-2xl">
            <p className="text-gray-700 font-semibold">
              You've already spun today! Come back tomorrow for another spin.
            </p>
          </div>
        )}

        {/* Wheel */}
        <div className="relative mx-auto" style={{ width: '300px', height: '300px' }}>
          <div
            className="relative w-full h-full rounded-full border-8 border-gray-800 overflow-hidden transition-transform duration-3000 ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: 'center',
            }}
          >
            {spinRewards.map((reward, index) => {
              const angle = index * sliceAngle
              const isEven = index % 2 === 0
              
              return (
                <div
                  key={index}
                  className="absolute inset-0"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: 'center',
                    clipPath: `polygon(50% 50%, 100% 0%, 100% 100%)`,
                  }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      backgroundColor: reward.color,
                      opacity: isEven ? 1 : 0.9,
                    }}
                  >
                    <div
                      className="text-white font-bold text-sm transform -rotate-90"
                      style={{
                        transform: `rotate(${-angle}deg)`,
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                      }}
                    >
                      {reward.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-primary-blue"></div>
          </div>
        </div>

        {/* Spin Button */}
        {!result && (
          <Button
            onClick={handleSpin}
            disabled={!canSpin || isSpinning}
            variant="primary"
            className="w-full text-xl py-4"
          >
            {isSpinning ? 'Spinning...' : canSpin ? 'Spin the Wheel!' : 'Already Spun Today'}
          </Button>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-4">
            <div
              className="p-6 rounded-2xl text-white"
              style={{ backgroundColor: result.color }}
            >
              <div className="text-5xl mb-2">🎉</div>
              <h3 className="text-2xl font-bold mb-2">{result.label}</h3>
              {result.type === 'points' && (
                <p className="text-lg">You earned {result.value} points!</p>
              )}
              {result.type === 'streakShield' && (
                <p className="text-lg">Your streak is protected for one missed day!</p>
              )}
              {result.type === 'triviaMultiplier' && (
                <p className="text-lg">Your next correct trivia answer earns double points!</p>
              )}
            </div>
            <Button onClick={handleClose} variant="secondary" className="w-full">
              Awesome!
            </Button>
          </div>
        )}
      </div>
    </Modal>
  )
}
