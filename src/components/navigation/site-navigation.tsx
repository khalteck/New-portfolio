import { Link } from "react-router-dom";
import { portfolio } from "@/data/portfolio";

export function SiteNavigation() {
  return (
    <header className="site-navigation">
      <Link className="site-navigation__name" to="/" aria-label="Khalid Oyeneye, home">
        KO
      </Link>
      <a
        className="site-navigation__resume"
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
