"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error starting payment");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Connection error, please try again");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60dvh] flex items-center justify-center flex-col gap-4">
        <p className="text-text-muted text-base">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-[560px] px-6 py-12">
      <h1 className="text-[22px] font-medium tracking-[-0.5px] mb-8">
        Order summary
      </h1>

      {/* Items */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden mb-4">
        {items.map(({ product, quantity }, i) => (
          <div
            key={product.id}
            className={`flex items-center gap-4 px-5 py-4 ${i < items.length - 1 ? "border-b border-border" : ""}`}
          >
            <div className="relative w-[52px] h-[52px] shrink-0 rounded-lg overflow-hidden bg-bg-subtle">
              {product.image_url && (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text truncate">
                {product.name}
              </p>
              <p className="text-xs text-text-muted mt-0.5">
                Qty: {quantity}
              </p>
            </div>
            <p className="text-sm font-medium shrink-0">
              {formatPrice(product.price * quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="bg-surface border border-border rounded-xl px-5 py-4 flex justify-between items-center mb-6">
        <span className="text-sm text-text-secondary">Total</span>
        <span className="text-xl font-medium">
          {formatPrice(getTotalPrice())}
        </span>
      </div>

      {/* Info */}
      <div className="bg-surface border border-border rounded-xl px-5 py-4 mb-6 flex flex-col gap-2.5">
        {[
          { icon: "🔒", text: "Secure checkout powered by Stripe" },
          { icon: "🚚", text: "Free shipping on orders over $99" },
          { icon: "↩️", text: "30-day return policy" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-2.5">
            <span className="text-sm">{item.icon}</span>
            <span className="text-xs text-text-secondary">
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-coral-bg border border-coral-border rounded-lg px-[14px] py-[10px] text-sm text-coral-text mb-4">
          {error}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-accent text-white border-none rounded-xl py-[14px] text-base font-medium disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transition-opacity duration-150"
      >
        {loading ? "Redirecting to Stripe..." : "Pay now"}
      </button>
    </main>
  );
}
