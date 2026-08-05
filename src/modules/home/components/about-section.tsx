import { ArrowDownRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { portfolio } from "@/data/portfolio";

export function AboutSection() {
  return (
    <section className="about-section section-shell" id="about" aria-labelledby="about-title">
      <Reveal>
        <SectionTitle
          titleId="about-title"
          eyebrow="01 · About"
          title="SaaS products, built end to end."
        />
      </Reveal>
      <div className="about-section__grid">
        <Reveal className="about-section__copy">
          {portfolio.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <a
            className="text-link"
            href={portfolio.profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Read the résumé <ArrowDownRight aria-hidden="true" />
          </a>
        </Reveal>
        <div className="capability-list">
          {portfolio.capabilities.map((capability, index) => (
            <Reveal key={capability.title} delay={index * 0.05}>
              <article>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
