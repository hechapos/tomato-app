"use client";

import { useState, useRef, useCallback, useEffect } from "react";

type TimerMode = "focus" | "shortBreak" | "longBreak";

interface TimerConfig {
  focusDuration: number; // seconds
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
}

interface TimerState {
  timeRemaining: number;
  totalTime: number;
  isRunning: boolean;
  isPaused: boolean;
  mode: TimerMode;
  completedPomodoros: number;
  percentage: number;
}

const defaultConfig: TimerConfig = {
  focusDuration: 25 * 60,
  shortBreakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
};

export function useTimer(config: Partial<TimerConfig> = {}) {
  const cfg = { ...defaultConfig, ...config };

  const getDuration = useCallback(
    (mode: TimerMode) => {
      switch (mode) {
        case "focus":
          return cfg.focusDuration;
        case "shortBreak":
          return cfg.shortBreakDuration;
        case "longBreak":
          return cfg.longBreakDuration;
      }
    },
    [cfg.focusDuration, cfg.shortBreakDuration, cfg.longBreakDuration]
  );

  const [state, setState] = useState<TimerState>({
    timeRemaining: cfg.focusDuration,
    totalTime: cfg.focusDuration,
    isRunning: false,
    isPaused: false,
    mode: "focus",
    completedPomodoros: 0,
    percentage: 100,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef<((mode: TimerMode) => void) | null>(null);

  function setOnComplete(cb: (mode: TimerMode) => void) {
    onCompleteRef.current = cb;
  }

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    setState((prev) => {
      if (prev.timeRemaining <= 1) {
        clearTimer();
        onCompleteRef.current?.(prev.mode);

        // Determine next mode
        let nextMode: TimerMode;
        let newPomodoros = prev.completedPomodoros;

        if (prev.mode === "focus") {
          newPomodoros++;
          nextMode =
            newPomodoros % cfg.longBreakInterval === 0
              ? "longBreak"
              : "shortBreak";
        } else {
          nextMode = "focus";
        }

        const nextDuration = getDuration(nextMode);
        const shouldAutoStart =
          (nextMode !== "focus" && cfg.autoStartBreaks) ||
          (nextMode === "focus" && cfg.autoStartPomodoros);

        return {
          timeRemaining: nextDuration,
          totalTime: nextDuration,
          isRunning: shouldAutoStart,
          isPaused: false,
          mode: nextMode,
          completedPomodoros: newPomodoros,
          percentage: 100,
        };
      }

      const newRemaining = prev.timeRemaining - 1;
      return {
        ...prev,
        timeRemaining: newRemaining,
        percentage: (newRemaining / prev.totalTime) * 100,
      };
    });
  }, [clearTimer, cfg.longBreakInterval, cfg.autoStartBreaks, cfg.autoStartPomodoros, getDuration]);

  // Start/stop interval based on isRunning
  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [state.isRunning, tick, clearTimer]);

  const start = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: true, isPaused: false }));
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false, isPaused: true }));
  }, []);

  const resume = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: true, isPaused: false }));
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    setState((prev) => ({
      ...prev,
      timeRemaining: getDuration(prev.mode),
      totalTime: getDuration(prev.mode),
      isRunning: false,
      isPaused: false,
      percentage: 100,
    }));
  }, [clearTimer, getDuration]);

  const skip = useCallback(() => {
    clearTimer();
    setState((prev) => {
      let nextMode: TimerMode;
      let newPomodoros = prev.completedPomodoros;

      if (prev.mode === "focus") {
        newPomodoros++;
        nextMode =
          newPomodoros % cfg.longBreakInterval === 0
            ? "longBreak"
            : "shortBreak";
      } else {
        nextMode = "focus";
      }

      const nextDuration = getDuration(nextMode);
      return {
        timeRemaining: nextDuration,
        totalTime: nextDuration,
        isRunning: false,
        isPaused: false,
        mode: nextMode,
        completedPomodoros: newPomodoros,
        percentage: 100,
      };
    });
  }, [clearTimer, cfg.longBreakInterval, getDuration]);

  return {
    ...state,
    start,
    pause,
    resume,
    reset,
    skip,
    setOnComplete,
  };
}
