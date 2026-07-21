"use client";

import { useRef, useTransition } from "react";
import { deleteProduct } from "@/lib/supabase/admin-actions";

type Props = {
  productId: string;
};

export default function DeleteProductButton({ productId }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [pending, startTransition] = useTransition();

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="bg-transparent border-none text-text-muted text-xs cursor-pointer p-0 transition-colors duration-150 hover:text-coral-text"
      >
        Delete
      </button>

      <dialog
        ref={dialogRef}
        className="rounded-xl border border-border bg-surface text-text p-0 backdrop:bg-black/60 backdrop:backdrop-blur-sm"
        style={{ margin: "auto" }}
      >
        <div className="p-6 w-full max-w-sm">
          <h2 className="text-base font-medium mb-2">Delete product</h2>
          <p className="text-sm text-text-secondary mb-6">
            Are you sure? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2.5">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              disabled={pending}
              className="px-4 py-2 text-sm text-text-secondary border border-border rounded-lg cursor-pointer transition-colors hover:border-border-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                startTransition(async () => {
                  await deleteProduct(productId);
                });
              }}
              className="px-4 py-2 text-sm text-white bg-coral border border-coral-border rounded-lg cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {pending && (
                <span className="size-3.5 border-2 border-white/25 border-t-white rounded-full inline-block animate-spin" />
              )}
              {pending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
