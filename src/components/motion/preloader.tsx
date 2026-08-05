import { useEffect, useLayoutEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const SESSION_KEY = "khalid-portfolio-preloader-seen";
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
    const timeout = window.setTimeout(() => setVisible(false), 1450);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion]);

  if (!visible) return null;

  return (
    <div className="preloader" aria-hidden="true" data-testid="preloader">
      <div className="preloader__word" aria-label="Khalid">
        {[..."KHALID"].map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            style={{ "--letter-index": index } as React.CSSProperties}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="preloader__rule" />
    </div>
  );
}
