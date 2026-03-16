import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types";
import FilterSidebar from "@/components/products/FilterSidebar";
import ProductGrid from "@/components/products/ProductGrid";
import { SortOption } from "@/lib/hooks/useFilters";

type Props = {
  searchParams: Promise<{
    category?: string;
    sort?: SortOption;
    min?: string;
    max?: string;
    q?: string;
  }>;
};

export default async function HomePage({ searchParams }: Props) {
  const { category, sort = "newest", min, max, q } = await searchParams;
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  let query = supabase.from("products").select("*, categories(name, slug)");

  // Category filter
  if (category) {
    query = query.eq("categories.slug", category);
  }

  // Search filter
  if (q) {
    query = query.ilike("name", `%${q}%`);
  }

  // Min price filter
  if (min) {
    query = query.gte("price", Number(min) * 100);
  }

  // Max price filter
  if (max) {
    query = query.lte("price", Number(max) * 100);
  }

  switch (sort) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "name_asc":
      query = query.order("name", { ascending: true });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data: products, error } = await query;

  if (error) return <p>Error loading products.</p>;

  const filtered = category
    ? (products ?? []).filter((p) => p.categories?.slug === category)
    : (products ?? []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Catalog</h1>

      <div className="flex gap-8 items-start">
        <FilterSidebar categories={categories ?? []} />
        <ProductGrid products={filtered as Product[]} total={filtered.length} />
      </div>
    </main>
  );
}
