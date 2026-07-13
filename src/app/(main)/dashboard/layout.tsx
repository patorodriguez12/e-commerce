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
    <div className="mx-auto max-w-250 px-6 py-12">
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 md:items-start">
        <DashboardNav fullName={fullName} />

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
