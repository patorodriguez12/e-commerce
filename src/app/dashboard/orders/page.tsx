import { createClient } from "@/lib/supabase/server";
import { Order } from "@/types";
import { formatPrice } from "@/lib/utils/formatPrice";
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

export default async function OrdersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*, products(name, image_url))")
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
        My Orders
      </h1>

      {!orders || orders.length === 0 ? (
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
            No orders yet
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
            Start shopping
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {orders.map((order: Order) => (
            <Link
              key={order.id}
              href={`/dashboard/orders/${order.id}`}
              style={{
                display: "block",
                background: "var(--surface)",
                border: "0.5px solid var(--border)",
                borderRadius: "12px",
                padding: "16px 20px",
                textDecoration: "none",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "var(--border-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "var(--border)")
              }
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    minWidth: 0,
                  }}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "var(--text-primary)",
                      fontFamily: "monospace",
                    }}
                  >
                    #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {order.order_items?.length ?? 0} item
                    {(order.order_items?.length ?? 0) !== 1 ? "s" : ""}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "6px",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "500",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      ...(STATUS_STYLES[order.status] ?? {}),
                    }}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "var(--text-primary)",
                    }}
                  >
                    {formatPrice(order.total)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
