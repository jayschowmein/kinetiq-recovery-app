import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GameHub from './pages/GameHub'
import Trivia from './pages/Trivia'
import WatchAndLearn from './pages/WatchAndLearn'
import Challenges from './pages/Challenges'
import Rewards from './pages/Rewards'
import Prizes from './pages/Prizes'
import Leaderboard from './pages/Leaderboard'
import { GameProvider } from './context/GameContext'

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hub" element={<GameHub />} />
          <Route path="/trivia" element={<Trivia />} />
          <Route path="/watch" element={<WatchAndLearn />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/prizes" element={<Prizes />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </GameProvider>
  )
}

export default App
