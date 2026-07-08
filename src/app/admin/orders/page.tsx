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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
        }}
      >
        <h1
          style={{
            fontSize: "22px",
            fontWeight: "500",
            letterSpacing: "-0.5px",
          }}
        >
          Orders
        </h1>
        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          {orders?.length ?? 0} total
        </p>
      </div>

      <OrderTable orders={orders ?? []} />
    </div>
  );
}
