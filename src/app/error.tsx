"use client";

import { useEffect } from "react";

export default function Error({
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
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "420px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "var(--coral-bg)",
            border: "0.5px solid var(--coral-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            marginBottom: "8px",
          }}
        >
          !
        </div>

        <div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "500",
              letterSpacing: "-0.5px",
              marginBottom: "8px",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              lineHeight: "1.7",
            }}
          >
            An unexpected error occurred. Please try again.
          </p>
        </div>

        <button
          onClick={reset}
          style={{
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            padding: "10px 24px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
