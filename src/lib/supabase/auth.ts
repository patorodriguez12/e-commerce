import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("requireAdmin - user:", user?.id, user?.email);

  if (!user) {
    console.log("requireAdmin - no user, redirecting to login");
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  console.log("requireAdmin - profile:", profile);
  console.log("requireAdmin - error:", error);

  if (profile?.role !== "admin") {
    console.log("requireAdmin - not admin, redirecting to /");
    redirect("/");
  }

  return user;
}
