import { Product } from "@/types";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  total: number;
  hideTotalLabel?: boolean;
};

export default function ProductGrid({
  products,
  total,
  hideTotalLabel = false,
}: Props) {
  if (products.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 text-center">
        <p className="text-4xl mb-4">🔍</p>
        <p className="text-lg font-semibold mb-1">No products found</p>
        <p className="text-sm text-gray-500">
          Try adjusting your filters or search term
        </p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      {!hideTotalLabel && (
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            marginBottom: "16px",
          }}
        >
          {total} {total === 1 ? "product" : "products"} found
        </p>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
