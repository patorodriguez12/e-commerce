import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import ProductTable from "@/components/admin/ProductTable";

export default async function AdminProductsPage() {
  await requireAdmin();
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*, categories(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[22px] font-medium tracking-[-0.5px]">
          Products
        </h1>
        <Link
          href="/admin/products/new"
          className="bg-accent text-white px-4 py-2 rounded-lg no-underline text-sm font-medium"
        >
          + New product
        </Link>
      </div>

      <ProductTable products={products ?? []} />
    </div>
  );
}
