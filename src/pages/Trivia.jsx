import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import Card from '../components/Card'
import Button from '../components/Button'
import PointsBadge from '../components/PointsBadge'
import { triviaQuestions } from '../data/triviaQuestions'
import { getNextTriviaMultiplier, resetTriviaMultiplier } from '../data/spinWheel'
import Confetti from '../components/Confetti'

export default function Trivia() {
  const navigate = useNavigate()
  const { addPoints, addBadge, recordActivity, points } = useGame()
  const [triviaMultiplier, setTriviaMultiplier] = useState(1)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [confetti, setConfetti] = useState(false)

  // Shuffle questions and get random set
  const [questions] = useState(() => {
    const shuffled = [...triviaQuestions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 10) // Show 10 questions per session
  })

  // Check for trivia multiplier on mount
  useEffect(() => {
    const multiplier = getNextTriviaMultiplier()
    setTriviaMultiplier(multiplier)
  }, [])

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  const handleAnswerSelect = (index) => {
    if (showResult) return
    setSelectedAnswer(index)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === currentQuestion.answerIndex
    setShowResult(true)

    if (isCorrect) {
      const basePoints = 10
      const finalPoints = basePoints * triviaMultiplier
      addPoints('trivia_correct', finalPoints)
      setCorrectCount(prev => prev + 1)
      setConfetti(true)
      
      // Reset multiplier if it was 2x
      if (triviaMultiplier === 2) {
        resetTriviaMultiplier()
        setTriviaMultiplier(1)
      }
      
      // Badge checks
      if (correctCount + 1 === 5) {
        addBadge('5-trivia-correct')
      }
    } else {
      addPoints('trivia_effort', 2) // Effort points
    }
  }

  const handleNext = () => {
    if (isLastQuestion) {
      // Check for badges
      if (correctCount >= 10) {
        addBadge('perfect-trivia')
      }
      // Record activity for streak
      recordActivity()
      navigate('/hub')
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setConfetti(false)
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (!currentQuestion) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen p-6 pb-20">
      <Confetti trigger={confetti} />
      <div className="max-w-3xl mx-auto space-y-6">
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

        {/* Progress */}
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div
              className="bg-primary-blue h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card>
          <div className="space-y-6">
            {/* Category and Difficulty */}
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-primary-blue text-white rounded-full text-sm font-semibold">
                {currentQuestion.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(currentQuestion.difficulty)}`}>
                {currentQuestion.difficulty}
              </span>
            </div>

            {/* Question */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {currentQuestion.question}
            </h2>

            {/* Answer Choices */}
            <div className="space-y-3">
              {currentQuestion.choices.map((choice, index) => {
                let buttonClass = 'w-full text-left p-4 rounded-2xl font-semibold text-lg transition-all '
                
                if (showResult) {
                  if (index === currentQuestion.answerIndex) {
                    buttonClass += 'bg-green-200 border-4 border-green-500'
                  } else if (index === selectedAnswer && index !== currentQuestion.answerIndex) {
                    buttonClass += 'bg-red-200 border-4 border-red-500'
                  } else {
                    buttonClass += 'bg-gray-100'
                  }
                } else {
                  if (selectedAnswer === index) {
                    buttonClass += 'bg-primary-blue text-white border-4 border-primary-lightBlue'
                  } else {
                    buttonClass += 'bg-gray-100 hover:bg-gray-200 border-4 border-transparent'
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <span className="font-bold mr-2">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {choice}
                  </button>
                )
              })}
            </div>

            {/* Result */}
            {showResult && (
              <div className={`p-4 rounded-2xl ${selectedAnswer === currentQuestion.answerIndex ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className="font-bold text-lg mb-2">
                  {selectedAnswer === currentQuestion.answerIndex ? '✅ Correct! +10 points' : '❌ Not quite! +2 points for effort'}
                </p>
                <p className="text-gray-700">{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-4">
              {!showResult ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  variant="primary"
                  className="w-full"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  variant="secondary"
                  className="w-full"
                >
                  {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Score */}
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">
            Correct: {correctCount} / {currentQuestionIndex + 1}
          </p>
        </div>
      </div>
    </div>
  )
}
