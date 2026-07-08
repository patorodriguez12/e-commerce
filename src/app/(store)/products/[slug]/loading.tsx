import { ProductDetailSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 py-12">
      <ProductDetailSkeleton />

      {/* Reviews skeleton */}
      <div className="mt-12 pt-12 border-t border-border flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <div className="h-5 w-[80px] rounded-md bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
          <div className="h-4 w-[120px] rounded-md bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
        </div>
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="py-5 border-b border-border flex flex-col gap-2"
          >
            <div className="flex gap-2.5 items-center">
              <div className="size-7 rounded-full bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
              <div className="h-[13px] w-[100px] rounded-md bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
            </div>
            <div className="h-[14px] w-[80%] rounded-md ml-[38px] bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
          </div>
        ))}
      </div>
    </main>
  );
}
