import { ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="border-b border-border px-6 pt-20 pb-[72px] max-w-[1200px] mx-auto flex flex-col gap-5">
        <div className="h-6 w-[140px] rounded-full bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
        <div className="flex flex-col gap-2.5">
          <div className="h-12 w-[55%] rounded-md bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
          <div className="h-12 w-[40%] rounded-md bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
        </div>
        <div className="h-[14px] w-[320px] rounded-md bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
        <div className="flex gap-2.5">
          <div className="h-10 w-[100px] rounded-lg bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
          <div className="h-10 w-[100px] rounded-lg bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
        </div>
      </div>

      {/* Featured skeleton */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="h-5 w-[200px] rounded-md bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Category skeleton */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="h-5 w-[180px] rounded-md bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] mb-8" />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface border border-border rounded-xl p-6 flex flex-col items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
              <div className="h-3 w-16 rounded-md bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
