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
      className={`w-full px-6 py-[13px] rounded-lg text-sm font-medium transition-all duration-200 border-none ${
        isOutOfStock || isMaxReached
          ? "bg-elevated text-text-muted cursor-not-allowed"
          : "bg-accent text-white cursor-pointer"
      }`}
    >
      {isOutOfStock ? "Out of stock" : isMaxReached ? "Max reached" : added ? "✓ Added" : "Add to cart"}
    </button>
  );
}
