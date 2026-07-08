import {
  FilterSidebarSkeleton,
  ProductGridSkeleton,
} from "@/components/ui/Skeleton";

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

      {/* Catalog skeleton */}
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="flex gap-12 items-start">
          <FilterSidebarSkeleton />
          <ProductGridSkeleton />
        </div>
      </div>
    </>
  );
}
