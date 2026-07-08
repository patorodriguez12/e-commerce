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
      color: "text-accent-text",
      bg: "bg-accent-bg",
    },
    {
      label: "Wishlist",
      value: wishlistCount.count ?? 0,
      icon: Heart,
      color: "text-coral-text",
      bg: "bg-coral-bg",
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
      color: "text-green-text",
      bg: "bg-green-bg",
    },
  ];

  return (
    <div className="flex flex-col gap-7">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-medium tracking-[-0.5px] flex items-center gap-2.5">
          <span className="text-gold opacity-70">◆</span>
          Hey, {fullName.split(" ")[0]}
        </h1>
        <p className="text-xs text-text-muted mt-1 ml-6">
          {user?.email}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-2">
              {Icon && (
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <Icon size={16} />
                </div>
              )}
              <p className="text-xl font-semibold tracking-[-0.5px] text-text">
                {stat.value}
              </p>
              <p className="text-[11px] text-text-muted uppercase tracking-[0.5px]">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Profile form */}
      <div className="bg-surface border border-border rounded-xl p-7">
        <h2 className="text-base font-medium mb-5 text-text">
          Profile details
        </h2>
        <ProfileForm profile={profile.data} userId={user!.id} email={user?.email} />
      </div>
    </div>
  );
}
