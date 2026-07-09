import { createAdminClient } from "@/lib/supabase/admin";
import type { OrderRow } from "@/types";

export async function getAdminOrders(): Promise<OrderRow[]> {
  const supabase = createAdminClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("id, user_id, status, total, created_at")
    .order("created_at", { ascending: false });

  if (!orders) return [];

  const userIds = [...new Set(orders.map((o) => o.user_id))];

  const [{ data: profiles }, { data: items }] = await Promise.all([
    supabase.from("profiles").select("id, full_name").in("id", userIds),
    supabase
      .from("order_items")
      .select("order_id, id")
      .in("order_id", orders.map((o) => o.id)),
  ]);

  const profileMap = new Map(
    profiles?.map((p) => [p.id, p.full_name]) ?? [],
  );

  const itemMap = new Map<string, { id: string }[]>();
  items?.forEach((item) => {
    const list = itemMap.get(item.order_id) ?? [];
    list.push({ id: item.id });
    itemMap.set(item.order_id, list);
  });

  return orders.map((order) => ({
    ...order,
    profiles: profileMap.has(order.user_id)
      ? { full_name: profileMap.get(order.user_id)! }
      : null,
    order_items: itemMap.get(order.id) ?? [],
  }));
}
