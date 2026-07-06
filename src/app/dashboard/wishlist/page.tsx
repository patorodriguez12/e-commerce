import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils/formatPrice";
import { removeFromWishlist } from "@/lib/supabase/actions";
import Image from "next/image";
import Link from "next/link";

export default async function WishlistPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: items } = await supabase
    .from("wishlists")
    .select("*, products(*, categories(name))")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1
        style={{
          fontSize: "22px",
          fontWeight: "500",
          letterSpacing: "-0.5px",
          marginBottom: "24px",
        }}
      >
        My Wishlist
      </h1>

      {!items || items.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "64px 24px",
            background: "var(--bg-card)",
            border: "0.5px solid var(--border)",
            borderRadius: "12px",
          }}
        >
          <p style={{ fontSize: "32px", marginBottom: "12px" }}>🤍</p>
          <p
            style={{
              color: "var(--text-muted)",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            Your wishlist is empty.
          </p>
          <Link
            href="/"
            style={{
              background: "var(--accent)",
              color: "#fff",
              padding: "10px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "500",
            }}
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {items.map((item: any) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                background: "var(--bg-card)",
                border: "0.5px solid var(--border)",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <Link href={`/products/${item.products?.slug}`}>
                <div
                  style={{
                    position: "relative",
                    width: "64px",
                    height: "64px",
                    flexShrink: 0,
                    borderRadius: "8px",
                    overflow: "hidden",
                    background: "var(--bg-subtle)",
                  }}
                >
                  {item.products?.image_url && (
                    <Image
                      src={item.products.image_url}
                      alt={item.products.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
              </Link>

              <div style={{ flex: 1, minWidth: 0 }}>
                <Link
                  href={`/products/${item.products?.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "var(--text-primary)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.products?.name}
                  </p>
                </Link>
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    marginTop: "2px",
                  }}
                >
                  {item.products?.categories?.name}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    marginTop: "4px",
                  }}
                >
                  {formatPrice(item.products?.price ?? 0)}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  alignItems: "flex-end",
                  flexShrink: 0,
                }}
              >
                <Link
                  href={`/products/${item.products?.slug}`}
                  style={{
                    background: "transparent",
                    color: "var(--accent)",
                    border: "1px solid var(--accent)",
                    padding: "7px 16px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontSize: "12px",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                  }}
                >
                  View product
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await removeFromWishlist(item.product_id);
                  }}
                >
                  <button
                    type="submit"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--text-muted)",
                      fontSize: "12px",
                      cursor: "pointer",
                      padding: "4px",
                    }}
                  >
                    Remove
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
