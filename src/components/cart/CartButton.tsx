"use client";

import { useSyncExternalStore } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { useCartDrawer } from "@/lib/store/cartDrawerStore";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function CartButton() {
  const isClient = useIsClient();
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const openDrawer = useCartDrawer((state) => state.open);

  return (
    <button
      onClick={openDrawer}
      aria-label="Open cart"
      className="relative bg-transparent border border-border rounded-md px-3 py-2 text-text-secondary cursor-pointer text-sm transition-colors duration-150 flex items-center gap-1.5 hover:border-border-hover min-h-[44px]"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      {isClient && totalItems > 0 && (
        <span className="bg-accent text-white text-[10px] rounded-[10px] px-1.5 py-0.5 font-medium">
          {totalItems}
        </span>
      )}
    </button>
  );
}
