"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/formatPrice";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import SearchBar from "@/components/admin/SearchBar";

type ProductRow = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url: string | null;
  categories: { name: string } | null;
};

type Props = {
  products: ProductRow[];
};

export default function ProductTable({ products }: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.categories?.name ?? "").toLowerCase().includes(q)
    );
  }, [products, search]);

  return (
    <div>
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search products..."
      />
      <div className="bg-surface border border-border rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Product", "Category", "Price", "Stock", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className={`${
                        h === "Category" || h === "Actions"
                          ? "desktop-only"
                          : ""
                      } px-5 py-3 text-left text-xs text-text-muted uppercase tracking-[0.5px] font-medium`}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {!filtered.length ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mx-auto mb-3 text-text-muted opacity-40"
                    >
                      <path
                        d="M3 7L12 3L21 7V17L12 21L3 17V7Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 14L21 10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 14L3 10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 14V21"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <p className="text-text-muted text-sm">
                      {products.length === 0
                        ? "No products yet"
                        : "No products match your search"}
                    </p>
                    <p className="text-text-muted text-xs mt-1 opacity-60">
                      {products.length === 0
                        ? "Create your first product to start selling."
                        : "Try a different search term."}
                    </p>
                    {products.length === 0 && (
                      <Link
                        href="/admin/products/new"
                        className="inline-block mt-4 bg-accent text-white px-4 py-2 rounded-lg no-underline text-sm font-medium"
                      >
                        Create product
                      </Link>
                    )}
                  </td>
                </tr>
              ) : (
                filtered.map((product: ProductRow) => (
                  <tr key={product.id} className="border-b border-border">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 shrink-0 rounded-md overflow-hidden bg-bg-subtle">
                          {product.image_url && (
                            <Image
                              src={product.image_url}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <span className="font-medium text-text">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="desktop-only px-5 py-3.5 text-text-muted">
                      {product.categories?.name ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 font-medium">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`text-xs font-medium px-2.5 py-0.75 rounded-full ${
                          product.stock > 0
                            ? "bg-green-bg text-green-text border border-green-border"
                            : "bg-coral-bg text-coral-text border border-coral-border"
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} units`
                          : "Out of stock"}
                      </span>
                    </td>
                    <td className="desktop-only px-5 py-3.5">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="text-xs text-accent-text no-underline"
                        >
                          Edit
                        </Link>
                        <DeleteProductButton productId={product.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
