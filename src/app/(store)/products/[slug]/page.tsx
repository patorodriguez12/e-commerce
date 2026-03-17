import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/products/AddToCartButton";
import WishlistButton from "@/components/products/WishlistButton";
import RelatedProducts from "@/components/products/RelatedProducts";
import { formatPrice } from "@/lib/utils/formatPrice";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("name, description")
    .eq("slug", slug)
    .single();

  if (!product) return {};

  return {
    title: product.name,
    description: product.description ?? undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: product } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .eq("slug", slug)
    .single();

  if (!product) notFound();

  // Verificar si está en wishlist
  let isWishlisted = false;
  if (user) {
    const { data: wishlistItem } = await supabase
      .from("wishlists")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", product.id)
      .single();

    isWishlisted = !!wishlistItem;
  }

  return (
    <>
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Imagen */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            {product.categories && (
              <span className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                {product.categories.name}
              </span>
            )}
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            <p className="text-2xl font-bold mb-4">
              {formatPrice(product.price)}
            </p>

            {product.description && (
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>
            )}

            <p className="text-sm text-gray-500 mb-6">
              {product.stock > 0
                ? `${product.stock} units available`
                : "Out of stock"}
            </p>

            <div className="flex gap-3">
              <div className="flex-1">
                <AddToCartButton product={product} />
              </div>
              <WishlistButton
                productId={product.id}
                initialIsWishlisted={isWishlisted}
                isLoggedIn={!!user}
              />
            </div>
          </div>
        </div>
      </main>

      <RelatedProducts
        categoryId={product.category_id}
        currentProductId={product.id}
      />
    </>
  );
}
