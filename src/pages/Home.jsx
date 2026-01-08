import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import Button from '../components/Button'
import Card from '../components/Card'
import PointsBadge from '../components/PointsBadge'
import Modal from '../components/Modal'
import SpinWheel from '../components/SpinWheel'
import { getRandomTip } from '../data/tips'

export default function Home() {
  const navigate = useNavigate()
  const { canShowTip, markTipShown } = useGame()
  const [showTip, setShowTip] = useState(false)
  const [showSpinWheel, setShowSpinWheel] = useState(false)
  const [tip, setTip] = useState(null)

  useEffect(() => {
    if (canShowTip()) {
      setTip(getRandomTip())
      setShowTip(true)
    }
  }, [canShowTip])

  const handleGotIt = () => {
    markTipShown()
    setShowTip(false)
    // Show spin wheel after tip
    setShowSpinWheel(true)
  }

  const handleSpinComplete = () => {
    // Spin wheel will handle its own closing
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-blue">
            Recover Smarter Initiative
          </h1>
          <p className="text-xl text-gray-700">
            Learn, play, and earn rewards while building healthy recovery habits!
          </p>
        </div>

        {/* Points Badge */}
        <div className="flex justify-center">
          <PointsBadge />
        </div>

        {/* Start Button */}
        <div className="pt-4">
          <Button
            onClick={() => navigate('/hub')}
            variant="primary"
            className="text-2xl px-12 py-6"
          >
            Start
          </Button>
        </div>

        {/* Fun decorative elements */}
        <div className="flex justify-center gap-4 text-4xl pt-8">
          <span>🏃</span>
          <span>💪</span>
          <span>⭐</span>
          <span>🎯</span>
        </div>
      </div>

      {/* Tip of the Day Modal */}
      <Modal isOpen={showTip} onClose={handleGotIt}>
        <div className="text-center space-y-4">
          <div className="text-5xl mb-4">💡</div>
          <h2 className="text-2xl font-bold text-primary-blue">Recovery Tip of the Day</h2>
          {tip && (
            <>
              <p className="text-lg text-gray-700">{tip.tip}</p>
              <p className="text-sm text-primary-green font-semibold">Category: {tip.category}</p>
            </>
          )}
          <div className="pt-4">
            <Button onClick={handleGotIt} variant="secondary">
              Got it! (+5 points)
            </Button>
          </div>
        </div>
      </Modal>

      {/* Spin the Wheel Modal */}
      <SpinWheel
        isOpen={showSpinWheel}
        onClose={() => setShowSpinWheel(false)}
        onSpinComplete={handleSpinComplete}
      />
    </div>
  )
}
