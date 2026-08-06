import { portfolio } from "@/data/portfolio";

export function StickyContact() {
  return (
    <a
      className="sticky-contact"
      href={`mailto:${portfolio.profile.email}?subject=Portfolio%20enquiry`}
      data-cursor="action"
      data-analytics-event="contact_click"
    >
      {portfolio.profile.email}
    </a>
  );
}
