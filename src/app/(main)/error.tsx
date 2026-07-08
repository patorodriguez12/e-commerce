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
    <div className="min-h-dvh flex items-center justify-center p-6">
      <div className="w-[420px] max-w-full flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-coral-bg border border-coral-border flex items-center justify-center text-[28px] mb-2 shrink-0">
          !
        </div>

        <div>
          <h1 className="text-2xl font-medium tracking-[-0.5px] mb-2">
            Something went wrong
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            An unexpected error occurred. Please try again.
          </p>
        </div>

        <button
          onClick={reset}
          className="bg-accent text-white border-none px-6 py-[10px] rounded-lg text-sm font-medium cursor-pointer transition-colors duration-150"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
