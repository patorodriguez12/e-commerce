"use client";

import { useState, useMemo } from "react";
import { formatPrice } from "@/lib/utils/formatPrice";
import { STATUS_STYLES } from "@/lib/constants";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";
import SearchBar from "@/components/admin/SearchBar";
import type { OrderRow } from "@/types";

type Props = {
  orders: OrderRow[];
};

export default function OrderTable({ orders }: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return orders;
    const q = search.toLowerCase();
    return orders.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        (o.profiles?.full_name ?? "").toLowerCase().includes(q)
    );
  }, [orders, search]);

  return (
    <div>
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search orders by ID or customer..."
      />
      <div className="bg-surface border border-border rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Order", "Customer", "Date", "Items", "Total", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className={`${
                        h === "Customer" || h === "Items"
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
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mx-auto mb-3 text-text-muted opacity-40"
                    >
                      <path
                        d="M3 6H21L19 18H5L3 6Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <circle cx="8" cy="20" r="1.5" fill="currentColor" />
                      <circle cx="16" cy="20" r="1.5" fill="currentColor" />
                      <path
                        d="M6 6V4C6 2.5 7.5 2 12 2C16.5 2 18 2.5 18 4V6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <p className="text-text-muted text-sm">
                      {orders.length === 0
                        ? "No orders yet"
                        : "No orders match your search"}
                    </p>
                    <p className="text-text-muted text-xs mt-1 opacity-60">
                      {orders.length === 0
                        ? "Orders will appear here once customers start purchasing."
                        : "Try a different search term."}
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((order: OrderRow) => (
                  <tr key={order.id} className="border-b border-border">
                    <td className="px-5 py-3.5 font-mono text-xs text-text-secondary">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="desktop-only px-5 py-3.5 text-text-secondary">
                      {order.profiles?.full_name ?? "Unknown"}
                    </td>
                    <td className="px-5 py-3.5 text-text-muted text-xs">
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="desktop-only px-5 py-3.5 text-text-muted">
                      {order.order_items?.length ?? 0}
                    </td>
                    <td className="px-5 py-3.5 font-medium">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-5 py-3.5">
                      <OrderStatusSelect
                        orderId={order.id}
                        currentStatus={order.status}
                        styles={STATUS_STYLES}
                      />
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
