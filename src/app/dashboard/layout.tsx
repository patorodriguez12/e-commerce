import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const fullName = profile?.full_name ?? user.email?.split("@")[0] ?? "Account";

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "48px 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "48px",
          alignItems: "flex-start",
        }}
      >
        <DashboardNav fullName={fullName} />

        <main style={{ flex: 1, minWidth: 0 }}>{children}</main>
      </div>
    </div>
  );
}
