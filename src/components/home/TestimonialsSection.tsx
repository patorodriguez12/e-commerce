import { createClient } from "@/lib/supabase/server";

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-xs ${i < rating ? "text-gold" : "text-border"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default async function TestimonialsSection() {
  const supabase = await createClient();

  const { data: rows } = await supabase
    .from("reviews")
    .select("id, rating, comment, created_at, profiles(full_name)")
    .gte("rating", 4)
    .order("created_at", { ascending: false })
    .limit(6);

  if (!rows || rows.length === 0) return null;

  type Row = (typeof rows)[number] & {
    profiles: { full_name: string }[] | null;
  };
  const reviews = rows as Row[];

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-6 h-px bg-accent" />
        <h2 className="text-xl font-medium font-sora text-text tracking-tight">
          What our customers say
        </h2>
        <div className="flex-1 h-px bg-border ml-4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-3"
          >
            <Stars rating={review.rating} />
            {review.comment && (
              <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                &ldquo;{review.comment}&rdquo;
              </p>
            )}
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
              <span className="text-xs text-text-muted">
                {review.profiles?.[0]?.full_name ?? "Anonymous"}
              </span>
              <span className="text-[10px] text-text-muted">
                {timeAgo(new Date(review.created_at))}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
