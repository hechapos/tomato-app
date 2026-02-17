"use client";

import { AVATARS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const AVATAR_EMOJIS: Record<string, string> = {
  "tomato-1": "🍅",
  "tomato-2": "😊",
  "tomato-3": "😎",
  "tomato-4": "👨‍🍳",
  "tomato-5": "📖",
  "tomato-6": "💻",
  "tomato-7": "😴",
  "tomato-8": "⭐",
  "tomato-9": "🚀",
  "tomato-10": "🎵",
  "tomato-11": "🥷",
  "tomato-12": "👑",
};

interface AvatarPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function AvatarPicker({ value, onChange }: AvatarPickerProps) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
      {AVATARS.map((avatar) => (
        <button
          key={avatar.id}
          type="button"
          onClick={() => onChange(avatar.id)}
          className={cn(
            "flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all",
            value === avatar.id
              ? "border-primary bg-primary/10"
              : "border-transparent bg-muted/50 hover:bg-muted"
          )}
        >
          <span className="text-2xl">
            {AVATAR_EMOJIS[avatar.id] || "🍅"}
          </span>
          <span className="text-xs text-muted-foreground truncate w-full text-center">
            {avatar.label}
          </span>
        </button>
      ))}
    </div>
  );
}
