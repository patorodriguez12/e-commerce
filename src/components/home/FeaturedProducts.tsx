import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types";
import ProductCard from "@/components/products/ProductCard";

export default async function FeaturedProducts() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(8);

  if (!products || products.length === 0) return null;

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-gold text-lg">✦</span>
        <h2 className="text-xl font-medium font-sora text-text tracking-tight">
          Featured products
        </h2>
        <div className="flex-1 h-px bg-border ml-4" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product as Product} />
        ))}
      </div>
    </section>
  );
}
