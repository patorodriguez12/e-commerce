import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Review } from "@/types";
import StarRating from "./StarRating";
import ReviewForm from "./ReviewForm";

type Props = {
  productId: string;
};

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
    <section className="max-w-5xl mx-auto px-4 py-12 border-t">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-xl font-bold">Reviews</h2>
        {reviewsWithProfiles.length > 0 && (
          <div className="flex items-center gap-2">
            <StarRating value={Math.round(averageRating)} readonly size="sm" />
            <span className="text-sm text-gray-500">
              {averageRating.toFixed(1)} ({reviewsWithProfiles.length}{" "}
              {reviewsWithProfiles.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        )}
      </div>

      {user && hasPurchased && (
        <div className="border rounded-xl p-6 mb-8 bg-gray-50">
          <h3 className="font-semibold mb-4">
            {userReview ? "Edit your review" : "Write a review"}
          </h3>
          <ReviewForm
            productId={productId}
            existingReview={userReview ?? undefined}
          />
        </div>
      )}

      {user && !hasPurchased && !userReview && (
        <p className="text-sm text-gray-500 mb-8 border rounded-xl p-4">
          Only verified buyers can leave a review.
        </p>
      )}

      {reviewsWithProfiles.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No reviews yet. Be the first to review this product.
        </p>
      ) : (
        <div className="space-y-6">
          {reviewsWithProfiles.map((review: Review & { profiles: any }) => (
            <div key={review.id} className="border-b pb-6 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <p className="font-medium text-sm">
                    {review.profiles?.full_name ?? "Anonymous"}
                  </p>
                  <StarRating value={review.rating} readonly size="sm" />
                </div>
                <p className="text-xs text-gray-400">
                  {new Date(review.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              {review.comment && (
                <p className="text-sm text-gray-600 leading-relaxed">
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
