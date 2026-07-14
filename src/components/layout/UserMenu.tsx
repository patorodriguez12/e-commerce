"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, User, ShoppingBag, Heart, LogOut, Shield } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { logout } from "@/lib/supabase/actions";

type Props = {
  fullName: string;
  isAdmin?: boolean;
};

const MENU_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: User },
  { href: "/dashboard/orders", label: "My Orders", icon: ShoppingBag },
  { href: "/dashboard/wishlist", label: "My Wishlist", icon: Heart },
];

const linkClass = "flex items-center gap-2.5 px-2.5 py-2.5 rounded-md text-sm text-text-secondary no-underline transition-all duration-100 hover:bg-bg-subtle hover:text-text";

export default function UserMenu({ fullName, isAdmin }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  async function handleLogout() {
    setIsOpen(false);
    setPending(true);
    clearCart();
    await logout();
  }

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 border rounded-lg px-3 py-2.5 text-sm font-medium cursor-pointer transition-all duration-150 min-h-[44px] ${
          isOpen
            ? "bg-bg-subtle border-border-hover text-text-secondary"
            : "bg-transparent border-border text-text-secondary hover:bg-bg-subtle hover:border-border-hover"
        }`}
      >
        {fullName}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute top-[calc(100%+8px)] right-0 w-[200px] bg-[#111111] border border-border rounded-xl overflow-hidden z-50 transition-all duration-150 ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-2 scale-[0.97] pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-border">
          <p className="text-sm font-medium text-text flex items-center gap-2">
            {fullName}
            {isAdmin && (
              <span className="text-[10px] font-semibold tracking-[0.3px] text-gold bg-gold-bg border border-gold-border rounded px-1.5 py-px uppercase flex items-center gap-1">
                <Shield size={10} />
                Admin
              </span>
            )}
          </p>
        </div>

        {/* Links */}
        <div className="p-1.5">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={linkClass}
            >
              <item.icon size={14} className="shrink-0" />
              {item.label}
            </Link>
          ))}
        </div>

        {isAdmin && (
          <div className="p-1.5 pb-0 border-t border-border">
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-md text-sm text-gold no-underline transition-all duration-100 hover:bg-gold-bg"
            >
              <Shield size={14} className="shrink-0" />
              Admin panel
            </Link>
          </div>
        )}

        {/* Sign out */}
        <div className={`p-1.5 ${isAdmin ? "border-t-0" : "border-t border-border"}`}>
          <button
            onClick={handleLogout}
            disabled={pending}
            className={`flex items-center gap-2.5 w-full px-2.5 py-2.5 rounded-md text-sm text-text-muted bg-transparent border-none cursor-pointer transition-all duration-100 text-left ${
              pending
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-coral-bg hover:text-coral-text"
            }`}
          >
            <LogOut size={14} className="shrink-0" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
