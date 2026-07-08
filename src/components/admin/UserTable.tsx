"use client";

import { useState, useMemo } from "react";
import SearchBar from "@/components/admin/SearchBar";

type UserRow = {
  id: string;
  full_name: string | null;
  email: string;
  role: string;
  last_sign_in: string | null;
};

type Props = {
  users: UserRow[];
};

export default function UserTable({ users }: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        (u.full_name ?? "").toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  }, [users, search]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-medium tracking-[-0.5px]">Users</h1>
        <p className="text-xs text-text-muted">
          {users?.length ?? 0} registered
        </p>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search users by name or email..."
      />

      <div className="bg-surface border border-border rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Name", "Email", "Role", "Last sign in"].map((h) => (
                  <th
                    key={h}
                    className={`${
                      h === "Email" ? "desktop-only" : ""
                    } px-5 py-3 text-left text-xs text-text-muted uppercase tracking-[0.5px] font-medium`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!filtered.length ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mx-auto mb-3 text-text-muted opacity-40"
                    >
                      <circle
                        cx="9"
                        cy="8"
                        r="3.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M2 20C2 16.5 4.5 14 9 14C13.5 14 16 16.5 16 20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16 8.5C18 8.5 19.5 10 19.5 12C19.5 14 18 15.5 16 15.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <p className="text-text-muted text-sm">
                      {users.length === 0
                        ? "No registered users yet"
                        : "No users match your search"}
                    </p>
                    <p className="text-text-muted text-xs mt-1 opacity-60">
                      {users.length === 0
                        ? "Users will appear here once they create an account."
                        : "Try a different search term."}
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((user: UserRow) => (
                  <tr key={user.id} className="border-b border-border">
                    <td className="px-5 py-3.5 font-medium text-text">
                      {user.full_name ?? "No name"}
                    </td>
                    <td className="desktop-only px-5 py-3.5 text-text-secondary">
                      {user.email}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`text-xs font-medium px-2.5 py-[3px] rounded-full ${
                          user.role === "admin"
                            ? "bg-accent-bg text-accent-text border border-accent-border"
                            : "bg-bg-subtle text-text-muted border border-border"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-text-muted text-xs">
                      {user.last_sign_in
                        ? new Date(user.last_sign_in).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
