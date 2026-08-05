import { useEffect, useRef } from "react";
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
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let frame = 0;
    let running = !document.hidden;

    if (manageDocumentCursor) document.documentElement.classList.add("has-custom-cursor");
    const animate = () => {
      current.x += (target.x - current.x) * 0.17;
      current.y += (target.y - current.y) * 0.17;
      element.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      frame = running ? window.requestAnimationFrame(animate) : 0;
    };
    const move = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      element.dataset.visible = "true";
    };
    const leave = () => {
      element.dataset.visible = "false";
    };
    const over = (event: PointerEvent) => {
      const targetElement = event.target instanceof Element ? event.target : null;
      element.dataset.state =
        targetElement?.closest("[data-cursor]")?.getAttribute("data-cursor") ?? "default";
    };
    const handleVisibility = () => {
      running = !document.hidden;
      if (running && !frame) frame = window.requestAnimationFrame(animate);
      if (!running && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    if (running) frame = window.requestAnimationFrame(animate);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      running = false;
      if (manageDocumentCursor) document.documentElement.classList.remove("has-custom-cursor");
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [finePointer, manageDocumentCursor, reducedMotion]);

  if (reducedMotion || !finePointer) return null;
  return (
    <div
      ref={cursor}
      className={["custom-cursor", className].filter(Boolean).join(" ")}
      aria-hidden="true"
      data-state="default"
    >
      <svg viewBox="0 0 24 24" focusable="false">
        <circle className="custom-cursor__ring" cx="12" cy="12" r="9" />
        <path className="custom-cursor__mark" d="M12 7v10M7 12h10" />
      </svg>
    </div>
  );
}
