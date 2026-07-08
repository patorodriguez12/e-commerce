"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { logout } from "@/lib/supabase/actions";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const [pending, setPending] = useState(false);
  const clearCart = useCartStore((state) => state.clearCart);

  async function handleLogout() {
    setPending(true);
    clearCart();
    await logout();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={pending}
      className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm text-text-muted bg-transparent border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-150 text-left hover:bg-coral-bg hover:text-coral-text"
    >
      <LogOut size={14} />
      Sign out
    </button>
  );
}
