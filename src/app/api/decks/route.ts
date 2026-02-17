import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { deckSchema } from "@/lib/validations/deck";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decks = await prisma.deck.findMany({
      where: {
        OR: [{ userId: session.user.id }, { isPrebuilt: true }],
      },
      include: {
        _count: { select: { cards: true } },
      },
      orderBy: [{ isPrebuilt: "desc" }, { updatedAt: "desc" }],
    });

    // Get due counts for each deck
    const decksWithDue = await Promise.all(
      decks.map(async (deck) => {
        const dueCount = await prisma.cardReview.count({
          where: {
            userId: session.user.id,
            card: { deckId: deck.id },
            nextReviewAt: { lte: new Date() },
          },
        });

        const newCount = deck._count.cards - await prisma.cardReview.count({
          where: {
            userId: session.user.id,
            card: { deckId: deck.id },
          },
        });

        return {
          ...deck,
          cardCount: deck._count.cards,
          dueCount,
          newCount: Math.max(0, newCount),
        };
      })
    );

    return NextResponse.json(decksWithDue);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = deckSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const deck = await prisma.deck.create({
      data: {
        ...parsed.data,
        userId: session.user.id,
      },
    });

    return NextResponse.json(deck, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
