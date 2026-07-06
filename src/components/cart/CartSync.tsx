"use client";

import { useEffect, useRef } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { createClient } from "@/lib/supabase/client";
import { syncCart, getCart } from "@/lib/supabase/actions";

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

    async function syncToServer() {
      const currentItems = useCartStore.getState().items;
      if (currentItems.length === 0) return;

      await syncCart(
        currentItems.map((i) => ({
          product_id: i.product.id,
          quantity: i.quantity,
        })),
      );
    }

    async function handleAuthSession() {
      if (initialSyncing.current) return;
      initialSyncing.current = true;

      const serverItems = await getCart();
      if (!alive) return;

      if (serverItems.length > 0 || useCartStore.getState().items.length > 0) {
        mergeWithServer(serverItems);
      }

      await syncToServer();
      if (!alive) return;

      // Re-fetch from server to get corrected quantities after stock validation
      const correctedItems = await getCart();
      if (!alive) return;
      replaceItems(correctedItems);

      readyForSync.current = true;
      initialSyncing.current = false;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        readyForSync.current = false;
        handleAuthSession();
      }
      if (event === "SIGNED_OUT") {
        readyForSync.current = false;
        initialSyncing.current = false;
      }
    });

    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!alive) return;

      if (session) {
        if (initialSyncing.current) return;
        initialSyncing.current = true;

        const serverItems = await getCart();
        if (!alive) return;

        replaceItems(serverItems);

        await syncToServer();
        if (!alive) return;

        readyForSync.current = true;
        initialSyncing.current = false;
      }
    }

    init();

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

      syncing.current = false;
    }

    doSync();
  }, [items]);

  return null;
}
