import { createClient } from "@/lib/supabase/server";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  return (
    <div>
      <h1
        style={{
          fontSize: "22px",
          fontWeight: "500",
          letterSpacing: "-0.5px",
          marginBottom: "24px",
        }}
      >
        My Account
      </h1>
      <div
        style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
          borderRadius: "12px",
          padding: "28px",
        }}
      >
        <ProfileForm profile={profile} userId={user!.id} />
      </div>
    </div>
  );
}
