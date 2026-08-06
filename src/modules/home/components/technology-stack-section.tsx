import type { ElementType } from "react";
import {
  Accessibility,
  Boxes,
  Braces,
  DatabaseZap,
  FlaskConical,
  Gauge,
  Link2,
  Network,
  ScanSearch,
  Workflow
} from "lucide-react";
import {
  SiExpo,
  SiExpress,
  SiFirebase,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiReactquery,
  SiRedux,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVitest,
  SiZod
} from "react-icons/si";
import { Reveal } from "@/components/motion/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { portfolio } from "@/data/portfolio";
import type { TechnologyIconKey } from "@/types/portfolio";
import { cn } from "@/helpers/cn";

const icons = {
  code: Braces,
  state: Workflow,
  server: DatabaseZap,
  quality: FlaskConical
};

const technologyIcons: Record<TechnologyIconKey, ElementType> = {
  accessibility: Accessibility,
  cicd: Workflow,
  expo: SiExpo,
  express: SiExpress,
  firebase: SiFirebase,
  git: SiGit,
  javascript: SiJavascript,
  mongodb: SiMongodb,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  performance: Gauge,
  playwright: ScanSearch,
  react: SiReact,
  rest: Network,
  redux: SiRedux,
  socketio: SiSocketdotio,
  tailwind: SiTailwindcss,
  "tanstack-query": SiReactquery,
  typescript: SiTypescript,
  "url-state": Link2,
  vite: SiVite,
  vitest: SiVitest,
  zod: SiZod,
  zustand: Boxes
};

export function TechnologyStackSection() {
  return (
    <section
      className="relative z-10 w-full scroll-mt-16 border-y border-line bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] px-[max(1.5rem,calc((100vw-90rem)/2))] py-[clamp(7rem,13vw,13rem)] md:pl-[max(6.5rem,calc((100vw-90rem)/2))] max-md:px-4"
      id="stack"
      aria-labelledby="stack-title"
    >
      <Reveal>
        <SectionTitle
          titleId="stack-title"
          eyebrow="02 · Stack"
          title="Production tools and practices."
          description="Technologies used across interfaces, data, services, and testing."
        />
      </Reveal>
      <div className="grid grid-cols-4 pt-[clamp(3rem,7vw,6rem)] max-lg:grid-cols-2 max-md:grid-cols-1">
        {portfolio.technologyGroups.map((group, groupIndex) => {
          const Icon = icons[group.icon];
          return (
            <Reveal key={group.title} delay={groupIndex * 0.05}>
              <article
                className={cn(
                  "min-h-[30rem] border-b border-l border-line p-8 max-lg:min-h-[25rem] max-md:min-h-0 max-md:border-r",
                  groupIndex === portfolio.technologyGroups.length - 1 && "border-r",
                  groupIndex % 2 === 1 && "max-lg:border-r"
                )}
              >
                <header className="flex items-center justify-between border-b border-line pb-8">
                  <Icon className="w-[1.15rem] text-accent" aria-hidden="true" />
                  <h3 className="m-0 text-[0.72rem] tracking-[0.1em] uppercase">{group.title}</h3>
                </header>
                <ul className="mt-8 list-none p-0">
                  {group.technologies.map((technology) => {
                    const TechnologyIcon = technologyIcons[technology.iconKey];
                    return (
                      <li
                        className="group flex min-h-11 items-center gap-3 text-[0.9rem] text-muted transition-[color,padding-left] duration-300 ease-editorial-out hover:pl-1 hover:text-copy"
                        key={technology.name}
                        data-cursor="technology"
                      >
                        <TechnologyIcon
                          className="size-4 shrink-0 text-faint opacity-70 transition-[color,opacity,transform] duration-300 ease-editorial-out group-hover:-translate-y-px group-hover:text-accent group-hover:opacity-100"
                          aria-hidden="true"
                        />
                        {technology.name}
                      </li>
                    );
                  })}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
