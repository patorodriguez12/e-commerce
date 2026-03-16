import { requireAdmin } from "@/lib/supabase/auth";
import Link from "next/link";
import { logout } from "@/lib/supabase/actions";

const NAV_ITEMS = [
  { href: "/admin", label: "📊 Dashboard" },
  { href: "/admin/products", label: "📦 Products" },
  { href: "/admin/orders", label: "🛒 Orders" },
  { href: "/admin/users", label: "👥 Users" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 border-r bg-gray-50 flex flex-col">
        <div className="px-6 py-5 border-b">
          <p className="font-bold text-sm">Admin Panel</p>
          <p className="text-xs text-gray-500 mt-0.5">Smartech</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-200 hover:text-black transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t space-y-1">
          <Link
            href="/"
            className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-200 transition-colors"
          >
            ← Back to store
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="w-full text-left flex items-center px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-200 transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
