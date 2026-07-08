import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils/formatPrice";
import Link from "next/link";
import Image from "next/image";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
  await requireAdmin();
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*, categories(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
        }}
      >
        <h1
          style={{
            fontSize: "22px",
            fontWeight: "500",
            letterSpacing: "-0.5px",
          }}
        >
          Products
        </h1>
        <Link
          href="/admin/products/new"
          style={{
            background: "var(--accent)",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          + New product
        </Link>
      </div>

      <div
        style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
          borderRadius: "12px",
        }}
      >
        <div className="overflow-x-auto">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "0.5px solid var(--border)" }}>
              {["Product", "Category", "Price", "Stock", "Actions"].map((h) => (
                <th
                  key={h}
                  className={h === "Category" || h === "Actions" ? "desktop-only" : ""}
                  style={{
                    padding: "12px 20px",
                    textAlign: "left",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontWeight: "500",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!products?.length ? (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    padding: "48px 24px",
                    textAlign: "center",
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{
                      margin: "0 auto 12px",
                      color: "var(--text-muted)",
                      opacity: 0.4,
                    }}
                  >
                    <path d="M3 7L12 3L21 7V17L12 21L3 17V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M12 14L21 10" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 14L3 10" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 14V21" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                    No products yet
                  </p>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "12px",
                      marginTop: "4px",
                      opacity: 0.6,
                    }}
                  >
                    Create your first product to start selling.
                  </p>
                  <Link
                    href="/admin/products/new"
                    style={{
                      display: "inline-block",
                      marginTop: "16px",
                      background: "var(--accent)",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    Create product
                  </Link>
                </td>
              </tr>
            ) : (
              products?.map((product: any) => (
              <tr
                key={product.id}
                style={{ borderBottom: "0.5px solid var(--border)" }}
              >
                <td style={{ padding: "14px 20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "36px",
                        height: "36px",
                        flexShrink: 0,
                        borderRadius: "6px",
                        overflow: "hidden",
                        background: "var(--bg-subtle)",
                      }}
                    >
                      {product.image_url && (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      )}
                    </div>
                    <span
                      style={{
                        fontWeight: "500",
                        color: "var(--text-primary)",
                      }}
                    >
                      {product.name}
                    </span>
                  </div>
                </td>
                <td
                  className="desktop-only"
                  style={{ padding: "14px 20px", color: "var(--text-muted)" }}
                >
                  {product.categories?.name ?? "—"}
                </td>
                <td style={{ padding: "14px 20px", fontWeight: "500" }}>
                  {formatPrice(product.price)}
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "500",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      ...(product.stock > 0
                        ? {
                            background: "var(--green-bg)",
                            color: "var(--green-text)",
                            border: "0.5px solid var(--green-border)",
                          }
                        : {
                            background: "var(--coral-bg)",
                            color: "var(--coral-text)",
                            border: "0.5px solid var(--coral-border)",
                          }),
                    }}
                  >
                    {product.stock > 0
                      ? `${product.stock} units`
                      : "Out of stock"}
                  </span>
                </td>
                <td className="desktop-only" style={{ padding: "14px 20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      style={{
                        fontSize: "12px",
                        color: "var(--accent-text)",
                        textDecoration: "none",
                      }}
                    >
                      Edit
                    </Link>
                    <DeleteProductButton productId={product.id} />
                  </div>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
