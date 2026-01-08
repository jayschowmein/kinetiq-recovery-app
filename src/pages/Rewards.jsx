import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import Card from '../components/Card'
import Button from '../components/Button'
import PointsBadge from '../components/PointsBadge'
import ProgressBar from '../components/ProgressBar'
import Modal from '../components/Modal'
import { rewards, getTier, getRewardsByTier, getNextTierThreshold } from '../data/rewards'
import Confetti from '../components/Confetti'

export default function Rewards() {
  const navigate = useNavigate()
  const { points, subtractPoints } = useGame()
  const [selectedReward, setSelectedReward] = useState(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [confetti, setConfetti] = useState(false)

  const currentTier = getTier(points)
  const nextTier = getNextTierThreshold(points)
  const availableRewards = getRewardsByTier(currentTier)

  const handleRedeem = (reward) => {
    setSelectedReward(reward)
    setShowConfirmModal(true)
  }

  const handleConfirmRedeem = () => {
    if (selectedReward && points >= selectedReward.cost) {
      subtractPoints(selectedReward.cost)
      setShowConfirmModal(false)
      setShowSuccessModal(true)
      setConfetti(true)
    }
  }

  const handleCloseSuccess = () => {
    setShowSuccessModal(false)
    setSelectedReward(null)
  }

  const getTierColor = (tier) => {
    switch (tier) {
      case 'bronze': return 'from-yellow-600 to-yellow-400'
      case 'silver': return 'from-gray-400 to-gray-300'
      case 'gold': return 'from-yellow-400 to-yellow-200'
      default: return 'from-gray-400 to-gray-300'
    }
  }

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'bronze': return '🥉'
      case 'silver': return '🥈'
      case 'gold': return '🥇'
      default: return '🏅'
    }
  }

  return (
    <div className="min-h-screen p-6 pb-20">
      <Confetti trigger={confetti} />
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
          Rewards
        </h1>

        {/* Current Tier */}
        <Card className={`bg-gradient-to-r ${getTierColor(currentTier)} text-white`}>
          <div className="text-center space-y-2">
            <div className="text-5xl mb-2">{getTierIcon(currentTier)}</div>
            <h2 className="text-3xl font-bold">
              {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)} Tier
            </h2>
            <p className="text-lg opacity-90">
              You have {points} points
            </p>
          </div>
        </Card>

        {/* Progress to Next Tier */}
        {nextTier.tier !== 'max' && (
          <Card>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-gray-700 mb-2">
                Progress to {nextTier.tier.charAt(0).toUpperCase() + nextTier.tier.slice(1)} Tier
              </h3>
              <ProgressBar
                current={points}
                max={nextTier.threshold}
                label={`${points} / ${nextTier.threshold} points`}
              />
              <p className="text-sm text-gray-600 text-center mt-2">
                {nextTier.threshold - points} more points needed
              </p>
            </div>
          </Card>
        )}

        {/* Available Rewards */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary-blue">
            Available Rewards ({currentTier.charAt(0).toUpperCase() + currentTier.slice(1)} Tier)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableRewards.map((reward) => {
              const canAfford = points >= reward.cost
              return (
                <Card
                  key={reward.id}
                  className={!canAfford ? 'opacity-60' : ''}
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="text-4xl">{reward.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          {reward.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {reward.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`font-bold text-lg ${canAfford ? 'text-primary-blue' : 'text-gray-400'}`}>
                            {reward.cost} points
                          </span>
                          <Button
                            onClick={() => handleRedeem(reward)}
                            disabled={!canAfford}
                            variant={canAfford ? 'primary' : 'outline'}
                            className="text-sm px-4 py-2"
                          >
                            {canAfford ? 'Redeem' : 'Not enough points'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* All Rewards Preview (Other Tiers) */}
        {currentTier !== 'gold' && (
          <div className="space-y-4 pt-6">
            <h2 className="text-2xl font-bold text-gray-600">
              Unlock More Rewards
            </h2>
            {['silver', 'gold'].filter(t => {
              if (currentTier === 'bronze') return t === 'silver' || t === 'gold'
              if (currentTier === 'silver') return t === 'gold'
              return false
            }).map((tier) => {
              const tierRewards = getRewardsByTier(tier)
              return (
                <Card key={tier} className="bg-gray-50">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{getTierIcon(tier)}</span>
                      <h3 className="text-xl font-bold text-gray-700">
                        {tier.charAt(0).toUpperCase() + tier.slice(1)} Tier Rewards
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {tierRewards.slice(0, 2).map((reward) => (
                        <div key={reward.id} className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{reward.icon}</span>
                          <span>{reward.name} - {reward.cost} points</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Confirm Redeem Modal */}
      <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
        {selectedReward && (
          <div className="space-y-4 text-center">
            <div className="text-5xl mb-4">{selectedReward.icon}</div>
            <h2 className="text-2xl font-bold text-primary-blue">
              Redeem {selectedReward.name}?
            </h2>
            <p className="text-gray-700">
              This will cost <span className="font-bold text-primary-blue">{selectedReward.cost} points</span>
            </p>
            <p className="text-sm text-gray-600">
              You'll have {points - selectedReward.cost} points remaining
            </p>
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
          <h2 className="text-2xl font-bold text-primary-green">
            Reward Redeemed!
          </h2>
          {selectedReward && (
            <>
              <p className="text-lg text-gray-700">
                You've redeemed <span className="font-bold">{selectedReward.name}</span>
              </p>
              <p className="text-sm text-gray-600">
                Check your email or account for details on how to claim your reward.
              </p>
            </>
          )}
          <Button onClick={handleCloseSuccess} variant="primary" className="w-full">
            Awesome!
          </Button>
        </div>
      </Modal>
    </div>
  )
}
