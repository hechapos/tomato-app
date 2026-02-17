import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, BookOpen, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DuplicateDeckButton } from "@/components/deck/duplicate-deck-button";

export default async function DecksPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const decks = await prisma.deck.findMany({
    where: {
      OR: [{ userId: session.user.id }, { isPrebuilt: true }],
    },
    include: {
      _count: { select: { cards: true } },
    },
    orderBy: [{ isPrebuilt: "desc" }, { updatedAt: "desc" }],
  });

  const prebuiltDecks = decks.filter((d) => d.isPrebuilt);
  const userDecks = decks.filter((d) => !d.isPrebuilt);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Decks</h1>
          <p className="text-muted-foreground mt-1">
            Browse and manage your flashcard decks
          </p>
        </div>
        <Button asChild>
          <Link href="/decks/new">
            <Plus className="h-4 w-4 mr-2" />
            New Deck
          </Link>
        </Button>
      </div>

      {/* Pre-built Decks */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Pre-built Decks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {prebuiltDecks.map((deck) => (
            <Card
              key={deck.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{deck.name}</CardTitle>
                  <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </div>
                <CardDescription className="text-xs line-clamp-2">
                  {deck.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{deck._count.cards} cards</Badge>
                </div>
                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1">
                    <Link href={`/study/${deck.id}`}>Study</Link>
                  </Button>
                  <DuplicateDeckButton deckId={deck.id} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* User Decks */}
      <section>
        <h2 className="text-xl font-semibold mb-4">My Decks</h2>
        {userDecks.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-1">No custom decks yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your own deck or duplicate a pre-built one to get started.
              </p>
              <Button asChild>
                <Link href="/decks/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Deck
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userDecks.map((deck) => (
              <Link key={deck.id} href={`/decks/${deck.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{deck.name}</CardTitle>
                    <CardDescription className="text-xs line-clamp-2">
                      {deck.description || "No description"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{deck._count.cards} cards</Badge>
                      {deck.folder && (
                        <Badge variant="outline" className="text-xs">
                          {deck.folder}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
