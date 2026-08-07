import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ResponsivePicture } from "@/components/ui/responsive-picture";
import { externalLinkProps } from "@/helpers/external-link";
import { ContactFooter } from "@/modules/home";
import { cn } from "@/helpers/cn";
import { getAdjacentProjects, getPublishedProject } from "../operations/projects";
import { NotFoundView } from "@/routes/not-found.view";

const DetailSection = ({
  number,
  title,
  paragraphs,
  bullets
}: {
  number: string;
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
}) => (
  <section className="grid grid-cols-[minmax(12rem,0.65fr)_minmax(0,1.35fr)] gap-[clamp(3rem,10vw,10rem)] border-t border-line py-[clamp(3rem,6vw,6rem)] max-md:grid-cols-1">
    <header className="grid grid-cols-[2.5rem_1fr] content-start gap-4">
      <span className="text-[0.65rem] font-extrabold text-accent">{number}</span>
      <h2 className="m-0 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] font-semibold tracking-[-0.025em] uppercase">
        {title}
      </h2>
    </header>
    <div className="[&_li]:text-[clamp(0.95rem,1.5vw,1.1rem)] [&_li]:text-muted [&_li+li]:mt-3 [&_p]:text-[clamp(0.95rem,1.5vw,1.1rem)] [&_p]:text-muted [&_ul]:m-0 [&_ul]:pl-5">
      {paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {bullets ? (
        <ul>
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </div>
  </section>
);

export function ProjectCaseStudyView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const project = getPublishedProject(slug);

  if (!project) return <NotFoundView />;

  const adjacent = getAdjacentProjects(project.slug);

  const handleBack = (event: MouseEvent<HTMLAnchorElement>) => {
    if (location.key !== "default") {
      event.preventDefault();
      void navigate(-1);
    }
  };

  return (
    <>
      <main className="relative z-10 pt-[3.75rem]" id="main-content">
        <article>
          <header className="mx-auto w-[calc(100%-3rem)] max-w-[90rem] py-[clamp(4rem,9vw,8rem)] md:pl-20 max-md:w-[calc(100%-2rem)]">
            <a
              className="inline-flex min-h-11 items-center gap-2 text-[0.72rem] font-extrabold tracking-[0.08em] text-muted uppercase no-underline [&_svg]:w-4"
              href="/#work"
              onClick={handleBack}
            >
              <ArrowLeft aria-hidden="true" /> Back to work
            </a>
            <div className="mt-[clamp(3rem,8vw,7rem)] flex justify-between border-b border-line pb-6 text-[0.7rem] font-extrabold tracking-[0.12em] text-accent uppercase">
              <span>Project {project.number}</span>
              {project.year ? <span>{project.year}</span> : null}
            </div>
            <h1
              className="mt-3 mb-[clamp(3rem,6vw,6rem)] font-display text-[clamp(3.6rem,7.2vw,7.2rem)] leading-[0.88] font-bold tracking-[-0.035em] uppercase max-md:text-[clamp(3.2rem,17vw,5rem)]"
              tabIndex={-1}
            >
              {project.title}
            </h1>
            <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] gap-[clamp(3rem,10vw,10rem)] max-md:grid-cols-1">
              <p className="text-[clamp(1.15rem,2.4vw,1.65rem)] text-muted">{project.overview}</p>
              <dl className="m-0">
                <div className="grid grid-cols-[5rem_1fr] gap-4 border-t border-line py-4">
                  <dt className="text-[0.65rem] font-extrabold tracking-[0.08em] text-faint uppercase">
                    Role
                  </dt>
                  <dd className="text-[0.78rem] text-muted">{project.role}</dd>
                </div>
                <div className="grid grid-cols-[5rem_1fr] gap-4 border-t border-line py-4">
                  <dt className="text-[0.65rem] font-extrabold tracking-[0.08em] text-faint uppercase">
                    Stack
                  </dt>
                  <dd className="text-[0.78rem] text-muted">{project.technologies.join(" · ")}</dd>
                </div>
              </dl>
            </div>
            {project.liveUrl || project.sourceUrl ? (
              <div className="mt-12 flex flex-wrap gap-4" data-ui="case-actions">
                {project.liveUrl ? (
                  <a
                    className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line-bright px-4 py-2 text-[0.7rem] font-extrabold tracking-[0.08em] uppercase no-underline [&_svg]:w-3.5"
                    href={project.liveUrl}
                    {...externalLinkProps}
                    data-cursor="action"
                    data-analytics-event="project_external"
                    data-analytics-label="live_product"
                  >
                    Live product <ArrowUpRight aria-hidden="true" />
                  </a>
                ) : null}
                {project.sourceUrl ? (
                  <a
                    className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line-bright px-4 py-2 text-[0.7rem] font-extrabold tracking-[0.08em] uppercase no-underline [&_svg]:w-3.5"
                    href={project.sourceUrl}
                    {...externalLinkProps}
                    data-cursor="action"
                    data-analytics-event="project_external"
                    data-analytics-label="source_code"
                  >
                    Source code <ArrowUpRight aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </header>

          <figure className="m-0 w-full bg-surface-raised p-[clamp(1rem,3vw,3rem)]">
            <ResponsivePicture
              className="max-h-[70rem] object-cover"
              image={project.preview}
              eager
            />
          </figure>

          <div className="relative z-10 mx-auto w-[calc(100%-3rem)] max-w-[90rem] pt-[clamp(6rem,12vw,12rem)] pb-[clamp(7rem,13vw,13rem)] md:pl-20 max-md:w-[calc(100%-2rem)]">
            <DetailSection number="01" title="Context" paragraphs={project.problem} />
            <DetailSection number="02" title="Response" paragraphs={project.solution} />
            <DetailSection number="03" title="Contribution" bullets={project.responsibilities} />
            <DetailSection
              number="04"
              title="Engineering challenges"
              bullets={project.challenges}
            />
            <DetailSection number="05" title="Delivered evidence" bullets={project.outcomes} />

            <div
              className="grid grid-cols-2 gap-[clamp(1rem,3vw,3rem)] border-t border-line py-[clamp(5rem,10vw,10rem)] max-md:grid-cols-1 [&>figure]:m-0 [&>figure:nth-child(3n+1)]:col-span-full max-md:[&>figure]:col-span-1"
              aria-label={`${project.title} gallery`}
            >
              {project.gallery.map((image) => (
                <figure
                  key={image.src}
                  className={cn(image.width < 600 && "w-[min(100%,25rem)] justify-self-center")}
                >
                  <ResponsivePicture image={image} />
                  {image.caption ? (
                    <figcaption className="pt-3 text-[0.7rem] text-faint">
                      {image.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>

            <details className="border-y border-line py-6 text-[0.78rem] text-muted">
              <summary className="min-h-11 cursor-pointer font-extrabold tracking-[0.05em] text-copy uppercase">
                Evidence and publication note
              </summary>
              <p>{project.sourceNote}</p>
            </details>

            {adjacent ? (
              <nav
                className="mt-[clamp(5rem,10vw,10rem)] grid grid-cols-2 border-y border-line max-md:grid-cols-1 [&_a]:flex [&_a]:min-h-36 [&_a]:items-center [&_a]:gap-4 [&_a]:p-8 [&_a]:no-underline [&_svg]:w-5 [&_svg]:text-accent"
                aria-label="Other case studies"
              >
                <Link to={`/projects/${adjacent.previous.slug}`}>
                  <ArrowLeft aria-hidden="true" />
                  <span className="text-[0.65rem] tracking-[0.08em] text-faint uppercase">
                    Previous{" "}
                    <strong className="mt-1.5 block font-display text-[2rem] tracking-[-0.02em] text-copy">
                      {adjacent.previous.title}
                    </strong>
                  </span>
                </Link>
                <Link
                  className="justify-end border-l border-line text-right max-md:border-t max-md:border-l-0"
                  to={`/projects/${adjacent.next.slug}`}
                >
                  <span className="text-[0.65rem] tracking-[0.08em] text-faint uppercase">
                    Next{" "}
                    <strong className="mt-1.5 block font-display text-[2rem] tracking-[-0.02em] text-copy">
                      {adjacent.next.title}
                    </strong>
                  </span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              </nav>
            ) : null}
          </div>
        </article>
      </main>
      <ContactFooter />
    </>
  );
}

export default ProjectCaseStudyView;
