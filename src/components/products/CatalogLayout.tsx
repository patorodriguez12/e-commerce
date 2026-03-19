"use client";

import { useState, useEffect } from "react";
import { Category, Product } from "@/types";
import FilterSidebar from "./FilterSidebar";
import FilterDrawer from "./FilterDrawer";
import ProductGrid from "./ProductGrid";
import { useFilters } from "@/lib/hooks/useFilters";

type Props = {
  categories: Category[];
  products: Product[];
  total: number;
};

export default function CatalogLayout({ categories, products, total }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { hasActiveFilters, filters } = useFilters();

  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth < 768);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Contar filtros activos para el badge
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
        {/* Barra superior mobile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            {total} {total === 1 ? "product" : "products"}
          </p>
          <button
            onClick={() => setDrawerOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: hasActiveFilters
                ? "var(--accent-bg)"
                : "var(--bg-card)",
              border: `0.5px solid ${hasActiveFilters ? "var(--accent-border)" : "var(--border)"}`,
              borderRadius: "8px",
              padding: "8px 16px",
              color: hasActiveFilters
                ? "var(--accent-text)"
                : "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500",
            }}
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
              <span
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  fontSize: "10px",
                  borderRadius: "10px",
                  padding: "1px 6px",
                  fontWeight: "500",
                }}
              >
                {activeCount}
              </span>
            )}
          </button>
        </div>

        <ProductGrid products={products} total={total} hideTotalLabel />

        <FilterDrawer
          categories={categories}
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
      <FilterSidebar categories={categories} />
      <ProductGrid products={products} total={total} />
    </div>
  );
}
