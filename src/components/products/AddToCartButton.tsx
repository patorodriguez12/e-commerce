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
      style={{
        width: "100%",
        padding: "13px 24px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: isOutOfStock || isMaxReached ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        background: added
          ? "var(--accent)"
          : isOutOfStock || isMaxReached
            ? "var(--elevated)"
            : "var(--accent)",
        color: added
          ? "#fff"
          : isOutOfStock || isMaxReached
            ? "var(--text-muted)"
            : "#fff",
        border: "none",
      }}
    >
      {isOutOfStock ? "Out of stock" : isMaxReached ? "Max reached" : added ? "✓ Added" : "Add to cart"}
    </button>
  );
}
