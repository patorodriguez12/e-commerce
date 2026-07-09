"use client";

import { useState } from "react";
import { useCartDrawer } from "@/lib/store/cartDrawerStore";
import { useCartStore } from "@/lib/store/cartStore";
import { Product } from "@/types";
import { toast } from "sonner";

type Props = { product: Product };

export default function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const openDrawer = useCartDrawer((state) => state.open);
  const cartQuantity = useCartStore(
    (state) => state.items.find((i) => i.product.id === product.id)?.quantity ?? 0,
  );
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.stock === 0;
  const isMaxReached = !isOutOfStock && cartQuantity >= product.stock;

  function handleAdd() {
    if (isOutOfStock || isMaxReached) return;
    addItem(product);
    setAdded(true);
    toast.success(`${product.name} added to cart`);
    setTimeout(() => {
      openDrawer();
      setAdded(false);
    }, 600);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={isOutOfStock || isMaxReached}
      className={`w-full px-6 py-[13px] rounded-lg text-sm font-medium transition-all duration-200 border-none flex items-center justify-center gap-2 ${
        isOutOfStock || isMaxReached
          ? "bg-elevated text-text-muted cursor-not-allowed"
          : "bg-accent text-white cursor-pointer"
      }`}
    >
      {isOutOfStock ? (
        "Out of stock"
      ) : isMaxReached ? (
        "Max reached"
      ) : added ? (
        "✓ Added"
      ) : (
        <>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Add to cart
        </>
      )}
    </button>
  );
}
