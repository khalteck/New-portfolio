import { eyebrowClass } from "@/styles/classes";

interface SectionTitleProps {
  titleId: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionTitle({ titleId, eyebrow, title, description }: SectionTitleProps) {
  return (
    <header className="grid grid-cols-[minmax(8rem,0.35fr)_minmax(0,1.4fr)_minmax(14rem,0.55fr)] items-start gap-8 border-b border-line pb-[clamp(3rem,7vw,6rem)] max-md:grid-cols-1 max-md:gap-6">
      <p className={eyebrowClass}>{eyebrow}</p>
      <h2
        className="m-0 font-display text-[clamp(3.6rem,7.2vw,7.2rem)] leading-[0.88] font-semibold tracking-[-0.035em] uppercase max-md:text-[clamp(3.2rem,17vw,5rem)]"
        id={titleId}
        tabIndex={-1}
      >
        {title}
      </h2>
      {description ? <p className="m-0 text-sm text-muted">{description}</p> : null}
    </header>
  );
}
