"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error starting payment");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Connection error, please try again");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div
        style={{
          minHeight: "60dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>
          Your cart is empty.
        </p>
      </div>
    );
  }

  return (
    <main style={{ maxWidth: "560px", margin: "0 auto", padding: "48px 24px" }}>
      <h1
        style={{
          fontSize: "22px",
          fontWeight: "500",
          letterSpacing: "-0.5px",
          marginBottom: "32px",
        }}
      >
        Order summary
      </h1>

      {/* Items */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "16px",
        }}
      >
        {items.map(({ product, quantity }, i) => (
          <div
            key={product.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px 20px",
              borderBottom:
                i < items.length - 1 ? "0.5px solid var(--border)" : "none",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "52px",
                height: "52px",
                flexShrink: 0,
                borderRadius: "8px",
                overflow: "hidden",
                background: "var(--bg-subtle)",
              }}
            >
              {product.image_url && (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "var(--text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {product.name}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  marginTop: "2px",
                }}
              >
                Qty: {quantity}
              </p>
            </div>
            <p style={{ fontSize: "14px", fontWeight: "500", flexShrink: 0 }}>
              {formatPrice(product.price * quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
          borderRadius: "12px",
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
          Total
        </span>
        <span style={{ fontSize: "20px", fontWeight: "500" }}>
          {formatPrice(getTotalPrice())}
        </span>
      </div>

      {/* Info */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {[
          { icon: "🔒", text: "Secure checkout powered by Stripe" },
          { icon: "🚚", text: "Free shipping on orders over $99" },
          { icon: "↩️", text: "30-day return policy" },
        ].map((item) => (
          <div
            key={item.text}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <span style={{ fontSize: "14px" }}>{item.icon}</span>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <div
          style={{
            background: "var(--coral-bg)",
            border: "0.5px solid var(--coral-border)",
            borderRadius: "8px",
            padding: "10px 14px",
            fontSize: "13px",
            color: "var(--coral-text)",
            marginBottom: "16px",
          }}
        >
          {error}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{
          width: "100%",
          background: "#fff",
          color: "#000",
          border: "none",
          borderRadius: "10px",
          padding: "14px",
          fontSize: "15px",
          fontWeight: "500",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.6 : 1,
          transition: "opacity 0.15s",
        }}
      >
        {loading ? "Redirecting to Stripe..." : "Pay now"}
      </button>
    </main>
  );
}
