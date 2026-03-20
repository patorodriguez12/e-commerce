import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";

const STATUS_STYLES: Record<string, React.CSSProperties> = {
  paid: {
    background: "var(--green-bg)",
    color: "var(--green-text)",
    border: "0.5px solid var(--green-border)",
  },
  pending: {
    background: "#BA751718",
    color: "#EF9F27",
    border: "0.5px solid #BA751740",
  },
  shipped: {
    background: "#185FA518",
    color: "#378ADD",
    border: "0.5px solid #185FA540",
  },
  delivered: {
    background: "var(--accent-bg)",
    color: "var(--accent-text)",
    border: "0.5px solid var(--accent-border)",
  },
  cancelled: {
    background: "var(--coral-bg)",
    color: "var(--coral-text)",
    border: "0.5px solid var(--coral-border)",
  },
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: order } = await supabase
    .from("orders")
    .select("*, order_items(*, products(name, image_url, price))")
    .eq("id", id)
    .eq("user_id", user!.id)
    .single();

  if (!order) notFound();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "8px",
        }}
      >
        <Link
          href="/dashboard/orders"
          style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            textDecoration: "none",
            transition: "color 0.15s",
          }}
        >
          ← Orders
        </Link>
        <span style={{ color: "var(--border)" }}>/</span>
        <h1
          style={{
            fontSize: "16px",
            fontWeight: "500",
            fontFamily: "monospace",
            color: "var(--text-primary)",
          }}
        >
          #{order.id.slice(0, 8).toUpperCase()}
        </h1>
      </div>

      {/* Info card */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
          borderRadius: "12px",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <p
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Date
          </p>
          <p style={{ fontSize: "14px", color: "var(--text-primary)" }}>
            {new Date(order.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div
          style={{
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Status
          </p>
          <span
            style={{
              fontSize: "11px",
              fontWeight: "500",
              padding: "3px 10px",
              borderRadius: "20px",
              ...(STATUS_STYLES[order.status] ?? {}),
            }}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Items */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "0.5px solid var(--border)",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Products
          </p>
        </div>
        <div>
          {order.order_items?.map((item: any, i: number) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "16px 20px",
                borderBottom:
                  i < order.order_items.length - 1
                    ? "0.5px solid var(--border)"
                    : "none",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "52px",
                  height: "52px",
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
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "var(--text-primary)",
                  }}
                >
                  {item.products?.name}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    marginTop: "2px",
                  }}
                >
                  Qty: {item.quantity}
                </p>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "var(--text-primary)",
                }}
              >
                {formatPrice(item.unit_price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
          borderRadius: "12px",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
          Total
        </span>
        <span style={{ fontSize: "20px", fontWeight: "500" }}>
          {formatPrice(order.total)}
        </span>
      </div>
    </div>
  );
}
