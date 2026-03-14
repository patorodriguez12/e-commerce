"use client";

import { useState, useSyncExternalStore } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import CartDrawer from "./CartDrawer";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const isClient = useIsClient();
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative text-sm text-gray-600 hover:text-black transition-colors"
      >
        🛒
        {isClient && totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
