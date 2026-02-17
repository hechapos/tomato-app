import { DeckGridSkeleton } from "@/components/shared/loading-skeleton";

export default function DecksLoading() {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-8 w-32 bg-muted rounded animate-pulse" />
        <div className="h-4 w-56 bg-muted rounded animate-pulse mt-2" />
      </div>
      <DeckGridSkeleton />
    </div>
  );
}
