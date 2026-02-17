"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BADGES } from "@/lib/constants";

const STAGE_EMOJIS = ["", "🌱", "🌿", "🪴", "🍅"];
const BADGE_EMOJIS: Record<string, string> = {
  sprout: "🌱",
  flame: "🔥",
  star: "⭐",
  shield: "🛡️",
  trophy: "🏆",
  target: "🎯",
  "book-open": "📖",
  "check-circle": "✅",
  layers: "📚",
  sunrise: "🌅",
  moon: "🌙",
  zap: "⚡",
};

interface GardenDay {
  date: string;
  count: number;
  stage: number;
}

interface GardenData {
  totalTomatoes: number;
  gardenGrid: GardenDay[];
  earnedBadges: string[];
  stats: {
    totalReviews: number;
    currentStreak: number;
    decksStudied: number;
  };
}

export default function GardenPage() {
  const [data, setData] = useState<GardenData | null>(null);

  useEffect(() => {
    fetch("/api/stats/garden")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  const totalTomatoes = data?.totalTomatoes ?? 0;
  const gardenGrid = data?.gardenGrid ?? [];
  const earnedBadges = new Set(data?.earnedBadges ?? []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tomato Garden</h1>
        <p className="text-muted-foreground mt-1">
          Watch your garden grow with every completed Pomodoro
        </p>
      </div>

      {/* Garden stats */}
      <div className="text-center">
        <div className="text-6xl mb-2">🍅</div>
        <p className="text-4xl font-bold">{totalTomatoes}</p>
        <p className="text-muted-foreground">Tomatoes Grown</p>
      </div>

      {/* Visual garden grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Garden (Last 4 Weeks)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-xs text-muted-foreground pb-1"
              >
                {day}
              </div>
            ))}
            {gardenGrid.map((day, i) => (
              <div
                key={i}
                className={`aspect-square rounded-lg flex items-center justify-center text-lg transition-all ${
                  day.stage > 0
                    ? "bg-green-500/10"
                    : "bg-muted/50"
                }`}
                title={`${day.date}: ${day.count} pomodoro${day.count !== 1 ? "s" : ""}`}
              >
                <span className={day.stage === 0 ? "opacity-20" : ""}>
                  {day.stage === 0 ? "🌱" : STAGE_EMOJIS[day.stage]}
                </span>
              </div>
            ))}
            {/* Fill remaining slots if gardenGrid has fewer than 28 entries */}
            {gardenGrid.length === 0 &&
              Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="aspect-square rounded-lg bg-muted/50 flex items-center justify-center text-lg"
                >
                  <span className="opacity-20">🌱</span>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground justify-center">
            <span className="flex items-center gap-1">🌱 Seed (1)</span>
            <span className="flex items-center gap-1">🌿 Sprout (2)</span>
            <span className="flex items-center gap-1">🪴 Growing (3-4)</span>
            <span className="flex items-center gap-1">🍅 Ripe (5+)</span>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {BADGES.map((badge) => {
              const isEarned = earnedBadges.has(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`flex flex-col items-center text-center p-4 rounded-lg transition-all ${
                    isEarned
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-muted/30 opacity-50"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 ${
                      isEarned ? "bg-primary/20" : "bg-muted"
                    }`}
                  >
                    {isEarned
                      ? BADGE_EMOJIS[badge.icon] || "🏅"
                      : "🔒"}
                  </div>
                  <p className="text-sm font-medium">{badge.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {badge.description}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
