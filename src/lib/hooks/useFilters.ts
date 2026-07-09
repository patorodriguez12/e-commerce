"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export type SortOption = "newest" | "price_asc" | "price_desc" | "name_asc";

export type Filters = {
  category: string | null;
  sort: SortOption;
  min: number | null;
  max: number | null;
  q: string;
};

export function useFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters: Filters = {
    category: searchParams.get("category"),
    sort: (searchParams.get("sort") as SortOption) ?? "newest",
    min: searchParams.get("min") ? Number(searchParams.get("min")) : null,
    max: searchParams.get("max") ? Number(searchParams.get("max")) : null,
    q: searchParams.get("q") ?? "",
  };

  const setFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.push(`/catalog?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const setFilters = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.push(`/catalog?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const clearAll = useCallback(() => {
    router.push("/catalog", { scroll: false });
  }, [router]);

  const hasActiveFilters =
    !!filters.category ||
    filters.sort !== "newest" ||
    !!filters.min ||
    !!filters.max ||
    !!filters.q;

  return { filters, setFilter, setFilters, clearAll, hasActiveFilters };
}
