import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Test basic DB connection
    const deckCount = await prisma.deck.count();
    const prebuiltCount = await prisma.deck.count({ where: { isPrebuilt: true } });
    const userCount = await prisma.user.count();
    const cardCount = await prisma.card.count();

    // Get deck names if any exist
    const deckNames = await prisma.deck.findMany({ select: { name: true, isPrebuilt: true, _count: { select: { cards: true } } }, take: 10 });

    // Raw query to check tables
    const tables = await prisma.$queryRawUnsafe("SELECT tablename FROM pg_tables WHERE schemaname = 'public'");

    return NextResponse.json({
      status: "ok",
      database: "connected",
      counts: { decks: deckCount, prebuilt: prebuiltCount, users: userCount, cards: cardCount },
      deckNames,
      tables,
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
