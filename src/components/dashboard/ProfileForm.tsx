"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Mail } from "lucide-react";
import { Profile } from "@/types";

type Props = {
  profile: Profile | null;
  userId: string;
  email?: string;
};

export default function ProfileForm({ profile, userId, email }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fullName = profile?.full_name ?? email?.split("@")[0] ?? "A";
  const firstInitial = fullName.charAt(0).toUpperCase();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const supabase = createClient();

    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      full_name: formData.get("full_name") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      setError("Error saving changes");
    } else {
      setSuccess(true);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Avatar + email */}
      <div className="flex items-center gap-4 pb-5 border-b border-border">
        <div className="w-12 h-12 rounded-full bg-accent-bg border border-accent-border flex items-center justify-center text-lg font-semibold text-accent-text shrink-0">
          {firstInitial}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-text truncate">
            {fullName}
          </p>
          {email && (
            <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1">
              <Mail size={11} />
              {email}
            </p>
          )}
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        <div>
          <label className="block text-xs text-text-secondary mb-1.5">Full name</label>
          <input
            name="full_name"
            type="text"
            defaultValue={profile?.full_name ?? ""}
            className="admin-input"
          />
        </div>
        <div>
          <label className="block text-xs text-text-secondary mb-1.5">Phone</label>
          <input
            name="phone"
            type="text"
            defaultValue={profile?.phone ?? ""}
            className="admin-input"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-text-secondary mb-1.5">Address</label>
        <textarea
          name="address"
          rows={3}
          defaultValue={profile?.address ?? ""}
          className="admin-input resize-none"
        />
      </div>

      {error && (
        <div className="bg-coral-bg border border-coral-border rounded-lg px-3.5 py-2.5 text-sm text-coral-text">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-bg border border-green-border rounded-lg px-3.5 py-2.5 text-sm text-green-text">
          Changes saved successfully
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="bg-accent text-white border-0 rounded-lg px-6 py-2.5 text-sm font-medium cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 transition-opacity duration-150"
        >
          {loading ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
