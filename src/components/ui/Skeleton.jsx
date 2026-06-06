export default function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-md ${className}`}></div>
  );
}

export function CollegeCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-[var(--color-border)] p-5 shadow-sm">
      <div className="flex gap-4">
        <Skeleton className="w-16 h-16 rounded-lg shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
      </div>
      <div className="mt-5 pt-4 border-t border-[var(--color-border)] flex justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  );
}
