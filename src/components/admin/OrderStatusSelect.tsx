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
      className={`text-xs font-medium px-2.5 py-0.75 rounded-full cursor-pointer outline-none transition-opacity duration-150 ${
        loading ? "opacity-50" : ""
      }`}
      style={{
        ...(styles[status] ?? {
          background: "var(--bg-subtle)",
          color: "var(--text-muted)",
        }),
      }}
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option} value={option} className="bg-[#111] text-white">
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
  );
}
