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
      <div className="flex items-center gap-3 bg-green-bg border border-green-border rounded-lg px-4 py-3 text-sm text-green-text">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Your review has been submitted. Thank you!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="review-rating"
          className="block text-sm font-medium mb-2 text-text-secondary"
        >
          Your rating
        </label>
        <div id="review-rating">
          <StarRating value={rating} onChange={setRating} size="lg" />
        </div>
      </div>

      <div>
        <label
          htmlFor="review-comment"
          className="block text-sm font-medium mb-1.5 text-text-secondary"
        >
          Comment{" "}
          <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="review-comment"
          name="comment"
          rows={3}
          defaultValue={existingReview?.comment ?? ""}
          placeholder="Share your experience with this product..."
          className="w-full bg-elevated border border-border rounded-lg px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
        />
      </div>

      {error && <p className="text-coral-text text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading || !rating}
        className="bg-accent text-white px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-40 transition-opacity"
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
