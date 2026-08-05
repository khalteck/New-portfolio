import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { portfolio } from "@/data/portfolio";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ProjectPreviewPortal } from "@/modules/projects/components/project-preview-portal";
import { ProjectRow } from "@/modules/projects/components/project-row";
import type { PublishedProject } from "@/types/portfolio";

export function SelectedProjectsSection() {
  const [activeProject, setActiveProject] = useState<PublishedProject>();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const pendingPosition = useRef(position);
  const positionFrame = useRef(0);
  const reducedMotion = useReducedMotion();
  const constrainedPointer = useMediaQuery("(max-width: 767px), (pointer: coarse)");

  useEffect(
    () => () => {
      if (positionFrame.current) window.cancelAnimationFrame(positionFrame.current);
    },
    []
  );

  const handlePreview = (project: PublishedProject | undefined, target?: HTMLElement) => {
    setActiveProject(reducedMotion || constrainedPointer ? undefined : project);
    if (project && target) {
      const bounds = target.getBoundingClientRect();
      setPosition({ x: Math.max(24, bounds.right - 440), y: bounds.top + bounds.height / 2 });
    }
  };

  const handlePointerMove = (x: number, y: number) => {
    if (reducedMotion || constrainedPointer) return;
    pendingPosition.current = { x: x + 28, y };
    if (positionFrame.current) return;

    positionFrame.current = window.requestAnimationFrame(() => {
      setPosition(pendingPosition.current);
      positionFrame.current = 0;
    });
  };

  return (
    <section className="projects-section section-shell" id="work" aria-labelledby="projects-title">
      <Reveal>
        <SectionTitle
          titleId="projects-title"
          eyebrow="04 · Selected work"
          title="Selected product work."
          description="Published case studies and projects in progress."
        />
      </Reveal>
      <div className="project-list">
        {portfolio.projects.map((project) => (
          <Reveal key={project.status === "published" ? project.slug : project.id}>
            <ProjectRow
              project={project}
              onPreview={handlePreview}
              onPointerMove={handlePointerMove}
            />
          </Reveal>
        ))}
      </div>
      <ProjectPreviewPortal project={activeProject} x={position.x} y={position.y} />
    </section>
  );
}
