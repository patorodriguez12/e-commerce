"use client";

import { useFilters, SortOption } from "@/lib/hooks/useFilters";
import { Category } from "@/types";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  categories: Category[];
};

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A to Z" },
];

export default function FilterSidebar({ categories }: Props) {
  const { filters, setFilter, setFilters, clearAll, hasActiveFilters } =
    useFilters();
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
    <aside className="w-56 flex-shrink-0 space-y-6">
      {hasActiveFilters && (
        <button
          onClick={handleClearAll}
          className="text-sm text-red-500 hover:text-red-700 transition-colors font-medium"
        >
          ✕ Clear all filters
        </button>
      )}

      {/* Search */}
      <div>
        <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-gray-500">
          Search
        </h3>
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={handleSearchChange}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-gray-500">
          Category
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => setFilter("category", null)}
            className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors ${
              !filters.category
                ? "bg-black text-white font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            All categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter("category", cat.slug)}
              className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors ${
                filters.category === cat.slug
                  ? "bg-black text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-gray-500">
          Sort by
        </h3>
        <div className="space-y-1">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter("sort", option.value)}
              className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors ${
                filters.sort === option.value
                  ? "bg-black text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-gray-500">
          Price range (USD)
        </h3>
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            placeholder="Min"
            value={minInput}
            onChange={(e) => setMinInput(e.target.value)}
            className="w-full border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxInput}
            onChange={(e) => setMaxInput(e.target.value)}
            className="w-full border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePriceApply}
            className="flex-1 bg-black text-white text-sm py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Apply
          </button>
          {(filters.min || filters.max) && (
            <button
              onClick={handlePriceClear}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors px-2"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
