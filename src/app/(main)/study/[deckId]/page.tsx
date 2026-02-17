"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { StudySession } from "@/components/study/study-session";
import { Loader2 } from "lucide-react";
import type { StudyQueue } from "@/types/study";

export default function StudyPage() {
  const params = useParams();
  const router = useRouter();
  const deckId = params.deckId as string;
  const [queue, setQueue] = useState<StudyQueue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQueue = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/study/queue?deckId=${deckId}`);
      if (!res.ok) throw new Error("Failed to load study queue");
      const data = await res.json();
      setQueue(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [deckId]);

  useEffect(() => {
    loadQueue();
  }, [loadQueue]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-destructive mb-4">{error}</p>
        <button
          onClick={() => router.push("/decks")}
          className="text-primary hover:underline"
        >
          Back to Decks
        </button>
      </div>
    );
  }

  if (!queue || queue.cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2">All caught up!</h2>
        <p className="text-muted-foreground mb-6">
          No cards are due for review right now. Come back later!
        </p>
        <button
          onClick={() => router.push("/decks")}
          className="text-primary hover:underline"
        >
          Back to Decks
        </button>
      </div>
    );
  }

  return (
    <StudySession
      initialQueue={queue}
      onComplete={() => router.push("/dashboard")}
    />
  );
}
