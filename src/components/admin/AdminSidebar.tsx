"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { logout } from "@/lib/supabase/actions";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    function onChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

const NAV_ITEMS = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <path d="M2 5L8 2L14 5V11L8 14L2 11V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 9L14 6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 9L2 6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 9V14" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <path d="M2 4H14L12.5 12H3.5L2 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="5.5" cy="13" r="1" fill="currentColor" />
        <circle cx="11.5" cy="13" r="1" fill="currentColor" />
        <path d="M4 4V3C4 1.5 5 1 8 1C11 1 12 1.5 12 3V4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1 14C1 11 3 9 6 9C9 9 11 11 11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="11" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 9C12.5 9 14.5 10 15 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const navLink: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "8px 12px",
  borderRadius: "6px",
  fontSize: "13px",
  color: "var(--text-secondary)",
  textDecoration: "none",
  transition: "all 0.15s",
};

const activeNavLink: React.CSSProperties = {
  ...navLink,
  color: "var(--accent-text)",
  background: "var(--accent-bg)",
};

export default function AdminSidebar() {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [isOpen, setIsOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          style={{
            position: "fixed",
            top: "16px",
            left: "16px",
            zIndex: 60,
            background: "var(--bg-card)",
            border: "0.5px solid var(--border)",
            borderRadius: "8px",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--text-secondary)",
            transition: "color 0.15s",
          }}
        >
          {isOpen ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      )}

      {isMobile && isOpen && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 40,
          }}
        />
      )}

      <aside
        style={{
          width: isMobile ? "260px" : "220px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          background: "#0d0d0d",
          borderRight: "0.5px solid var(--border)",
          ...(isMobile
            ? {
                position: "fixed",
                left: 0,
                top: 0,
                height: "100dvh",
                zIndex: 50,
                transform: isOpen ? "translateX(0)" : "translateX(-100%)",
                transition: "transform 0.2s ease",
              }
            : {}),
        }}
      >
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
              color: "var(--text-primary)",
            }}
          >
            Admin Panel
          </p>
          <p
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              marginTop: "2px",
            }}
          >
            Smartech
          </p>
        </div>

        <nav
          style={{
            flex: 1,
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                style={{
                  ...(active ? activeNavLink : navLink),
                  position: "relative",
                }}
              >
                {active && (
                  <div
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "3px",
                      height: "16px",
                      background: "var(--accent)",
                      borderRadius: "0 3px 3px 0",
                    }}
                  />
                )}
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div
          style={{
            padding: "8px",
            borderTop: "0.5px solid var(--border)",
          }}
        >
          <Link
            href="/"
            onClick={close}
            style={{
              ...navLink,
              color: "var(--text-muted)",
              marginBottom: "2px",
            }}
          >
            ← Back to store
          </Link>
          <form action={logout}>
            <button
              type="submit"
              style={{
                ...navLink,
                width: "100%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                color: "var(--text-muted)",
              }}
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
