"use client";

import { useState, useSyncExternalStore } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import CartDrawer from "./CartDrawer";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const isClient = useIsClient();
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "relative",
          background: "transparent",
          border: "0.5px solid var(--border)",
          borderRadius: "6px",
          padding: "6px 12px",
          color: "var(--text-secondary)",
          cursor: "pointer",
          fontSize: "14px",
          transition: "border-color 0.15s",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.borderColor = "var(--border-hover)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.borderColor = "var(--border)")
        }
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        {isClient && totalItems > 0 && (
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
            {totalItems}
          </span>
        )}
      </button>
      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
