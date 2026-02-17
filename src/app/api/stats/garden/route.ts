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

    // Total completed pomodoros
    const totalTomatoes = await prisma.pomodoroSession.count({
      where: { userId, wasCompleted: true, type: "FOCUS" },
    });

    // Garden grid data (last 28 days)
    const twentyEightDaysAgo = new Date();
    twentyEightDaysAgo.setDate(twentyEightDaysAgo.getDate() - 28);

    const recentSessions = await prisma.pomodoroSession.findMany({
      where: {
        userId,
        wasCompleted: true,
        type: "FOCUS",
        startedAt: { gte: twentyEightDaysAgo },
      },
      select: { startedAt: true },
    });

    // Group by date
    const dailyCounts: Record<string, number> = {};
    recentSessions.forEach((s) => {
      const dateKey = s.startedAt.toISOString().split("T")[0];
      dailyCounts[dateKey] = (dailyCounts[dateKey] || 0) + 1;
    });

    // Build garden grid
    const gardenGrid = Array.from({ length: 28 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (27 - i));
      const dateKey = date.toISOString().split("T")[0];
      const count = dailyCounts[dateKey] || 0;
      return {
        date: dateKey,
        count,
        // Growth stages: 0=empty, 1=seed, 2=sprout, 3=growing, 4=ripe
        stage: count === 0 ? 0 : count === 1 ? 1 : count <= 2 ? 2 : count <= 4 ? 3 : 4,
      };
    });

    // Badge computation
    const totalReviews = await prisma.cardReview.count({
      where: { userId },
    });

    const uniqueDecksStudied = await prisma.cardReview.findMany({
      where: { userId },
      select: { card: { select: { deckId: true } } },
      distinct: ["cardId"],
    });
    const deckIds = new Set(uniqueDecksStudied.map((r) => r.card.deckId));

    // Check streaks
    const allReviews = await prisma.cardReview.findMany({
      where: { userId, lastReviewAt: { not: null } },
      select: { lastReviewAt: true },
      orderBy: { lastReviewAt: "desc" },
    });

    const reviewDates = new Set(
      allReviews
        .filter((r) => r.lastReviewAt)
        .map((r) => r.lastReviewAt!.toISOString().split("T")[0])
    );

    let currentStreak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      if (reviewDates.has(key)) {
        currentStreak++;
      } else if (i > 0) {
        break;
      }
    }

    // Daily sessions for badge checks
    const todaySessions = await prisma.pomodoroSession.count({
      where: {
        userId,
        wasCompleted: true,
        type: "FOCUS",
        startedAt: {
          gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        },
      },
    });

    // Compute earned badges
    const earnedBadges: string[] = [];
    if (totalTomatoes >= 1) earnedBadges.push("first-tomato");
    if (todaySessions >= 3 || totalTomatoes >= 3) earnedBadges.push("tomato-trio");
    if (currentStreak >= 7) earnedBadges.push("week-warrior");
    if (currentStreak >= 30) earnedBadges.push("month-master");
    if (totalReviews >= 100) earnedBadges.push("century");
    if (totalReviews >= 1000) earnedBadges.push("thousand-cards");
    if (deckIds.size >= 3) earnedBadges.push("polyglot");

    return NextResponse.json({
      totalTomatoes,
      gardenGrid,
      earnedBadges,
      stats: {
        totalReviews,
        currentStreak,
        decksStudied: deckIds.size,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
