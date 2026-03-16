"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { toast } from "sonner";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  const formattedPrice = formatPrice(product.price);
  function handleAdd() {
    addItem(product);
    toast.success(`${product.name} added to cart`);
  }

  return (
    <div className="group border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square bg-gray-100">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>
        <div className="p-4">
          {product.categories && (
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              {product.categories.name}
            </span>
          )}
          <h2 className="font-semibold mt-1 text-gray-900">{product.name}</h2>
          <p className="text-lg font-bold mt-2">{formattedPrice}</p>
          <p className="text-sm text-gray-500 mt-1">
            {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          className="w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {product.stock === 0 ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
