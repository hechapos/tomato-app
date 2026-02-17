import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const startSessionSchema = z.object({
  type: z.enum(["FOCUS", "SHORT_BREAK", "LONG_BREAK"]),
  durationMinutes: z.number().int().min(1).max(120),
  deckId: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = startSessionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const pomodoroSession = await prisma.pomodoroSession.create({
      data: {
        userId: session.user.id,
        type: parsed.data.type,
        durationMinutes: parsed.data.durationMinutes,
        deckId: parsed.data.deckId,
      },
    });

    return NextResponse.json(pomodoroSession, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    const sessions = await prisma.pomodoroSession.findMany({
      where: { userId: session.user.id },
      orderBy: { startedAt: "desc" },
      take: limit,
      skip: offset,
      include: {
        deck: { select: { name: true } },
      },
    });

    return NextResponse.json(sessions);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
