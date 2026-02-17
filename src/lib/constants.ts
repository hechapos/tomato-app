export const APP_NAME = "Tomato";

// Timer defaults (in seconds)
export const DEFAULT_POMODORO_DURATION = 25 * 60;
export const DEFAULT_SHORT_BREAK = 5 * 60;
export const DEFAULT_LONG_BREAK = 15 * 60;
export const POMODOROS_BEFORE_LONG_BREAK = 4;

// Study defaults
export const DEFAULT_NEW_CARDS_PER_DAY = 20;
export const MAX_CODE_EXECUTION_TIMEOUT = 5000;

// Card types
export const CARD_TYPES = ["STANDARD", "CODE", "FILL_IN_BLANK"] as const;
export type CardTypeValue = (typeof CARD_TYPES)[number];

// Card states
export const CARD_STATES = ["NEW", "LEARNING", "REVIEW", "RELEARNING"] as const;
export type CardStateValue = (typeof CARD_STATES)[number];

// Rating values
export const RATINGS = {
  AGAIN: 1,
  HARD: 2,
  GOOD: 3,
  EASY: 4,
} as const;

export const RATING_LABELS: Record<number, string> = {
  1: "Again",
  2: "Hard",
  3: "Good",
  4: "Easy",
};

export const RATING_COLORS: Record<number, string> = {
  1: "text-red-500",
  2: "text-orange-500",
  3: "text-green-500",
  4: "text-blue-500",
};

// Preset avatars
export const AVATARS = [
  { id: "tomato-1", label: "Classic Tomato" },
  { id: "tomato-2", label: "Happy Tomato" },
  { id: "tomato-3", label: "Cool Tomato" },
  { id: "tomato-4", label: "Chef Tomato" },
  { id: "tomato-5", label: "Reading Tomato" },
  { id: "tomato-6", label: "Coding Tomato" },
  { id: "tomato-7", label: "Sleeping Tomato" },
  { id: "tomato-8", label: "Star Tomato" },
  { id: "tomato-9", label: "Rocket Tomato" },
  { id: "tomato-10", label: "Music Tomato" },
  { id: "tomato-11", label: "Ninja Tomato" },
  { id: "tomato-12", label: "Crown Tomato" },
] as const;

// Badge definitions
export const BADGES = [
  {
    id: "first-tomato",
    name: "First Tomato",
    description: "Complete your first Pomodoro session",
    icon: "sprout",
  },
  {
    id: "tomato-trio",
    name: "Tomato Trio",
    description: "Complete 3 Pomodoros in one day",
    icon: "flame",
  },
  {
    id: "perfect-day",
    name: "Perfect Day",
    description: "100% accuracy in a study session",
    icon: "star",
  },
  {
    id: "week-warrior",
    name: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "shield",
  },
  {
    id: "month-master",
    name: "Month Master",
    description: "Maintain a 30-day streak",
    icon: "trophy",
  },
  {
    id: "century",
    name: "Century",
    description: "Review 100 cards total",
    icon: "target",
  },
  {
    id: "thousand-cards",
    name: "Card Scholar",
    description: "Review 1000 cards total",
    icon: "book-open",
  },
  {
    id: "deck-complete",
    name: "Deck Master",
    description: "Master all cards in a deck",
    icon: "check-circle",
  },
  {
    id: "polyglot",
    name: "Polyglot",
    description: "Study 3 or more different decks",
    icon: "layers",
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "Study before 7 AM",
    icon: "sunrise",
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Study after 10 PM",
    icon: "moon",
  },
  {
    id: "speed-demon",
    name: "Speed Demon",
    description: "Average under 5 seconds per card in a session",
    icon: "zap",
  },
] as const;

// Break suggestions
export const BREAK_SUGGESTIONS = [
  "Stand up and stretch your arms above your head",
  "Take 5 deep breaths — in for 4, hold for 4, out for 4",
  "Look at something 20 feet away for 20 seconds (20-20-20 rule)",
  "Drink some water — hydration helps focus",
  "Roll your shoulders forward and backward 5 times",
  "Close your eyes and relax your face muscles",
  "Do 10 gentle neck rotations",
  "Walk around for a minute",
  "Stretch your wrists — important for typing!",
  "Do 5 squats to get the blood flowing",
] as const;

// Supported code languages
export const CODE_LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
] as const;
