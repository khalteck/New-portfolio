import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/helpers/cn";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let frameId = 0;
    const updateVisibility = () => {
      frameId = 0;
      const threshold = Math.max(window.innerHeight * 0.85, 480);
      setVisible(window.scrollY >= threshold);
    };
    const scheduleUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <button
      className={cn(
        "fixed right-11 bottom-5 z-[125] grid size-12 translate-y-2 scale-[0.92] cursor-pointer place-items-center rounded-2xl border border-white/15 bg-[linear-gradient(145deg,rgb(255_255_255/12%),transparent_48%),rgb(24_28_23/62%)] text-copy opacity-0 shadow-[0_0.8rem_2.5rem_rgb(0_0_0/24%),inset_0_1px_rgb(255_255_255/10%)] backdrop-blur-[22px] backdrop-saturate-[155%] transition-[opacity,transform,border-color,color] duration-300 ease-editorial-out pointer-events-none hover:border-accent/40 hover:text-accent focus-visible:border-accent/40 focus-visible:text-accent [&_svg]:w-4 [&_svg]:stroke-[1.8] max-md:right-[max(1rem,env(safe-area-inset-right))] max-md:bottom-[calc(5.75rem+env(safe-area-inset-bottom))] max-md:size-[2.85rem] max-md:rounded-[0.95rem]",
        visible && "translate-y-0 scale-100 opacity-100 pointer-events-auto"
      )}
      type="button"
      aria-label="Scroll to top"
      aria-hidden={!visible}
      data-visible={visible}
      data-ui="scroll-to-top"
      tabIndex={visible ? 0 : -1}
      onClick={scrollToTop}
    >
      <ArrowUp aria-hidden="true" />
    </button>
  );
}
