"use client";

import Link from "next/link";
import { Product } from "@/types";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { toast } from "sonner";
import ProductImage from "./ProductImage";

type Props = {
  product: Product;
};

function getProductBadge(product: Product) {
  if (product.stock === 0) return { label: "Sold out", type: "sold" };
  if (product.stock <= 5) return { label: "Low stock", type: "low" };
  if (
    new Date(product.created_at) >
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ) {
    return { label: "New", type: "new" };
  }
  return null;
}

const BADGE_CLASSES: Record<string, string> = {
  new: "bg-gold-bg text-gold border border-gold-border",
  low: "bg-coral-bg text-coral-text border border-coral-border",
  sold: "bg-[#ffffff10] text-[#ffffff40] border border-[#ffffff15]",
};

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const cartQuantity = useCartStore(
    (state) => state.items.find((i) => i.product.id === product.id)?.quantity ?? 0,
  );
  const badge = getProductBadge(product);

  const isOutOfStock = product.stock === 0;
  const isMaxReached = !isOutOfStock && cartQuantity >= product.stock;

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (isOutOfStock || isMaxReached) return;
    addItem(product);
    toast.success(`${product.name} added to cart`);
  }

  return (
    <Link href={`/products/${product.slug}`} className="no-underline">
      <div className="bg-surface border border-border rounded-xl overflow-hidden transition-all duration-200 cursor-pointer hover:border-accent-border hover:-translate-y-0.5">
        {/* Image */}
        <div className="aspect-square bg-bg-subtle relative overflow-hidden">
          <ProductImage
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 hover:scale-[1.04]"
          />

          {badge && (
            <div
              className={`absolute top-2.5 left-2.5 text-[10px] font-medium px-2 py-0.5 rounded ${BADGE_CLASSES[badge.type]}`}
            >
              {badge.label}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3.5">
          {product.categories && (
            <p className="text-[10px] text-text-muted uppercase tracking-[0.5px] mb-1">
              {product.categories.name}
            </p>
          )}
          <p className="text-sm font-medium font-sora text-text mb-3 truncate">
            {product.name}
          </p>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[15px] font-medium text-text">
              {formatPrice(product.price)}
            </span>

            <button
              onClick={handleAdd}
              disabled={isOutOfStock || isMaxReached}
              className={`w-full sm:w-auto text-[11px] bg-bg-subtle border border-border rounded-md px-3 py-2.5 sm:py-2 transition-all duration-200 min-h-[44px] ${
                isOutOfStock || isMaxReached
                  ? "text-text-muted cursor-not-allowed"
                  : "text-text-secondary cursor-pointer hover:bg-accent-bg hover:border-accent-border hover:text-accent-text"
              }`}
            >
              {isOutOfStock ? "Sold out" : isMaxReached ? "Max reached" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
