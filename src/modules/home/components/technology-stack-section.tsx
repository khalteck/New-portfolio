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
    <section className="stack-section section-shell" id="stack" aria-labelledby="stack-title">
      <Reveal>
        <SectionTitle
          titleId="stack-title"
          eyebrow="02 · Stack"
          title="Production tools and practices."
          description="Technologies used across interfaces, data, services, and testing."
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
                  {group.technologies.map((technology) => {
                    const TechnologyIcon = technologyIcons[technology.iconKey];
                    return (
                      <li key={technology.name} data-cursor="technology">
                        <TechnologyIcon aria-hidden="true" />
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
