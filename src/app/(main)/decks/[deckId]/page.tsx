import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Play, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { DuplicateDeckButton } from "@/components/deck/duplicate-deck-button";
import { DeleteDeckButton } from "@/components/deck/delete-deck-button";
import { AddCardDialog } from "@/components/deck/add-card-dialog";

export default async function DeckDetailPage({
  params,
}: {
  params: { deckId: string };
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const deck = await prisma.deck.findUnique({
    where: { id: params.deckId },
    include: {
      cards: { orderBy: { position: "asc" } },
      _count: { select: { cards: true } },
    },
  });

  if (!deck) notFound();
  if (!deck.isPrebuilt && deck.userId !== session.user.id) notFound();

  const isOwner = deck.userId === session.user.id;

  const typeLabels: Record<string, string> = {
    STANDARD: "Standard",
    CODE: "Code",
    FILL_IN_BLANK: "Fill-in-Blank",
  };

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link href="/decks">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Decks
        </Link>
      </Button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{deck.name}</h1>
            {deck.isPrebuilt && <Lock className="h-5 w-5 text-muted-foreground" />}
          </div>
          {deck.description && (
            <p className="text-muted-foreground mt-1">{deck.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary">{deck._count.cards} cards</Badge>
            {deck.isPrebuilt && <Badge variant="outline">Pre-built (read-only)</Badge>}
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/study/${deck.id}`}>
              <Play className="h-4 w-4 mr-2" />
              Study
            </Link>
          </Button>
          {deck.isPrebuilt && <DuplicateDeckButton deckId={deck.id} />}
          {isOwner && <DeleteDeckButton deckId={deck.id} deckName={deck.name} />}
        </div>
      </div>

      {/* Add card button */}
      {isOwner && (
        <AddCardDialog deckId={deck.id} />
      )}

      {/* Card list */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">
          Cards ({deck.cards.length})
        </h2>
        {deck.cards.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No cards yet. Add your first card to start learning!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {deck.cards.map((card, index) => (
              <Card key={card.id} className="hover:bg-muted/50 transition-colors">
                <CardContent className="py-3 px-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground">
                          #{index + 1}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {typeLabels[card.type] || card.type}
                        </Badge>
                        {card.codeLanguage && (
                          <Badge variant="secondary" className="text-xs">
                            {card.codeLanguage}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm line-clamp-2">{card.front}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
