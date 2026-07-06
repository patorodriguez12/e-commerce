"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { useCartDrawer } from "@/lib/store/cartDrawerStore";
import CartItem from "./CartItem";
import Link from "next/link";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function CartDrawer() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { isOpen, close } = useCartDrawer();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [close]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.75)",
          zIndex: 998,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100dvh",
          width: "min(420px, 100vw)",
          background: "var(--surface)",
          borderLeft: "0.5px solid var(--border)",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
          overscrollBehavior: "contain",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "0.5px solid var(--border)",
            flexShrink: 0,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "var(--text-primary)",
              }}
            >
              Your cart
            </h2>
            {items.length > 0 && (
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  marginTop: "2px",
                }}
              >
                {items.reduce((acc, i) => acc + i.quantity, 0)} items
              </p>
            )}
          </div>
          <button
            onClick={close}
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
              fontSize: "20px",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 24px",
            overscrollBehavior: "contain",
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "12px",
                minHeight: "200px",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-muted)"
                strokeWidth="1"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                Your cart is empty
              </p>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              borderTop: "0.5px solid var(--border)",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{ fontSize: "14px", color: "var(--text-secondary)" }}
              >
                Total
              </span>
              <span style={{ fontSize: "18px", fontWeight: "500" }}>
                {formatPrice(getTotalPrice())}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={close}
              style={{
                display: "block",
                background: "var(--accent)",
                color: "#fff",
                textAlign: "center",
                padding: "12px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Checkout
            </Link>
            <button
              onClick={clearCart}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                fontSize: "12px",
                cursor: "pointer",
                padding: "4px",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E24B4A")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
