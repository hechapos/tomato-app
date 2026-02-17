export interface StudyCard {
  id: string;
  type: "STANDARD" | "CODE" | "FILL_IN_BLANK";
  front: string;
  back: string;
  codeTemplate?: string | null;
  codeLanguage?: string | null;
  expectedOutput?: string | null;
  codeSnippet?: string | null;
  blankAnswers?: string[];
  position: number;
  reviewState: {
    state: "NEW" | "LEARNING" | "REVIEW" | "RELEARNING";
    easeFactor: number;
    interval: number;
    repetitions: number;
    nextReviewAt: string;
  };
}

export interface StudyQueue {
  cards: StudyCard[];
  stats: {
    due: number;
    newCount: number;
    learning: number;
    total: number;
  };
}

export interface ReviewSubmission {
  cardId: string;
  rating: 1 | 2 | 3 | 4;
  responseTime: number;
}

export interface SessionStats {
  cardsReviewed: number;
  cardsCorrect: number;
  again: number;
  hard: number;
  good: number;
  easy: number;
  averageResponseTime: number;
}
