import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
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

export default async function AdminDashboard() {
  await requireAdmin();
  const supabase = await createClient();

  const [{ count: totalProducts }, { count: totalUsers }, { data: orders }] =
    await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase
        .from("orders")
        .select("id, total, status, created_at")
        .order("created_at", { ascending: false }),
    ]);

  const totalRevenue =
    orders
      ?.filter((o) => o.status === "paid")
      .reduce((acc, o) => acc + o.total, 0) ?? 0;
  const totalOrders = orders?.length ?? 0;
  const pendingOrders =
    orders?.filter((o) => o.status === "pending").length ?? 0;
  const recentOrders = orders?.slice(0, 5) ?? [];

  const METRICS = [
    {
      label: "Revenue",
      value: formatPrice(totalRevenue),
      accent: "var(--green-text)",
      bg: "var(--green-bg)",
      border: "var(--green-border)",
    },
    {
      label: "Orders",
      value: totalOrders,
      accent: "#378ADD",
      bg: "#185FA518",
      border: "#185FA540",
    },
    {
      label: "Pending",
      value: pendingOrders,
      accent: "#EF9F27",
      bg: "#BA751718",
      border: "#BA751740",
    },
    {
      label: "Products",
      value: totalProducts ?? 0,
      accent: "var(--accent-text)",
      bg: "var(--accent-bg)",
      border: "var(--accent-border)",
    },
    {
      label: "Users",
      value: totalUsers ?? 0,
      accent: "var(--text-secondary)",
      bg: "var(--bg-subtle)",
      border: "var(--border)",
    },
  ];

  return (
    <div>
      <h1
        style={{
          fontSize: "22px",
          fontWeight: "500",
          letterSpacing: "-0.5px",
          marginBottom: "32px",
        }}
      >
        Dashboard
      </h1>

      {/* Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "12px",
          marginBottom: "32px",
        }}
      >
        {METRICS.map((m) => (
          <div
            key={m.label}
            style={{
              background: m.bg,
              border: `0.5px solid ${m.border}`,
              borderRadius: "10px",
              padding: "16px",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "8px",
              }}
            >
              {m.label}
            </p>
            <p style={{ fontSize: "24px", fontWeight: "500", color: m.accent }}>
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "0.5px solid var(--border)",
          }}
        >
          <h2 style={{ fontSize: "14px", fontWeight: "500" }}>Recent orders</h2>
          <Link
            href="/admin/orders"
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
          >
            View all →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "var(--text-muted)",
              padding: "40px",
              fontSize: "13px",
            }}
          >
            No orders yet
          </p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "0.5px solid var(--border)" }}>
                {["Order", "Date", "Status", "Total"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 20px",
                      textAlign: h === "Total" ? "right" : "left",
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
              {recentOrders.map((order: any) => (
                <tr
                  key={order.id}
                  style={{ borderBottom: "0.5px solid var(--border)" }}
                >
                  <td
                    style={{
                      padding: "12px 20px",
                      fontFamily: "monospace",
                      fontSize: "12px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    #{order.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td
                    style={{
                      padding: "12px 20px",
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
                  <td style={{ padding: "12px 20px" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        ...(STATUS_STYLES[order.status] ?? {}),
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "12px 20px",
                      textAlign: "right",
                      fontWeight: "500",
                    }}
                  >
                    {formatPrice(order.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
