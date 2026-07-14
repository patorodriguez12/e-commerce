"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { useCartDrawer } from "@/lib/store/cartDrawerStore";
import CartItem from "./CartItem";
import Link from "next/link";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function CartDrawer() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { isOpen, close } = useCartDrawer();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [close]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        className={`fixed inset-0 bg-black/75 z-[998] transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-dvh w-[420px] max-w-full bg-surface border-l border-border z-[999] flex flex-col transition-transform duration-[0.3s] ease-[cubic-bezier(0.32,0.72,0,1)] overscroll-contain ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
          <div>
            <h2 className="text-base font-medium text-text">Your cart</h2>
            {items.length > 0 && (
              <p className="text-xs text-text-muted mt-0.5">
                {items.reduce((acc, i) => acc + i.quantity, 0)} items
              </p>
            )}
          </div>
          <button
            onClick={close}
            aria-label="Close cart"
            className="bg-bg-subtle border border-border rounded-md text-text-secondary cursor-pointer w-11 h-11 flex items-center justify-center text-xl leading-none transition-colors hover:border-border-hover"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 overscroll-contain">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 min-h-[200px]">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-text-muted"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p className="text-sm text-text-muted">Your cart is empty</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 flex flex-col gap-3 shrink-0">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Total</span>
              <span className="text-lg font-medium">
                {formatPrice(getTotalPrice())}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={close}
              className="block bg-accent text-white text-center py-3 rounded-lg no-underline text-sm font-medium"
            >
              Checkout
            </Link>
            <button
              onClick={clearCart}
              className="bg-transparent border-none text-text-muted text-xs cursor-pointer p-2 transition-colors duration-150 hover:text-coral-text min-h-[44px] w-full text-center"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
