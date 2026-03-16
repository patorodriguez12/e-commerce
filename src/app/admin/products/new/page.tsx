import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  await requireAdmin();
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">New product</h1>
      <ProductForm categories={categories ?? []} />
    </div>
  );
}
