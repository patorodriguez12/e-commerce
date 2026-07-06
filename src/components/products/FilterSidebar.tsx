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

const sectionLabel: React.CSSProperties = {
  fontSize: "10px",
  color: "var(--text-muted)",
  textTransform: "uppercase",
  letterSpacing: "1px",
  marginBottom: "10px",
  display: "block",
};

const filterBtn = (active: boolean): React.CSSProperties => ({
  width: "100%",
  textAlign: "left",
  padding: "7px 10px",
  borderRadius: "6px",
  fontSize: "13px",
  background: active ? "var(--accent-bg)" : "transparent",
  color: active ? "var(--accent-text)" : "var(--text-secondary)",
  border: active
    ? "0.5px solid var(--accent-border)"
    : "0.5px solid transparent",
  cursor: "pointer",
  transition: "all 0.15s",
  fontWeight: active ? "500" : "400",
});

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg-subtle)",
  border: "0.5px solid var(--border)",
  borderRadius: "6px",
  padding: "8px 10px",
  fontSize: "13px",
  color: "var(--text-primary)",
  outline: "none",
  transition: "border-color 0.15s",
};

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
    <aside
      style={{
        width: "200px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      {hasActiveFilters && (
        <button
          onClick={handleClearAll}
          style={{
            background: "transparent",
            border: "0.5px solid var(--coral-border)",
            color: "var(--coral-text)",
            borderRadius: "6px",
            padding: "6px 12px",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          ✕ Clear filters
        </button>
      )}

      <div>
        <span style={sectionLabel}>Search</span>
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={handleSearchChange}
          style={inputStyle}
        />
      </div>

      <div>
        <span style={sectionLabel}>Category</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <button
            onClick={() => setFilter("category", null)}
            style={filterBtn(!filters.category)}
          >
            All categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter("category", cat.slug)}
              style={filterBtn(filters.category === cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span style={sectionLabel}>Sort by</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter("sort", option.value)}
              style={filterBtn(filters.sort === option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span style={sectionLabel}>Price range (USD)</span>
        <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
          <input
            type="number"
            placeholder="Min"
            value={minInput}
            onChange={(e) => setMinInput(e.target.value)}
            style={{ ...inputStyle, width: "50%" }}
          />
          <input
            type="number"
            placeholder="Max"
            value={maxInput}
            onChange={(e) => setMaxInput(e.target.value)}
            style={{ ...inputStyle, width: "50%" }}
          />
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={handlePriceApply}
            style={{
              flex: 1,
              background: "var(--accent)",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "7px",
              fontSize: "12px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Apply
          </button>
          {(filters.min || filters.max) && (
            <button
              onClick={handlePriceClear}
              style={{
                background: "transparent",
                border: "0.5px solid var(--border)",
                borderRadius: "6px",
                color: "var(--text-muted)",
                padding: "7px 10px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
