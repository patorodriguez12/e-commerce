import { Product } from "@/types";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  total: number;
};

export default function ProductGrid({ products, total }: Props) {
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
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-500 mb-4">
        {total} {total === 1 ? "product" : "products"} found
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
