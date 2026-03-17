import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types";
import ProductCard from "./ProductCard";

type Props = {
  categoryId: string | null;
  currentProductId: string;
};

export default async function RelatedProducts({
  categoryId,
  currentProductId,
}: Props) {
  if (!categoryId) return null;

  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .eq("category_id", categoryId)
    .neq("id", currentProductId)
    .limit(4);

  if (!products || products.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-4 py-12 border-t">
      <h2 className="text-xl font-bold mb-6">Related products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
