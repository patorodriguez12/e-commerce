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

    if (result.error) {
      setIsWishlisted((prev) => !prev);
    }

    setLoading(false);
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors disabled:opacity-50 ${
        isWishlisted
          ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
          : "hover:bg-gray-50 text-gray-500"
      }`}
      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <span className="text-lg">{isWishlisted ? "❤️" : "🤍"}</span>
      <span className="text-sm font-medium">
        {isWishlisted ? "Wishlisted" : "Wishlist"}
      </span>
    </button>
  );
}
