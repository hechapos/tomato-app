import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, Timer, Flame, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const userId = session.user.id;

  // Get deck info with due counts
  const decks = await prisma.deck.findMany({
    where: {
      OR: [{ userId }, { isPrebuilt: true }],
    },
    include: {
      _count: { select: { cards: true } },
    },
    orderBy: { updatedAt: "desc" },
    take: 6,
  });

  // Get today's stats
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [todayReviews, todaySessions, dueCards] = await Promise.all([
    prisma.cardReview.count({
      where: {
        userId,
        lastReviewAt: { gte: todayStart },
      },
    }),
    prisma.pomodoroSession.count({
      where: {
        userId,
        wasCompleted: true,
        startedAt: { gte: todayStart },
      },
    }),
    prisma.cardReview.count({
      where: {
        userId,
        nextReviewAt: { lte: new Date() },
        state: { not: "NEW" },
      },
    }),
  ]);

  // Calculate streak
  const streak = await calculateStreak(userId);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {session.user.name || "learner"}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Ready to grow some tomatoes today?
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{todayReviews}</p>
                <p className="text-xs text-muted-foreground">Cards Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Timer className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{todaySessions}</p>
                <p className="text-xs text-muted-foreground">Pomodoros</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Flame className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{streak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div>
              <p className="text-2xl font-bold">{dueCards}</p>
              <p className="text-xs opacity-90">Cards Due</p>
              {dueCards > 0 && (
                <Button
                  asChild
                  size="sm"
                  variant="secondary"
                  className="mt-2"
                >
                  <Link href="/decks">Study Now</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Decks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Decks</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/decks">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {decks.map((deck) => (
            <Link key={deck.id} href={`/decks/${deck.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{deck.name}</CardTitle>
                    {deck.isPrebuilt && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        Pre-built
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-xs line-clamp-2">
                    {deck.description || "No description"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {deck._count.cards} cards
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

async function calculateStreak(userId: string): Promise<number> {
  const reviews = await prisma.cardReview.findMany({
    where: { userId, lastReviewAt: { not: null } },
    select: { lastReviewAt: true },
    orderBy: { lastReviewAt: "desc" },
  });

  if (reviews.length === 0) return 0;

  const uniqueDays = new Set(
    reviews
      .filter((r) => r.lastReviewAt)
      .map((r) => r.lastReviewAt!.toISOString().split("T")[0])
  );

  const sortedDays = Array.from(uniqueDays).sort().reverse();
  if (sortedDays.length === 0) return 0;

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  // Streak must start from today or yesterday
  if (sortedDays[0] !== today && sortedDays[0] !== yesterday) return 0;

  let streak = 0;
  let checkDate = new Date(sortedDays[0]);

  for (const day of sortedDays) {
    const expected = checkDate.toISOString().split("T")[0];
    if (day === expected) {
      streak++;
      checkDate = new Date(checkDate.getTime() - 86400000);
    } else {
      break;
    }
  }

  return streak;
}
