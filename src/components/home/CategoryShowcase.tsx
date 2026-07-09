import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Headphones,
  Laptop,
  Keyboard,
  Music,
  Smartphone,
  Package,
  Monitor,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  headphones: Headphones,
  laptops: Laptop,
  accessories: Keyboard,
  audio: Music,
  smartphones: Smartphone,
  default: Package,
  monitors: Monitor,
};

function CategoryIcon({ slug }: { slug: string }) {
  const Icon = CATEGORY_ICONS[slug] ?? CATEGORY_ICONS.default;
  return <Icon size={22} strokeWidth={1.5} className="text-text-secondary" />;
}

export default async function CategoryShowcase() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (!categories || categories.length === 0) return null;

  return (
    <section className="max-w-300 mx-auto px-6 py-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-6 h-px bg-accent" />
        <h2 className="text-xl font-medium font-sora text-text tracking-tight">
          Shop by category
        </h2>
        <div className="flex-1 h-px bg-border ml-4" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/catalog?category=${cat.slug}`}
            className="flex flex-col items-center gap-3 bg-surface border border-border rounded-xl px-4 py-6 no-underline transition-all duration-200 hover:border-accent-border hover:-translate-y-0.5"
          >
            <CategoryIcon slug={cat.slug} />
            <span className="text-xs text-text-secondary font-medium text-center">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
