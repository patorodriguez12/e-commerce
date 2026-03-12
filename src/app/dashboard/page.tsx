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
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      <ProfileForm profile={profile} userId={user!.id} />
    </div>
  );
}
