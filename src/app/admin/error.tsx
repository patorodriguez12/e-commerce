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
    <div className="flex flex-col items-center justify-center min-h-[40dvh] gap-4 text-center">
      <div className="w-12 h-12 rounded-full bg-coral-bg border border-coral-border flex items-center justify-center text-[22px]">
        !
      </div>

      <div>
        <h2 className="text-lg font-medium mb-1">
          Error loading admin panel
        </h2>
        <p className="text-sm text-text-secondary">
          {error.message || "An unexpected error occurred."}
        </p>
      </div>

      <button
        onClick={reset}
        className="bg-accent text-white border-none px-5 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-150 hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
