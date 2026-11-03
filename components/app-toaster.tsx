"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => { };

function useClientMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export function AppToaster() {
  const mounted = useClientMounted();
  const { resolvedTheme } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
