import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types";
import Hero from "@/components/layout/Hero";
import { SortOption } from "@/lib/hooks/useFilters";
import CatalogLayout from "@/components/products/CatalogLayout";

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

  if (category) query = query.eq("categories.slug", category);
  if (q) query = query.ilike("name", `%${q}%`);
  if (min) query = query.gte("price", Number(min) * 100);
  if (max) query = query.lte("price", Number(max) * 100);

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

  return (
    <>
      <Hero />
      <div
        id="catalog"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}
      >
        <CatalogLayout
          categories={categories ?? []}
          products={(products ?? []) as Product[]}
          total={products?.length ?? 0}
        />
      </div>
    </>
  );
}
