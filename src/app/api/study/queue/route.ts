import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import type { StudyCard } from "@/types/study";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const deckId = searchParams.get("deckId");

    if (!deckId) {
      return NextResponse.json({ error: "deckId is required" }, { status: 400 });
    }

    // Verify deck access
    const deck = await prisma.deck.findUnique({
      where: { id: deckId },
      select: { id: true, userId: true, isPrebuilt: true },
    });

    if (!deck) {
      return NextResponse.json({ error: "Deck not found" }, { status: 404 });
    }
    if (!deck.isPrebuilt && deck.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const userId = session.user.id;
    const now = new Date();

    // Get all cards in the deck
    const cards = await prisma.card.findMany({
      where: { deckId },
      include: {
        reviews: { where: { userId }, take: 1 },
      },
      orderBy: { position: "asc" },
    });

    // Get user's daily new card limit
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { newCardsPerDay: true },
    });
    const dailyLimit = user?.newCardsPerDay ?? 20;

    // Count new cards studied today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const newCardsToday = await prisma.cardReview.count({
      where: {
        userId,
        card: { deckId },
        createdAt: { gte: todayStart },
        repetitions: { gt: 0 },
      },
    });

    const remainingNew = Math.max(0, dailyLimit - newCardsToday);

    // Categorize cards into queues
    const overdueCards: StudyCard[] = [];
    const learningCards: StudyCard[] = [];
    const newCards: StudyCard[] = [];

    for (const card of cards) {
      const review = card.reviews[0];
      const studyCard: StudyCard = {
        id: card.id,
        type: card.type,
        front: card.front,
        back: card.back,
        codeTemplate: card.codeTemplate,
        codeLanguage: card.codeLanguage,
        expectedOutput: card.expectedOutput,
        codeSnippet: card.codeSnippet,
        blankAnswers: card.blankAnswers,
        position: card.position,
        reviewState: review
          ? {
              state: review.state,
              easeFactor: review.easeFactor,
              interval: review.interval,
              repetitions: review.repetitions,
              nextReviewAt: review.nextReviewAt.toISOString(),
            }
          : {
              state: "NEW",
              easeFactor: 2.5,
              interval: 0,
              repetitions: 0,
              nextReviewAt: now.toISOString(),
            },
      };

      if (!review) {
        newCards.push(studyCard);
      } else if (
        (review.state === "LEARNING" || review.state === "RELEARNING") &&
        review.nextReviewAt <= now
      ) {
        learningCards.push(studyCard);
      } else if (review.state === "REVIEW" && review.nextReviewAt <= now) {
        overdueCards.push(studyCard);
      }
    }

    // Sort overdue by most overdue first
    overdueCards.sort((a, b) => {
      return (
        new Date(a.reviewState.nextReviewAt).getTime() -
        new Date(b.reviewState.nextReviewAt).getTime()
      );
    });

    // Build final queue: overdue -> learning -> new (limited)
    const queue: StudyCard[] = [
      ...overdueCards,
      ...learningCards,
      ...newCards.slice(0, remainingNew),
    ];

    return NextResponse.json({
      cards: queue,
      stats: {
        due: overdueCards.length,
        learning: learningCards.length,
        newCount: Math.min(newCards.length, remainingNew),
        total: queue.length,
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
