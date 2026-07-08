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
        className="bg-transparent border-none text-text-muted text-xs cursor-pointer p-0 transition-colors duration-150 hover:text-coral-text"
      >
        Delete
      </button>
    </form>
  );
}
