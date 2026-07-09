import { requireAdmin } from "@/lib/supabase/auth";
import { getAdminOrders } from "@/lib/queries/orders";
import OrderTable from "@/components/admin/OrderTable";

export default async function AdminOrdersPage() {
  await requireAdmin();
  const orders = await getAdminOrders();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[22px] font-medium tracking-[-0.5px]">
          Orders
        </h1>
        <p className="text-xs text-text-muted">{orders.length} total</p>
      </div>

      <OrderTable orders={orders} />
    </div>
  );
}
