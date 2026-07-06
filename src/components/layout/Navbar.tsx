import { createClient } from "@/lib/supabase/server";
import NavContent from "@/components/layout/NavContent";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let fullName: string | null = null;
  let isAdmin = false;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", user.id)
      .single();
    fullName = profile?.full_name ?? user.email?.split("@")[0] ?? "Account";
    isAdmin = profile?.role === "admin";
  }

  return <NavContent user={user} fullName={fullName} isAdmin={isAdmin} />;
}
