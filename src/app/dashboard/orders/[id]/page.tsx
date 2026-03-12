import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-purple-100 text-purple-700",
  cancelled: "bg-red-100 text-red-700",
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
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/dashboard/orders"
          className="text-gray-400 hover:text-black transition-colors"
        >
          ← Back
        </Link>
        <h1 className="text-2xl font-bold">
          Order #{order.id.slice(0, 8).toUpperCase()}
        </h1>
      </div>

      {/* Header de la orden */}
      <div className="border rounded-xl p-5 mb-6 flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">Date</p>
          <p className="font-medium">
            {new Date(order.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">Status</p>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLES[order.status] ?? "bg-gray-100 text-gray-600"}`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="border rounded-xl overflow-hidden mb-6">
        <div className="px-5 py-3 border-b bg-gray-50">
          <p className="text-sm font-medium text-gray-600">Products</p>
        </div>
        <div className="divide-y">
          {order.order_items?.map((item: any) => (
            <div key={item.id} className="flex items-center gap-4 px-5 py-4">
              <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                {item.products?.image_url && (
                  <Image
                    src={item.products.image_url}
                    alt={item.products.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.products?.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format((item.unit_price * item.quantity) / 100)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="border rounded-xl p-5">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(order.total / 100)}
          </span>
        </div>
      </div>
    </div>
  );
}
