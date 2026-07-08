import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import OrderTable from "@/components/admin/OrderTable";

export default async function AdminOrdersPage() {
  await requireAdmin();
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("*, profiles(full_name), order_items(id)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[22px] font-medium tracking-[-0.5px]">
          Orders
        </h1>
        <p className="text-xs text-text-muted">
          {orders?.length ?? 0} total
        </p>
      </div>

      <OrderTable orders={orders ?? []} />
    </div>
  );
}
