import { requireAdmin } from "@/lib/supabase/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import UserTable from "@/components/admin/UserTable";

export default async function AdminUsersPage() {
  await requireAdmin();
  const supabase = createAdminClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("updated_at", { ascending: false });

  const { data: authData } = await supabase.auth.admin.listUsers();
  const authUsers = authData?.users ?? [];

  const users = profiles?.map((profile) => ({
    ...profile,
    email: authUsers.find((u) => u.id === profile.id)?.email ?? "—",
    last_sign_in:
      authUsers.find((u) => u.id === profile.id)?.last_sign_in_at ?? null,
  }));

  return <UserTable users={users ?? []} />;
}
