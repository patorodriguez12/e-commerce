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

  const users = profiles?.map((profile) => ({
    ...profile,
    email: authUsers.find((u) => u.id === profile.id)?.email ?? "—",
    last_sign_in:
      authUsers.find((u) => u.id === profile.id)?.last_sign_in_at ?? null,
  }));

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
        }}
      >
        <h1
          style={{
            fontSize: "22px",
            fontWeight: "500",
            letterSpacing: "-0.5px",
          }}
        >
          Users
        </h1>
        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          {users?.length ?? 0} registered
        </p>
      </div>

      <div
        style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "0.5px solid var(--border)" }}>
              {["Name", "Email", "Role", "Last sign in"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 20px",
                    textAlign: "left",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontWeight: "500",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!users?.length && (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "var(--text-muted)",
                    fontSize: "13px",
                  }}
                >
                  No users yet
                </td>
              </tr>
            )}
            {users?.map((user) => (
              <tr
                key={user.id}
                style={{ borderBottom: "0.5px solid var(--border)" }}
              >
                <td
                  style={{
                    padding: "14px 20px",
                    fontWeight: "500",
                    color: "var(--text-primary)",
                  }}
                >
                  {user.full_name ?? "No name"}
                </td>
                <td
                  style={{
                    padding: "14px 20px",
                    color: "var(--text-secondary)",
                  }}
                >
                  {user.email}
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "500",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      ...(user.role === "admin"
                        ? {
                            background: "var(--accent-bg)",
                            color: "var(--accent-text)",
                            border: "0.5px solid var(--accent-border)",
                          }
                        : {
                            background: "var(--bg-subtle)",
                            color: "var(--text-muted)",
                            border: "0.5px solid var(--border)",
                          }),
                    }}
                  >
                    {user.role}
                  </span>
                </td>
                <td
                  style={{
                    padding: "14px 20px",
                    color: "var(--text-muted)",
                    fontSize: "12px",
                  }}
                >
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
