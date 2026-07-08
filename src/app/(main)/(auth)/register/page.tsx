"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "@/lib/supabase/actions";
import OAuthButtons from "@/components/auth/OAuthButtons";

function Spinner() {
  return (
    <span className="size-[14px] border-2 border-white/25 border-t-white rounded-full inline-block animate-spin" />
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
    <div className="min-h-dvh flex items-center justify-center p-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-lg font-medium tracking-tight text-text no-underline block mb-6"
          >
            Smartech
          </Link>
          <h1 className="text-2xl font-medium tracking-tight mb-1.5">
            Create an account
          </h1>
          <p className="text-sm text-text-muted">
            Join Smartech today
          </p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-7 flex flex-col gap-4">
          <OAuthButtons disabled={pending} />

          <div className="flex items-center gap-3">
            <div className="flex-1 h-[0.5px] bg-border" />
            <span className="text-[11px] text-text-muted">or</span>
            <div className="flex-1 h-[0.5px] bg-border" />
          </div>

          <form action={formAction} className="flex flex-col gap-3.5">
            <div>
              <label className="block text-xs text-text-secondary mb-1.5">Full name</label>
              <input
                name="full_name"
                type="text"
                required
                placeholder="John Doe"
                disabled={pending}
                className="admin-input disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs text-text-secondary mb-1.5">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                disabled={pending}
                className="admin-input disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs text-text-secondary mb-1.5">Password</label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="At least 6 characters"
                disabled={pending}
                className="admin-input disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {error && (
              <div className="bg-coral-bg border border-coral-border rounded-lg px-3.5 py-2.5 text-sm text-coral-text">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className={`w-full bg-accent text-white border-0 rounded-lg p-[11px] text-sm font-medium mt-1 flex items-center justify-center gap-2 transition-opacity duration-150 ${pending ? "opacity-60 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
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

        <p className="text-center text-sm text-text-muted mt-5">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-text no-underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
