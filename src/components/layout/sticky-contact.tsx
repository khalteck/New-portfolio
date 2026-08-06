import { portfolio } from "@/data/portfolio";

export function StickyContact() {
  return (
    <a
      className="fixed right-4 bottom-8 z-[60] text-[0.6rem] font-extrabold tracking-[0.12em] text-muted uppercase no-underline [writing-mode:vertical-rl] max-lg:hidden"
      href={`mailto:${portfolio.profile.email}?subject=Portfolio%20enquiry`}
      data-cursor="action"
      data-analytics-event="contact_click"
    >
      {portfolio.profile.email}
    </a>
  );
}
