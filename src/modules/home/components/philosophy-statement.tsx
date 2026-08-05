import { Reveal } from "@/components/motion/reveal";
import { portfolio } from "@/data/portfolio";

export function PhilosophyStatement() {
  return (
    <section className="philosophy-section" id="philosophy" aria-labelledby="philosophy-title">
      <Reveal>
        <p className="eyebrow">Engineering philosophy</p>
        <h2 id="philosophy-title" tabIndex={-1}>
          {portfolio.philosophy}
        </h2>
      </Reveal>
    </section>
  );
}
