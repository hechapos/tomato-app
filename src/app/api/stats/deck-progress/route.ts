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

    const decks = await prisma.deck.findMany({
      where: {
        OR: [{ userId }, { isPrebuilt: true }],
      },
      include: {
        _count: { select: { cards: true } },
        cards: {
          select: {
            id: true,
            reviews: {
              where: { userId },
              select: { state: true, interval: true },
              take: 1,
            },
          },
        },
      },
    });

    const progress = decks.map((deck) => {
      let newCards = 0;
      let learningCards = 0;
      let reviewCards = 0;
      let masteredCards = 0;

      for (const card of deck.cards) {
        const review = card.reviews[0];
        if (!review) {
          newCards++;
        } else if (review.state === "LEARNING" || review.state === "RELEARNING") {
          learningCards++;
        } else if (review.interval > 21) {
          masteredCards++;
        } else {
          reviewCards++;
        }
      }

      const totalCards = deck._count.cards;
      const percentComplete =
        totalCards > 0 ? Math.round((masteredCards / totalCards) * 100) : 0;

      return {
        deckId: deck.id,
        deckName: deck.name,
        isPrebuilt: deck.isPrebuilt,
        totalCards,
        newCards,
        learningCards,
        reviewCards,
        masteredCards,
        percentComplete,
      };
    });

    return NextResponse.json(progress);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
