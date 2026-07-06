"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import Link from "next/link";

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div
      style={{
        minHeight: "80dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "420px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* Checkmark */}
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "var(--green-bg)",
            border: "0.5px solid var(--green-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            marginBottom: "8px",
          }}
        >
          ✓
        </div>

        <div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "500",
              letterSpacing: "-0.5px",
              marginBottom: "8px",
            }}
          >
            Payment successful
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              lineHeight: "1.7",
            }}
          >
            Your order has been placed successfully. You can track it from your
            dashboard.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "8px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href="/dashboard/orders"
            style={{
              background: "var(--accent)",
              color: "#fff",
              padding: "10px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "500",
            }}
          >
            View my orders
          </Link>
          <Link
            href="/"
            style={{
              background: "transparent",
              color: "var(--text-secondary)",
              padding: "10px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "13px",
              border: "0.5px solid var(--border)",
            }}
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
