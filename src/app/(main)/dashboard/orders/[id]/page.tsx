import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils/formatPrice";
import ProductImage from "@/components/products/ProductImage";
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
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Link
          href="/dashboard/orders"
          className="text-sm text-text-muted no-underline transition-colors duration-150"
        >
          ← Orders
        </Link>
        <span className="text-border">/</span>
        <h1 className="text-base font-medium font-mono text-text">
          #{order.id.slice(0, 8).toUpperCase()}
        </h1>
      </div>

      {/* Info card */}
      <div className="bg-surface border border-border rounded-xl p-5 flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="text-[11px] text-text-muted uppercase tracking-[0.5px]">
            Date
          </p>
          <p className="text-sm text-text">
            {new Date(order.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="text-right flex flex-col gap-1">
          <p className="text-[11px] text-text-muted uppercase tracking-[0.5px]">
            Status
          </p>
          <span
            className={`text-[11px] font-medium px-[10px] py-[3px] rounded-full border ${statusClasses(order.status)}`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-[14px] border-b border-border">
          <p className="text-[11px] text-text-muted uppercase tracking-[0.5px]">
            Products
          </p>
        </div>
        <div>
          {order.order_items?.map((item: any, i: number) => (
            <div
              key={item.id}
              className={`flex items-center gap-4 px-5 py-4 ${i < order.order_items.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="relative w-[52px] h-[52px] shrink-0 rounded-lg overflow-hidden bg-bg-subtle">
                <ProductImage
                  src={item.products?.image_url}
                  alt={item.products?.name ?? ""}
                  fill
                  sizes="52px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text">
                  {item.products?.name}
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="text-sm font-medium text-text">
                {formatPrice(item.unit_price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="bg-surface border border-border rounded-xl p-5 flex justify-between items-center">
        <span className="text-sm text-text-secondary">Total</span>
        <span className="text-xl font-medium">
          {formatPrice(order.total)}
        </span>
      </div>
    </div>
  );
}
