import { requireAdmin } from "@/lib/supabase/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div style={{ minHeight: "100dvh", display: "flex" }}>
      <AdminSidebar />
      <main style={{ flex: 1, overflowX: "auto" }}>
        <div
          className="px-4 py-5 md:px-8 md:py-10"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
