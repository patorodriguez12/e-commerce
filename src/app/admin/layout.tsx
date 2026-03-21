import { requireAdmin } from "@/lib/supabase/auth";
import Link from "next/link";
import { logout } from "@/lib/supabase/actions";

const NAV_ITEMS = [
  { href: "/admin", label: "📊 Dashboard" },
  { href: "/admin/products", label: "📦 Products" },
  { href: "/admin/orders", label: "🛒 Orders" },
  { href: "/admin/users", label: "👥 Users" },
];

const navLink: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  padding: "8px 12px",
  borderRadius: "6px",
  fontSize: "13px",
  color: "var(--text-secondary)",
  textDecoration: "none",
  transition: "all 0.15s",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div style={{ minHeight: "100dvh", display: "flex" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          flexShrink: 0,
          borderRight: "0.5px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          background: "#0d0d0d",
        }}
      >
        <div
          style={{
            padding: "20px 20px 16px",
            borderBottom: "0.5px solid var(--border)",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "var(--text-primary)",
            }}
          >
            Admin Panel
          </p>
          <p
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              marginTop: "2px",
            }}
          >
            Smartech
          </p>
        </div>

        <nav style={{ flex: 1, padding: "8px" }}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} style={navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          style={{
            padding: "8px",
            borderTop: "0.5px solid var(--border)",
          }}
        >
          <Link
            href="/"
            style={{
              ...navLink,
              color: "var(--text-muted)",
              marginBottom: "2px",
            }}
          >
            ← Back to store
          </Link>
          <form action={logout}>
            <button
              type="submit"
              style={{
                ...navLink,
                width: "100%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                color: "var(--text-muted)",
              }}
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Content */}
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
