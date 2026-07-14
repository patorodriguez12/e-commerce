"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { Category, Product } from "@/types";
import FilterSidebar from "./FilterSidebar";
import FilterDrawer from "./FilterDrawer";
import ProductGrid from "./ProductGrid";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { useFilters } from "@/lib/hooks/useFilters";

type Props = {
  categories: Category[];
  products: Product[];
  total: number;
};

export default function CatalogLayout({ categories, products, total }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {
    filters,
    setFilter: originalSetFilter,
    setFilters: originalSetFilters,
    clearAll: originalClearAll,
    hasActiveFilters,
  } = useFilters();

  const setFilter = useCallback(
    (key: string, value: string | null) => {
      startTransition(() => {
        originalSetFilter(key, value);
      });
    },
    [originalSetFilter],
  );

  const setFilters = useCallback(
    (updates: Record<string, string | null>) => {
      startTransition(() => {
        originalSetFilters(updates);
      });
    },
    [originalSetFilters],
  );

  const clearAll = useCallback(() => {
    startTransition(() => {
      originalClearAll();
    });
  }, [originalClearAll]);

  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth < 768);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const activeCount = [
    filters.category,
    filters.sort !== "newest" ? filters.sort : null,
    filters.min,
    filters.max,
    filters.q,
  ].filter(Boolean).length;

  if (isMobile) {
    return (
      <div>
        <div className="flex items-center justify-between mb-5 gap-3">
          <p className="text-sm text-text-muted">
            {total} {total === 1 ? "product" : "products"}
          </p>
          <button
            onClick={() => setDrawerOpen(true)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer ${
              hasActiveFilters
                ? "bg-accent-bg border border-accent-border text-accent-text"
                : "bg-surface border border-border text-text-secondary"
            }`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="20" y2="12" />
              <line x1="12" y1="18" x2="20" y2="18" />
            </svg>
            Filters
            {activeCount > 0 && (
              <span className="bg-accent text-white text-[10px] rounded-[10px] px-1.5 py-px font-medium">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {isPending ? (
          <ProductGridSkeleton />
        ) : (
          <ProductGrid products={products} total={total} hideTotalLabel />
        )}

        <FilterDrawer
          categories={categories}
          filters={filters}
          hasActiveFilters={hasActiveFilters}
          setFilter={setFilter}
          setFilters={setFilters}
          clearAll={clearAll}
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex gap-8 items-start">
      <FilterSidebar
        categories={categories}
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        setFilter={setFilter}
        setFilters={setFilters}
        clearAll={clearAll}
      />
      {isPending ? (
        <ProductGridSkeleton />
      ) : (
        <ProductGrid products={products} total={total} />
      )}
    </div>
  );
}
