"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitReview } from "@/lib/supabase/actions";
import StarRating from "./StarRating";

type Props = {
  productId: string;
  existingReview?: { rating: number; comment: string | null };
};

export default function ReviewForm({ productId, existingReview }: Props) {
  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!rating) {
      setError("Please select a rating");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("rating", String(rating));

    const result = await submitReview(productId, formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    router.refresh();
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700">
        ✓ Your review has been submitted. Thank you!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="review-rating" className="block text-sm font-medium mb-2">Your rating</label>
        <div id="review-rating">
          <StarRating value={rating} onChange={setRating} size="lg" />
        </div>
      </div>

      <div>
        <label htmlFor="review-comment" className="block text-sm font-medium mb-1">
          Comment <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="review-comment"
          name="comment"
          rows={3}
          defaultValue={existingReview?.comment ?? ""}
          placeholder="Share your experience with this product..."
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading || !rating}
        className="bg-black text-white px-6 py-2 rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50 transition-colors"
      >
        {loading
          ? "Submitting..."
          : existingReview
            ? "Update review"
            : "Submit review"}
      </button>
    </form>
  );
}
