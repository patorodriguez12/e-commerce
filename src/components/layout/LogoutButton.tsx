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
      className="text-sm text-gray-600 hover:text-black"
    >
      Logout
    </button>
  );
}
