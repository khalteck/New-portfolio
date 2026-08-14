import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDown, ArrowDownRight, ArrowRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { textLink } from "@/styles/classes";

export function HeroSection() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

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
    <section
      ref={section}
      className="relative z-10 mx-auto grid min-h-svh w-[calc(100%-3rem)] max-w-[90rem] grid-cols-12 content-start gap-x-6 overflow-hidden pt-[clamp(8rem,14vh,10.5rem)] pb-11 md:pl-20 max-md:min-h-dvh max-md:w-[calc(100%-2rem)] max-md:grid-cols-1 max-md:grid-rows-[auto_auto_1fr] max-md:pt-28 max-md:pb-8"
      id="top"
      aria-labelledby="hero-title"
      data-ui="hero"
    >
      <div className="relative z-10 col-span-full mt-20 max-md:mt-12">
        <h1
          className="grid grid-cols-12 font-display text-[clamp(5.8rem,12vw,12.5rem)] leading-[0.72] font-bold tracking-[-0.06em] uppercase max-md:grid-cols-1 max-md:text-[clamp(4rem,20vw,6.5rem)] max-md:leading-[0.78] max-[360px]:text-[4.25rem]"
          id="hero-title"
          tabIndex={-1}
        >
          <span className="col-span-10 block overflow-clip max-md:col-span-full">
            <span className="block whitespace-nowrap max-md:whitespace-normal" data-hero-reveal>
              Senior Frontend
            </span>
          </span>
          <span className="col-span-10 col-start-3 block overflow-clip max-md:col-span-full max-md:col-start-1">
            <span
              className="block whitespace-nowrap text-transparent [-webkit-text-stroke:1.5px_var(--text)] forced-colors:text-[CanvasText] forced-colors:[-webkit-text-stroke:0] max-md:whitespace-normal"
              data-hero-reveal
            >
              Engineer
            </span>
          </span>
        </h1>
      </div>

      <div className="relative z-10 col-span-7 col-start-6 mt-[clamp(3rem,7vh,6rem)] border-t border-white/15 pt-6 max-lg:col-span-8 max-lg:col-start-5 max-md:col-span-full max-md:col-start-1 max-md:mt-10 max-md:pt-5">
        <div data-hero-reveal>
          <p className="mb-8 max-w-[43rem] text-[clamp(1.05rem,2vw,1.38rem)] text-muted max-md:mb-6">
            I’m <strong className="text-copy">{portfolio.profile.name}</strong>.{" "}
            {portfolio.profile.summary}
          </p>
          <div className="flex flex-wrap items-center gap-5 max-md:flex-col max-md:items-stretch max-md:gap-3">
            <MagneticLink
              className="max-md:w-full"
              href={`mailto:${portfolio.profile.email}?subject=Portfolio%20enquiry`}
              variant="secondary"
              data-analytics-event="contact_click"
            >
              Start a conversation <ArrowRight aria-hidden="true" />
            </MagneticLink>
            <a
              className={`${textLink} max-md:w-full max-md:justify-center`}
              href={portfolio.profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="resume_view"
            >
              View resume <ArrowDownRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <a
        className="relative z-10 col-span-3 mt-[-2.5rem] mx-auto md:mx-0 mb-14 md:mb-0 inline-flex w-fit items-end self-end text-[0.65rem] font-extrabold tracking-[0.12em] text-muted uppercase no-underline max-md:col-span-full max-md:mt-8 max-md:min-h-11"
        href="#about"
        aria-label="Scroll down to about"
        data-hero-reveal
      >
        <span className="inline-flex animate-scroll-cue items-center gap-2 motion-reduce:animate-none [&_svg]:w-3.5">
          Scroll down <ArrowDown aria-hidden="true" />
        </span>
      </a>
    </section>
  );
}
