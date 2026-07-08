"use client";

import { useEffect, useState } from "react";
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
  isOpen: boolean;
  onClose: () => void;
};

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A to Z" },
];

function filterBtnClasses(active: boolean): string {
  return `w-full text-left px-3 py-[9px] rounded-md text-sm cursor-pointer transition-all duration-150 ${
    active
      ? "bg-accent-bg text-accent-text border border-accent-border font-medium"
      : "bg-transparent text-text-secondary border border-transparent font-normal"
  }`;
}

export default function FilterDrawer({
  categories,
  filters,
  hasActiveFilters,
  setFilter,
  setFilters,
  clearAll,
  isOpen,
  onClose,
}: Props) {
  const [searchInput, setSearchInput] = useState(filters.q);
  const [minInput, setMinInput] = useState(filters.min?.toString() ?? "");
  const [maxInput, setMaxInput] = useState(filters.max?.toString() ?? "");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setFilter("q", value || null);
  }, 400);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
    debouncedSearch(e.target.value);
  }

  function handlePriceApply() {
    setFilters({ min: minInput || null, max: maxInput || null });
  }

  function handlePriceClear() {
    setMinInput("");
    setMaxInput("");
    setFilters({ min: null, max: null });
  }

  function handleClearAll() {
    setSearchInput("");
    setMinInput("");
    setMaxInput("");
    clearAll();
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/70 z-[998] transition-opacity duration-[250ms] ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-border rounded-t-[16px] z-[999] max-h-[85dvh] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-3 flex justify-center">
          <div className="w-9 h-1 bg-border-hover rounded-[2px]" />
        </div>

        <div className="flex items-center justify-between px-5 pb-4 border-b border-border shrink-0">
          <h3 className="text-base font-medium">Filters</h3>
          <div className="flex gap-2 items-center">
            {hasActiveFilters && (
              <button
                onClick={handleClearAll}
                className="bg-transparent border border-coral-border text-coral-text rounded-md px-3 py-[5px] text-xs cursor-pointer"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-bg-subtle border border-border rounded-md text-text-secondary cursor-pointer w-8 h-8 flex items-center justify-center text-lg"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-7 overscroll-contain">
          <div>
            <span className="text-[10px] text-text-muted uppercase tracking-[1px] mb-[10px] block">Search</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full bg-bg-subtle border border-border rounded-md px-3 py-[10px] text-sm text-text outline-none"
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
            <div className="flex gap-2 mb-[10px]">
              <input
                type="number"
                placeholder="Min"
                value={minInput}
                onChange={(e) => setMinInput(e.target.value)}
                className="w-1/2 bg-bg-subtle border border-border rounded-md px-3 py-[10px] text-sm text-text outline-none"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxInput}
                onChange={(e) => setMaxInput(e.target.value)}
                className="w-1/2 bg-bg-subtle border border-border rounded-md px-3 py-[10px] text-sm text-text outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePriceApply}
                className="flex-1 bg-accent text-white border-none rounded-md p-[9px] text-sm font-medium cursor-pointer"
              >
                Apply
              </button>
              {(filters.min || filters.max) && (
                <button
                  onClick={handlePriceClear}
                  className="bg-transparent border border-border rounded-md text-text-muted px-3 py-[9px] text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-border shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-accent text-white border-none rounded-lg p-[13px] text-sm font-medium cursor-pointer"
          >
            Show results
          </button>
        </div>
      </div>
    </>
  );
}
