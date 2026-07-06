"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/types";

type Props = {
  profile: Profile | null;
  userId: string;
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg-subtle)",
  border: "0.5px solid var(--border)",
  borderRadius: "8px",
  padding: "10px 14px",
  fontSize: "14px",
  color: "var(--text-primary)",
  outline: "none",
  transition: "border-color 0.15s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  color: "var(--text-secondary)",
  marginBottom: "6px",
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
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "18px" }}
    >
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
      >
        <div>
          <label style={labelStyle}>Full name</label>
          <input
            name="full_name"
            type="text"
            defaultValue={profile?.full_name ?? ""}
            style={inputStyle}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "var(--accent)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "var(--border)")
            }
          />
        </div>
        <div>
          <label style={labelStyle}>Phone</label>
          <input
            name="phone"
            type="text"
            defaultValue={profile?.phone ?? ""}
            style={inputStyle}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "var(--accent)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "var(--border)")
            }
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Address</label>
        <textarea
          name="address"
          rows={3}
          defaultValue={profile?.address ?? ""}
          style={{
            ...inputStyle,
            resize: "none",
            fontFamily: "inherit",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        />
      </div>

      {error && (
        <div
          style={{
            background: "var(--coral-bg)",
            border: "0.5px solid var(--coral-border)",
            borderRadius: "8px",
            padding: "10px 14px",
            fontSize: "13px",
            color: "var(--coral-text)",
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          style={{
            background: "var(--green-bg)",
            border: "0.5px solid var(--green-border)",
            borderRadius: "8px",
            padding: "10px 14px",
            fontSize: "13px",
            color: "var(--green-text)",
          }}
        >
          Changes saved successfully
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 24px",
            fontSize: "13px",
            fontWeight: "500",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
            transition: "opacity 0.15s",
          }}
        >
          {loading ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
