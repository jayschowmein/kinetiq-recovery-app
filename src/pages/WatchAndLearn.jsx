import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import Card from '../components/Card'
import Button from '../components/Button'
import PointsBadge from '../components/PointsBadge'
import Modal from '../components/Modal'
import { videos } from '../data/videos'
import Confetti from '../components/Confetti'

export default function WatchAndLearn() {
  const navigate = useNavigate()
  const { markVideoComplete, completedVideos, addPoints, points } = useGame()
  const [activeTab, setActiveTab] = useState('all')
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [watchedConfirmed, setWatchedConfirmed] = useState(false)
  const [showTryIt, setShowTryIt] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [watchTimer, setWatchTimer] = useState(0)
  const [canConfirmWatch, setCanConfirmWatch] = useState(false)
  const timerRef = useRef(null)
  const [thumbnailErrors, setThumbnailErrors] = useState(new Set())

  const categories = [
    { id: 'all', label: 'All Videos', icon: '📺' },
    { id: 'general', label: 'General', icon: '🏃' },
    { id: 'stretching', label: 'Stretching', icon: '🧘' },
    { id: 'nutrition', label: 'Nutrition', icon: '🍎' },
  ]

  const currentVideos = videos[activeTab] || []

  // Timer effect for "I watched it" button
  useEffect(() => {
    if (selectedVideo && !watchedConfirmed) {
      setWatchTimer(0)
      setCanConfirmWatch(false)
      
      timerRef.current = setInterval(() => {
        setWatchTimer(prev => {
          const newTime = prev + 1
          if (newTime >= 20) {
            setCanConfirmWatch(true)
            if (timerRef.current) {
              clearInterval(timerRef.current)
            }
          }
          return newTime
        })
      }, 1000)

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }
    }
  }, [selectedVideo, watchedConfirmed])

  const handleVideoClick = (video) => {
    setSelectedVideo(video)
    setWatchedConfirmed(false)
    setShowTryIt(false)
    setWatchTimer(0)
    setCanConfirmWatch(false)
  }

  const handleConfirmWatched = () => {
    if (!selectedVideo) return
    
    const isAlreadyCompleted = completedVideos.includes(selectedVideo.id)
    if (!isAlreadyCompleted) {
      markVideoComplete(selectedVideo.id)
      setConfetti(true)
    }
    setWatchedConfirmed(true)
    setShowTryIt(true) // This will close video modal and open try-it modal
  }

  const handleTryItYes = () => {
    addPoints('video_try_it', 10) // Bonus points
    setShowTryIt(false)
    setSelectedVideo(null)
    setWatchedConfirmed(false)
    setConfetti(true)
  }

  const handleTryItNo = () => {
    setShowTryIt(false)
    setSelectedVideo(null)
    setWatchedConfirmed(false)
  }

  const handleCloseModal = () => {
    if (watchedConfirmed && !showTryIt) {
      setShowTryIt(true)
    } else if (!watchedConfirmed) {
      // Allow closing if not confirmed yet
      setSelectedVideo(null)
      setWatchedConfirmed(false)
      setWatchTimer(0)
      setCanConfirmWatch(false)
    }
  }

  const handleThumbnailError = (videoId) => {
    setThumbnailErrors(prev => new Set([...prev, videoId]))
  }

  return (
    <div className="min-h-screen p-6 pb-20">
      <Confetti trigger={confetti} />
      <div className="max-w-6xl mx-auto space-y-8">
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

        {/* Hero Section - Matching Screenshot Layout */}
        <div className="space-y-8">
          {/* Big Hero Headline */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-blue">
              The Recover Smarter Initiative
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Learn from expert athletes and build healthy recovery habits that last a lifetime.
            </p>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <Card>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-primary-blue">About the Initiative</h2>
                  <p className="text-gray-700 leading-relaxed">
                    The Recover Smarter Initiative helps young athletes learn the importance of proper recovery. 
                    By watching our educational videos, you'll discover how sleep, nutrition, hydration, and 
                    stretching can help you perform better and stay healthy.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Complete videos to earn points and unlock rewards! Each video you finish gives you 20 points, 
                    and trying the techniques yourself earns bonus points.
                  </p>
                </div>
              </Card>
              
              {/* Callout Banner */}
              <Card className="bg-gradient-to-r from-primary-blue to-primary-green text-white">
                <div className="text-center">
                  <p className="text-2xl font-bold">Recovery is just as important as practice!</p>
                  <p className="text-lg mt-2 opacity-90">Build habits that help you win</p>
                </div>
              </Card>
            </div>

            {/* Right Column - Feature Cards */}
            <div className="space-y-4">
              <Card>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📱</div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-blue mb-2">QR Code Learning</h3>
                    <p className="text-gray-600">Scan QR codes to access recovery tips and videos on the go.</p>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎁</div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-blue mb-2">Earn Rewards</h3>
                    <p className="text-gray-600">Complete videos and challenges to unlock exclusive rewards and discounts.</p>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📊</div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-blue mb-2">Track Progress</h3>
                    <p className="text-gray-600">Monitor your recovery habits and see your improvement over time.</p>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🏆</div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-blue mb-2">Build Streaks</h3>
                    <p className="text-gray-600">Maintain daily activity streaks to earn bonus points and badges.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Video Learning Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-primary-blue text-center">Watch & Learn Videos</h2>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all ${
                  activeTab === category.id
                    ? 'bg-primary-blue text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentVideos.map((video) => {
              const isCompleted = completedVideos.includes(video.id)
              const thumbnailFailed = thumbnailErrors.has(video.videoId)
              
              return (
                <Card
                  key={video.id}
                  onClick={() => handleVideoClick(video)}
                  className="cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="relative">
                      {thumbnailFailed || !video.thumbnailUrl ? (
                        <div className="w-full h-40 bg-gradient-to-br from-primary-blue to-primary-green rounded-2xl flex items-center justify-center text-6xl">
                          📺
                        </div>
                      ) : (
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full h-40 object-cover rounded-2xl"
                          onError={() => handleThumbnailError(video.videoId)}
                        />
                      )}
                      {isCompleted && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                          ✓
                        </div>
                      )}
                      <div className="absolute top-2 left-2 bg-primary-blue text-white px-3 py-1 rounded-full text-xs font-bold">
                        {video.sportTag}
                      </div>
                      <div className="absolute bottom-2 right-2 bg-primary-green text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        +{video.points}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-gray-800">{video.title}</h3>
                    {isCompleted && (
                      <p className="text-sm text-green-600 font-semibold">✓ Completed</p>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      <Modal isOpen={!!selectedVideo && !showTryIt && !watchedConfirmed} onClose={handleCloseModal}>
        {selectedVideo && selectedVideo.embedUrl && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary-blue">{selectedVideo.title}</h2>
            
            {/* YouTube Embed */}
            <div className="relative w-full bg-black rounded-2xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={selectedVideo.embedUrl}
                title={selectedVideo.title}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Watch Confirmation */}
            <div className="bg-gray-50 p-4 rounded-2xl">
              {!canConfirmWatch ? (
                <div className="text-center space-y-2">
                  <p className="text-gray-700 font-semibold">
                    Watch for {20 - watchTimer} more seconds to confirm
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-blue h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(watchTimer / 20) * 100}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <p className="text-gray-700 font-semibold">
                    Ready to confirm you watched this video?
                  </p>
                  <Button
                    onClick={handleConfirmWatched}
                    variant="secondary"
                    className="w-full"
                  >
                    I watched it! (+{selectedVideo.points} points)
                  </Button>
                </div>
              )}
            </div>

            {/* Close button */}
            <Button
              onClick={handleCloseModal}
              variant="outline"
              className="w-full"
            >
              Close
            </Button>
          </div>
        )}
      </Modal>

      {/* Try It Modal */}
      <Modal isOpen={showTryIt} onClose={handleTryItNo}>
        <div className="text-center space-y-4">
          <div className="text-5xl mb-4">💪</div>
          <h2 className="text-2xl font-bold text-primary-blue">Did you try it?</h2>
          <p className="text-gray-700">
            Practice what you learned to earn bonus points!
          </p>
          {selectedVideo && completedVideos.includes(selectedVideo.id) && (
            <div className="bg-green-50 p-3 rounded-xl">
              <p className="text-green-700 font-semibold">
                ✓ Video completed! You earned +{selectedVideo.points} points
              </p>
            </div>
          )}
          <div className="flex gap-4 pt-4">
            <Button onClick={handleTryItYes} variant="secondary" className="flex-1">
              Yes! (+10 bonus)
            </Button>
            <Button onClick={handleTryItNo} variant="outline" className="flex-1">
              Not yet
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
