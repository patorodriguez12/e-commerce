"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLoadingStore } from "@/lib/store/loadingStore";

export default function NavigationProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stop = useLoadingStore((state) => state.stop);

  useEffect(() => {
    stop();
  }, [pathname, searchParams, stop]);

  return null;
}
