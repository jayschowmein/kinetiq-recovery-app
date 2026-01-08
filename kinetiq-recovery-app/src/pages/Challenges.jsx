import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import Card from '../components/Card'
import Button from '../components/Button'
import PointsBadge from '../components/PointsBadge'
import StreakIndicator from '../components/StreakIndicator'
import Modal from '../components/Modal'
import { challenges } from '../data/challenges'
import Confetti from '../components/Confetti'

export default function Challenges() {
  const navigate = useNavigate()
  const { markChallengeComplete, completedChallenges, addBadge, streak, points } = useGame()
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [confetti, setConfetti] = useState(false)

  const dailyChallenges = challenges.filter(c => c.type === 'daily')
  const weeklyChallenges = challenges.filter(c => c.type === 'weekly')

  const handleStartChallenge = (challenge) => {
    setSelectedChallenge(challenge)
  }

  const handleCompleteChallenge = () => {
    if (selectedChallenge && !completedChallenges.includes(selectedChallenge.id)) {
      markChallengeComplete(selectedChallenge.id)
      setConfetti(true)
      
      // Badge checks
      if (streak >= 3) {
        addBadge('3-day-streak')
      }
      if (completedChallenges.length + 1 === 5) {
        addBadge('5-challenges')
      }
    }
    setShowCompleteModal(true)
  }

  const handleCloseModal = () => {
    setSelectedChallenge(null)
    setShowCompleteModal(false)
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
          <div className="flex gap-4">
            <StreakIndicator />
            <PointsBadge />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-primary-blue text-center">
          Recovery Challenges
        </h1>
        <p className="text-center text-gray-700 text-lg">
          Complete daily and weekly challenges to build healthy recovery habits!
        </p>

        {/* Daily Challenges */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary-green">Daily Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dailyChallenges.map((challenge) => {
              const isCompleted = completedChallenges.includes(challenge.id)
              return (
                <Card
                  key={challenge.id}
                  className={isCompleted ? 'opacity-75' : ''}
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="text-4xl">{challenge.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{challenge.title}</h3>
                          {isCompleted && (
                            <span className="text-green-500 text-xl">✓</span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{challenge.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-primary-blue font-bold">
                            +{challenge.points} points
                          </span>
                          {!isCompleted && (
                            <Button
                              onClick={() => handleStartChallenge(challenge)}
                              variant="primary"
                              className="text-sm px-4 py-2"
                            >
                              Start
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Weekly Challenges */}
        <div className="space-y-4 pt-6">
          <h2 className="text-2xl font-bold text-purple-600">Weekly Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weeklyChallenges.map((challenge) => {
              const isCompleted = completedChallenges.includes(challenge.id)
              return (
                <Card
                  key={challenge.id}
                  className={isCompleted ? 'opacity-75' : ''}
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="text-4xl">{challenge.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{challenge.title}</h3>
                          {isCompleted && (
                            <span className="text-green-500 text-xl">✓</span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{challenge.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-purple-600 font-bold">
                            +{challenge.points} points
                          </span>
                          {!isCompleted && (
                            <Button
                              onClick={() => handleStartChallenge(challenge)}
                              variant="secondary"
                              className="text-sm px-4 py-2"
                            >
                              Start
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Challenge Activity Modal */}
      <Modal isOpen={!!selectedChallenge && !showCompleteModal} onClose={handleCloseModal}>
        {selectedChallenge && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-6xl mb-4">{selectedChallenge.icon}</div>
              <h2 className="text-2xl font-bold text-primary-blue mb-2">
                {selectedChallenge.title}
              </h2>
              <p className="text-gray-700">{selectedChallenge.description}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
              <p className="text-center text-gray-600">
                Complete this challenge in real life, then mark it as done!
              </p>
              
              {/* Simple checklist or timer placeholder */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-3 bg-white rounded-xl">
                  <input type="checkbox" className="w-5 h-5" />
                  <span>I completed this challenge</span>
                </label>
              </div>
            </div>

            <Button
              onClick={handleCompleteChallenge}
              variant="secondary"
              className="w-full"
            >
              Mark as Complete (+{selectedChallenge.points} points)
            </Button>
          </div>
        )}
      </Modal>

      {/* Completion Modal */}
      <Modal isOpen={showCompleteModal} onClose={handleCloseModal}>
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-primary-green">
            Challenge Completed!
          </h2>
          <p className="text-lg text-gray-700">
            You earned <span className="font-bold text-primary-blue">+{selectedChallenge?.points} points</span>!
          </p>
          {streak >= 3 && (
            <p className="text-primary-green font-semibold">
              🔥 Streak bonus applied!
            </p>
          )}
          <Button onClick={handleCloseModal} variant="primary" className="w-full">
            Awesome!
          </Button>
        </div>
      </Modal>
    </div>
  )
}
