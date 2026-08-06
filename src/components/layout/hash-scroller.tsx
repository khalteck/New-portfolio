import { useEffect } from "react";
import { NavigationType, useLocation, useNavigationType } from "react-router-dom";

export function HashScroller() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    let frameId = 0;

    if (!location.hash) {
      if (navigationType === NavigationType.Push) {
        frameId = window.requestAnimationFrame(() =>
          window.scrollTo({ top: 0, left: 0, behavior: "auto" })
        );
      }
      return () => window.cancelAnimationFrame(frameId);
    }

    const id = decodeURIComponent(location.hash.slice(1));
    let attempts = 0;
    const focusDestination = (heading: HTMLElement, focusAttempts = 0) => {
      if (window.getComputedStyle(heading).visibility === "hidden" && focusAttempts < 60) {
        frameId = window.requestAnimationFrame(() => focusDestination(heading, focusAttempts + 1));
        return;
      }
      heading.focus({ preventScroll: true });
    };
    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (!target) {
        attempts += 1;
        if (attempts < 60) frameId = window.requestAnimationFrame(scrollToTarget);
        return;
      }
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";
      target.scrollIntoView({ behavior, block: "start" });
      const heading = target.querySelector<HTMLElement>("h1, h2, [data-section-focus]");
      if (heading) focusDestination(heading);
    };

    frameId = window.requestAnimationFrame(scrollToTarget);
    return () => window.cancelAnimationFrame(frameId);
  }, [location.hash, location.pathname, navigationType]);

  return null;
}
