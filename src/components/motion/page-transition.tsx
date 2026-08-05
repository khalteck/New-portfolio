import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function PageTransition() {
  const container = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !container.current) return;
      const layers = container.current.querySelectorAll("span");
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
    { scope: container, dependencies: [location.key, reducedMotion], revertOnUpdate: true }
  );

  return (
    <div ref={container} className="page-transition" aria-hidden="true">
      <span />
      <span />
    </div>
  );
}
