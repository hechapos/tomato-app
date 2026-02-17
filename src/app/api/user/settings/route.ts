import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const settingsSchema = z.object({
  displayName: z.string().min(2).max(30).optional(),
  avatarPreset: z.string().optional(),
  pomodoroMinutes: z.number().int().min(5).max(60).optional(),
  shortBreakMinutes: z.number().int().min(1).max(15).optional(),
  longBreakMinutes: z.number().int().min(5).max(30).optional(),
  longBreakInterval: z.number().int().min(2).max(6).optional(),
  autoStartBreaks: z.boolean().optional(),
  autoStartPomodoros: z.boolean().optional(),
  soundEnabled: z.boolean().optional(),
  newCardsPerDay: z.number().int().min(5).max(50).optional(),
  theme: z.enum(["light", "dark", "system"]).optional(),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        displayName: true,
        avatarPreset: true,
        pomodoroMinutes: true,
        shortBreakMinutes: true,
        longBreakMinutes: true,
        longBreakInterval: true,
        autoStartBreaks: true,
        autoStartPomodoros: true,
        soundEnabled: true,
        newCardsPerDay: true,
        theme: true,
      },
    });

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = settingsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: parsed.data,
    });

    return NextResponse.json({
      id: user.id,
      displayName: user.displayName,
      avatarPreset: user.avatarPreset,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
