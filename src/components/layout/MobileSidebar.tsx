"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LogOut, User, ShoppingBag, Heart } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { logout } from "@/lib/supabase/actions";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: { id: string; email?: string } | null;
  fullName: string | null;
  isAdmin: boolean;
};

const ACCOUNT_LINKS = [
  { href: "/dashboard", label: "My Account", icon: User },
  { href: "/dashboard/orders", label: "My Orders", icon: ShoppingBag },
  { href: "/dashboard/wishlist", label: "My Wishlist", icon: Heart },
];

export default function MobileSidebar({ isOpen, onClose, user, fullName, isAdmin }: Props) {
  const [pending, setPending] = useState(false);
  const pathname = usePathname();
  const clearCart = useCartStore((state) => state.clearCart);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCloseRef.current();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [isOpen]);

  // Close on navigation
  useEffect(() => {
    onCloseRef.current();
  }, [pathname]);

  async function handleLogout() {
    setPending(true);
    clearCart();
    await logout();
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(0,0,0,0.6)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s ease",
          WebkitBackdropFilter: "blur(4px)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "300px",
          maxWidth: "85vw",
          zIndex: 50,
          background: "var(--surface)",
          borderLeft: "0.5px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "transform 0.3s ease, opacity 0.2s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "0.5px solid var(--border)",
          }}
        >
          <Link
            href="/"
            onClick={onClose}
            style={{
              fontSize: "15px",
              fontWeight: "600",
              letterSpacing: "-0.5px",
              color: "var(--text)",
              textDecoration: "none",
              fontFamily: "var(--font-sora)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ color: "var(--gold)", opacity: 0.7 }}>◆</span>
            Smartech
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* User info */}
        {user && (
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "0.5px solid var(--border)",
            }}
          >
            <p style={{ fontSize: "14px", fontWeight: "500", color: "var(--text)", display: "flex", alignItems: "center", gap: "8px" }}>
              {fullName ?? "Account"}
              {isAdmin && (
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: "600",
                    letterSpacing: "0.3px",
                    color: "var(--gold)",
                    background: "var(--gold-bg)",
                    border: "0.5px solid var(--gold-border)",
                    borderRadius: "4px",
                    padding: "1px 5px",
                    textTransform: "uppercase",
                  }}
                >
                  Admin
                </span>
              )}
            </p>
            {user.email && (
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                {user.email}
              </p>
            )}
          </div>
        )}

        {/* Nav links */}
        <div style={{ padding: "8px", flex: 1, overflowY: "auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <SidebarLink href="/" onClick={onClose} isActive={pathname === "/"}>
              Home
            </SidebarLink>
            <SidebarLink href="/" onClick={onClose} isActive={pathname === "/"}>
              Products
            </SidebarLink>
            {user && (
              <SidebarLink href="/dashboard" onClick={onClose} isActive={pathname.startsWith("/dashboard")}>
                Dashboard
              </SidebarLink>
            )}
            {isAdmin && (
              <SidebarLink href="/admin" onClick={onClose} isActive={pathname.startsWith("/admin")}>
                Admin
              </SidebarLink>
            )}
          </div>

          {/* Account sub-links (logged in) */}
          {user && (
            <>
              <div
                style={{
                  margin: "12px 8px 8px",
                  fontSize: "11px",
                  fontWeight: "500",
                  color: "var(--text-muted)",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Account
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {ACCOUNT_LINKS.map((link) => (
                  <SidebarLink
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    isActive={pathname === link.href}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <link.icon size={14} style={{ flexShrink: 0 }} />
                      {link.label}
                    </span>
                  </SidebarLink>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bottom: auth buttons / sign out */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: "0.5px solid var(--border)",
          }}
        >
          {user ? (
            <button
              onClick={handleLogout}
              disabled={pending}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                fontSize: "13px",
                color: "var(--text-muted)",
                background: "transparent",
                border: "none",
                cursor: pending ? "not-allowed" : "pointer",
                opacity: pending ? 0.5 : 1,
                transition: "all 0.15s",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                if (!pending) {
                  e.currentTarget.style.background = "var(--coral-bg)";
                  e.currentTarget.style.color = "var(--coral-text)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              <LogOut size={14} />
              {pending ? "Signing out..." : "Sign out"}
            </button>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link
                href="/login"
                onClick={onClose}
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "0.5px solid var(--border)",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-hover)";
                  e.currentTarget.style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: "13px",
                  color: "#fff",
                  textDecoration: "none",
                  padding: "10px",
                  borderRadius: "8px",
                  background: "var(--accent)",
                  fontWeight: "500",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#db8b66";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--accent)";
                }}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function SidebarLink({
  href,
  children,
  onClick,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 12px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: isActive ? "500" : "400",
        color: isActive ? "var(--text)" : "var(--text-secondary)",
        textDecoration: "none",
        background: isActive ? "var(--bg-subtle)" : "transparent",
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--bg-subtle)";
        e.currentTarget.style.color = "var(--text)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isActive ? "var(--bg-subtle)" : "transparent";
        e.currentTarget.style.color = isActive ? "var(--text)" : "var(--text-secondary)";
      }}
    >
      {children}
    </Link>
  );
}
