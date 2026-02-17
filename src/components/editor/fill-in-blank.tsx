"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FillInBlankProps {
  codeSnippet: string;
  blankAnswers: string[];
  onComplete: (isCorrect: boolean) => void;
}

interface BlankState {
  value: string;
  isChecked: boolean;
  isCorrect: boolean;
}

export function FillInBlank({
  codeSnippet,
  blankAnswers,
  onComplete,
}: FillInBlankProps) {
  const [blanks, setBlanks] = useState<BlankState[]>(
    blankAnswers.map(() => ({ value: "", isChecked: false, isCorrect: false }))
  );
  const [allChecked, setAllChecked] = useState(false);

  const parts = codeSnippet.split(/\{\{blank\}\}/g);

  const handleChange = useCallback((index: number, value: string) => {
    setBlanks((prev) =>
      prev.map((b, i) =>
        i === index ? { ...b, value, isChecked: false, isCorrect: false } : b
      )
    );
    setAllChecked(false);
  }, []);

  const handleCheck = useCallback(() => {
    const newBlanks = blanks.map((blank, i) => {
      const answer = blankAnswers[i] || "";
      // Support multiple valid answers separated by |
      const validAnswers = answer.split("|").map((a) => a.trim().toLowerCase());
      const isCorrect = validAnswers.includes(blank.value.trim().toLowerCase());
      return { ...blank, isChecked: true, isCorrect };
    });
    setBlanks(newBlanks);
    setAllChecked(true);

    const allCorrect = newBlanks.every((b) => b.isCorrect);
    onComplete(allCorrect);
  }, [blanks, blankAnswers, onComplete]);

  let blankIndex = 0;

  return (
    <div className="space-y-4">
      <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm leading-relaxed">
        <pre className="whitespace-pre-wrap">
          {parts.map((part, i) => {
            const currentBlankIndex = blankIndex;
            const isLastPart = i === parts.length - 1;
            if (!isLastPart) blankIndex++;

            return (
              <span key={i}>
                {part}
                {!isLastPart && (
                  <span className="inline-flex items-center gap-1 mx-1 align-middle">
                    <Input
                      value={blanks[currentBlankIndex]?.value || ""}
                      onChange={(e) =>
                        handleChange(currentBlankIndex, e.target.value)
                      }
                      className={cn(
                        "inline-block w-32 h-7 text-sm font-mono px-2",
                        blanks[currentBlankIndex]?.isChecked &&
                          (blanks[currentBlankIndex]?.isCorrect
                            ? "border-green-500 bg-green-500/10"
                            : "border-red-500 bg-red-500/10")
                      )}
                      placeholder="___"
                    />
                    {blanks[currentBlankIndex]?.isChecked &&
                      (blanks[currentBlankIndex]?.isCorrect ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 inline" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500 inline" />
                      ))}
                  </span>
                )}
              </span>
            );
          })}
        </pre>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleCheck} size="sm">
          Check Answers
        </Button>
        {allChecked && (
          <div className="flex items-center gap-2">
            {blanks.every((b) => b.isCorrect) ? (
              <Badge className="bg-green-500/10 text-green-600">
                All correct!
              </Badge>
            ) : (
              <div className="flex flex-wrap gap-1">
                {blanks.map((b, i) =>
                  !b.isCorrect ? (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-xs text-red-500"
                    >
                      Blank {i + 1}: {blankAnswers[i]?.split("|")[0]}
                    </Badge>
                  ) : null
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
