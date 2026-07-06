"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "40dvh",
        gap: "16px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "var(--coral-bg)",
          border: "0.5px solid var(--coral-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
        }}
      >
        !
      </div>

      <div>
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "500",
            marginBottom: "4px",
          }}
        >
          Error loading admin panel
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
          }}
        >
          {error.message || "An unexpected error occurred."}
        </p>
      </div>

      <button
        onClick={reset}
        style={{
          background: "var(--accent)",
          color: "#fff",
          border: "none",
          padding: "8px 20px",
          borderRadius: "6px",
          fontSize: "13px",
          fontWeight: "500",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
