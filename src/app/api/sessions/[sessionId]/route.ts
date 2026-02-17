import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const updateSessionSchema = z.object({
  wasCompleted: z.boolean().optional(),
  cardsStudied: z.number().int().min(0).optional(),
  cardsCorrect: z.number().int().min(0).optional(),
});

export async function PUT(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pomodoroSession = await prisma.pomodoroSession.findUnique({
      where: { id: params.sessionId },
    });

    if (!pomodoroSession || pomodoroSession.userId !== session.user.id) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const body = await request.json();
    const parsed = updateSessionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const updated = await prisma.pomodoroSession.update({
      where: { id: params.sessionId },
      data: {
        ...parsed.data,
        completedAt: parsed.data.wasCompleted ? new Date() : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
