"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { StudyCard } from "@/types/study";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface FlashCardProps {
  card: StudyCard;
  isFlipped: boolean;
  onFlip: () => void;
}

const stateColors: Record<string, string> = {
  NEW: "bg-blue-500/10 text-blue-600",
  LEARNING: "bg-orange-500/10 text-orange-600",
  REVIEW: "bg-green-500/10 text-green-600",
  RELEARNING: "bg-red-500/10 text-red-600",
};

export function FlashCard({ card, isFlipped, onFlip }: FlashCardProps) {
  return (
    <div className="perspective-1000">
      <div
        className={`relative preserve-3d card-flip-transition cursor-pointer min-h-[300px] ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={!isFlipped ? onFlip : undefined}
      >
        {/* Front */}
        <Card className="absolute inset-0 backface-hidden">
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Badge className={stateColors[card.reviewState.state] || ""} variant="secondary">
                {card.reviewState.state}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {card.type === "FILL_IN_BLANK" ? "Fill-in-Blank" : card.type}
              </Badge>
              {card.codeLanguage && (
                <Badge variant="secondary" className="text-xs">
                  {card.codeLanguage}
                </Badge>
              )}
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="prose prose-sm dark:prose-invert max-w-none w-full">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {card.front}
                </ReactMarkdown>
              </div>
            </div>
            {!isFlipped && (
              <p className="text-center text-xs text-muted-foreground mt-4">
                Click or press Space to reveal answer
              </p>
            )}
          </CardContent>
        </Card>

        {/* Back */}
        <Card className="absolute inset-0 backface-hidden rotate-y-180 bg-card">
          <CardContent className="p-6 h-full flex flex-col overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline">Answer</Badge>
            </div>
            <div className="flex-1">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {card.back}
                </ReactMarkdown>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
