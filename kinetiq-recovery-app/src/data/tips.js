// Daily recovery tips
export const dailyTips = [
  {
    id: 1,
    tip: "Drink a glass of water as soon as you wake up to rehydrate after sleep!",
    category: "Hydration"
  },
  {
    id: 2,
    tip: "Stretching after practice when your muscles are warm is most effective.",
    category: "Stretching"
  },
  {
    id: 3,
    tip: "Aim for 8-10 hours of sleep each night for the best recovery.",
    category: "Sleep"
  },
  {
    id: 4,
    tip: "Eat protein within 30 minutes after practice to help muscles recover faster.",
    category: "Nutrition"
  },
  {
    id: 5,
    tip: "Carry a water bottle with you and sip throughout the day, not just at practice.",
    category: "Hydration"
  },
  {
    id: 6,
    tip: "Take 1-2 rest days per week to let your body fully recover.",
    category: "Habits"
  },
  {
    id: 7,
    tip: "Stop looking at screens 1 hour before bed to sleep better.",
    category: "Sleep"
  },
  {
    id: 8,
    tip: "Warm up before practice and cool down after to prevent injuries.",
    category: "Habits"
  },
  {
    id: 9,
    tip: "A banana with peanut butter is a great recovery snack after practice!",
    category: "Nutrition"
  },
  {
    id: 10,
    tip: "Light yellow or clear urine means you're well hydrated - keep it up!",
    category: "Hydration"
  },
  {
    id: 11,
    tip: "Hold each stretch for 15-30 seconds for the best results.",
    category: "Stretching"
  },
  {
    id: 12,
    tip: "If you feel pain during exercise, stop and tell a coach or parent.",
    category: "Injury Prevention"
  },
  {
    id: 13,
    tip: "Eat 5 servings of fruits and vegetables each day for better recovery.",
    category: "Nutrition"
  },
  {
    id: 14,
    tip: "Your body repairs muscles while you sleep - that's why sleep is so important!",
    category: "Sleep"
  },
  {
    id: 15,
    tip: "Drink 2-3 cups of water during a 1-hour practice to stay hydrated.",
    category: "Hydration"
  },
]

// Get a random tip
export function getRandomTip() {
  return dailyTips[Math.floor(Math.random() * dailyTips.length)]
}
