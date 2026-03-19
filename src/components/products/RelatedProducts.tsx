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
    <section
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "48px 24px",
        borderTop: "0.5px solid var(--border)",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "500",
          marginBottom: "24px",
          letterSpacing: "-0.3px",
        }}
      >
        Related products
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
