"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/layout/LogoutButton";

const NAV_ITEMS = [
  { href: "/dashboard", label: "My Account" },
  { href: "/dashboard/orders", label: "My Orders" },
  { href: "/dashboard/wishlist", label: "My Wishlist" },
];

export default function DashboardNav({ fullName }: { fullName: string }) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="desktop-only" style={{ width: "200px", flexShrink: 0 }}>
        <div
          style={{
            background: "var(--surface)",
            border: "0.5px solid var(--border)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "20px 20px 16px",
              borderBottom: "0.5px solid var(--border)",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "var(--text)",
                marginBottom: "4px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {fullName}
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Account
            </p>
          </div>

          {/* Nav */}
          <nav style={{ padding: "8px" }}>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "9px 12px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    color: active ? "var(--accent-text)" : "var(--text-secondary)",
                    textDecoration: "none",
                    background: active ? "var(--accent-bg)" : "transparent",
                    transition: "all 0.15s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "var(--elevated)";
                      e.currentTarget.style.color = "var(--text)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }
                  }}
                >
                  {active && (
                    <span
                      style={{
                        position: "absolute",
                        left: "-8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "3px",
                        height: "18px",
                        background: "var(--accent)",
                        borderRadius: "0 2px 2px 0",
                      }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Links + logout */}
          <div
            style={{
              padding: "8px",
              borderTop: "0.5px solid var(--border)",
            }}
          >
            <Link
              href="/"
              style={{
                display: "block",
                padding: "8px 12px",
                borderRadius: "6px",
                fontSize: "13px",
                color: "var(--text-muted)",
                textDecoration: "none",
                marginBottom: "2px",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text)";
                e.currentTarget.style.background = "var(--elevated)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              ← Store
            </Link>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Mobile tabs */}
      <div className="mobile-only" style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            gap: "4px",
            overflowX: "auto",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            paddingBottom: "4px",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  flexShrink: 0,
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: active ? "500" : "400",
                  color: active ? "#fff" : "var(--text-secondary)",
                  background: active ? "var(--accent)" : "var(--surface)",
                  border: active ? "none" : "0.5px solid var(--border)",
                  textDecoration: "none",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
