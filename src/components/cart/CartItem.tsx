"use client";

import Image from "next/image";
import { useCartStore } from "@/lib/store/cartStore";
import { CartItem as CartItemType } from "@/types";
import { formatPrice } from "@/lib/utils/formatPrice";

type Props = {
  item: CartItemType;
};

export default function CartItem({ item }: Props) {
  const { removeItem, updateQuantity } = useCartStore();
  const { product, quantity } = item;

  const formattedPrice = formatPrice(product.price);

  return (
    <div className="flex gap-4 items-start">
      {/* Imagen */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            Sin imagen
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{product.name}</p>
        <p className="text-sm text-gray-500 mt-0.5">{formattedPrice}</p>

        {/* Controles de cantidad */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            aria-label="Decrease quantity"
            className="w-8 h-8 rounded border border-border flex items-center justify-center text-sm text-text-secondary hover:bg-bg-subtle transition-colors"
          >
            −
          </button>
          <span className="text-sm w-6 text-center text-text">{quantity}</span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            disabled={quantity >= product.stock}
            aria-label="Increase quantity"
            className="w-8 h-8 rounded border border-border flex items-center justify-center text-sm text-text-secondary hover:bg-bg-subtle transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>

      {/* Eliminar */}
      <button
        onClick={() => removeItem(product.id)}
        aria-label={`Remove ${product.name} from cart`}
        className="text-text-muted hover:text-coral-text transition-colors text-lg leading-none mt-1 w-8 h-8 flex items-center justify-center"
      >
        ×
      </button>
    </div>
  );
}
