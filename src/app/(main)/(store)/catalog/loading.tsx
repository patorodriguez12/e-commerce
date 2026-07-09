import {
  FilterSidebarSkeleton,
  ProductGridSkeleton,
} from "@/components/ui/Skeleton";

export default function CatalogLoading() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="flex gap-12 items-start">
        <FilterSidebarSkeleton />
        <ProductGridSkeleton />
      </div>
    </div>
  );
}
