import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors"
            >
              My Account
            </Link>
            <Link
              href="/dashboard/orders"
              className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors"
            >
              My Orders
            </Link>
            <Link
              href="/dashboard/wishlist"
              className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors"
            >
              My Wishlist
            </Link>
          </nav>
        </aside>

        {/* Contenido */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
