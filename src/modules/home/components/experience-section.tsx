import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { portfolio } from "@/data/portfolio";
import { externalLinkProps } from "@/helpers/external-link";

export function ExperienceSection() {
  return (
    <section
      className="experience-section section-shell"
      id="experience"
      aria-labelledby="experience-title"
    >
      <Reveal>
        <SectionTitle
          titleId="experience-title"
          eyebrow="03 · Experience"
          title="Built with teams across borders."
          description="Professional experience and impact sourced from the current résumé."
        />
      </Reveal>
      <div className="experience-list">
        {portfolio.experiences.map((experience, index) => (
          <Reveal key={`${experience.company}-${experience.start}`} delay={index * 0.05}>
            <article className="experience-row">
              <span className="experience-row__number">{String(index + 1).padStart(2, "0")}</span>
              <header>
                <h3>
                  {experience.companyUrl ? (
                    <a href={experience.companyUrl} {...externalLinkProps}>
                      {experience.company} <ArrowUpRight aria-hidden="true" />
                    </a>
                  ) : (
                    experience.company
                  )}
                </h3>
                <p>{experience.location}</p>
              </header>
              <div className="experience-row__role">
                <strong>{experience.title}</strong>
                <span>
                  {experience.start} — {experience.end}
                </span>
              </div>
              <div className="experience-row__detail">
                <p>{experience.summary}</p>
                <ul>
                  {experience.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
                <p className="technology-line">{experience.technologies.join(" · ")}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
