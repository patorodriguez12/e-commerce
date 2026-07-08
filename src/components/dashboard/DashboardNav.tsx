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
      <aside className="desktop-only w-[200px] shrink-0">
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          {/* Header */}
          <div className="px-5 pt-5 pb-4 border-b border-border">
            <p className="text-sm font-medium text-text mb-1 truncate">
              {fullName}
            </p>
            <p className="text-[11px] text-text-muted uppercase tracking-[1px]">
              Account
            </p>
          </div>

          {/* Nav */}
          <nav className="p-2">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm no-underline transition-all duration-150 relative ${
                    active
                      ? "text-accent-text bg-accent-bg"
                      : "text-text-secondary bg-transparent hover:bg-elevated hover:text-text"
                  }`}
                >
                  {active && (
                    <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-accent rounded-r-sm" />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Links + logout */}
          <div className="p-2 border-t border-border">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-sm text-text-muted no-underline mb-0.5 transition-all duration-150 hover:text-text hover:bg-elevated"
            >
              ← Store
            </Link>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Mobile tabs */}
      <div className="mobile-only mb-6">
        <div className="flex gap-1 overflow-x-auto pb-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 px-4 py-2 rounded-lg text-sm no-underline transition-all duration-150 whitespace-nowrap ${
                  active
                    ? "text-white bg-accent font-medium border-0"
                    : "text-text-secondary bg-surface font-normal border border-border"
                }`}
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
