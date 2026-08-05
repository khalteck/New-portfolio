import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMetadata } from "@/helpers/route-metadata";

export function RouteAnnouncer() {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const metadata = getRouteMetadata(location.pathname);
    setMessage(`Navigated to ${metadata.title}`);

    if (location.hash) return;

    let observer: MutationObserver | undefined;
    let timeout = 0;
    const focusHeading = () => {
      const heading = document.querySelector<HTMLElement>("main h1");
      if (!heading) return false;
      heading.focus({ preventScroll: true });
      observer?.disconnect();
      if (timeout) window.clearTimeout(timeout);
      return true;
    };
    const frame = window.requestAnimationFrame(() => {
      if (focusHeading()) return;
      observer = new MutationObserver(() => focusHeading());
      observer.observe(document.body, { childList: true, subtree: true });
      timeout = window.setTimeout(() => observer?.disconnect(), 4000);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      if (timeout) window.clearTimeout(timeout);
    };
  }, [location.hash, location.pathname]);

  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      {message}
    </div>
  );
}
