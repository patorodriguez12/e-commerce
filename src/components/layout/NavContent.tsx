"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import CartButton from "@/components/cart/CartButton";
import UserMenu from "@/components/layout/UserMenu";
import MobileSidebar from "@/components/layout/MobileSidebar";

type Props = {
  user: { id: string; email?: string } | null;
  fullName: string | null;
  isAdmin: boolean;
};

export default function NavContent({ user, fullName, isAdmin }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          borderBottom: "0.5px solid var(--border)",
          position: "sticky",
          top: 0,
          zIndex: 30,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontSize: "16px",
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

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CartButton />

            {/* Desktop user menu */}
            <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {user ? (
                <UserMenu fullName={fullName ?? "Account"} />
              ) : (
                <>
                  <Link
                    href="/login"
                    style={{
                      fontSize: "13px",
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent-text)";
                      e.currentTarget.style.background = "var(--accent-bg)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-secondary)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    style={{
                      fontSize: "13px",
                      color: "#fff",
                      background: "var(--accent)",
                      textDecoration: "none",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      fontWeight: "500",
                      transition: "all 0.15s",
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
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="mobile-only"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              style={{
                background: "transparent",
                border: "0.5px solid var(--border)",
                borderRadius: "6px",
                padding: "6px",
                color: "var(--text-secondary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>

      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
        fullName={fullName}
        isAdmin={isAdmin}
      />
    </>
  );
}
