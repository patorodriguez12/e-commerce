import { createClient } from "@/lib/supabase/server";
import { ShoppingBag, Heart } from "lucide-react";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [profile, orderCount, wishlistCount] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user!.id).single(),
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user!.id),
    supabase
      .from("wishlists")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user!.id),
  ]);

  const fullName =
    profile.data?.full_name ?? user?.email?.split("@")[0] ?? "Account";
  const stats = [
    {
      label: "Orders",
      value: orderCount.count ?? 0,
      icon: ShoppingBag,
      color: "var(--accent-text)",
      bg: "var(--accent-bg)",
    },
    {
      label: "Wishlist",
      value: wishlistCount.count ?? 0,
      icon: Heart,
      color: "var(--coral-text)",
      bg: "var(--coral-bg)",
    },
    {
      label: "Member since",
      value: user?.created_at
        ? new Date(user.created_at).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        : "—",
      icon: null,
      color: "var(--green-text)",
      bg: "var(--green-bg)",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Welcome */}
      <div>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "500",
            letterSpacing: "-0.5px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ color: "var(--gold)", opacity: 0.7 }}>◆</span>
          Hey, {fullName.split(" ")[0]}
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            marginTop: "4px",
            marginLeft: "24px",
          }}
        >
          {user?.email}
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "12px",
        }}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              style={{
                background: "var(--surface)",
                border: "0.5px solid var(--border)",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {Icon && (
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: stat.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: stat.color,
                  }}
                >
                  <Icon size={16} />
                </div>
              )}
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  letterSpacing: "-0.5px",
                  color: "var(--text)",
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Profile form */}
      <div
        style={{
          background: "var(--surface)",
          border: "0.5px solid var(--border)",
          borderRadius: "12px",
          padding: "28px",
        }}
      >
        <h2
          style={{
            fontSize: "15px",
            fontWeight: "500",
            marginBottom: "20px",
            color: "var(--text)",
          }}
        >
          Profile details
        </h2>
        <ProfileForm profile={profile.data} userId={user!.id} email={user?.email} />
      </div>
    </div>
  );
}
