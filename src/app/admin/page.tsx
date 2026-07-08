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
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M1 16L6 10L10 13L17 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 4H17V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Orders",
      value: totalOrders,
      accent: "#378ADD",
      bg: "#185FA518",
      border: "#185FA540",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 4H16L14.5 14H3.5L2 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="6" cy="15" r="1" fill="currentColor" />
          <circle cx="12" cy="15" r="1" fill="currentColor" />
          <path d="M4 4V3C4 1.5 5 1 9 1C13 1 14 1.5 14 3V4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      label: "Pending",
      value: pendingOrders,
      accent: "#EF9F27",
      bg: "#BA751718",
      border: "#BA751740",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 5V9L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Products",
      value: totalProducts ?? 0,
      accent: "var(--accent-text)",
      bg: "var(--accent-bg)",
      border: "var(--accent-border)",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 5L9 2L16 5V13L9 16L2 13V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9 10L16 7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 10L2 7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 10V16" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      label: "Users",
      value: totalUsers ?? 0,
      accent: "var(--text-secondary)",
      bg: "var(--bg-subtle)",
      border: "var(--border)",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M1 16C1 13 3 11 7 11C11 11 13 13 13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M13 6C14.5 6 16 7.5 16 9.5C16 11.5 14.5 13 13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "8px",
              }}
            >
              <span style={{ color: m.accent, display: "flex" }}>
                {m.icon}
              </span>
              <p
                style={{
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {m.label}
              </p>
            </div>
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
          <div
            style={{
              textAlign: "center",
              padding: "48px 24px",
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
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "13px",
              }}
            >
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
          </div>
        ) : (
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
                {["Order", "Date", "Status", "Total"].map((h) => (
                  <th
                    key={h}
                    className={h === "Date" ? "desktop-only" : ""}
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
                    className="desktop-only"
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
        </div>
        )}
      </div>
    </div>
  );
}
