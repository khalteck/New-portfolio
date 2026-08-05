import { ArrowDownRight, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { ResponsivePicture } from "@/components/ui/responsive-picture";
import type { PortfolioProject, PublishedProject } from "@/types/portfolio";

interface ProjectRowProps {
  project: PortfolioProject;
  onPreview: (project: PublishedProject | undefined, target?: HTMLElement) => void;
  onPointerMove: (x: number, y: number) => void;
}

export function ProjectRow({ project, onPreview, onPointerMove }: ProjectRowProps) {
  if (project.status === "incoming") {
    return (
      <article
        className="project-row project-row--incoming"
        aria-label={`${project.title}, incoming`}
      >
        <span className="project-row__number">{project.number}</span>
        <div className="project-row__title">
          <span className="status-label">{project.previewLabel}</span>
          <h3>{project.title}</h3>
        </div>
        <p>{project.shortDescription}</p>
        <div className="incoming-preview" aria-hidden="true">
          <i />
          <i />
          <i />
          <LockKeyhole />
          <span>Incoming / {project.number} · Placeholder</span>
        </div>
      </article>
    );
  }

  return (
    <article className="project-row">
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`View ${project.title} case study`}
        data-cursor="project"
        onPointerEnter={(event) => onPreview(project, event.currentTarget)}
        onPointerMove={(event) => onPointerMove(event.clientX, event.clientY)}
        onPointerLeave={() => onPreview(undefined)}
        onFocus={(event) => onPreview(project, event.currentTarget)}
        onBlur={() => onPreview(undefined)}
      >
        <span className="project-row__number">{project.number}</span>
        <div className="project-row__title">
          <span className="status-label">Selected project</span>
          <h3>{project.title}</h3>
        </div>
        <p>{project.shortDescription}</p>
        <div className="project-row__meta">
          <span>{project.technologies.slice(0, 4).join(" · ")}</span>
          <ArrowDownRight aria-hidden="true" />
        </div>
        <div className="project-row__mobile-image">
          <ResponsivePicture image={project.preview} />
        </div>
      </Link>
    </article>
  );
}
