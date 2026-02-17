"use client";

import { useState, useCallback, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FlashCard } from "./flashcard";
import { RatingButtons } from "./rating-buttons";
import { SessionComplete } from "./session-complete";
import type { StudyCard, StudyQueue, SessionStats } from "@/types/study";
import { predictNextInterval } from "@/lib/sm2";
import { toast } from "sonner";

interface StudySessionProps {
  initialQueue: StudyQueue;
  onComplete: () => void;
}

export function StudySession({ initialQueue, onComplete }: StudySessionProps) {
  const [cards, setCards] = useState<StudyCard[]>(initialQueue.cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [cardStartTime, setCardStartTime] = useState(Date.now());
  const [stats, setStats] = useState<SessionStats>({
    cardsReviewed: 0,
    cardsCorrect: 0,
    again: 0,
    hard: 0,
    good: 0,
    easy: 0,
    averageResponseTime: 0,
  });

  const currentCard = cards[currentIndex];
  const totalCards = initialQueue.stats.total;
  const progressPercent = totalCards > 0
    ? Math.round((stats.cardsReviewed / totalCards) * 100)
    : 0;

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === "Space") {
        e.preventDefault();
        if (!isFlipped) setIsFlipped(true);
      } else if (isFlipped) {
        if (e.key === "1") handleRate(1);
        else if (e.key === "2") handleRate(2);
        else if (e.key === "3") handleRate(3);
        else if (e.key === "4") handleRate(4);
      }
      if (e.key === "s" || e.key === "S") handleSkip();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleFlip = useCallback(() => {
    setIsFlipped(true);
  }, []);

  const handleRate = useCallback(async (rating: 1 | 2 | 3 | 4) => {
    if (!currentCard) return;

    const responseTime = Date.now() - cardStartTime;

    // Submit review to API
    try {
      await fetch("/api/study/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardId: currentCard.id,
          rating,
          responseTime,
        }),
      });
    } catch {
      toast.error("Failed to save review");
    }

    // Update stats
    const ratingKey = { 1: "again", 2: "hard", 3: "good", 4: "easy" } as const;
    const newReviewed = stats.cardsReviewed + 1;
    const newAvgTime = Math.round(
      (stats.averageResponseTime * stats.cardsReviewed + responseTime) / newReviewed
    );

    setStats((prev) => ({
      ...prev,
      cardsReviewed: newReviewed,
      cardsCorrect: rating >= 3 ? prev.cardsCorrect + 1 : prev.cardsCorrect,
      [ratingKey[rating]]: prev[ratingKey[rating]] + 1,
      averageResponseTime: newAvgTime,
    }));

    // If "Again", re-insert card later in the queue
    if (rating === 1) {
      const reinsertIndex = Math.min(currentIndex + 5, cards.length);
      const newCards = [...cards];
      const [card] = newCards.splice(currentIndex, 1);
      newCards.splice(reinsertIndex, 0, card);
      setCards(newCards);
      setIsFlipped(false);
      setCardStartTime(Date.now());
      return;
    }

    // Move to next card
    const nextIndex = currentIndex + 1;
    if (nextIndex >= cards.length) {
      setIsComplete(true);
    } else {
      setCurrentIndex(nextIndex);
      setIsFlipped(false);
      setCardStartTime(Date.now());
    }
  }, [currentCard, currentIndex, cards, cardStartTime, stats]);

  const handleSkip = useCallback(() => {
    if (!currentCard) return;
    // Move card to end
    const newCards = [...cards];
    const [card] = newCards.splice(currentIndex, 1);
    newCards.push(card);
    setCards(newCards);
    setIsFlipped(false);
    setCardStartTime(Date.now());
  }, [currentCard, currentIndex, cards]);

  if (isComplete) {
    return <SessionComplete stats={stats} onFinish={onComplete} />;
  }

  if (!currentCard) {
    return <SessionComplete stats={stats} onFinish={onComplete} />;
  }

  // Get predicted intervals for rating buttons
  const intervals = predictNextInterval({
    rating: 3,
    repetitions: currentCard.reviewState.repetitions,
    easeFactor: currentCard.reviewState.easeFactor,
    interval: currentCard.reviewState.interval,
    state: currentCard.reviewState.state as "NEW" | "LEARNING" | "REVIEW" | "RELEARNING",
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="outline">
            {stats.cardsReviewed} / {totalCards}
          </Badge>
          <div className="flex gap-1 text-xs">
            <span className="text-blue-500">{initialQueue.stats.newCount} new</span>
            <span className="text-orange-500">{initialQueue.stats.learning} learning</span>
            <span className="text-green-500">{initialQueue.stats.due} review</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onComplete}>
          <X className="h-4 w-4 mr-1" />
          End
        </Button>
      </div>

      <Progress value={progressPercent} className="h-2" />

      {/* Card */}
      <FlashCard
        card={currentCard}
        isFlipped={isFlipped}
        onFlip={handleFlip}
      />

      {/* Rating buttons or flip prompt */}
      {isFlipped ? (
        <RatingButtons
          onRate={handleRate}
          intervals={intervals}
        />
      ) : (
        <div className="text-center space-y-2">
          <Button onClick={handleFlip} size="lg">
            Show Answer
          </Button>
          <p className="text-xs text-muted-foreground">
            Press Space to reveal
          </p>
        </div>
      )}

      {/* Skip button */}
      <div className="text-center">
        <Button variant="ghost" size="sm" onClick={handleSkip}>
          Skip (S)
        </Button>
      </div>
    </div>
  );
}
