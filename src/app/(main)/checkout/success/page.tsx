"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import Link from "next/link";

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-[80dvh] flex items-center justify-center p-6">
      <div className="w-[420px] max-w-full flex flex-col items-center gap-4 text-center">
        {/* Checkmark */}
        <div className="w-16 h-16 rounded-full bg-green-bg border border-green-border flex items-center justify-center text-[28px] mb-2 shrink-0">
          ✓
        </div>

        <div>
          <h1 className="text-2xl font-medium tracking-[-0.5px] mb-2">
            Payment successful
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            Your order has been placed successfully. You can track it from your
            dashboard.
          </p>
        </div>

        <div className="flex gap-2.5 mt-2 flex-wrap justify-center">
          <Link
            href="/dashboard/orders"
            className="bg-accent text-white px-6 py-[10px] rounded-lg no-underline text-sm font-medium transition-colors duration-150"
          >
            View my orders
          </Link>
          <Link
            href="/"
            className="bg-transparent text-text-secondary px-6 py-[10px] rounded-lg no-underline text-sm border border-border transition-colors duration-150"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
