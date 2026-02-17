import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Test basic DB connection
    const deckCount = await prisma.deck.count();
    const userCount = await prisma.user.count();
    const cardCount = await prisma.card.count();

    return NextResponse.json({
      status: "ok",
      database: "connected",
      counts: { decks: deckCount, users: userCount, cards: cardCount },
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        hasAuthSecret: !!(process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET),
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
        nodeEnv: process.env.NODE_ENV,
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack?.split("\n").slice(0, 5) : undefined,
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        hasAuthSecret: !!(process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET),
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
        nodeEnv: process.env.NODE_ENV,
      },
    });
  }
}
