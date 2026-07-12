import { createClient } from "@/lib/supabase/server";
import CategoryCard from "./CategoryCard";

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
          <CategoryCard
            key={cat.id}
            href={`/catalog?category=${cat.slug}`}
            name={cat.name}
            slug={cat.slug}
          />
        ))}
      </div>
    </section>
  );
}
