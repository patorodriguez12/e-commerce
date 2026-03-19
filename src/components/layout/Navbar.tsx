import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import CartButton from "@/components/cart/CartButton";
import LogoutButton from "@/components/layout/LogoutButton";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav
      style={{
        borderBottom: "0.5px solid var(--border)",
        background: "var(--bg-primary)",
        position: "sticky",
        top: 0,
        zIndex: 30,
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "16px",
            fontWeight: "500",
            letterSpacing: "-0.5px",
            color: "var(--text-primary)",
            textDecoration: "none",
          }}
        >
          Smartech
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CartButton />

          {user ? (
            <>
              <Link
                href="/dashboard"
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "0.5px solid var(--border)",
                  transition: "all 0.15s",
                }}
              >
                My account
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  padding: "6px 12px",
                }}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                style={{
                  fontSize: "13px",
                  color: "#000",
                  background: "#fff",
                  textDecoration: "none",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  fontWeight: "500",
                }}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
