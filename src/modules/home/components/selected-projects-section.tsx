import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { portfolio, publishedProjects } from "@/data/portfolio";
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
  const visibleProjects = import.meta.env.DEV ? portfolio.projects : publishedProjects;

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
    <section
      className="relative z-10 w-full scroll-mt-16 border-t border-line bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] px-[max(1.5rem,calc((100vw-90rem)/2))] py-[clamp(7rem,13vw,13rem)] md:pl-[max(6.5rem,calc((100vw-90rem)/2))] max-md:px-4"
      id="work"
      aria-labelledby="projects-title"
    >
      <Reveal>
        <SectionTitle
          titleId="projects-title"
          eyebrow="04 · Selected work"
          title="Selected product work."
          description={
            import.meta.env.DEV
              ? "Published case studies and projects in progress."
              : "Published case studies across SaaS, education, media, art, and financial services."
          }
        />
      </Reveal>
      <div className="pt-[clamp(3rem,7vw,6rem)]">
        {visibleProjects.map((project) => (
          <Reveal
            className="[&:last-child_article]:border-b [&:last-child_article]:border-line"
            key={project.status === "published" ? project.slug : project.id}
          >
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
