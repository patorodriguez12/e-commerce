"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useLoadingStore } from "@/lib/store/loadingStore";

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
  const startLoading = useLoadingStore((state) => state.start);

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
      params.delete("page");
      startLoading();
      router.push(`/?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, startLoading],
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
      params.delete("page");
      startLoading();
      router.push(`/?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, startLoading],
  );

  const clearAll = useCallback(() => {
    startLoading();
    router.push("/", { scroll: false });
  }, [router, startLoading]);

  const hasActiveFilters =
    !!filters.category ||
    filters.sort !== "newest" ||
    !!filters.min ||
    !!filters.max ||
    !!filters.q;

  return { filters, setFilter, setFilters, clearAll, hasActiveFilters };
}
