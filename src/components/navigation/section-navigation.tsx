import { BriefcaseBusiness, FolderKanban, House, Layers3, Mail, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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
  const activeSection = useActiveSection(observedSectionIds);
  const onHomePage = location.pathname === "/";

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
