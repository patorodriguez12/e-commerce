"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { Product } from "@/types";

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={product.stock === 0}
      className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
    >
      {product.stock === 0
        ? "Out of stock"
        : added
          ? "✓ Added to cart"
          : "Add to cart"}
    </button>
  );
}
