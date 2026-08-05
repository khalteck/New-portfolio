interface SectionTitleProps {
  titleId: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionTitle({ titleId, eyebrow, title, description }: SectionTitleProps) {
  return (
    <header className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId} tabIndex={-1}>
        {title}
      </h2>
      {description ? <p className="section-title__description">{description}</p> : null}
    </header>
  );
}
