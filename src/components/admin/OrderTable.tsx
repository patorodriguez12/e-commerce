"use client";

import { useState, useMemo } from "react";
import { formatPrice } from "@/lib/utils/formatPrice";
import { STATUS_STYLES } from "@/lib/constants";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";
import SearchBar from "@/components/admin/SearchBar";

type OrderRow = {
  id: string;
  user_id: string;
  status: string;
  total: number;
  created_at: string;
  profiles: { full_name: string } | null;
  order_items: { id: string }[] | null;
};

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
      <div
        style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
          borderRadius: "12px",
        }}
      >
        <div className="overflow-x-auto">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "0.5px solid var(--border)" }}>
                {["Order", "Customer", "Date", "Items", "Total", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className={
                        h === "Customer" || h === "Items"
                          ? "desktop-only"
                          : ""
                      }
                      style={{
                        padding: "12px 20px",
                        textAlign: "left",
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        fontWeight: "500",
                      }}
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
                  <td
                    colSpan={6}
                    style={{
                      padding: "48px 24px",
                      textAlign: "center",
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{
                        margin: "0 auto 12px",
                        color: "var(--text-muted)",
                        opacity: 0.4,
                      }}
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
                    <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                      {orders.length === 0
                        ? "No orders yet"
                        : "No orders match your search"}
                    </p>
                    <p
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "12px",
                        marginTop: "4px",
                        opacity: 0.6,
                      }}
                    >
                      {orders.length === 0
                        ? "Orders will appear here once customers start purchasing."
                        : "Try a different search term."}
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((order: OrderRow) => (
                  <tr
                    key={order.id}
                    style={{ borderBottom: "0.5px solid var(--border)" }}
                  >
                    <td
                      style={{
                        padding: "14px 20px",
                        fontFamily: "monospace",
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      #{order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td
                      className="desktop-only"
                      style={{
                        padding: "14px 20px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {order.profiles?.full_name ?? "Unknown"}
                    </td>
                    <td
                      style={{
                        padding: "14px 20px",
                        color: "var(--text-muted)",
                        fontSize: "12px",
                      }}
                    >
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td
                      className="desktop-only"
                      style={{
                        padding: "14px 20px",
                        color: "var(--text-muted)",
                      }}
                    >
                      {order.order_items?.length ?? 0}
                    </td>
                    <td style={{ padding: "14px 20px", fontWeight: "500" }}>
                      {formatPrice(order.total)}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
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
