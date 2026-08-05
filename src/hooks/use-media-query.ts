import { useSyncExternalStore } from "react";

export const useMediaQuery = (query: string): boolean => {
  const subscribe = (onChange: () => void): (() => void) => {
    if (typeof window === "undefined") return () => undefined;
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  };

  const getSnapshot = (): boolean =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches;

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
};
