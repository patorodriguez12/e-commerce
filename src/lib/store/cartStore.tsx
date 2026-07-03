import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";

type CartStore = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.product.id === product.id);

        if (existing) {
          const newQty = Math.min(existing.quantity + quantity, product.stock);
          set({
            items: items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: newQty }
                : i,
            ),
          });
        } else {
          set({
            items: [
              ...items,
              { product, quantity: Math.min(quantity, product.stock) },
            ],
          });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId
              ? { ...i, quantity: Math.min(quantity, i.product.stock) }
              : i,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((acc, i) => acc + i.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (acc, i) => acc + i.product.price * i.quantity,
          0,
        );
      },
    }),
    {
      name: "cart-storage", // name in localStorage
    },
  ),
);
