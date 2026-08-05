import { Braces, DatabaseZap, FlaskConical, Workflow } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { portfolio } from "@/data/portfolio";

const icons = {
  code: Braces,
  state: Workflow,
  server: DatabaseZap,
  quality: FlaskConical
};

export function TechnologyStackSection() {
  return (
    <section className="stack-section section-shell" id="stack" aria-labelledby="stack-title">
      <Reveal>
        <SectionTitle
          titleId="stack-title"
          eyebrow="02 · Stack"
          title="Tools chosen for the system, not the trend."
          description="A verified working stack across interface architecture, data flow, product services, and delivery quality."
        />
      </Reveal>
      <div className="technology-groups">
        {portfolio.technologyGroups.map((group, groupIndex) => {
          const Icon = icons[group.icon];
          return (
            <Reveal key={group.title} delay={groupIndex * 0.05}>
              <article className="technology-group">
                <header>
                  <Icon aria-hidden="true" />
                  <h3>{group.title}</h3>
                </header>
                <ul>
                  {group.technologies.map((technology) => (
                    <li key={technology} data-cursor="technology">
                      <span aria-hidden="true">↗</span>
                      {technology}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
