import { FolderKanban, House, Mail, UserRound } from "lucide-react";
import type { MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/helpers/cn";
import { useActiveSection } from "@/hooks/use-active-section";

const sectionNavigationItems = [
  { id: "top", label: "Home", Icon: House },
  { id: "about", label: "About", Icon: UserRound },
  { id: "work", label: "Work", Icon: FolderKanban },
  { id: "contact", label: "Contact", Icon: Mail }
] as const;
const observedSectionIds = ["top", "about", "stack", "experience", "work", "contact"] as const;

export function SectionNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useActiveSection(observedSectionIds, location.pathname);
  const activeNavigationSection =
    activeSection === "stack" || activeSection === "experience" ? "about" : activeSection;
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
    <nav
      className="fixed top-1/2 left-5 z-[130] -translate-y-1/2 overflow-visible rounded-[1.35rem] border border-white/15 bg-[linear-gradient(145deg,rgb(255_255_255/10%),transparent_42%),rgb(24_28_23/56%)] p-1.5 shadow-[0_1rem_3rem_rgb(0_0_0/20%),inset_0_1px_rgb(255_255_255/8%)] backdrop-blur-[24px] backdrop-saturate-[155%] max-md:top-auto max-md:bottom-[max(0.75rem,env(safe-area-inset-bottom))] max-md:left-1/2 max-md:w-fit max-md:-translate-x-1/2 max-md:translate-y-0 max-md:rounded-[1.45rem] max-md:border-white/15 max-md:bg-[linear-gradient(145deg,rgb(255_255_255/14%),transparent_45%),rgb(29_33_28/64%)] max-md:p-1.5 max-md:shadow-[0_0.8rem_2.5rem_rgb(0_0_0/28%),inset_0_1px_rgb(255_255_255/18%),inset_0_-1px_rgb(255_255_255/5%)] max-md:backdrop-blur-[26px] max-md:backdrop-saturate-[180%]"
      aria-label="Portfolio sections"
    >
      <ul className="grid list-none gap-1 p-0 max-md:flex max-md:justify-center max-md:gap-0.5">
        {sectionNavigationItems.map(({ id, label, Icon }) => {
          const isCurrent = onHomePage && activeNavigationSection === id;
          return (
            <li key={id}>
              <Link
                className={cn(
                  "group flex size-10 items-center justify-center rounded-[0.95rem] border border-transparent text-muted no-underline transition-colors duration-200 [&>svg]:w-4 [&>svg]:stroke-[1.7] max-md:h-[2.7rem] max-md:w-[clamp(2.45rem,12vw,3.15rem)] max-md:rounded-[1.05rem]",
                  isCurrent
                    ? "border-accent/35 bg-accent/15 text-accent"
                    : "hover:border-accent/35 hover:bg-accent/15 hover:text-accent focus-visible:border-accent/35 focus-visible:bg-accent/15 focus-visible:text-accent"
                )}
                to={`/#${id}`}
                state={{ skipPageTransition: true }}
                aria-current={isCurrent ? "location" : undefined}
                aria-label={label}
                onClick={(event) => handleSectionClick(event, id)}
                data-analytics-event="section_navigation"
                data-analytics-label={id}
              >
                <Icon aria-hidden="true" />
                <span className="pointer-events-none absolute left-[calc(100%+0.75rem)] -translate-x-1 rounded-md border border-white/10 bg-[rgb(18_21_17/88%)] px-2 py-1 text-[0.65rem] font-extrabold tracking-[0.06em] text-copy uppercase opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 max-md:hidden">
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
