import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Review } from "@/types";
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
        <h2 className="text-xl font-medium">Reviews</h2>
        {reviewsWithProfiles.length > 0 && (
          <div className="flex items-center gap-2">
            <StarRating value={Math.round(averageRating)} readonly size="sm" />
            <span className="text-sm text-text-muted">
              {averageRating.toFixed(1)} · {reviewsWithProfiles.length}{" "}
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

      {user && !hasPurchased && !userReview && (
        <div className="bg-surface border border-border rounded-xl px-5 py-4 mb-8 text-sm text-text-muted">
          Only verified buyers can leave a review.
        </div>
      )}

      {/* Lista */}
      {reviewsWithProfiles.length === 0 ? (
        <p className="text-text-muted text-sm text-center py-8">
          No reviews yet.
        </p>
      ) : (
        <div className="flex flex-col">
          {reviewsWithProfiles.map((review: Review & { profiles: any }) => (
            <div
              key={review.id}
              className="py-5 border-b border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-[10px]">
                  <div className="w-7 h-7 rounded-full bg-accent-bg border border-accent-border flex items-center justify-center text-xs text-accent-text font-medium">
                    {(review.profiles?.full_name ?? "A")[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">
                    {review.profiles?.full_name ?? "Anonymous"}
                  </span>
                  <StarRating value={review.rating} readonly size="sm" />
                </div>
                <span className="text-xs text-text-muted">
                  {new Date(review.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              {review.comment && (
                <p className="text-sm text-text-secondary leading-relaxed pl-[38px]">
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
