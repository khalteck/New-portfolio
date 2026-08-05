import { useMediaQuery } from "./use-media-query";

export const useReducedMotion = (): boolean => useMediaQuery("(prefers-reduced-motion: reduce)");
