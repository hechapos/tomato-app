/**
 * SM-2 Spaced Repetition Algorithm
 *
 * Based on the SuperMemo 2 algorithm, adapted for Anki-style 4-button rating.
 * Determines when each card should next appear based on user performance.
 */

export interface SM2Input {
  rating: 1 | 2 | 3 | 4; // 1=Again, 2=Hard, 3=Good, 4=Easy
  repetitions: number;
  easeFactor: number;
  interval: number; // in days
  state: "NEW" | "LEARNING" | "REVIEW" | "RELEARNING";
}

export interface SM2Output {
  repetitions: number;
  easeFactor: number;
  interval: number; // in days
  state: "NEW" | "LEARNING" | "REVIEW" | "RELEARNING";
  nextReviewAt: Date;
}

/**
 * Map our 4-button rating to SM-2's 0-5 quality scale:
 * Again (1) -> 0 (complete failure)
 * Hard  (2) -> 2 (recalled with difficulty)
 * Good  (3) -> 3 (correct with some effort)
 * Easy  (4) -> 5 (effortless recall)
 */
const QUALITY_MAP: Record<number, number> = {
  1: 0,
  2: 2,
  3: 3,
  4: 5,
};

export function calculateSM2(input: SM2Input): SM2Output {
  const { rating, repetitions, easeFactor, interval, state } = input;
  const quality = QUALITY_MAP[rating];

  // Failed response (Again or Hard-ish)
  if (quality < 3) {
    const newState = state === "REVIEW" ? "RELEARNING" : "LEARNING";
    const minutesUntilNext = newState === "RELEARNING" ? 10 : 1;

    return {
      repetitions: 0,
      easeFactor: Math.max(1.3, easeFactor - 0.2),
      interval: 0,
      state: newState,
      nextReviewAt: addMinutes(new Date(), minutesUntilNext),
    };
  }

  // Successful response
  let newInterval: number;
  const newReps = repetitions + 1;

  if (repetitions === 0) {
    newInterval = 1;
  } else if (repetitions === 1) {
    newInterval = 6;
  } else {
    newInterval = Math.round(interval * easeFactor);
  }

  // Update ease factor using SM-2 formula
  let newEF =
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  newEF = Math.max(1.3, newEF);

  // Easy bonus: increase interval by 30%
  if (rating === 4) {
    newInterval = Math.round(newInterval * 1.3);
  }

  // Hard penalty: decrease interval by 20%
  if (rating === 2) {
    newInterval = Math.max(1, Math.round(newInterval * 0.8));
  }

  return {
    repetitions: newReps,
    easeFactor: newEF,
    interval: newInterval,
    state: "REVIEW",
    nextReviewAt: addDays(new Date(), newInterval),
  };
}

/**
 * Predict the next interval for display on rating buttons
 * without modifying any state.
 */
export function predictNextInterval(input: SM2Input): Record<1 | 2 | 3 | 4, string> {
  const results: Record<number, string> = {};
  for (const rating of [1, 2, 3, 4] as const) {
    const result = calculateSM2({ ...input, rating });
    results[rating] = formatInterval(result.interval, result.state);
  }
  return results as Record<1 | 2 | 3 | 4, string>;
}

function formatInterval(days: number, state: string): string {
  if (state === "LEARNING") return "< 1 min";
  if (state === "RELEARNING") return "10 min";
  if (days === 0) return "< 1 min";
  if (days === 1) return "1 day";
  if (days < 30) return `${days} days`;
  if (days < 365) {
    const months = Math.round(days / 30);
    return months === 1 ? "1 month" : `${months} months`;
  }
  const years = (days / 365).toFixed(1);
  return `${years} years`;
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}
