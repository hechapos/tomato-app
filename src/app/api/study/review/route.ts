import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { calculateSM2 } from "@/lib/sm2";
import { z } from "zod";

const reviewSchema = z.object({
  cardId: z.string().min(1),
  rating: z.number().int().min(1).max(4),
  responseTime: z.number().int().min(0).optional(),
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { cardId, rating, responseTime } = parsed.data;
    const userId = session.user.id;

    // Get or create card review
    let review = await prisma.cardReview.findUnique({
      where: { cardId_userId: { cardId, userId } },
    });

    const currentState = review
      ? {
          rating: rating as 1 | 2 | 3 | 4,
          repetitions: review.repetitions,
          easeFactor: review.easeFactor,
          interval: review.interval,
          state: review.state as "NEW" | "LEARNING" | "REVIEW" | "RELEARNING",
        }
      : {
          rating: rating as 1 | 2 | 3 | 4,
          repetitions: 0,
          easeFactor: 2.5,
          interval: 0,
          state: "NEW" as const,
        };

    const sm2Result = calculateSM2(currentState);

    if (review) {
      review = await prisma.cardReview.update({
        where: { id: review.id },
        data: {
          state: sm2Result.state,
          easeFactor: sm2Result.easeFactor,
          interval: sm2Result.interval,
          repetitions: sm2Result.repetitions,
          nextReviewAt: sm2Result.nextReviewAt,
          lastReviewAt: new Date(),
          lastRating: rating,
          responseTime,
        },
      });
    } else {
      review = await prisma.cardReview.create({
        data: {
          cardId,
          userId,
          state: sm2Result.state,
          easeFactor: sm2Result.easeFactor,
          interval: sm2Result.interval,
          repetitions: sm2Result.repetitions,
          nextReviewAt: sm2Result.nextReviewAt,
          lastReviewAt: new Date(),
          lastRating: rating,
          responseTime,
        },
      });
    }

    return NextResponse.json({
      review: {
        state: review.state,
        easeFactor: review.easeFactor,
        interval: review.interval,
        repetitions: review.repetitions,
        nextReviewAt: review.nextReviewAt,
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
