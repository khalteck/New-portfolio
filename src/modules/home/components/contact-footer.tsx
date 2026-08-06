import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { isAnalyticsConfigured, openAnalyticsPreferences } from "@/helpers/analytics";
import { externalLinkProps } from "@/helpers/external-link";
import { eyebrowClass } from "@/styles/classes";

export function ContactFooter() {
  return (
    <footer
      className="relative z-10 border-t border-line bg-[rgb(17_19_16/72%)] px-[max(1.5rem,calc((100vw-90rem)/2))] pt-[clamp(7rem,13vw,13rem)] pb-8 text-copy md:pl-[max(6.5rem,calc((100vw-90rem)/2))] max-md:pb-[calc(6.75rem+env(safe-area-inset-bottom))] max-[360px]:px-4"
      id="contact"
    >
      <div>
        <p className={`${eyebrowClass} text-muted`}>Open to opportunities</p>
        <h2
          className="mt-4 mb-[clamp(3rem,7vw,6rem)] max-w-[75rem] font-display text-[clamp(4.5rem,10.5vw,11rem)] leading-[0.78] font-bold tracking-[-0.055em] uppercase max-md:text-[clamp(4.5rem,21vw,7rem)]"
          tabIndex={-1}
        >
          Let’s discuss the work.
        </h2>
        <a
          className="flex items-center justify-between gap-4 border-b-2 border-accent py-4 text-[clamp(1.1rem,4vw,3.8rem)] leading-[1.2] font-bold no-underline [overflow-wrap:anywhere] [&_svg]:w-[clamp(1.5rem,4vw,3.5rem)] [&_svg]:shrink-0"
          href={`mailto:${portfolio.profile.email}?subject=Portfolio%20enquiry`}
          data-cursor="action"
          data-analytics-event="contact_click"
        >
          {portfolio.profile.email}
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="mt-[clamp(5rem,10vw,10rem)] flex justify-between gap-8 border-t border-line pt-8 text-[0.72rem] max-md:flex-col max-md:items-start">
        <p>
          {portfolio.profile.location} · {portfolio.profile.availability}
        </p>
        <nav className="flex flex-wrap gap-5 [&_a]:font-extrabold" aria-label="Footer links">
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
            <button
              className="cursor-pointer border-0 bg-transparent p-0 font-inherit font-extrabold text-inherit underline decoration-[0.08em] underline-offset-4"
              type="button"
              onClick={openAnalyticsPreferences}
            >
              Analytics settings
            </button>
          ) : null}
        </nav>
      </div>
      <div className="mt-8 flex justify-between gap-8 border-t border-line pt-8 text-[0.72rem] text-muted max-md:flex-col max-md:items-start [&_a]:font-extrabold">
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
