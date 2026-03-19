"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addToWishlist, removeFromWishlist } from "@/lib/supabase/actions";

type Props = {
  productId: string;
  initialIsWishlisted: boolean;
  isLoggedIn: boolean;
};

export default function WishlistButton({
  productId,
  initialIsWishlisted,
  isLoggedIn,
}: Props) {
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleToggle() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    setLoading(true);
    setIsWishlisted((prev) => !prev);
    const result = isWishlisted
      ? await removeFromWishlist(productId)
      : await addToWishlist(productId);
    if (result.error) setIsWishlisted((prev) => !prev);
    setLoading(false);
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      style={{
        padding: "13px 16px",
        borderRadius: "8px",
        border: "0.5px solid",
        borderColor: isWishlisted ? "var(--coral-border)" : "var(--border)",
        background: isWishlisted ? "var(--coral-bg)" : "transparent",
        cursor: "pointer",
        transition: "all 0.15s",
        fontSize: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={(e) => {
        if (!isWishlisted) {
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "var(--coral-border)";
          (e.currentTarget as HTMLButtonElement).style.background =
            "var(--coral-bg)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isWishlisted) {
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "var(--border)";
          (e.currentTarget as HTMLButtonElement).style.background =
            "transparent";
        }
      }}
    >
      {isWishlisted ? "❤️" : "🤍"}
    </button>
  );
}
