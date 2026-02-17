"use client";

import { Button } from "@/components/ui/button";

interface RatingButtonsProps {
  onRate: (rating: 1 | 2 | 3 | 4) => void;
  intervals: Record<1 | 2 | 3 | 4, string>;
}

const ratingConfig = [
  { rating: 1 as const, label: "Again", color: "bg-red-500 hover:bg-red-600", key: "1" },
  { rating: 2 as const, label: "Hard", color: "bg-orange-500 hover:bg-orange-600", key: "2" },
  { rating: 3 as const, label: "Good", color: "bg-green-500 hover:bg-green-600", key: "3" },
  { rating: 4 as const, label: "Easy", color: "bg-blue-500 hover:bg-blue-600", key: "4" },
];

export function RatingButtons({ onRate, intervals }: RatingButtonsProps) {
  return (
    <div className="flex gap-3 justify-center">
      {ratingConfig.map(({ rating, label, color, key }) => (
        <Button
          key={rating}
          onClick={() => onRate(rating)}
          className={`${color} text-white flex flex-col items-center h-auto py-3 px-6 min-w-[80px]`}
        >
          <span className="font-semibold">{label}</span>
          <span className="text-xs opacity-80">{intervals[rating]}</span>
          <span className="text-[10px] opacity-60 mt-0.5">[{key}]</span>
        </Button>
      ))}
    </div>
  );
}
