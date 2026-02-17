import { StudyCardSkeleton } from "@/components/shared/loading-skeleton";

export default function StudyLoading() {
  return (
    <div className="space-y-6 py-8">
      <div className="h-2 w-full bg-muted rounded animate-pulse" />
      <StudyCardSkeleton />
    </div>
  );
}
