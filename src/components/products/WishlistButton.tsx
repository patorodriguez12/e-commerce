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
      className={`px-4 py-[13px] rounded-lg cursor-pointer transition-all duration-150 text-lg flex items-center justify-center ${
        isWishlisted
          ? "bg-coral-bg border border-coral-border"
          : "bg-transparent border border-border hover:bg-coral-bg hover:border-coral-border"
      }`}
    >
      {isWishlisted ? "❤️" : "🤍"}
    </button>
  );
}
