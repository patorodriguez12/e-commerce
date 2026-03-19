"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { logout } from "@/lib/supabase/actions";

export default function LogoutButton() {
  const clearCart = useCartStore((state) => state.clearCart);

  async function handleLogout() {
    clearCart();
    await logout();
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        fontSize: "13px",
        color: "var(--text-secondary)",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "6px 12px",
      }}
    >
      Sign out
    </button>
  );
}
