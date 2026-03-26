"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/lib/supabase/admin-actions";
import { OrderStatus } from "@/types";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
];

type Props = {
  orderId: string;
  currentStatus: string;
  styles: Record<string, React.CSSProperties>;
};

export default function OrderStatusSelect({
  orderId,
  currentStatus,
  styles,
}: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function handleChange(newStatus: string) {
    setLoading(true);
    setStatus(newStatus);
    await updateOrderStatus(orderId, newStatus);
    setLoading(false);
  }

  return (
    <select
      value={status}
      onChange={(e) => handleChange(e.target.value)}
      disabled={loading}
      style={{
        fontSize: "11px",
        padding: "3px 10px",
        borderRadius: "20px",
        fontWeight: "500",
        border: "none",
        cursor: "pointer",
        outline: "none",
        opacity: loading ? 0.5 : 1,
        ...(styles[status] ?? {
          background: "var(--bg-subtle)",
          color: "var(--text-muted)",
        }),
      }}
    >
      {STATUS_OPTIONS.map((option) => (
        <option
          key={option}
          value={option}
          style={{ background: "#111", color: "#fff" }}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
  );
}
