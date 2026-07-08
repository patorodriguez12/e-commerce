"use client";

import { deleteProduct } from "@/lib/supabase/admin-actions";

type Props = {
  productId: string;
};

export default function DeleteProductButton({ productId }: Props) {
  return (
    <form
      action={async () => {
        await deleteProduct(productId);
      }}
      onSubmit={(e) => {
        if (
          !confirm(
            "Are you sure you want to delete this product? This action cannot be undone."
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        style={{
          background: "transparent",
          border: "none",
          color: "var(--text-muted)",
          fontSize: "12px",
          cursor: "pointer",
          padding: 0,
          transition: "color 0.15s",
        }}
      >
        Delete
      </button>
    </form>
  );
}
