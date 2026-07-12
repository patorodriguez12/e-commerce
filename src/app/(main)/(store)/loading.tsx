import { HeroSkeleton, FeaturedSkeleton, CategorySkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <HeroSkeleton />
      <FeaturedSkeleton />
      <CategorySkeleton />
    </>
  );
}
