import { useEffect, type PropsWithChildren } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function SmoothScrollProvider({ children }: PropsWithChildren) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let disposed = false;
    let cleanup = () => undefined;

    void import("lenis").then(({ default: Lenis }) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9
      });
      const tick = (time: number) => lenis.raf(time * 1000);
      const onScroll = () => ScrollTrigger.update();
      const handleVisibility = () => {
        if (document.hidden) {
          lenis.stop();
          gsap.ticker.remove(tick);
        } else {
          lenis.start();
          gsap.ticker.add(tick);
        }
      };

      lenis.on("scroll", onScroll);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      document.addEventListener("visibilitychange", handleVisibility);
      ScrollTrigger.refresh();

      cleanup = () => {
        document.removeEventListener("visibilitychange", handleVisibility);
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.off("scroll", onScroll);
        lenis.destroy();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [reducedMotion]);

  return children;
}
