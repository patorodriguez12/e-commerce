"use client";

import { useEffect, useRef } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { createClient } from "@/lib/supabase/client";
import { syncCart, getCart } from "@/lib/supabase/actions";

const SYNCED_FLAG = "cart-synced";

function isSynced() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SYNCED_FLAG) === "true";
}

function markSynced() {
  localStorage.setItem(SYNCED_FLAG, "true");
}

function clearSynced() {
  localStorage.removeItem(SYNCED_FLAG);
}

export default function CartSync() {
  const items = useCartStore((s) => s.items);
  const mergeWithServer = useCartStore((s) => s.mergeWithServer);
  const replaceItems = useCartStore((s) => s.replaceItems);
  const syncing = useRef(false);
  const readyForSync = useRef(false);
  const initialSyncing = useRef(false);

  useEffect(() => {
    const supabase = createClient();
    let alive = true;

    async function doInitialSync() {
      if (initialSyncing.current) return;
      initialSyncing.current = true;

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!alive) return;
      if (!session) {
        clearSynced();
        initialSyncing.current = false;
        return;
      }

      const serverItems = await getCart();
      if (!alive) return;

      const wasSynced = isSynced();
      if (wasSynced) {
        replaceItems(serverItems);
      } else {
        if (serverItems.length > 0 || items.length > 0) {
          mergeWithServer(serverItems);
        }
      }

      const merged = useCartStore.getState().items;
      if (merged.length > 0) {
        await syncCart(
          merged.map((i) => ({
            product_id: i.product.id,
            quantity: i.quantity,
          })),
        );
        if (!alive) return;
      }

      markSynced();
      readyForSync.current = true;
      initialSyncing.current = false;
    }

    doInitialSync();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        clearSynced();
        readyForSync.current = false;
        doInitialSync();
      }
      if (event === "SIGNED_OUT") {
        clearSynced();
      }
    });

    return () => {
      alive = false;
      initialSyncing.current = false;
      subscription.unsubscribe();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!readyForSync.current) return;

    async function doSync() {
      if (syncing.current) return;
      syncing.current = true;

      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        syncing.current = false;
        return;
      }

      await syncCart(
        items.map((i) => ({
          product_id: i.product.id,
          quantity: i.quantity,
        })),
      );

      markSynced();
      syncing.current = false;
    }

    doSync();
  }, [items]);

  return null;
}
