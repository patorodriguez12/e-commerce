import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils/formatPrice";
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

  const METRICS = [
    {
      label: "Total Revenue",
      value: formatPrice(totalRevenue),
      color: "bg-green-50 border-green-200",
    },
    {
      label: "Total Orders",
      value: totalOrders,
      color: "bg-blue-50 border-blue-200",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      color: "bg-yellow-50 border-yellow-200",
    },
    {
      label: "Products",
      value: totalProducts ?? 0,
      color: "bg-purple-50 border-purple-200",
    },
    {
      label: "Users",
      value: totalUsers ?? 0,
      color: "bg-gray-50 border-gray-200",
    },
  ];

  // Últimas 5 órdenes
  const recentOrders = orders?.slice(0, 5) ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      {/* Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {METRICS.map((metric) => (
          <div
            key={metric.label}
            className={`border rounded-xl p-4 ${metric.color}`}
          >
            <p className="text-xs text-gray-500 mb-1">{metric.label}</p>
            <p className="text-2xl font-bold">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Órdenes recientes */}
      <div className="border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
          <h2 className="font-semibold">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            View all →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No orders yet</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="text-left text-gray-500">
                <th className="px-6 py-3 font-medium">Order</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentOrders.map((order: any) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-3 font-mono text-xs">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="px-6 py-3 text-gray-500">
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        order.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right font-semibold">
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
