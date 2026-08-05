import { useEffect } from "react";
import { NavigationType, useLocation, useNavigationType } from "react-router-dom";

export function HashScroller() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (!location.hash) {
      if (navigationType === NavigationType.Push) {
        window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
      }
      return;
    }
    const id = decodeURIComponent(location.hash.slice(1));
    window.requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: "auto", block: "start" });
      target.querySelector<HTMLElement>("h1, h2, [data-section-focus]")?.focus({
        preventScroll: true
      });
    });
  }, [location.hash, location.pathname, navigationType]);

  return null;
}
