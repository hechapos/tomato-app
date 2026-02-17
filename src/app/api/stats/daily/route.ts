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
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [reviews, sessions] = await Promise.all([
      prisma.cardReview.findMany({
        where: {
          userId,
          lastReviewAt: { gte: todayStart },
        },
        select: { lastRating: true, responseTime: true },
      }),
      prisma.pomodoroSession.findMany({
        where: {
          userId,
          startedAt: { gte: todayStart },
          wasCompleted: true,
          type: "FOCUS",
        },
        select: { durationMinutes: true },
      }),
    ]);

    const cardsReviewed = reviews.length;
    const breakdown = { again: 0, hard: 0, good: 0, easy: 0 };
    for (const r of reviews) {
      if (r.lastRating === 1) breakdown.again++;
      else if (r.lastRating === 2) breakdown.hard++;
      else if (r.lastRating === 3) breakdown.good++;
      else if (r.lastRating === 4) breakdown.easy++;
    }

    const cardsCorrect = breakdown.good + breakdown.easy;
    const accuracy = cardsReviewed > 0 ? Math.round((cardsCorrect / cardsReviewed) * 100) : 0;
    const totalStudyMinutes = sessions.reduce((sum, s) => sum + s.durationMinutes, 0);
    const pomodorosCompleted = sessions.length;

    return NextResponse.json({
      date: todayStart.toISOString().split("T")[0],
      cardsReviewed,
      cardsCorrect,
      accuracy,
      pomodorosCompleted,
      totalStudyMinutes,
      reviewBreakdown: breakdown,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
