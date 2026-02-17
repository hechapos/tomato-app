"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StudyError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="text-5xl mb-4">📚</div>
      <h2 className="text-2xl font-bold mb-2">Study session interrupted</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        {error.message || "Something went wrong during your study session."}
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Try Again</Button>
        <Button variant="outline" asChild>
          <Link href="/decks">Back to Decks</Link>
        </Button>
      </div>
    </div>
  );
}
