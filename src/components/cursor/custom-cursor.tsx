import { useEffect, useRef } from "react";
import { cn } from "@/helpers/cn";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface CustomCursorProps {
  className?: string;
  manageDocumentCursor?: boolean;
}

export function CustomCursor({ className, manageDocumentCursor = true }: CustomCursorProps) {
  const cursor = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine) and (min-width: 1024px)");

  useEffect(() => {
    if (reducedMotion || !finePointer || !cursor.current) return;
    const element = cursor.current;
    const position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let frame = 0;

    if (manageDocumentCursor) document.documentElement.classList.add("has-custom-cursor");
    const renderPosition = () => {
      frame = 0;
      element.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
    };
    const move = (event: PointerEvent) => {
      position.x = event.clientX;
      position.y = event.clientY;
      element.dataset.visible = "true";
      if (!frame) frame = window.requestAnimationFrame(renderPosition);
    };
    const leave = () => {
      element.dataset.visible = "false";
    };
    const over = (event: PointerEvent) => {
      const targetElement = event.target instanceof Element ? event.target : null;
      element.dataset.state =
        targetElement?.closest("[data-cursor]")?.getAttribute("data-cursor") ?? "default";
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      if (manageDocumentCursor) document.documentElement.classList.remove("has-custom-cursor");
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [finePointer, manageDocumentCursor, reducedMotion]);

  if (reducedMotion || !finePointer) return null;
  return (
    <div
      ref={cursor}
      className={cn(
        "group pointer-events-none fixed top-0 left-0 z-[9999] -mt-2.5 -ml-2.5 size-5 opacity-0 transition-opacity duration-200 will-change-transform data-[visible=true]:opacity-100 data-[state=action]:[&_svg]:scale-[2.1] data-[state=project]:[&_svg]:scale-[2.1] data-[state=technology]:[&_svg]:scale-150",
        className
      )}
      aria-hidden="true"
      data-state="default"
      data-ui="custom-cursor"
    >
      <svg
        className="block size-full overflow-visible transition-transform duration-300 ease-editorial-out"
        viewBox="0 0 24 24"
        focusable="false"
      >
        <circle
          className="fill-[color-mix(in_srgb,var(--accent)_12%,transparent)] stroke-accent transition-[fill] duration-200 [stroke-width:1] group-data-[state=action]:fill-[color-mix(in_srgb,var(--accent)_28%,transparent)] group-data-[state=project]:fill-[color-mix(in_srgb,var(--accent)_28%,transparent)]"
          cx="12"
          cy="12"
          r="9"
        />
        <path
          className="fill-none stroke-accent opacity-0 transition-opacity duration-200 [stroke-linecap:round] [stroke-width:1.2] group-data-[state=action]:opacity-100 group-data-[state=project]:opacity-100"
          d="M12 7v10M7 12h10"
        />
      </svg>
    </div>
  );
}
