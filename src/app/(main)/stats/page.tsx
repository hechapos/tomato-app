"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Timer, Flame, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface DailyStats {
  cardsReviewed: number;
  cardsCorrect: number;
  accuracy: number;
  pomodorosCompleted: number;
  totalStudyMinutes: number;
  reviewBreakdown: { again: number; hard: number; good: number; easy: number };
}

interface StreakData {
  currentStreak: number;
  longestStreak: number;
}

interface DeckProgress {
  deckId: string;
  deckName: string;
  totalCards: number;
  newCards: number;
  learningCards: number;
  reviewCards: number;
  masteredCards: number;
  percentComplete: number;
}

export default function StatsPage() {
  const [daily, setDaily] = useState<DailyStats | null>(null);
  const [streaks, setStreaks] = useState<StreakData | null>(null);
  const [deckProgress, setDeckProgress] = useState<DeckProgress[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/stats/daily").then((r) => r.json()),
      fetch("/api/stats/streaks").then((r) => r.json()),
      fetch("/api/stats/deck-progress").then((r) => r.json()),
    ]).then(([d, s, dp]) => {
      setDaily(d);
      setStreaks(s);
      setDeckProgress(dp);
    });
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Statistics</h1>
        <p className="text-muted-foreground mt-1">Track your learning progress</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{daily?.cardsReviewed ?? 0}</p>
                <p className="text-xs text-muted-foreground">Cards Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Target className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{daily?.accuracy ?? 0}%</p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Flame className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{streaks?.currentStreak ?? 0}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Timer className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{daily?.pomodorosCompleted ?? 0}</p>
                <p className="text-xs text-muted-foreground">Pomodoros</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Review breakdown */}
      {daily && daily.cardsReviewed > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today&apos;s Review Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              {[
                { label: "Again", count: daily.reviewBreakdown.again, color: "bg-red-500" },
                { label: "Hard", count: daily.reviewBreakdown.hard, color: "bg-orange-500" },
                { label: "Good", count: daily.reviewBreakdown.good, color: "bg-green-500" },
                { label: "Easy", count: daily.reviewBreakdown.easy, color: "bg-blue-500" },
              ].map((item) => (
                <div key={item.label} className="flex-1 text-center">
                  <div className={`${item.color} h-2 rounded-full mb-2`} style={{
                    opacity: daily.cardsReviewed > 0 ? Math.max(0.2, item.count / daily.cardsReviewed) : 0.2,
                  }} />
                  <p className="text-lg font-bold">{item.count}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Streak info */}
      {streaks && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Streaks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current streak</span>
              <span className="font-bold">{streaks.currentStreak} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Longest streak</span>
              <span className="font-bold">{streaks.longestStreak} days</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Deck progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Deck Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {deckProgress.map((deck) => (
            <div key={deck.deckId} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{deck.deckName}</span>
                <span className="text-muted-foreground">
                  {deck.percentComplete}% mastered
                </span>
              </div>
              <Progress value={deck.percentComplete} className="h-2" />
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span>{deck.newCards} new</span>
                <span>{deck.learningCards} learning</span>
                <span>{deck.reviewCards} review</span>
                <span>{deck.masteredCards} mastered</span>
              </div>
            </div>
          ))}
          {deckProgress.length === 0 && (
            <p className="text-muted-foreground text-center py-8">
              Start studying to see your progress here!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
