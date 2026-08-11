import { Link, useLocation } from "react-router-dom";
import { portfolio } from "@/data/portfolio";
import { ScrollMorphMark } from "./scroll-morph-mark";

export function SiteNavigation() {
  const { pathname } = useLocation();

  return (
    <header
      className="fixed top-0 left-0 z-[120] flex min-h-[3.75rem] w-full items-center justify-between border-b border-[color-mix(in_srgb,var(--border)_52%,transparent)] bg-[color-mix(in_srgb,var(--canvas)_68%,transparent)] px-[max(1.5rem,calc((100vw-90rem)/2))] backdrop-blur-[18px] backdrop-saturate-[130%] max-md:min-h-14 max-md:px-4"
      data-ui="site-navigation"
    >
      <Link
        className="inline-flex min-h-11 min-w-11 items-center justify-center no-underline"
        to="/"
        aria-label="Khalid Oyeneye, home"
      >
        <ScrollMorphMark active={pathname === "/"} />
      </Link>
      <a
        className="text-[0.66rem] font-extrabold tracking-[0.12em] uppercase no-underline"
        href={portfolio.profile.resumeUrl}
        target="_blank"
        rel="noreferrer"
        data-analytics-event="resume_view"
      >
        Résumé
      </a>
    </header>
  );
}
