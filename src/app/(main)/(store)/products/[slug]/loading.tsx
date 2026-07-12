import {
  ProductDetailSkeleton,
  ReviewsSkeleton,
} from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="max-w-300 mx-auto px-6 py-12">
      <ProductDetailSkeleton />
      <ReviewsSkeleton />
    </main>
  );
}
