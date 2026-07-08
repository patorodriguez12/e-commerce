import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/products/AddToCartButton";
import WishlistButton from "@/components/products/WishlistButton";
import RelatedProducts from "@/components/products/RelatedProducts";
import ReviewsSection from "@/components/products/ReviewsSection";
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
  return { title: product.name, description: product.description ?? undefined };
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

  const stockStatus =
    product.stock === 0
      ? { label: "Out of stock", color: "#ffffff30" }
      : product.stock <= 5
        ? { label: `Only ${product.stock} left`, color: "var(--coral-text)" }
        : { label: `${product.stock} in stock`, color: "var(--green-text)" };

  return (
    <>
      <main className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-16 items-start">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-bg-subtle border border-border">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="size-full flex items-center justify-center text-text-muted text-sm">
                No image
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              {(product.categories as any) && (
                <p className="text-[11px] text-accent-text uppercase tracking-[1px] mb-2.5 bg-accent-bg border border-accent-border rounded-full px-3 py-[3px] inline-block">
                  {(product.categories as any).name}
                </p>
              )}
              <h1 className="text-[clamp(24px,4vw,36px)] font-medium tracking-tight leading-[1.1] text-text">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-4 pb-6 border-b border-border">
              <span className="text-3xl font-medium tracking-tighter">
                {formatPrice(product.price)}
              </span>
              <span
                className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1"
                style={{ color: stockStatus.color }}
              >
                {stockStatus.label}
              </span>
            </div>

            {product.description && (
              <p className="text-sm text-text-secondary leading-[1.8]">
                {product.description}
              </p>
            )}

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

            <div className="flex flex-col gap-2.5 p-4 bg-surface border border-border rounded-xl">
              {[
                { icon: "🚚", text: "Free shipping on orders over $99" },
                { icon: "↩️", text: "30-day return policy" },
                { icon: "🔒", text: "Secure checkout with Stripe" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2.5"
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-xs text-text-secondary">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <ReviewsSection productId={product.id} />
      <RelatedProducts
        categoryId={product.category_id}
        currentProductId={product.id}
      />
    </>
  );
}
