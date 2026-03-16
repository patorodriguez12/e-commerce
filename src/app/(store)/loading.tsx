import { ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="h-9 w-32 bg-gray-200 rounded-lg animate-pulse mb-8" />
      <div className="flex gap-8 items-start">
        {/* Sidebar skeleton */}
        <aside className="w-56 flex-shrink-0 space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
              {Array.from({ length: 3 }).map((_, j) => (
                <div
                  key={j}
                  className="h-8 w-full bg-gray-200 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ))}
        </aside>

        {/* Grid skeleton */}
        <div className="flex-1">
          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-4" />
          <ProductGridSkeleton />
        </div>
      </div>
    </main>
  );
}
