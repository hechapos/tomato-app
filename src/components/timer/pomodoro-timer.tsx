"use client";

import { useTimer } from "@/hooks/use-timer";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";

interface PomodoroTimerProps {
  focusDuration?: number;
  shortBreakDuration?: number;
  longBreakDuration?: number;
  longBreakInterval?: number;
  autoStartBreaks?: boolean;
  autoStartPomodoros?: boolean;
  compact?: boolean;
  onSessionComplete?: (mode: "focus" | "shortBreak" | "longBreak") => void;
}

export function PomodoroTimer({
  focusDuration = 25 * 60,
  shortBreakDuration = 5 * 60,
  longBreakDuration = 15 * 60,
  longBreakInterval = 4,
  autoStartBreaks = false,
  autoStartPomodoros = false,
  compact = false,
  onSessionComplete,
}: PomodoroTimerProps) {
  const timer = useTimer({
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    longBreakInterval,
    autoStartBreaks,
    autoStartPomodoros,
  });

  if (onSessionComplete) {
    timer.setOnComplete(onSessionComplete);
  }

  const minutes = Math.floor(timer.timeRemaining / 60);
  const seconds = timer.timeRemaining % 60;
  const timeDisplay = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const isFocus = timer.mode === "focus";
  const modeLabel =
    timer.mode === "focus"
      ? "Focus"
      : timer.mode === "shortBreak"
      ? "Short Break"
      : "Long Break";

  const ringColor = isFocus ? "stroke-primary" : "stroke-green-500";
  const bgColor = isFocus ? "text-primary" : "text-green-500";

  // SVG circular progress
  const size = compact ? 160 : 240;
  const strokeWidth = compact ? 6 : 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - timer.percentage / 100);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Mode label */}
      <div className={`text-sm font-medium ${bgColor}`}>{modeLabel}</div>

      {/* Circular timer */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-muted/30"
          />
          {/* Progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            className={`${ringColor} transition-all duration-1000 ease-linear`}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        {/* Time display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`font-bold tabular-nums ${
              compact ? "text-2xl" : "text-5xl"
            } ${timer.timeRemaining <= 10 && timer.isRunning ? "animate-timer-pulse" : ""}`}
          >
            {timeDisplay}
          </span>
          {!compact && (
            <span className="text-xs text-muted-foreground mt-1">
              Pomodoro {timer.completedPomodoros + 1}
              {timer.mode === "focus" ? ` of ${longBreakInterval}` : ""}
            </span>
          )}
        </div>
      </div>

      {/* Session counter (tomato dots) */}
      {!compact && (
        <div className="flex gap-2">
          {Array.from({ length: longBreakInterval }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${
                i < timer.completedPomodoros % longBreakInterval
                  ? "bg-primary"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-2">
        {!timer.isRunning ? (
          <Button
            onClick={timer.isPaused ? timer.resume : timer.start}
            size={compact ? "sm" : "default"}
          >
            <Play className="h-4 w-4 mr-1" />
            {timer.isPaused ? "Resume" : "Start"}
          </Button>
        ) : (
          <Button onClick={timer.pause} variant="secondary" size={compact ? "sm" : "default"}>
            <Pause className="h-4 w-4 mr-1" />
            Pause
          </Button>
        )}
        <Button onClick={timer.reset} variant="outline" size="icon">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button onClick={timer.skip} variant="ghost" size="icon">
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
