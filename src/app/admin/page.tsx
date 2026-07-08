import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils/formatPrice";
import { STATUS_STYLES } from "@/lib/constants";
import Link from "next/link";

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
      <h1 className="text-[22px] font-medium tracking-[-0.5px] mb-8">
        Dashboard
      </h1>

      {/* Metrics */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3 mb-8">
        {METRICS.map((m) => (
          <div
            key={m.label}
            className="rounded-xl p-4"
            style={{
              background: m.bg,
              border: `0.5px solid ${m.border}`,
            }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <span style={{ color: m.accent }} className="flex">
                {m.icon}
              </span>
              <p className="text-[11px] uppercase tracking-[0.5px] text-text-muted">
                {m.label}
              </p>
            </div>
            <p className="text-2xl font-medium" style={{ color: m.accent }}>
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-surface border border-border rounded-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-medium">Recent orders</h2>
          <Link
            href="/admin/orders"
            className="text-xs text-text-muted no-underline transition-colors duration-150 hover:text-text-secondary"
          >
            View all →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-12 px-6">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="mx-auto mb-3 text-text-muted opacity-40"
            >
              <path d="M3 6H21L19 18H5L3 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="8" cy="20" r="1.5" fill="currentColor" />
              <circle cx="16" cy="20" r="1.5" fill="currentColor" />
              <path d="M6 6V4C6 2.5 7.5 2 12 2C16.5 2 18 2.5 18 4V6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p className="text-sm text-text-muted">
              No orders yet
            </p>
            <p className="text-xs text-text-muted mt-1 opacity-60">
              Orders will appear here once customers start purchasing.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Order", "Date", "Status", "Total"].map((h) => (
                  <th
                    key={h}
                    className={`${h === "Date" ? "desktop-only" : ""} px-5 py-2.5 text-[11px] text-text-muted uppercase tracking-[0.5px] font-medium ${h === "Total" ? "text-right" : "text-left"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order: { id: string; total: number; status: string; created_at: string }) => (
                <tr
                  key={order.id}
                  className="border-b border-border"
                >
                  <td className="px-5 py-3 font-mono text-xs text-text-secondary">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="desktop-only px-5 py-3 text-xs text-text-muted">
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className="text-[11px] font-medium px-[10px] py-[3px] rounded-full"
                      style={STATUS_STYLES[order.status] ?? {}}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-medium">
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
