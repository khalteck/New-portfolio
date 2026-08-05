import { useEffect, useId, useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { CustomCursor } from "@/components/cursor/custom-cursor";
import { portfolio } from "@/data/portfolio";
import { externalLinkProps } from "@/helpers/external-link";
import { useActiveSection } from "@/hooks/use-active-section";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/*
 * The native dialog's empty canvas is its pointer-only backdrop target. Keyboard
 * users use the close button or Escape, both of which follow the same close path.
 */
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */

const navigationItems = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" }
] as const;

const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

interface NavigationDrawerProps {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function NavigationDrawer({ open, onClose, triggerRef }: NavigationDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const activeSection = useActiveSection(navigationItems.map((item) => item.id));

  useBrowserLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
      document.documentElement.classList.add("drawer-open");
    } else if (!open && dialog.open) {
      dialog.close();
    }

    return () => document.documentElement.classList.remove("drawer-open");
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      document.documentElement.classList.remove("drawer-open");
      triggerRef.current?.focus();
    };
    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, [onClose, triggerRef]);

  useGSAP(
    () => {
      if (!open || reducedMotion || !dialogRef.current) return;

      const timeline = gsap.timeline();
      timeline
        .fromTo(
          ".navigation-drawer__panel",
          { xPercent: 100 },
          { xPercent: 0, duration: 0.68, ease: "power3.inOut", clearProps: "transform" }
        )
        .fromTo(
          ".navigation-drawer__links li, .navigation-drawer__contact, .navigation-drawer__socials",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.045,
            ease: "power3.out",
            clearProps: "transform,opacity"
          },
          "-=0.38"
        );
    },
    { scope: dialogRef, dependencies: [open, reducedMotion], revertOnUpdate: true }
  );

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      id="site-menu"
      ref={dialogRef}
      className="navigation-drawer"
      aria-labelledby={titleId}
      aria-modal="true"
      onClick={handleBackdropClick}
      data-open={open ? "true" : "false"}
    >
      <div className="navigation-drawer__panel">
        {open ? (
          <CustomCursor className="custom-cursor--drawer" manageDocumentCursor={false} />
        ) : null}
        <div className="navigation-drawer__topline">
          <p id={titleId}>Navigate</p>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close menu">
            <X aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Primary navigation">
          <ol className="navigation-drawer__links">
            {navigationItems.map((item, index) => {
              const isCurrent = location.pathname === "/" && activeSection === item.id;
              return (
                <li key={item.id} style={{ "--nav-index": index } as React.CSSProperties}>
                  <Link
                    to={`/#${item.id}`}
                    onClick={onClose}
                    aria-current={isCurrent ? "location" : undefined}
                    data-cursor="action"
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="navigation-drawer__contact">
          <p className="eyebrow">Get in touch</p>
          <a href={`mailto:${portfolio.profile.email}`}>{portfolio.profile.email}</a>
        </div>

        <div className="navigation-drawer__socials">
          {portfolio.socialLinks.map((social) => (
            <a key={social.platform} href={social.href} {...externalLinkProps}>
              {social.platform}
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </dialog>
  );
}
