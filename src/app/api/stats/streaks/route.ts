import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const reviews = await prisma.cardReview.findMany({
      where: { userId, lastReviewAt: { not: null } },
      select: { lastReviewAt: true },
      orderBy: { lastReviewAt: "desc" },
    });

    const uniqueDays = Array.from(
      new Set(
        reviews
          .filter((r) => r.lastReviewAt)
          .map((r) => r.lastReviewAt!.toISOString().split("T")[0])
      )
    ).sort().reverse();

    if (uniqueDays.length === 0) {
      return NextResponse.json({ currentStreak: 0, longestStreak: 0, lastActiveDate: null });
    }

    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    // Current streak
    let currentStreak = 0;
    if (uniqueDays[0] === today || uniqueDays[0] === yesterday) {
      let checkDate = new Date(uniqueDays[0]);
      for (const day of uniqueDays) {
        if (day === checkDate.toISOString().split("T")[0]) {
          currentStreak++;
          checkDate = new Date(checkDate.getTime() - 86400000);
        } else {
          break;
        }
      }
    }

    // Longest streak
    let longestStreak = 0;
    let tempStreak = 1;
    for (let i = 1; i < uniqueDays.length; i++) {
      const current = new Date(uniqueDays[i - 1]);
      const prev = new Date(uniqueDays[i]);
      const diffDays = (current.getTime() - prev.getTime()) / 86400000;

      if (diffDays === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    return NextResponse.json({
      currentStreak,
      longestStreak,
      lastActiveDate: uniqueDays[0],
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
