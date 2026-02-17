"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { SessionStats } from "@/types/study";

interface SessionCompleteProps {
  stats: SessionStats;
  onFinish: () => void;
}

export function SessionComplete({ stats, onFinish }: SessionCompleteProps) {
  const accuracy =
    stats.cardsReviewed > 0
      ? Math.round((stats.cardsCorrect / stats.cardsReviewed) * 100)
      : 0;

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="text-6xl">🍅</div>
      <h2 className="text-2xl font-bold">Session Complete!</h2>
      <p className="text-muted-foreground">Great job studying!</p>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-3xl font-bold">{stats.cardsReviewed}</p>
              <p className="text-xs text-muted-foreground">Cards Reviewed</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-red-500" />
              <span>Again: {stats.again}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-orange-500" />
              <span>Hard: {stats.hard}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-green-500" />
              <span>Good: {stats.good}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-blue-500" />
              <span>Easy: {stats.easy}</span>
            </div>
          </div>

          {stats.averageResponseTime > 0 && (
            <p className="text-sm text-muted-foreground">
              Avg. response time: {(stats.averageResponseTime / 1000).toFixed(1)}s
            </p>
          )}
        </CardContent>
      </Card>

      <Button onClick={onFinish} size="lg">
        Back to Dashboard
      </Button>
    </div>
  );
}
