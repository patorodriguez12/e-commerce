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
    <section className="max-w-[1200px] mx-auto px-6 py-12 border-t border-border">
      <h2 className="text-lg font-medium mb-6 tracking-[-0.3px]">
        Related products
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
