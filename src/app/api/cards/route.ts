import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cardSchema } from "@/lib/validations/deck";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { deckId, ...cardData } = body;

    if (!deckId) {
      return NextResponse.json({ error: "deckId is required" }, { status: 400 });
    }

    // Check deck ownership
    const deck = await prisma.deck.findUnique({ where: { id: deckId } });
    if (!deck) {
      return NextResponse.json({ error: "Deck not found" }, { status: 404 });
    }
    if (deck.isPrebuilt || deck.userId !== session.user.id) {
      return NextResponse.json({ error: "Cannot add cards to this deck" }, { status: 403 });
    }

    const parsed = cardSchema.safeParse(cardData);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    // Get next position
    const maxPosition = await prisma.card.aggregate({
      where: { deckId },
      _max: { position: true },
    });

    const card = await prisma.card.create({
      data: {
        deckId,
        ...parsed.data,
        position: (maxPosition._max.position ?? -1) + 1,
      },
    });

    return NextResponse.json(card, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
