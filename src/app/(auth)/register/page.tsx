"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "@/lib/supabase/actions";
import OAuthButtons from "@/components/auth/OAuthButtons";

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

function Spinner() {
  return (
    <span
      style={{
        width: 14,
        height: 14,
        border: "2px solid #ffffff40",
        borderTopColor: "#fff",
        borderRadius: "50%",
        display: "inline-block",
        animation: "spin 0.6s linear infinite",
      }}
    />
  );
}

export default function RegisterPage() {
  const [error, formAction, pending] = useActionState(
    async (_prev: unknown, formData: FormData) => {
      const result = await register(formData);
      return result?.error ?? null;
    },
    null,
  );

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link
            href="/"
            style={{
              fontSize: "18px",
              fontWeight: "500",
              letterSpacing: "-0.5px",
              color: "var(--text-primary)",
              textDecoration: "none",
              display: "block",
              marginBottom: "24px",
            }}
          >
            Smartech
          </Link>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: "500",
              letterSpacing: "-0.5px",
              marginBottom: "6px",
            }}
          >
            Create an account
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            Join Smartech today
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "0.5px solid var(--border)",
            borderRadius: "16px",
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <OAuthButtons disabled={pending} />

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{ flex: 1, height: "0.5px", background: "var(--border)" }}
            />
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
              or
            </span>
            <div
              style={{ flex: 1, height: "0.5px", background: "var(--border)" }}
            />
          </div>

          {/* Form */}
          <form
            action={formAction}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <div>
              <label style={labelStyle}>Full name</label>
              <input
                name="full_name"
                type="text"
                required
                placeholder="John Doe"
                disabled={pending}
                style={{
                  ...inputStyle,
                  opacity: pending ? 0.5 : 1,
                  cursor: pending ? "not-allowed" : undefined,
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--accent)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              />
            </div>

            <div>
              <label style={labelStyle}>Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                disabled={pending}
                style={{
                  ...inputStyle,
                  opacity: pending ? 0.5 : 1,
                  cursor: pending ? "not-allowed" : undefined,
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--accent)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              />
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="At least 6 characters"
                disabled={pending}
                style={{
                  ...inputStyle,
                  opacity: pending ? 0.5 : 1,
                  cursor: pending ? "not-allowed" : undefined,
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--accent)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
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

            <button
              type="submit"
              disabled={pending}
              style={{
                width: "100%",
                background: "var(--accent)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "11px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: pending ? "not-allowed" : "pointer",
                opacity: pending ? 0.6 : 1,
                transition: "opacity 0.15s",
                marginTop: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {pending ? (
                <>
                  <Spinner />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "var(--text-muted)",
            marginTop: "20px",
          }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              color: "var(--text-primary)",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
