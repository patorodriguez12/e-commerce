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
  padding: "9px 12px",
  borderRadius: "6px",
  fontSize: "14px",
  background: active ? "var(--accent-bg)" : "transparent",
  color: active ? "var(--accent-text)" : "var(--text-secondary)",
  border: active
    ? "0.5px solid var(--accent-border)"
    : "0.5px solid transparent",
  cursor: "pointer",
  transition: "all 0.15s",
  fontWeight: active ? "500" : "400",
});

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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--bg-subtle)",
    border: "0.5px solid var(--border)",
    borderRadius: "6px",
    padding: "10px 12px",
    fontSize: "14px",
    color: "var(--text-primary)",
    outline: "none",
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          zIndex: 998,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      />

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#0f0f0f",
          borderTop: "0.5px solid var(--border)",
          borderRadius: "16px 16px 0 0",
          zIndex: 999,
          maxHeight: "85dvh",
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        <div
          style={{ padding: "12px", display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              width: "36px",
              height: "4px",
              background: "var(--border-hover)",
              borderRadius: "2px",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px 16px",
            borderBottom: "0.5px solid var(--border)",
            flexShrink: 0,
          }}
        >
          <h3 style={{ fontSize: "16px", fontWeight: "500" }}>Filters</h3>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {hasActiveFilters && (
              <button
                onClick={handleClearAll}
                style={{
                  background: "transparent",
                  border: "0.5px solid var(--coral-border)",
                  color: "var(--coral-text)",
                  borderRadius: "6px",
                  padding: "5px 12px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: "var(--bg-subtle)",
                border: "0.5px solid var(--border)",
                borderRadius: "6px",
                color: "var(--text-secondary)",
                cursor: "pointer",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              ×
            </button>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            overscrollBehavior: "contain",
          }}
        >
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
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
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
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
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
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
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
                  padding: "9px",
                  fontSize: "13px",
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
                    padding: "9px 12px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "16px 20px",
            borderTop: "0.5px solid var(--border)",
            flexShrink: 0,
          }}
        >
          <button
            onClick={onClose}
            style={{
              width: "100%",
              background: "var(--accent)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "13px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Show results
          </button>
        </div>
      </div>
    </>
  );
}
