"use client";

import { useLoadingStore } from "@/lib/store/loadingStore";

export default function LoadingSpinner() {
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        pointerEvents: "auto",
        background: "rgba(10, 10, 10, 0.6)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "2.5px solid #ffffff20",
          borderTop: "2.5px solid #7F77DD",
          animation: "spin 0.75s linear infinite",
        }}
      />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
