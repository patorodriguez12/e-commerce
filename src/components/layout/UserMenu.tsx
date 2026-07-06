"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import { ChevronDown, User, ShoppingBag, Heart, LogOut } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { logout } from "@/lib/supabase/actions";

type Props = {
  fullName: string;
};

const MENU_ITEMS = [
  { href: "/dashboard", label: "My Account", icon: User },
  { href: "/dashboard/orders", label: "My Orders", icon: ShoppingBag },
  { href: "/dashboard/wishlist", label: "My Wishlist", icon: Heart },
];

export default function UserMenu({ fullName }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);
  const clearCart = useCartStore((state) => state.clearCart);

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function handleLogout() {
    setIsOpen(false);
    clearCart();
    startTransition(async () => {
      await logout();
    });
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: isOpen ? "var(--bg-subtle)" : "transparent",
          border: "0.5px solid",
          borderColor: isOpen ? "var(--border-hover)" : "var(--border)",
          borderRadius: "8px",
          padding: "6px 12px",
          color: "var(--text-secondary)",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: "500",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "var(--border-hover)";
            (e.currentTarget as HTMLButtonElement).style.background =
              "var(--bg-subtle)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "var(--border)";
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
          }
        }}
      >
        {fullName}
        <ChevronDown
          size={14}
          style={{
            transition: "transform 0.2s",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {/* Dropdown */}
      <div
        style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          right: 0,
          width: "200px",
          background: "#111111",
          border: "0.5px solid var(--border)",
          borderRadius: "10px",
          overflow: "hidden",
          zIndex: 50,
          opacity: isOpen ? 1 : 0,
          transform: isOpen
            ? "translateY(0) scale(1)"
            : "translateY(-8px) scale(0.97)",
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.15s ease, transform 0.15s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "12px 16px",
            borderBottom: "0.5px solid var(--border)",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              fontWeight: "500",
              color: "var(--text-primary)",
            }}
          >
            {fullName}
          </p>
        </div>

        {/* Links */}
        <div style={{ padding: "6px" }}>
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 10px",
                borderRadius: "6px",
                fontSize: "13px",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "all 0.1s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "var(--bg-subtle)";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--text-secondary)";
              }}
            >
              <item.icon size={14} style={{ flexShrink: 0 }} />
              {item.label}
            </Link>
          ))}
        </div>

        {/* Sign out */}
        <div style={{ padding: "6px", borderTop: "0.5px solid var(--border)" }}>
          <button
            onClick={handleLogout}
            disabled={pending}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              padding: "9px 10px",
              borderRadius: "6px",
              fontSize: "13px",
              color: "var(--text-muted)",
              background: "transparent",
              border: "none",
              cursor: pending ? "not-allowed" : "pointer",
              opacity: pending ? 0.5 : 1,
              transition: "all 0.1s",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              if (!pending) {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "var(--coral-bg)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--coral-text)";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "transparent";
              (e.currentTarget as HTMLButtonElement).style.color =
                "var(--text-muted)";
            }}
          >
            <LogOut size={14} style={{ flexShrink: 0 }} />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
