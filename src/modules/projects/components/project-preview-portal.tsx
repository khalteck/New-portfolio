import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ResponsivePicture } from "@/components/ui/responsive-picture";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { PublishedProject } from "@/types/portfolio";

interface ProjectPreviewPortalProps {
  project?: PublishedProject;
  x: number;
  y: number;
}

export function ProjectPreviewPortal({ project, x, y }: ProjectPreviewPortalProps) {
  const element = useRef<HTMLDivElement>(null);
  const target = useRef({ x, y });
  const reducedMotion = useReducedMotion();
  const constrainedPointer = useMediaQuery("(max-width: 767px), (pointer: coarse)");
  target.current = { x, y };

  useEffect(() => {
    if (!project || reducedMotion || constrainedPointer || !element.current) return;

    const current = { ...target.current };
    let frame = 0;
    let running = !document.hidden;

    const update = () => {
      current.x += (target.current.x - current.x) * 0.22;
      current.y += (target.current.y - current.y) * 0.22;
      if (element.current) {
        element.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }
      frame = running ? window.requestAnimationFrame(update) : 0;
    };
    const handleVisibility = () => {
      running = !document.hidden;
      if (running && !frame) frame = window.requestAnimationFrame(update);
      if (!running && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    frame = window.requestAnimationFrame(update);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [constrainedPointer, project, reducedMotion]);

  if (!project || reducedMotion || constrainedPointer || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      ref={element}
      className="project-preview-portal"
      style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      aria-hidden="true"
    >
      <ResponsivePicture image={project.preview} />
      <span>{project.title}</span>
    </div>,
    document.body
  );
}
