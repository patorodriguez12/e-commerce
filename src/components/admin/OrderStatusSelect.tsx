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
  styles: Record<string, string>;
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
      className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50 ${
        styles[status] ?? "bg-gray-100 text-gray-600"
      }`}
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
  );
}
