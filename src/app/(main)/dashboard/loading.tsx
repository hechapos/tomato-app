import { StatsCardsSkeleton, DeckGridSkeleton } from "@/components/shared/loading-skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="h-4 w-64 bg-muted rounded animate-pulse mt-2" />
      </div>
      <StatsCardsSkeleton />
      <DeckGridSkeleton />
    </div>
  );
}
