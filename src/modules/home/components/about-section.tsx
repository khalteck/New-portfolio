import { ArrowDownRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { portfolio } from "@/data/portfolio";
import { sectionShell, textLink } from "@/styles/classes";

export function AboutSection() {
  return (
    <section className={sectionShell} id="about" aria-labelledby="about-title">
      <Reveal>
        <SectionTitle
          titleId="about-title"
          eyebrow="01 · About"
          title="SaaS products, built end to end."
        />
      </Reveal>
      <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-[clamp(4rem,10vw,10rem)] pt-[clamp(3rem,7vw,7rem)] max-md:grid-cols-1">
        <Reveal className="[&>p]:text-[clamp(1.05rem,1.8vw,1.3rem)] [&>p]:text-muted [&>p:first-child]:text-copy">
          {portfolio.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <a
            className={textLink}
            href={portfolio.profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Read the résumé <ArrowDownRight aria-hidden="true" />
          </a>
        </Reveal>
        <div>
          {portfolio.capabilities.map((capability, index) => (
            <Reveal
              className="[&:last-child_article]:border-b [&:last-child_article]:border-line"
              key={capability.title}
              delay={index * 0.05}
            >
              <article className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-7">
                <span className="text-[0.65rem] font-extrabold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="mb-2 text-[1.05rem]">{capability.title}</h3>
                  <p className="m-0 text-[0.86rem] text-muted">{capability.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
