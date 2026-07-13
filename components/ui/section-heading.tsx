type SectionHeadingProps = {
  index?: string;
  title: React.ReactNode;
  copy?: React.ReactNode;
  stacked?: boolean;
};

export function SectionHeading({ index, title, copy, stacked = false }: SectionHeadingProps) {
  return (
    <header className={`section-header${stacked ? " is-stacked" : ""}`}>
      <div>
        {index && <p className="section-index">{index}</p>}
        <h2 className="section-title">{title}</h2>
      </div>
      {copy && <div className="section-copy">{copy}</div>}
    </header>
  );
}
