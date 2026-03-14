import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types";
import ProductCard from "@/components/products/ProductCard";
import CategoryFilter from "@/components/products/CategoryFilter";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function HomePage({ searchParams }: Props) {
  const { category } = await searchParams;
  const supabase = await createClient();

  const categoriesQuery = supabase.from("categories").select("*").order("name");

  let productsQuery = supabase
    .from("products")
    .select("*, categories(name, slug)")
    .order("created_at", { ascending: false });

  if (category) {
    productsQuery = productsQuery.eq("categories.slug", category);
  }

  const [{ data: categories }, { data: products, error }] = await Promise.all([
    categoriesQuery,
    productsQuery,
  ]);

  if (error) return <p>Error loading products.</p>;

  const filtered = category
    ? products?.filter((p) => p.categories?.slug === category)
    : products;

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Catalog</h1>
        <p className="text-sm text-gray-500">{filtered?.length} products</p>
      </div>

      <CategoryFilter categories={categories ?? []} active={category ?? null} />

      {filtered?.length === 0 ? (
        <p className="text-center text-gray-500 py-20">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
