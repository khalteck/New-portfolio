import { ArrowDownRight, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { ResponsivePicture } from "@/components/ui/responsive-picture";
import type { PortfolioProject, PublishedProject } from "@/types/portfolio";
import { eyebrowClass } from "@/styles/classes";

const rowLayout =
  "grid min-h-44 grid-cols-[4rem_minmax(14rem,0.9fr)_minmax(16rem,1.25fr)_minmax(12rem,0.7fr)] items-center gap-8 py-8 max-lg:grid-cols-[3rem_minmax(12rem,0.9fr)_minmax(14rem,1.2fr)] max-md:grid-cols-[2rem_1fr] max-md:gap-4";

interface ProjectRowProps {
  project: PortfolioProject;
  onPreview: (project: PublishedProject | undefined, target?: HTMLElement) => void;
  onPointerMove: (x: number, y: number) => void;
}

export function ProjectRow({ project, onPreview, onPointerMove }: ProjectRowProps) {
  if (project.status === "incoming") {
    return (
      <article
        className={`${rowLayout} border-t border-line`}
        aria-label={`${project.title}, incoming`}
        data-ui="incoming-project"
      >
        <span className="text-[0.68rem] font-extrabold text-accent">{project.number}</span>
        <div className="max-md:col-start-2">
          <span className={eyebrowClass}>{project.previewLabel}</span>
          <h3 className="mt-3 mb-0 font-display text-[clamp(2.8rem,5vw,5.7rem)] leading-[0.86] font-semibold tracking-[-0.03em] uppercase">
            {project.title}
          </h3>
        </div>
        <p className="m-0 text-[0.84rem] text-muted max-md:col-start-2">
          {project.shortDescription}
        </p>
        <div
          className="relative block min-h-[7.5rem] overflow-hidden border border-line bg-canvas max-lg:col-[2/-1] max-md:col-start-2 max-md:mt-4 max-md:min-h-48 [&_i]:absolute [&_i]:right-[20%] [&_i]:h-[140%] [&_i]:w-px [&_i]:rotate-[32deg] [&_i]:bg-line-bright [&_i:nth-child(2)]:right-[45%] [&_i:nth-child(3)]:right-[70%] [&>svg]:absolute [&>svg]:top-3 [&>svg]:right-3 [&>svg]:w-4 [&>svg]:text-faint [&>span]:absolute [&>span]:bottom-3 [&>span]:left-3 [&>span]:text-[0.6rem] [&>span]:tracking-[0.12em] [&>span]:text-accent [&>span]:uppercase"
          aria-hidden="true"
        >
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
    <article className="border-t border-line">
      <Link
        className={`${rowLayout} group relative no-underline after:absolute after:right-0 after:bottom-[-1px] after:left-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-700 after:ease-editorial-out hover:after:scale-x-100 focus-visible:after:scale-x-100`}
        to={`/projects/${project.slug}`}
        aria-label={`View ${project.title} case study`}
        data-cursor="project"
        data-analytics-event="project_open"
        data-analytics-label={project.slug}
        onPointerEnter={(event) => onPreview(project, event.currentTarget)}
        onPointerMove={(event) => onPointerMove(event.clientX, event.clientY)}
        onPointerLeave={() => onPreview(undefined)}
        onFocus={(event) => onPreview(project, event.currentTarget)}
        onBlur={() => onPreview(undefined)}
      >
        <span className="text-[0.68rem] font-extrabold text-accent">{project.number}</span>
        <div className="max-md:col-start-2">
          <span className={eyebrowClass}>Selected project</span>
          <h3 className="mt-3 mb-0 font-display text-[clamp(2.8rem,5vw,5.7rem)] leading-[0.86] font-semibold tracking-[-0.03em] uppercase transition-colors duration-200 group-hover:text-transparent group-hover:[-webkit-text-stroke:1px_var(--accent)] group-focus-visible:text-transparent group-focus-visible:[-webkit-text-stroke:1px_var(--accent)] forced-colors:group-hover:text-[LinkText] forced-colors:group-hover:[-webkit-text-stroke:0] forced-colors:group-focus-visible:text-[LinkText] forced-colors:group-focus-visible:[-webkit-text-stroke:0]">
            {project.title}
          </h3>
        </div>
        <p className="m-0 text-[0.84rem] text-muted max-md:col-start-2">
          {project.shortDescription}
        </p>
        <div className="flex items-center justify-between gap-4 text-[0.65rem] tracking-[0.04em] text-faint uppercase transition-[color,transform] duration-300 ease-editorial-out group-hover:translate-x-2 group-hover:text-copy group-focus-visible:translate-x-2 group-focus-visible:text-copy max-lg:col-[2/-1] max-md:col-start-2 [&_svg]:w-5 [&_svg]:shrink-0">
          <span>{project.technologies.slice(0, 4).join(" · ")}</span>
          <ArrowDownRight aria-hidden="true" />
        </div>
        <div className="hidden max-md:col-start-2 max-md:mt-4 max-md:block [@media(pointer:coarse)]:col-[2/-1] [@media(pointer:coarse)]:mt-4 [@media(pointer:coarse)]:block [&_img]:aspect-[16/10] [&_img]:object-cover">
          <ResponsivePicture image={project.preview} />
        </div>
      </Link>
    </article>
  );
}
