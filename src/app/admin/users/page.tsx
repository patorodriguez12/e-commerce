import { requireAdmin } from "@/lib/supabase/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminUsersPage() {
  await requireAdmin();

  const supabase = createAdminClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("updated_at", { ascending: false });

  const { data: authData } = await supabase.auth.admin.listUsers();
  const authUsers = authData?.users ?? [];

  // Combinar profiles con emails de auth.users
  const users = profiles?.map((profile) => ({
    ...profile,
    email: authUsers.find((u) => u.id === profile.id)?.email ?? "—",
    last_sign_in:
      authUsers.find((u) => u.id === profile.id)?.last_sign_in_at ?? null,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-sm text-gray-500">{users?.length ?? 0} registered</p>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr className="text-left text-gray-500">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Last sign in</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users?.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No users yet
                </td>
              </tr>
            )}
            {users?.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium">
                  {user.full_name ?? "No name"}
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {user.last_sign_in
                    ? new Date(user.last_sign_in).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
