import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ListeningNow } from "./listening-now";

export function HeroSection() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const visibleMetrics = portfolio.metrics.filter((metric) => metric.visible);

  useGSAP(
    () => {
      if (reducedMotion || !section.current) return;

      gsap.fromTo(
        "[data-hero-reveal]",
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.82,
          stagger: 0.085,
          ease: "power3.out",
          clearProps: "transform,opacity"
        }
      );
    },
    { scope: section, dependencies: [reducedMotion], revertOnUpdate: true }
  );

  return (
    <section ref={section} className="hero-section" aria-labelledby="hero-title">
      <div className="hero-section__topline">
        <p data-hero-reveal>{portfolio.profile.location}</p>
        <p className="availability-line" data-hero-reveal>
          <span aria-hidden="true" />
          {portfolio.profile.availability}
        </p>
      </div>

      <div className="hero-section__title">
        <h1 id="hero-title" tabIndex={-1}>
          <span className="hero-line-mask">
            <span className="hero-line hero-line--first" data-hero-reveal>
              Senior Frontend
            </span>
          </span>
          <span className="hero-line-mask">
            <span className="hero-line hero-line--second" data-hero-reveal>
              <em>/</em> Engineer
            </span>
          </span>
        </h1>
      </div>

      <div className="hero-section__lower">
        <div className="hero-section__introduction" data-hero-reveal>
          <p>
            I’m <strong>{portfolio.profile.name}</strong>. {portfolio.profile.summary}
          </p>
          <div className="hero-section__actions">
            <MagneticLink href={`mailto:${portfolio.profile.email}?subject=Portfolio%20enquiry`}>
              Start a conversation <ArrowRight aria-hidden="true" />
            </MagneticLink>
            <a
              className="text-link"
              href={portfolio.profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              View resume <ArrowDownRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="hero-section__aside" data-hero-reveal>
          <div className="hero-metrics">
            {visibleMetrics.map((metric) => (
              <div key={metric.label} title={metric.basis}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
          <ListeningNow />
        </div>
      </div>

      <a
        className="hero-scroll"
        href="#philosophy"
        aria-label="Scroll to engineering philosophy"
        data-hero-reveal
      >
        Scroll <ArrowDownRight aria-hidden="true" />
      </a>
    </section>
  );
}
