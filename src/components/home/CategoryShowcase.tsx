import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const CATEGORY_ICONS: Record<string, string> = {
  headphones: "🎧",
  speakers: "🔊",
  cameras: "📷",
  laptops: "💻",
  accessories: "⌨️",
  audio: "🎵",
  video: "📹",
  gaming: "🎮",
  phones: "📱",
  tablets: "📲",
  watches: "⌚",
  default: "📦",
};

function getIcon(slug: string) {
  return CATEGORY_ICONS[slug] ?? CATEGORY_ICONS.default;
}

export default async function CategoryShowcase() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (!categories || categories.length === 0) return null;

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-6 h-px bg-accent" />
        <h2 className="text-xl font-medium font-sora text-text tracking-tight">
          Shop by category
        </h2>
        <div className="flex-1 h-px bg-border ml-4" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/catalog?category=${cat.slug}`}
            className="flex flex-col items-center gap-3 bg-surface border border-border rounded-xl px-4 py-6 no-underline transition-all duration-200 hover:border-accent-border hover:-translate-y-0.5"
          >
            <span className="text-2xl">{getIcon(cat.slug)}</span>
            <span className="text-xs text-text-secondary font-medium text-center">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
