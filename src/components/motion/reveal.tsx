import { useRef, type PropsWithChildren } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/helpers/cn";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface RevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({ children, className, delay = 0, y = 32 }: RevealProps) {
  const element = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !element.current) return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        element.current,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: element.current,
            start: "top 88%",
            once: true
          }
        }
      );
    },
    { scope: element, dependencies: [delay, reducedMotion, y], revertOnUpdate: true }
  );

  return (
    <div ref={element} className={cn("reveal", className)}>
      {children}
    </div>
  );
}
