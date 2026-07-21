import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Review, Profile } from "@/types";
import StarRating from "./StarRating";
import ReviewForm from "./ReviewForm";

type Props = { productId: string };

export default async function ReviewsSection({ productId }: Props) {
  const supabase = await createClient();
  const adminSupabase = createAdminClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: reviews } = await adminSupabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  const userIds = reviews?.map((r) => r.user_id) ?? [];
  const { data: profiles } =
    userIds.length > 0
      ? await adminSupabase
          .from("profiles")
          .select("id, full_name")
          .in("id", userIds)
      : { data: [] };

  const reviewsWithProfiles =
    reviews?.map((review) => ({
      ...review,
      profiles: profiles?.find((p) => p.id === review.user_id) ?? null,
    })) ?? [];

  const averageRating = reviewsWithProfiles.length
    ? reviewsWithProfiles.reduce((acc, r) => acc + r.rating, 0) /
      reviewsWithProfiles.length
    : 0;

  const userReview = user
    ? reviewsWithProfiles.find((r) => r.user_id === user.id)
    : null;

  let hasPurchased = false;
  if (user) {
    const { data } = await supabase
      .from("order_items")
      .select("id, orders!inner(user_id, status)")
      .eq("product_id", productId)
      .eq("orders.user_id", user.id)
      .eq("orders.status", "paid")
      .limit(1);
    hasPurchased = (data?.length ?? 0) > 0;
  }

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-12 border-t border-border">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-xl font-medium heading-signature">Reviews</h2>
        {reviewsWithProfiles.length > 0 && (
          <div className="flex items-center gap-2.5">
            <StarRating value={Math.round(averageRating)} readonly size="sm" />
            <span className="text-sm text-text-secondary">
              {averageRating.toFixed(1)}
              <span className="text-text-muted mx-1.5">·</span>
              {reviewsWithProfiles.length}{" "}
              {reviewsWithProfiles.length === 1 ? "review" : "reviews"}
            </span>
          </div>
        )}
      </div>

      {/* Formulario */}
      {user && hasPurchased && (
        <div className="bg-surface border border-border rounded-xl p-6 mb-8">
          <h3 className="text-sm font-medium mb-4 text-text-secondary">
            {userReview ? "Edit your review" : "Write a review"}
          </h3>
          <ReviewForm
            productId={productId}
            existingReview={userReview ?? undefined}
          />
        </div>
      )}

      {/* Lista */}
      {reviewsWithProfiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-4 opacity-40"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <p className="text-sm text-text-muted">No reviews yet.</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {reviewsWithProfiles.map((review: Review & { profiles: Pick<Profile, "full_name"> | null }) => (
            <div
              key={review.id}
              className="group py-5 border-b border-border last:border-b-0 transition-colors hover:bg-white/[0.015] -mx-3 px-3 rounded-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent-bg border border-accent-border flex items-center justify-center text-xs text-accent-text font-medium shrink-0">
                    {(review.profiles?.full_name ?? "A")[0].toUpperCase()}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-medium text-text">
                        {review.profiles?.full_name ?? "Anonymous"}
                      </span>
                      <StarRating
                        value={review.rating}
                        readonly
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
                <span className="text-xs text-text-muted shrink-0 mt-0.5">
                  {new Date(review.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              {review.comment && (
                <p className="text-sm text-text-secondary leading-relaxed mt-3 pl-11">
                  {review.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
