import { BriefcaseBusiness, FolderKanban, House, Layers3, Mail, UserRound } from "lucide-react";
import type { MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useActiveSection } from "@/hooks/use-active-section";

const sectionNavigationItems = [
  { id: "top", label: "Home", Icon: House },
  { id: "about", label: "About", Icon: UserRound },
  { id: "stack", label: "Stack", Icon: Layers3 },
  { id: "experience", label: "Experience", Icon: BriefcaseBusiness },
  { id: "work", label: "Work", Icon: FolderKanban },
  { id: "contact", label: "Contact", Icon: Mail }
] as const;
const observedSectionIds = sectionNavigationItems.map((item) => item.id);

export function SectionNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useActiveSection(observedSectionIds, location.pathname);
  const onHomePage = location.pathname === "/";

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!onHomePage) return;

    event.preventDefault();
    const hash = `#${id}`;
    void navigate(
      { pathname: "/", hash },
      {
        replace: location.hash === hash,
        state: { skipPageTransition: true }
      }
    );

    const target = document.getElementById(id);
    if (!target) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    target.scrollIntoView({ behavior, block: "start" });
  };

  return (
    <nav className="section-navigation" aria-label="Portfolio sections">
      <ul>
        {sectionNavigationItems.map(({ id, label, Icon }) => {
          const isCurrent = onHomePage && activeSection === id;
          return (
            <li key={id}>
              <Link
                to={`/#${id}`}
                state={{ skipPageTransition: true }}
                aria-current={isCurrent ? "location" : undefined}
                aria-label={label}
                onClick={(event) => handleSectionClick(event, id)}
                data-analytics-event="section_navigation"
                data-analytics-label={id}
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
