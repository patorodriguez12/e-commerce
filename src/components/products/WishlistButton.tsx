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
      className={`px-3.5 py-[13px] rounded-lg cursor-pointer transition-all duration-150 flex items-center justify-center ${
        isWishlisted
          ? "bg-coral-bg border border-coral-border"
          : "bg-transparent border border-border hover:bg-coral-bg hover:border-coral-border"
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={isWishlisted ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isWishlisted ? "text-coral-text" : "text-text-secondary"}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
