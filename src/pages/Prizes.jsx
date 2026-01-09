import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame as useGameCtx } from '../context/GameContext'
import Card from '../components/Card'
import Button from '../components/Button'
import PointsBadge from '../components/PointsBadge'
import ProgressBar from '../components/ProgressBar'
import Modal from '../components/Modal'
import { prizes, generateClaimCode, addRedemption, getRedemptions, getPrizeById } from '../data/prizes'
import Confetti from '../components/Confetti'

export default function Prizes() {
  const navigate = useNavigate()
  const { points, subtractPoints } = useGameCtx()
  const [selectedPrize, setSelectedPrize] = useState(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showRedemptions, setShowRedemptions] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [redemptions, setRedemptions] = useState([])

  useEffect(() => {
    setRedemptions(getRedemptions())
  }, [])

  const categories = ['All', 'Products', 'Gear', 'Experiences', 'Discounts']
  const featuredPrizes = prizes.filter(p => p.featured)
  const filteredPrizes = activeCategory === 'All' 
    ? prizes 
    : prizes.filter(p => p.category === activeCategory)

  // Find next affordable prize
  const nextAffordablePrize = prizes
    .filter(p => p.pointsCost > points)
    .sort((a, b) => a.pointsCost - b.pointsCost)[0]

  const handleRedeem = (prize) => {
    setSelectedPrize(prize)
    setShowConfirmModal(true)
  }

  const handleConfirmRedeem = () => {
    if (!selectedPrize) return

    const result = subtractPoints('prize_redemption', selectedPrize.pointsCost)
    if (result && (result.success !== false)) {
      const claimCode = generateClaimCode()
      addRedemption(selectedPrize.id, claimCode)
      setRedemptions(getRedemptions())
      setShowConfirmModal(false)
      setShowSuccessModal(true)
      setConfetti(true)
    }
  }

  const handleCloseSuccess = () => {
    setShowSuccessModal(false)
    setSelectedPrize(null)
  }

  return (
    <div className="min-h-screen p-6 pb-20">
      <Confetti trigger={confetti} />
      <div className="max-w-6xl mx-auto space-y-6">
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
          Prizes & Rewards
        </h1>
        <p className="text-center text-gray-700 text-lg">
          Redeem your points for awesome prizes!
        </p>

        {/* Progress to Next Prize */}
        {nextAffordablePrize && (
          <Card>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-gray-700">
                You are {nextAffordablePrize.pointsCost - points} points away from {nextAffordablePrize.name}
              </h3>
              <ProgressBar
                current={points}
                max={nextAffordablePrize.pointsCost}
                label={`${points} / ${nextAffordablePrize.pointsCost} points`}
              />
            </div>
          </Card>
        )}

        {/* My Redemptions Button */}
        {redemptions.length > 0 && (
          <div className="text-center">
            <Button
              onClick={() => setShowRedemptions(true)}
              variant="outline"
            >
              View My Redemptions ({redemptions.length})
            </Button>
          </div>
        )}

        {/* Featured Prizes */}
        {featuredPrizes.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary-blue">Featured Prizes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredPrizes.map((prize) => {
                const canAfford = points >= prize.pointsCost
                return (
                  <Card key={prize.id} className={!canAfford ? 'opacity-60' : ''}>
                    <div className="space-y-3">
                      <div className="text-6xl text-center">{prize.imageSrc}</div>
                      <h3 className="text-xl font-bold text-gray-800 text-center">{prize.name}</h3>
                      <p className="text-gray-600 text-sm text-center">{prize.description}</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className={`font-bold text-lg ${canAfford ? 'text-primary-blue' : 'text-gray-400'}`}>
                          {prize.pointsCost} points
                        </span>
                        <Button
                          onClick={() => handleRedeem(prize)}
                          disabled={!canAfford}
                          variant={canAfford ? 'primary' : 'outline'}
                          className="text-sm px-4 py-2"
                        >
                          {canAfford ? 'Redeem' : 'Not enough'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all ${
                activeCategory === category
                  ? 'bg-primary-blue text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Prize Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrizes
            .filter(p => !p.featured) // Don't show featured twice
            .map((prize) => {
              const canAfford = points >= prize.pointsCost
              return (
                <Card key={prize.id} className={!canAfford ? 'opacity-60' : ''}>
                  <div className="space-y-3">
                    <div className="text-5xl text-center">{prize.imageSrc}</div>
                    <h3 className="text-lg font-bold text-gray-800 text-center">{prize.name}</h3>
                    <p className="text-gray-600 text-xs text-center">{prize.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className={`font-bold ${canAfford ? 'text-primary-blue' : 'text-gray-400'}`}>
                        {prize.pointsCost} pts
                      </span>
                      <Button
                        onClick={() => handleRedeem(prize)}
                        disabled={!canAfford}
                        variant={canAfford ? 'primary' : 'outline'}
                        className="text-sm px-3 py-2"
                      >
                        {canAfford ? 'Redeem' : 'Need more'}
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
        </div>
      </div>

      {/* Confirm Redemption Modal */}
      <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
        {selectedPrize && (
          <div className="space-y-4 text-center">
            <div className="text-6xl mb-4">{selectedPrize.imageSrc}</div>
            <h2 className="text-2xl font-bold text-primary-blue">Redeem {selectedPrize.name}?</h2>
            <p className="text-gray-700">{selectedPrize.description}</p>
            <div className="bg-gray-50 p-4 rounded-2xl">
              <p className="text-gray-700">
                This will cost <span className="font-bold text-primary-blue">{selectedPrize.pointsCost} points</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                You'll have {points - selectedPrize.pointsCost} points remaining
              </p>
            </div>
            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => setShowConfirmModal(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmRedeem}
                variant="secondary"
                className="flex-1"
              >
                Confirm
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Success Modal */}
      <Modal isOpen={showSuccessModal} onClose={handleCloseSuccess}>
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-primary-green">Prize Redeemed!</h2>
          {selectedPrize && (
            <>
              <p className="text-lg text-gray-700">
                You've redeemed <span className="font-bold">{selectedPrize.name}</span>
              </p>
              {redemptions.length > 0 && (
                <div className="bg-green-50 p-4 rounded-2xl text-left">
                  <p className="font-bold text-green-700 mb-2">Your Claim Code:</p>
                  <p className="text-2xl font-mono font-bold text-primary-blue mb-2">
                    {redemptions[redemptions.length - 1]?.claimCode}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>How to claim:</strong> Use this code when checking out on our website or contact support with this code to claim your prize.
                  </p>
                </div>
              )}
            </>
          )}
          <Button onClick={handleCloseSuccess} variant="primary" className="w-full">
            Awesome!
          </Button>
        </div>
      </Modal>

      {/* My Redemptions Modal */}
      <Modal isOpen={showRedemptions} onClose={() => setShowRedemptions(false)}>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary-blue text-center">My Redemptions</h2>
          {redemptions.length === 0 ? (
            <p className="text-center text-gray-600">You haven't redeemed any prizes yet.</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {redemptions.map((redemption) => {
                const prize = getPrizeById(redemption.prizeId)
                return (
                  <Card key={redemption.id}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{prize?.imageSrc || '🎁'}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">{prize?.name || 'Unknown Prize'}</h3>
                          <p className="text-xs text-gray-600">
                            Redeemed {new Date(redemption.redeemedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-xl">
                        <p className="text-xs text-gray-600 mb-1">Claim Code:</p>
                        <p className="text-lg font-mono font-bold text-primary-blue">{redemption.claimCode}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
          <Button onClick={() => setShowRedemptions(false)} variant="primary" className="w-full">
            Close
          </Button>
        </div>
      </Modal>
    </div>
  )
}
