"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Category } from "@/types";
import { Filters, SortOption } from "@/lib/hooks/useFilters";

type Props = {
  categories: Category[];
  filters: Filters;
  hasActiveFilters: boolean;
  setFilter: (key: string, value: string | null) => void;
  setFilters: (updates: Record<string, string | null>) => void;
  clearAll: () => void;
};

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A to Z" },
];

function filterBtnClasses(active: boolean): string {
  return `w-full text-left px-[10px] py-[7px] rounded-md text-sm cursor-pointer transition-all duration-150 ${
    active
      ? "bg-accent-bg text-accent-text border border-accent-border font-medium"
      : "bg-transparent text-text-secondary border border-transparent font-normal"
  }`;
}

export default function FilterSidebar({
  categories,
  filters,
  hasActiveFilters,
  setFilter,
  setFilters,
  clearAll,
}: Props) {
  const [minInput, setMinInput] = useState(filters.min?.toString() ?? "");
  const [maxInput, setMaxInput] = useState(filters.max?.toString() ?? "");
  const [searchInput, setSearchInput] = useState(filters.q);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setFilter("q", value || null);
  }, 400);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
    debouncedSearch(e.target.value);
  }

  function handleClearAll() {
    setSearchInput("");
    setMinInput("");
    setMaxInput("");
    clearAll();
  }

  function handlePriceApply() {
    setFilters({
      min: minInput || null,
      max: maxInput || null,
    });
  }

  function handlePriceClear() {
    setMinInput("");
    setMaxInput("");
    setFilters({ min: null, max: null });
  }

  return (
    <aside className="w-[200px] shrink-0 flex flex-col gap-7">
      {hasActiveFilters && (
        <button
          onClick={handleClearAll}
          className="bg-transparent border border-coral-border text-coral-text rounded-md px-3 py-1.5 text-xs cursor-pointer"
        >
          ✕ Clear filters
        </button>
      )}

      <div>
        <span className="text-[10px] text-text-muted uppercase tracking-[1px] mb-[10px] block">Search</span>
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={handleSearchChange}
          className="w-full bg-bg-subtle border border-border rounded-md px-[10px] py-2 text-sm text-text outline-none transition-colors duration-150"
        />
      </div>

      <div>
        <span className="text-[10px] text-text-muted uppercase tracking-[1px] mb-[10px] block">Category</span>
        <div className="flex flex-col gap-0.5">
          <button
            onClick={() => setFilter("category", null)}
            className={filterBtnClasses(!filters.category)}
          >
            All categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter("category", cat.slug)}
              className={filterBtnClasses(filters.category === cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-[10px] text-text-muted uppercase tracking-[1px] mb-[10px] block">Sort by</span>
        <div className="flex flex-col gap-0.5">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter("sort", option.value)}
              className={filterBtnClasses(filters.sort === option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-[10px] text-text-muted uppercase tracking-[1px] mb-[10px] block">Price range (USD)</span>
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            placeholder="Min"
            value={minInput}
            onChange={(e) => setMinInput(e.target.value)}
            className="w-1/2 bg-bg-subtle border border-border rounded-md px-[10px] py-2 text-sm text-text outline-none transition-colors duration-150"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxInput}
            onChange={(e) => setMaxInput(e.target.value)}
            className="w-1/2 bg-bg-subtle border border-border rounded-md px-[10px] py-2 text-sm text-text outline-none transition-colors duration-150"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePriceApply}
            className="flex-1 bg-accent text-white border-none rounded-md p-[7px] text-xs font-medium cursor-pointer"
          >
            Apply
          </button>
          {(filters.min || filters.max) && (
            <button
              onClick={handlePriceClear}
              className="bg-transparent border border-border rounded-md text-text-muted px-[10px] py-[7px] text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
