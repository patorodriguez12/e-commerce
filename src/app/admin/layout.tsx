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
          style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 32px" }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
