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
          Products
        </h1>
        <Link
          href="/admin/products/new"
          style={{
            background: "var(--accent)",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          + New product
        </Link>
      </div>

      <ProductTable products={products ?? []} />
    </div>
  );
}
