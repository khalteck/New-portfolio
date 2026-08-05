import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { isAnalyticsConfigured, openAnalyticsPreferences } from "@/helpers/analytics";
import { externalLinkProps } from "@/helpers/external-link";

export function ContactFooter() {
  return (
    <footer className="contact-footer" id="contact">
      <div className="contact-footer__lead">
        <p className="eyebrow">Open to opportunities</p>
        <h2 tabIndex={-1}>Let’s discuss the work.</h2>
        <a
          className="contact-footer__email"
          href={`mailto:${portfolio.profile.email}?subject=Portfolio%20enquiry`}
          data-cursor="action"
          data-analytics-event="contact_click"
        >
          {portfolio.profile.email}
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="contact-footer__meta">
        <p>
          {portfolio.profile.location} · {portfolio.profile.availability}
        </p>
        <nav aria-label="Footer links">
          {portfolio.socialLinks.map((social) => (
            <a
              key={social.platform}
              href={social.href}
              {...externalLinkProps}
              data-analytics-event="external_profile"
              data-analytics-label={social.platform.toLowerCase()}
            >
              {social.platform}
            </a>
          ))}
          <a
            href={portfolio.profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            data-analytics-event="resume_view"
          >
            Résumé
          </a>
          {isAnalyticsConfigured() ? (
            <button className="footer-text-button" type="button" onClick={openAnalyticsPreferences}>
              Analytics settings
            </button>
          ) : null}
        </nav>
      </div>
      <div className="contact-footer__credit">
        <p>Designed and built by Khalid Oyeneye · © {new Date().getFullYear()}</p>
        {/* <p>
          Visual reference:{" "}
          <a href="https://www.tajmirul.site/" {...externalLinkProps}>
            Tajmirul Islam
          </a>
          .
        </p> */}
      </div>
    </footer>
  );
}
