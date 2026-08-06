import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function PageTransition() {
  const container = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const skipPageTransition = Boolean(
    (location.state as { skipPageTransition?: boolean } | null)?.skipPageTransition
  );

  useGSAP(
    () => {
      if (!container.current) return;
      const layers = container.current.querySelectorAll("span");
      if (reducedMotion || skipPageTransition) {
        gsap.set(container.current, { autoAlpha: 0 });
        gsap.set(layers, { scaleX: 0 });
        return;
      }
      gsap
        .timeline()
        .set(container.current, { autoAlpha: 1 })
        .set(layers, { scaleX: 1, transformOrigin: "left center" })
        .to(layers, {
          scaleX: 0,
          duration: 0.7,
          ease: "power3.inOut",
          stagger: 0.08
        })
        .set(container.current, { autoAlpha: 0 });
    },
    {
      scope: container,
      dependencies: [location.key, reducedMotion, skipPageTransition],
      revertOnUpdate: true
    }
  );

  return (
    <div
      ref={container}
      className="pointer-events-none invisible fixed inset-0 z-[900] motion-reduce:hidden [&_span]:absolute [&_span]:inset-0 [&_span]:origin-left [&_span]:scale-x-0 [&_span]:bg-surface-raised [&_span:last-child]:bg-accent"
      aria-hidden="true"
      data-ui="page-transition"
    >
      <span />
      <span />
    </div>
  );
}
