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
    <section
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "48px 24px",
        borderTop: "0.5px solid var(--border)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <h2 style={{ fontSize: "20px", fontWeight: "500" }}>Reviews</h2>
        {reviewsWithProfiles.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <StarRating value={Math.round(averageRating)} readonly size="sm" />
            <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              {averageRating.toFixed(1)} · {reviewsWithProfiles.length}{" "}
              {reviewsWithProfiles.length === 1 ? "review" : "reviews"}
            </span>
          </div>
        )}
      </div>

      {/* Formulario */}
      {user && hasPurchased && (
        <div
          style={{
            background: "var(--bg-card)",
            border: "0.5px solid var(--border)",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "32px",
          }}
        >
          <h3
            style={{
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "16px",
              color: "var(--text-secondary)",
            }}
          >
            {userReview ? "Edit your review" : "Write a review"}
          </h3>
          <ReviewForm
            productId={productId}
            existingReview={userReview ?? undefined}
          />
        </div>
      )}

      {user && !hasPurchased && !userReview && (
        <div
          style={{
            background: "var(--bg-card)",
            border: "0.5px solid var(--border)",
            borderRadius: "12px",
            padding: "16px 20px",
            marginBottom: "32px",
            fontSize: "13px",
            color: "var(--text-muted)",
          }}
        >
          Only verified buyers can leave a review.
        </div>
      )}

      {/* Lista */}
      {reviewsWithProfiles.length === 0 ? (
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "14px",
            textAlign: "center",
            padding: "32px 0",
          }}
        >
          No reviews yet.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {reviewsWithProfiles.map((review: Review & { profiles: any }) => (
            <div
              key={review.id}
              style={{
                padding: "20px 0",
                borderBottom: "0.5px solid var(--border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "var(--accent-bg)",
                      border: "0.5px solid var(--accent-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      color: "var(--accent-text)",
                      fontWeight: "500",
                    }}
                  >
                    {(review.profiles?.full_name ?? "A")[0].toUpperCase()}
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: "500" }}>
                    {review.profiles?.full_name ?? "Anonymous"}
                  </span>
                  <StarRating value={review.rating} readonly size="sm" />
                </div>
                <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                  {new Date(review.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              {review.comment && (
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    lineHeight: "1.7",
                    paddingLeft: "38px",
                  }}
                >
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
