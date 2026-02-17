import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Test basic DB connection
    const deckCount = await prisma.deck.count();
    const prebuiltCount = await prisma.deck.count({ where: { isPrebuilt: true } });
    const userCount = await prisma.user.count();
    const cardCount = await prisma.card.count();

    // Test NextAuth import
    let authTest = "not tested";
    try {
      const { auth } = await import("@/lib/auth");
      const session = await auth();
      authTest = session ? `authenticated as ${session.user?.email}` : "no session (ok)";
    } catch (authError) {
      authTest = `error: ${authError instanceof Error ? authError.message : String(authError)}`;
    }

    return NextResponse.json({
      status: "ok",
      database: "connected",
      counts: { decks: deckCount, prebuilt: prebuiltCount, users: userCount, cards: cardCount },
      authTest,
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        hasAuthSecret: !!(process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET),
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
        hasAuthUrl: !!process.env.AUTH_URL,
        nextAuthUrl: process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL.replace(/\/\/.*@/, "//***@") : "not set",
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
