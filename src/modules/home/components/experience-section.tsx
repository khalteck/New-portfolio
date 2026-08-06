import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { portfolio } from "@/data/portfolio";
import { externalLinkProps } from "@/helpers/external-link";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { sectionShell } from "@/styles/classes";

export function ExperienceSection() {
  const list = useRef<HTMLDivElement>(null);
  const timelineProgress = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !list.current || !timelineProgress.current) return;

      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        timelineProgress.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list.current,
            start: "top 70%",
            end: "bottom 65%",
            scrub: true,
            invalidateOnRefresh: true
          }
        }
      );
    },
    { scope: list, dependencies: [reducedMotion], revertOnUpdate: true }
  );

  return (
    <section className={sectionShell} id="experience" aria-labelledby="experience-title">
      <Reveal>
        <SectionTitle
          titleId="experience-title"
          eyebrow="03 · Experience"
          title="Experience across borders."
          description="Roles and outcomes from my current résumé."
        />
      </Reveal>
      <div ref={list} className="relative pt-8">
        <div
          className="pointer-events-none absolute top-[calc(2rem+clamp(2rem,4vw,3.5rem)+0.3rem)] bottom-[calc(clamp(2rem,4vw,3.5rem)+0.3rem)] left-[0.3rem] z-0 w-0.5 overflow-hidden bg-[color-mix(in_srgb,var(--border-bright)_70%,transparent)]"
          aria-hidden="true"
          data-ui="experience-timeline"
        >
          <span
            ref={timelineProgress}
            className="absolute inset-0 block origin-top scale-y-100 bg-linear-to-b from-accent-soft to-accent shadow-[0_0_0.75rem_rgb(190_255_74/48%)] will-change-transform"
            data-ui="experience-timeline-progress"
          />
        </div>
        {portfolio.experiences.map((experience, index) => (
          <Reveal
            className="relative z-10"
            key={`${experience.company}-${experience.start}`}
            delay={index * 0.05}
          >
            <article className="grid grid-cols-[3.5rem_minmax(12rem,0.75fr)_minmax(12rem,0.7fr)_minmax(18rem,1.25fr)] gap-8 border-b border-line py-[clamp(2rem,4vw,3.5rem)] max-lg:grid-cols-[2.5rem_1fr_1fr] max-md:grid-cols-[2rem_1fr] max-md:gap-4">
              <div className="relative min-h-4">
                <span
                  className="absolute top-[0.05rem] left-0 z-10 size-[0.7rem] rounded-full border-2 border-accent bg-canvas shadow-[0_0_0_0.3rem_rgb(190_255_74/8%)]"
                  aria-hidden="true"
                  data-ui="experience-node"
                />
                <span className="block pl-[1.35rem] text-[0.65rem] font-extrabold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <header>
                <h3 className="mb-1.5 text-[1.1rem]">
                  {experience.companyUrl ? (
                    <a
                      className="inline-flex items-center gap-1.5 no-underline [&_svg]:w-3.5"
                      href={experience.companyUrl}
                      {...externalLinkProps}
                    >
                      {experience.company} <ArrowUpRight aria-hidden="true" />
                    </a>
                  ) : (
                    experience.company
                  )}
                </h3>
                <p className="text-[0.72rem] text-faint">{experience.location}</p>
              </header>
              <div className="flex flex-col gap-1.5 max-md:col-start-2">
                <strong className="text-[0.88rem]">{experience.title}</strong>
                <span className="text-[0.72rem] text-faint">
                  {experience.start} to {experience.end}
                </span>
              </div>
              <div className="max-lg:col-[2/-1] max-md:col-start-2">
                <p className="text-[0.84rem] text-muted">{experience.summary}</p>
                <ul className="pl-4.5 text-[0.84rem] text-muted">
                  {experience.achievements.map((achievement) => (
                    <li className="text-[0.84rem] text-muted" key={achievement}>
                      {achievement}
                    </li>
                  ))}
                </ul>
                <p className="mb-0 text-[0.67rem] tracking-[0.04em] text-faint uppercase">
                  {experience.technologies.join(" · ")}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
