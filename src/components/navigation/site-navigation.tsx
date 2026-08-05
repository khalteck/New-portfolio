import { useRef, useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { portfolio } from "@/data/portfolio";
import { NavigationDrawer } from "./navigation-drawer";

export function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <header className="site-navigation">
        <Link className="site-navigation__name" to="/" aria-label="Khalid Oyeneye, home">
          Khalid Oyeneye
        </Link>
        <div className="site-navigation__actions">
          <a href={portfolio.profile.resumeUrl} target="_blank" rel="noreferrer">
            Résumé
          </a>
          <button
            ref={triggerRef}
            className="menu-trigger"
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Menu"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="site-menu"
          >
            <span>Menu</span>
            <Menu aria-hidden="true" />
          </button>
        </div>
      </header>
      <NavigationDrawer open={open} onClose={() => setOpen(false)} triggerRef={triggerRef} />
    </>
  );
}
