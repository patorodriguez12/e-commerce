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
  const [added, setAdded] = useState(false);

  function handleAdd() {
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
      disabled={product.stock === 0}
      style={{
        width: "100%",
        padding: "13px 24px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: product.stock === 0 ? "not-allowed" : "pointer",
        transition: "all 0.15s",
        background: added
          ? "var(--accent)"
          : product.stock === 0
            ? "#ffffff10"
            : "#fff",
        color: added
          ? "#fff"
          : product.stock === 0
            ? "var(--text-muted)"
            : "#000",
        border: "none",
      }}
    >
      {product.stock === 0 ? "Out of stock" : added ? "✓ Added" : "Add to cart"}
    </button>
  );
}
