import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils/formatPrice";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

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

export default async function AdminOrdersPage() {
  await requireAdmin();
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("*, profiles(full_name), order_items(id)")
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
          Orders
        </h1>
        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          {orders?.length ?? 0} total
        </p>
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
              {["Order", "Customer", "Date", "Items", "Total", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    className={h === "Customer" || h === "Items" ? "desktop-only" : ""}
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
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {!orders?.length && (
              <tr>
                <td
                  colSpan={6}
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
                    <path d="M3 6H21L19 18H5L3 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <circle cx="8" cy="20" r="1.5" fill="currentColor" />
                    <circle cx="16" cy="20" r="1.5" fill="currentColor" />
                    <path d="M6 6V4C6 2.5 7.5 2 12 2C16.5 2 18 2.5 18 4V6" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                    No orders yet
                  </p>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "12px",
                      marginTop: "4px",
                      opacity: 0.6,
                    }}
                  >
                    Orders will appear here once customers start purchasing.
                  </p>
                </td>
              </tr>
            )}
            {orders?.map((order: any) => (
              <tr
                key={order.id}
                style={{ borderBottom: "0.5px solid var(--border)" }}
              >
                <td
                  style={{
                    padding: "14px 20px",
                    fontFamily: "monospace",
                    fontSize: "12px",
                    color: "var(--text-secondary)",
                  }}
                >
                  #{order.id.slice(0, 8).toUpperCase()}
                </td>
                <td
                  className="desktop-only"
                  style={{
                    padding: "14px 20px",
                    color: "var(--text-secondary)",
                  }}
                >
                  {order.profiles?.full_name ?? "Unknown"}
                </td>
                <td
                  style={{
                    padding: "14px 20px",
                    color: "var(--text-muted)",
                    fontSize: "12px",
                  }}
                >
                  {new Date(order.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td
                  className="desktop-only"
                  style={{ padding: "14px 20px", color: "var(--text-muted)" }}
                >
                  {order.order_items?.length ?? 0}
                </td>
                <td style={{ padding: "14px 20px", fontWeight: "500" }}>
                  {formatPrice(order.total)}
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <OrderStatusSelect
                    orderId={order.id}
                    currentStatus={order.status}
                    styles={STATUS_STYLES}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
