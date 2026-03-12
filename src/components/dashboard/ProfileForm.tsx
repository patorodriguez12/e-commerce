"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/types";

type Props = {
  profile: Profile | null;
  userId: string;
};

export default function ProfileForm({ profile, userId }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Full name</label>
        <input
          name="full_name"
          type="text"
          defaultValue={profile?.full_name ?? ""}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          name="phone"
          type="text"
          defaultValue={profile?.phone ?? ""}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Address</label>
        <textarea
          name="address"
          rows={3}
          defaultValue={profile?.address ?? ""}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && (
        <p className="text-green-600 text-sm">Changes saved successfully</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
      >
        {loading ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
