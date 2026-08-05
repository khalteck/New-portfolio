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
