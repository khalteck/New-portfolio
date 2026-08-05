import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { externalLinkProps } from "@/helpers/external-link";

export function ContactFooter() {
  return (
    <footer className="contact-footer" id="contact">
      <div className="contact-footer__lead">
        <p className="eyebrow">Have a product to move forward?</p>
        <h2 tabIndex={-1}>Let’s make the complex feel clear.</h2>
        <a
          className="contact-footer__email"
          href={`mailto:${portfolio.profile.email}?subject=Portfolio%20enquiry`}
          data-cursor="action"
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
            <a key={social.platform} href={social.href} {...externalLinkProps}>
              {social.platform}
            </a>
          ))}
          <a href={portfolio.profile.resumeUrl} target="_blank" rel="noreferrer">
            Résumé
          </a>
        </nav>
      </div>
      <div className="contact-footer__credit">
        <p>Designed and built by Khalid Oyeneye · © {new Date().getFullYear()}</p>
        <p>
          Interaction direction inspired by{" "}
          <a href="https://www.tajmirul.site/" {...externalLinkProps}>
            Tajmirul Islam
          </a>
          . Original implementation.
        </p>
      </div>
    </footer>
  );
}
