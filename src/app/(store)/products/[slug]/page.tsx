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
      <main
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* Imagen */}
          <div
            style={{
              position: "relative",
              aspectRatio: "1",
              borderRadius: "16px",
              overflow: "hidden",
              background: "var(--bg-subtle)",
              border: "0.5px solid var(--border)",
            }}
          >
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                  fontSize: "13px",
                }}
              >
                No image
              </div>
            )}
          </div>

          {/* Info */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {/* Categoría y nombre */}
            <div>
              {(product.categories as any) && (
                <p
                  style={{
                    fontSize: "11px",
                    color: "var(--accent-text)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "10px",
                    background: "var(--accent-bg)",
                    border: "0.5px solid var(--accent-border)",
                    borderRadius: "20px",
                    padding: "3px 12px",
                    display: "inline-block",
                  }}
                >
                  {(product.categories as any).name}
                </p>
              )}
              <h1
                style={{
                  fontSize: "clamp(24px, 4vw, 36px)",
                  fontWeight: "500",
                  letterSpacing: "-0.5px",
                  lineHeight: "1.1",
                  color: "var(--text-primary)",
                }}
              >
                {product.name}
              </h1>
            </div>

            {/* Precio y stock */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid var(--border)",
              }}
            >
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: "500",
                  letterSpacing: "-1px",
                }}
              >
                {formatPrice(product.price)}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: stockStatus.color,
                  background: "#ffffff08",
                  border: "0.5px solid #ffffff12",
                  borderRadius: "20px",
                  padding: "4px 12px",
                }}
              >
                {stockStatus.label}
              </span>
            </div>

            {/* Descripción */}
            {product.description && (
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {product.description}
              </p>
            )}

            {/* Acciones */}
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ flex: 1 }}>
                <AddToCartButton product={product} />
              </div>
              <WishlistButton
                productId={product.id}
                initialIsWishlisted={isWishlisted}
                isLoggedIn={!!user}
              />
            </div>

            {/* Info extra */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "16px",
                background: "var(--bg-card)",
                border: "0.5px solid var(--border)",
                borderRadius: "10px",
              }}
            >
              {[
                { icon: "🚚", text: "Free shipping on orders over $99" },
                { icon: "↩️", text: "30-day return policy" },
                { icon: "🔒", text: "Secure checkout with Stripe" },
              ].map((item) => (
                <div
                  key={item.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ fontSize: "14px" }}>{item.icon}</span>
                  <span
                    style={{ fontSize: "12px", color: "var(--text-secondary)" }}
                  >
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
