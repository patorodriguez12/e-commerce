import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/layout/LogoutButton";

const NAV_ITEMS = [
  { href: "/dashboard", label: "My Account" },
  { href: "/dashboard/orders", label: "My Orders" },
  { href: "/dashboard/wishlist", label: "My Wishlist" },
];

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
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "48px 24px",
      }}
    >
      <div style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>
        {/* Sidebar */}
        <aside style={{ width: "180px", flexShrink: 0 }}>
          <div
            style={{
              background: "var(--bg-card)",
              border: "0.5px solid var(--border)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "0.5px solid var(--border)",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Account
              </p>
            </div>
            <nav style={{ padding: "8px" }}>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "block",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={undefined}
                >
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
                  display: "block",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  marginBottom: "2px",
                }}
              >
                ← Store
              </Link>
              <LogoutButton />
            </div>
          </div>
        </aside>

        {/* Content */}
        <main style={{ flex: 1, minWidth: 0 }}>{children}</main>
      </div>
    </div>
  );
}
