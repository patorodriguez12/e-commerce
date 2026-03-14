import { ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-4 w-20 bg-gray-200 rounded-lg animate-pulse" />
      </div>
      <div className="flex gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"
          />
        ))}
      </div>
      <ProductGridSkeleton />
    </main>
  );
}
