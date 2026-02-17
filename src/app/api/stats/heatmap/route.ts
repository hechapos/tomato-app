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
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const reviews = await prisma.cardReview.findMany({
      where: {
        userId,
        lastReviewAt: { gte: oneYearAgo, not: null },
      },
      select: { lastReviewAt: true },
    });

    // Aggregate by date
    const dateCounts: Record<string, number> = {};
    for (const r of reviews) {
      if (r.lastReviewAt) {
        const date = r.lastReviewAt.toISOString().split("T")[0];
        dateCounts[date] = (dateCounts[date] || 0) + 1;
      }
    }

    const heatmapData = Object.entries(dateCounts).map(([date, count]) => ({
      date,
      count,
    }));

    return NextResponse.json(heatmapData);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
