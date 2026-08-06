import { useEffect, useRef } from "react";

export function ScrollProgressIndicator() {
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? Math.min(1, window.scrollY / distance) : 0;
      if (fill.current) fill.current.style.transform = `scaleY(${progress})`;
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="fixed top-28 right-1.5 z-[60] h-[calc(100vh-14rem)] w-0.5 bg-line max-lg:hidden"
      aria-hidden="true"
      data-ui="scroll-progress"
    >
      <span ref={fill} className="block h-full w-full origin-top scale-y-0 bg-accent" />
    </div>
  );
}
