"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCloseRef.current();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [isOpen]);

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
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-200 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-75 max-w-[85vw] z-50 bg-surface border-l border-border flex flex-col transition-all duration-300 ease-out ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Link href="/" onClick={onClose} className="flex items-center no-underline">
            <Image
              src="/navbar-logo.png"
              alt="Smartech"
              width={500}
              height={500}
              priority
              className="h-9 w-auto"
            />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="bg-transparent border-none text-text-secondary cursor-pointer p-1 flex"
          >
            <X size={20} />
          </button>
        </div>

        {/* User info */}
        {user && (
          <div className="px-5 py-4 border-b border-border">
            <p className="text-sm font-medium text-text flex items-center gap-2">
              {fullName ?? "Account"}
              {isAdmin && (
                <span className="text-[9px] font-semibold tracking-[0.3px] text-gold bg-gold-bg border border-gold-border rounded px-1.5 py-px uppercase">
                  Admin
                </span>
              )}
            </p>
            {user.email && (
              <p className="text-xs text-text-muted mt-0.5">{user.email}</p>
            )}
          </div>
        )}

        {/* Nav links */}
        <div className="p-2 flex-1 overflow-y-auto">
          {user && (
            <>
              <div className="mx-2 mb-2 mt-3 text-xs uppercase tracking-wider font-medium text-text-muted">
                Account
              </div>
              <div className="flex flex-col gap-0.5">
                {ACCOUNT_LINKS.map((link) => (
                  <SidebarLink
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    isActive={pathname === link.href}
                  >
                    <span className="flex items-center gap-2.5">
                      <link.icon size={14} className="shrink-0" />
                      {link.label}
                    </span>
                  </SidebarLink>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bottom: auth buttons / sign out */}
        <div className="px-4 py-3 border-t border-border">
          {user ? (
            <button
              onClick={handleLogout}
              disabled={pending}
              className={`flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm text-text-muted bg-transparent border-none cursor-pointer transition-all duration-150 text-left ${
                pending
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-coral-bg hover:text-coral-text"
              }`}
            >
              <LogOut size={14} />
              {pending ? "Signing out..." : "Sign out"}
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                onClick={onClose}
                className="w-full text-center text-sm text-text-secondary no-underline px-2.5 py-2.5 rounded-lg border border-border transition-all duration-150 hover:border-border-hover hover:text-text"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="w-full text-center text-sm text-white no-underline px-2.5 py-2.5 rounded-lg bg-accent font-medium transition-all duration-150 hover:brightness-110"
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
      className={`flex items-center px-3 py-2.5 rounded-lg text-sm no-underline transition-all duration-150 ${
        isActive
          ? "bg-bg-subtle text-text font-medium"
          : "text-text-secondary font-normal hover:bg-bg-subtle hover:text-text"
      }`}
    >
      {children}
    </Link>
  );
}
