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
  mergeWithServer: (serverItems: CartItem[]) => void;
  replaceItems: (items: CartItem[]) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.product.id === product.id);

        if (existing) {
          // If exists, add it to the quantity
          set({
            items: items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
          });
        } else {
          set({ items: [...items, { product, quantity }] });
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
            i.product.id === productId ? { ...i, quantity } : i,
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

      mergeWithServer: (serverItems) => {
        const localItems = get().items;

        if (serverItems.length === 0 && localItems.length > 0) {
          return;
        }

        if (serverItems.length > 0 && localItems.length === 0) {
          set({ items: serverItems });
          return;
        }

        const merged = new Map<string, CartItem>();

        for (const item of serverItems) {
          merged.set(item.product.id, item);
        }

        for (const item of localItems) {
          const existing = merged.get(item.product.id);
          if (existing) {
            merged.set(item.product.id, {
              product: existing.product,
              quantity: Math.max(existing.quantity, item.quantity),
            });
          } else {
            merged.set(item.product.id, item);
          }
        }

        set({ items: Array.from(merged.values()) });
      },

      replaceItems: (items) => {
        set({ items });
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
