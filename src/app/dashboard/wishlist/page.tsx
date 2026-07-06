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
            background: "var(--surface)",
            border: "0.5px solid var(--border)",
            borderRadius: "12px",
          }}
        >
          <p
            style={{
              fontSize: "28px",
              marginBottom: "12px",
              color: "var(--gold)",
              opacity: 0.5,
            }}
          >
            ◆
          </p>
          <p
            style={{
              color: "var(--text-muted)",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            Your wishlist is empty
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "12px",
          }}
        >
          {items.map((item: any) => (
            <div
              key={item.id}
              className="card-hover"
              style={{
                display: "flex",
                gap: "14px",
                background: "var(--surface)",
                border: "0.5px solid var(--border)",
                borderRadius: "12px",
                padding: "14px",
              }}
            >
              <Link href={`/products/${item.products?.slug}`}>
                <div
                  style={{
                    position: "relative",
                    width: "72px",
                    height: "72px",
                    flexShrink: 0,
                    borderRadius: "8px",
                    overflow: "hidden",
                    background: "var(--elevated)",
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

              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ minWidth: 0 }}>
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
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                    marginTop: "8px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "var(--text)",
                    }}
                  >
                    {formatPrice(item.products?.price ?? 0)}
                  </p>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <Link
                      href={`/products/${item.products?.slug}`}
                      className="btn-ghost"
                      style={{
                        fontSize: "11px",
                        color: "var(--accent-text)",
                        textDecoration: "none",
                        padding: "5px 10px",
                        borderRadius: "6px",
                        border: "0.5px solid var(--accent-border)",
                      }}
                    >
                      View
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await removeFromWishlist(item.product_id);
                      }}
                    >
                      <button
                        type="submit"
                        className="btn-ghost-danger"
                        style={{
                          fontSize: "11px",
                          color: "var(--text-muted)",
                          background: "transparent",
                          border: "0.5px solid var(--border)",
                          borderRadius: "6px",
                          padding: "5px 10px",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
