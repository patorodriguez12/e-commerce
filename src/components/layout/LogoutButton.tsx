"use client";

import { useTransition } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { logout } from "@/lib/supabase/actions";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const [pending, startTransition] = useTransition();
  const clearCart = useCartStore((state) => state.clearCart);

  function handleLogout() {
    clearCart();
    startTransition(async () => {
      await logout();
    });
  }

  return (
    <button
      onClick={handleLogout}
      disabled={pending}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "100%",
        padding: "8px 12px",
        borderRadius: "6px",
        fontSize: "13px",
        color: "var(--text-muted)",
        background: "transparent",
        border: "none",
        cursor: pending ? "not-allowed" : "pointer",
        opacity: pending ? 0.5 : 1,
        transition: "all 0.15s",
        textAlign: "left",
      }}
      onMouseEnter={(e) => {
        if (!pending) {
          (e.currentTarget as HTMLButtonElement).style.background =
            "var(--coral-bg)";
          (e.currentTarget as HTMLButtonElement).style.color =
            "var(--coral-text)";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        (e.currentTarget as HTMLButtonElement).style.color =
          "var(--text-muted)";
      }}
    >
      <LogOut size={14} />
      Sign out
    </button>
  );
}
