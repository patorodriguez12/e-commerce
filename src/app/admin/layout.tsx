import { requireAdmin } from "@/lib/supabase/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-dvh flex">
      <AdminSidebar />
      <main id="main-content" className="flex-1 overflow-x-auto">
        <div className="px-4 py-5 md:px-8 md:py-10 max-w-[1100px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
