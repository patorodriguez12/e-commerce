"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import CartDrawer from "@/components/cart/CartDrawer";

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative text-sm text-gray-600 hover:text-black transition-colors"
      >
        🛒
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
