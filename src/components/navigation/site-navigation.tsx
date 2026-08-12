import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { portfolio } from "@/data/portfolio";
import { HeaderAnimation } from "./header-animation";

export function SiteNavigation() {
  const { pathname } = useLocation();
  const header = useRef<HTMLElement>(null);
  const resumeTarget = useRef<HTMLSpanElement>(null);

  return (
    <header
      ref={header}
      className="fixed top-0 left-0 z-[120] flex min-h-[3.75rem] w-full items-center justify-between border-b border-[color-mix(in_srgb,var(--border)_52%,transparent)] bg-[color-mix(in_srgb,var(--canvas)_68%,transparent)] px-[max(1.5rem,calc((100vw-90rem)/2))] backdrop-blur-[18px] backdrop-saturate-[130%] max-md:min-h-14 max-md:px-4"
      data-ui="site-navigation"
    >
      <HeaderAnimation
        active={pathname === "/"}
        headerRef={header}
        resumeTargetRef={resumeTarget}
      />
      <a
        className="relative z-30 text-[0.66rem] font-extrabold tracking-[0.12em] uppercase no-underline"
        href={portfolio.profile.resumeUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Résumé"
        data-analytics-event="resume_view"
      >
        <span ref={resumeTarget} data-ui="resume-initial">
          R
        </span>
        ésumé
      </a>
    </header>
  );
}
