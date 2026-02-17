import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(
  _request: Request,
  { params }: { params: { deckId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const originalDeck = await prisma.deck.findUnique({
      where: { id: params.deckId },
      include: { cards: true },
    });

    if (!originalDeck) {
      return NextResponse.json({ error: "Deck not found" }, { status: 404 });
    }

    // Check access (can duplicate own decks or prebuilt)
    if (!originalDeck.isPrebuilt && originalDeck.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const newDeck = await prisma.deck.create({
      data: {
        name: `Copy of ${originalDeck.name}`,
        description: originalDeck.description,
        folder: originalDeck.folder,
        isPrebuilt: false,
        userId: session.user.id,
        cards: {
          create: originalDeck.cards.map((card) => ({
            type: card.type,
            front: card.front,
            back: card.back,
            codeTemplate: card.codeTemplate,
            codeLanguage: card.codeLanguage,
            expectedOutput: card.expectedOutput,
            blankAnswers: card.blankAnswers,
            codeSnippet: card.codeSnippet,
            position: card.position,
          })),
        },
      },
      include: {
        _count: { select: { cards: true } },
      },
    });

    return NextResponse.json(newDeck, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
