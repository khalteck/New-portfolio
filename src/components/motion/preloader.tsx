import { useEffect, useLayoutEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const SESSION_KEY = "khalid-portfolio-preloader-seen";
const PRELOADER_DURATION_MS = 2_000;
const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useBrowserLayoutEffect(() => {
    if (reducedMotion || window.sessionStorage.getItem(SESSION_KEY) === "true") {
      setVisible(false);
      return;
    }

    window.sessionStorage.setItem(SESSION_KEY, "true");
    const timeout = window.setTimeout(() => setVisible(false), PRELOADER_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1000] grid animate-preloader-exit place-content-center bg-canvas motion-reduce:hidden"
      aria-hidden="true"
      data-testid="preloader"
    >
      <svg
        className="block w-[clamp(12rem,34vw,24rem)] overflow-visible font-display text-[9.5rem] font-bold tracking-[0.04em] [&_text]:fill-transparent [&_text]:[paint-order:stroke_fill] [&_text]:[stroke-linecap:round] [&_text]:[stroke-linejoin:round] [&_text]:[stroke-width:1.35px]"
        viewBox="0 0 360 190"
        focusable="false"
      >
        <text
          className="stroke-[color-mix(in_srgb,var(--text)_24%,transparent)]"
          x="50%"
          y="72%"
          textAnchor="middle"
          data-ui="preloader-outline"
        >
          KO
        </text>
        <text
          className="animate-preloader-outline stroke-accent [stroke-dasharray:720] [stroke-dashoffset:720]"
          x="50%"
          y="72%"
          textAnchor="middle"
          data-ui="preloader-draw"
        >
          KO
        </text>
        <text
          className="animate-preloader-fill stroke-copy opacity-0"
          x="50%"
          y="72%"
          textAnchor="middle"
          data-ui="preloader-fill"
        >
          KO
        </text>
      </svg>
      <div className="mt-6 h-0.5 w-full origin-left scale-x-0 animate-preloader-rule bg-accent" />
    </div>
  );
}
