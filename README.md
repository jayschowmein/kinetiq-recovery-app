# Recover Smarter Initiative - KinetIQ Sports Nutrition

A mobile-first, kid-friendly gamified recovery education web app for KinetIQ Sports Nutrition's sales promotion activity.

## Features

- 🎮 **Three Game Modes**:
  - Trivia: 50 recovery education questions
  - Watch & Learn: Educational videos by sport
  - Challenges: Daily and weekly recovery challenges

- 🏆 **Gamification**:
  - Points system with tiered rewards (Bronze/Silver/Gold)
  - Daily streak tracking
  - Badge system
  - Confetti animations for achievements

- 💾 **Persistence**:
  - All progress saved to localStorage
  - Points, streaks, completed activities, and badges persist across sessions

- 📱 **Mobile-First Design**:
  - Responsive layout
  - Big buttons and rounded corners
  - Kid-friendly UI with blue + green theme

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router DOM

## Getting Started

### Installation

```bash
cd kinetiq-recovery-app
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
kinetiq-recovery-app/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Confetti.jsx
│   │   ├── Modal.jsx
│   │   ├── PointsBadge.jsx
│   │   ├── ProgressBar.jsx
│   │   └── StreakIndicator.jsx
│   ├── context/          # React context for state management
│   │   └── GameContext.jsx
│   ├── data/             # Mock data
│   │   ├── challenges.js
│   │   ├── rewards.js
│   │   ├── tips.js
│   │   ├── triviaQuestions.js
│   │   └── videos.js
│   ├── pages/           # Page components
│   │   ├── Challenges.jsx
│   │   ├── GameHub.jsx
│   │   ├── Home.jsx
│   │   ├── Rewards.jsx
│   │   ├── Trivia.jsx
│   │   └── WatchAndLearn.jsx
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Features Overview

### Home Page
- Welcome screen with "Recover Smarter Initiative" title
- Points badge display
- Tip of the Day modal (once per day, awards 5 points)

### Game Hub
- Overview of all game modes
- Points and streak display
- Progress bar to next reward tier

### Trivia Mode
- 50 kid-friendly recovery education questions
- Multiple choice format (A/B/C/D)
- Instant feedback with explanations
- Points: +10 for correct, +2 for effort
- Difficulty tags: easy/medium/hard

### Watch & Learn Mode
- Hero section matching brand requirements
- Two-column layout with initiative info and feature cards
- Video tabs by sport (Basketball, Soccer, Tennis, General)
- Video cards with thumbnails and completion status
- Points: +20 for watching, +10 bonus for trying techniques

### Challenges Mode
- Daily challenges (stretching, hydration, nutrition, sleep, etc.)
- Weekly challenges (streaks, video watching, trivia)
- Completion tracking with checkmarks
- Points vary by challenge type

### Rewards Page
- Tiered system (Bronze 0-100, Silver 101-250, Gold 251+)
- Progress bar to next tier
- Redeemable rewards with point costs
- Confetti animation on redemption

## Data Persistence

All user data is stored in localStorage:
- `kinetiq_points`: Current points total
- `kinetiq_streak`: Current day streak
- `kinetiq_lastActivity`: Last activity date
- `kinetiq_completedVideos`: Array of completed video IDs
- `kinetiq_completedChallenges`: Array of completed challenge IDs
- `kinetiq_badges`: Array of earned badge IDs
- `kinetiq_lastTipDate`: Last date tip was shown

## Badges

- First Video: Watch your first video
- 5 Trivia Correct: Answer 5 trivia questions correctly
- 3-Day Streak: Maintain a 3-day activity streak
- 5 Challenges: Complete 5 challenges
- Perfect Trivia: Answer all 10 questions correctly in a session

## Customization

### Colors
Edit `tailwind.config.js` to change the primary blue and green colors:
```js
colors: {
  primary: {
    blue: '#3B82F6',
    green: '#10B981',
    // ...
  }
}
```

### Questions
Edit `src/data/triviaQuestions.js` to add or modify questions.

### Videos
Edit `src/data/videos.js` to add or modify video content.

### Challenges
Edit `src/data/challenges.js` to add or modify challenges.

### Rewards
Edit `src/data/rewards.js` to add or modify rewards and tiers.

## Notes

- Video player uses placeholder content - replace with actual video URLs in production
- All rewards are mock - implement actual redemption logic in production
- Badge system is extensible - add more badges in GameContext.jsx

## License

Built for KinetIQ Sports Nutrition sales promotion activity.
"# kinetiq-recovery-app" 
"# kinetiq-recovery-app-v2" 
