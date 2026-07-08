"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { useSyncExternalStore } from "react";
import { logout } from "@/lib/supabase/actions";

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (cb: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    [query]
  );

  const getSnapshot = useCallback(() => {
    return window.matchMedia(query).matches;
  }, [query]);

  return useSyncExternalStore(subscribe, getSnapshot);
}

const NAV_ITEMS = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
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
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
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
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
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
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
        <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1 14C1 11 3 9 6 9C9 9 11 11 11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="11" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 9C12.5 9 14.5 10 15 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

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
          className="fixed top-4 left-4 z-60 bg-surface border border-border rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer text-text-secondary transition-colors duration-150 hover:text-text"
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
        <div onClick={close} className="fixed inset-0 bg-black/60 z-40" />
      )}

      <aside
        className={`flex flex-col shrink-0 bg-[#0d0d0d] border-r border-border transition-transform duration-200 ${
          isMobile
            ? "fixed left-0 top-0 h-dvh z-50 w-65"
            : "w-55"
        } ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""}`}
      >
        <div className="px-5 pb-4 pt-5 border-b border-border">
          <p className="text-sm font-medium text-text">Admin Panel</p>
          <p className="text-[11px] text-text-muted mt-0.5">Smartech</p>
        </div>

        <nav className="flex-1 p-2 flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] no-underline transition-all duration-150 relative ${
                  active
                    ? "text-accent-text bg-accent-bg"
                    : "text-text-secondary hover:text-accent-text hover:bg-accent-bg"
                }`}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4 bg-accent rounded-r-[3px]" />
                )}
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-border">
          <Link
            href="/"
            onClick={close}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] no-underline transition-all duration-150 text-text-muted mb-0.5 hover:text-accent-text hover:bg-accent-bg"
          >
            ← Back to store
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] w-full bg-transparent border-none cursor-pointer text-left text-text-muted transition-all duration-150 hover:text-accent-text hover:bg-accent-bg"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
