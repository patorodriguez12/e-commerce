import { createClient } from "@/lib/supabase/server";
import { Order } from "@/types";
import Link from "next/link";

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-purple-100 text-purple-700",
  cancelled: "bg-red-100 text-red-700",
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
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {!orders || orders.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="mb-4">You have no orders yet.</p>
          <Link
            href="/"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: Order) => (
            <Link
              key={order.id}
              href={`/dashboard/orders/${order.id}`}
              className="block border rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-500">
                    Order #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLES[order.status] ?? "bg-gray-100 text-gray-600"}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                  <p className="font-bold mt-1">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(order.total / 100)}
                  </p>
                </div>
              </div>

              {/* Preview de items */}
              <p className="text-sm text-gray-500">
                {order.order_items?.length ?? 0} item
                {(order.order_items?.length ?? 0) !== 1 ? "s" : ""}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
