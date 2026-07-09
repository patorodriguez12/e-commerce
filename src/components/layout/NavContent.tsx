"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
      <nav className="border-b border-border fixed top-0 left-0 right-0 z-30 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center no-underline">
            <Image
              src="/navbar-logo.png"
              alt="Smartech"
              width={500}
              height={500}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/catalog"
              className="text-sm text-text-secondary no-underline transition-all hover:text-text"
            >
              Shop
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <CartButton />

            {/* Desktop user menu */}
            <div className="desktop-only flex items-center gap-2">
              {user ? (
                <UserMenu fullName={fullName ?? "Account"} isAdmin={isAdmin} />
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm text-text-secondary no-underline px-3.5 py-1.5 rounded-md transition-all hover:text-accent-text hover:bg-accent-bg"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="text-sm text-white bg-accent no-underline px-3.5 py-1.5 rounded-md font-medium transition-all hover:brightness-110"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="mobile-only border border-border rounded-md p-1.5 text-text-secondary cursor-pointer flex items-center justify-center transition-colors hover:border-border-hover"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
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
