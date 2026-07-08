import { createClient } from "@/lib/supabase/server";
import { Order } from "@/types";
import { formatPrice } from "@/lib/utils/formatPrice";
import Link from "next/link";

function statusClasses(status: string) {
  const map: Record<string, string> = {
    paid: "bg-green-bg text-green-text border-green-border",
    pending: "bg-[#BA751718] text-[#EF9F27] border-[#BA751740]",
    shipped: "bg-[#185FA518] text-[#378ADD] border-[#185FA540]",
    delivered: "bg-accent-bg text-accent-text border-accent-border",
    cancelled: "bg-coral-bg text-coral-text border-coral-border",
  };
  return map[status] ?? "";
}

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
      <h1 className="text-[22px] font-medium tracking-[-0.5px] mb-6">
        My Orders
      </h1>

      {!orders || orders.length === 0 ? (
        <div className="text-center py-16 px-6 bg-surface border border-border rounded-xl">
          <p className="text-[28px] mb-3 text-gold opacity-50">◆</p>
          <p className="text-text-muted mb-5 text-sm">No orders yet</p>
          <Link
            href="/"
            className="bg-accent text-white px-6 py-[10px] rounded-lg no-underline text-sm font-medium transition-colors duration-150"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {orders.map((order: Order) => (
            <Link
              key={order.id}
              href={`/dashboard/orders/${order.id}`}
              className="card-hover block bg-surface border border-border rounded-xl px-5 py-4 no-underline"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-1 min-w-0">
                  <p className="text-sm font-medium text-text font-mono">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-xs text-text-muted">
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-text-muted">
                    {order.order_items?.length ?? 0} item
                    {(order.order_items?.length ?? 0) !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-[6px] shrink-0">
                  <span
                    className={`text-[11px] font-medium px-[10px] py-[3px] rounded-full border ${statusClasses(order.status)}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                  <p className="text-base font-medium text-text">
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
