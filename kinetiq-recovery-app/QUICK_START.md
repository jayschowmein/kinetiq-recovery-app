# Quick Start Guide

## Installation & Running

1. **Install dependencies:**
   ```bash
   cd kinetiq-recovery-app
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:5173`

## Key Features to Test

### 1. Home Page
- See the "Recover Smarter Initiative" welcome screen
- Click "Start" to go to Game Hub
- Tip of the Day modal appears (once per day, awards 5 points)

### 2. Game Hub
- View your current points and streak
- See progress to next reward tier
- Click on any of the 3 game modes

### 3. Trivia Mode
- Answer 10 random questions from 50 total
- Get +10 points for correct answers, +2 for effort
- Earn badges for milestones (5 correct, perfect score)
- Questions cover: Hydration, Sleep, Stretching, Nutrition, Injury Prevention, Habits

### 4. Watch & Learn Mode
- View hero section with initiative info
- Browse videos by sport (Basketball, Soccer, Tennis, General)
- Click video cards to "watch" (placeholder player)
- Complete videos to earn 20 points + 10 bonus for trying techniques
- First video completion earns a badge

### 5. Challenges Mode
- Complete daily challenges (stretching, hydration, nutrition, sleep)
- Complete weekly challenges (streaks, video watching, trivia)
- Earn 15+ points per challenge
- Get streak bonus if streak >= 3 days

### 6. Rewards Page
- View current tier (Bronze/Silver/Gold)
- See progress to next tier
- Redeem rewards with points
- Confetti animation on redemption

## Data Persistence

All progress is saved to browser localStorage:
- Points persist across sessions
- Streaks track daily activity
- Completed videos/challenges saved
- Badges earned are remembered

## Testing Tips

1. **Clear localStorage** to reset progress:
   - Open browser DevTools (F12)
   - Go to Application/Storage tab
   - Clear localStorage
   - Refresh page

2. **Test streak system:**
   - Complete an activity today
   - Change your system date to tomorrow
   - Complete another activity
   - Streak should increase

3. **Test badges:**
   - Watch first video → "First Video" badge
   - Answer 5 trivia correctly → "5 Trivia Correct" badge
   - Maintain 3-day streak → "3-Day Streak" badge
   - Complete 5 challenges → "5 Challenges" badge
   - Perfect trivia score → "Perfect Trivia" badge

## Customization

- **Colors**: Edit `tailwind.config.js`
- **Questions**: Edit `src/data/triviaQuestions.js`
- **Videos**: Edit `src/data/videos.js`
- **Challenges**: Edit `src/data/challenges.js`
- **Rewards**: Edit `src/data/rewards.js`

## Production Build

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy to any static hosting service.
