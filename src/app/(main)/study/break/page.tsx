"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BREAK_SUGGESTIONS } from "@/lib/constants";
import { PomodoroTimer } from "@/components/timer/pomodoro-timer";

function BreakContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckId = searchParams.get("deckId");
  const breakType = searchParams.get("type") || "short";

  const [suggestion] = useState(
    () => BREAK_SUGGESTIONS[Math.floor(Math.random() * BREAK_SUGGESTIONS.length)]
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="max-w-lg mx-auto py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          {breakType === "long" ? "Long Break" : "Short Break"}
        </h1>
        <p className="text-muted-foreground mt-1">
          Take a moment to rest and recharge
        </p>
      </div>

      <PomodoroTimer />

      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-lg font-medium mb-1">Break Tip</p>
          <p className="text-muted-foreground">{suggestion}</p>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-3">
        {deckId && (
          <Button onClick={() => router.push(`/study/${deckId}`)}>
            Continue Studying
          </Button>
        )}
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}

export default function BreakPage() {
  return (
    <Suspense>
      <BreakContent />
    </Suspense>
  );
}
