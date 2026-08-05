import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ResponsivePicture } from "@/components/ui/responsive-picture";
import { externalLinkProps } from "@/helpers/external-link";
import { ContactFooter } from "@/modules/home";
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
  <section className="case-detail-section">
    <header>
      <span>{number}</span>
      <h2>{title}</h2>
    </header>
    <div>
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
      <main className="case-study" id="main-content">
        <article>
          <header className="case-hero">
            <a className="case-back" href="/#work" onClick={handleBack}>
              <ArrowLeft aria-hidden="true" /> Back to work
            </a>
            <div className="case-hero__eyebrow">
              <span>Project {project.number}</span>
              {project.year ? <span>{project.year}</span> : null}
            </div>
            <h1 tabIndex={-1}>{project.title}</h1>
            <div className="case-hero__summary">
              <p>{project.overview}</p>
              <dl>
                <div>
                  <dt>Role</dt>
                  <dd>{project.role}</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>{project.technologies.join(" · ")}</dd>
                </div>
              </dl>
            </div>
            {project.liveUrl || project.sourceUrl ? (
              <div className="case-hero__actions">
                {project.liveUrl ? (
                  <a
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

          <figure className="case-cover">
            <ResponsivePicture image={project.preview} eager />
          </figure>

          <div className="case-body section-shell">
            <DetailSection number="01" title="Context" paragraphs={project.problem} />
            <DetailSection number="02" title="Response" paragraphs={project.solution} />
            <DetailSection number="03" title="Contribution" bullets={project.responsibilities} />
            <DetailSection
              number="04"
              title="Engineering challenges"
              bullets={project.challenges}
            />
            <DetailSection number="05" title="Delivered evidence" bullets={project.outcomes} />

            <div className="case-gallery" aria-label={`${project.title} gallery`}>
              {project.gallery.map((image) => (
                <figure
                  key={image.src}
                  className={image.width < 600 ? "case-gallery__mobile" : undefined}
                >
                  <ResponsivePicture image={image} />
                  {image.caption ? <figcaption>{image.caption}</figcaption> : null}
                </figure>
              ))}
            </div>

            <details className="evidence-note">
              <summary>Evidence and publication note</summary>
              <p>{project.sourceNote}</p>
            </details>

            {adjacent ? (
              <nav className="project-pagination" aria-label="Other case studies">
                <Link to={`/projects/${adjacent.previous.slug}`}>
                  <ArrowLeft aria-hidden="true" />
                  <span>
                    Previous <strong>{adjacent.previous.title}</strong>
                  </span>
                </Link>
                <Link to={`/projects/${adjacent.next.slug}`}>
                  <span>
                    Next <strong>{adjacent.next.title}</strong>
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
