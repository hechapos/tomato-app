import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cardSchema } from "@/lib/validations/deck";

export async function GET(
  _request: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const card = await prisma.card.findUnique({
      where: { id: params.cardId },
      include: {
        deck: { select: { userId: true, isPrebuilt: true } },
        reviews: { where: { userId: session.user.id }, take: 1 },
      },
    });

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    if (!card.deck.isPrebuilt && card.deck.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(card);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const card = await prisma.card.findUnique({
      where: { id: params.cardId },
      include: { deck: { select: { userId: true, isPrebuilt: true } } },
    });

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }
    if (card.deck.isPrebuilt || card.deck.userId !== session.user.id) {
      return NextResponse.json({ error: "Cannot edit this card" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = cardSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const updated = await prisma.card.update({
      where: { id: params.cardId },
      data: parsed.data,
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const card = await prisma.card.findUnique({
      where: { id: params.cardId },
      include: { deck: { select: { userId: true, isPrebuilt: true } } },
    });

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }
    if (card.deck.isPrebuilt || card.deck.userId !== session.user.id) {
      return NextResponse.json({ error: "Cannot delete this card" }, { status: 403 });
    }

    await prisma.card.delete({ where: { id: params.cardId } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
