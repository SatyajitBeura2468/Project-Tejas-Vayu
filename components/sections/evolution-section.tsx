import { evolutionStages } from "@/content/project";

export function EvolutionSection() {
  return (
    <section className="section section-dark evolution-section" id="evolution" aria-labelledby="evolution-title">
      <div className="content-wrap evolution-grid">
        <div className="evolution-intro">
          <p className="section-index">03 · Project evolution</p>
          <h2 id="evolution-title">A classroom question,<br /><span className="accent">still evolving.</span></h2>
          <p>What began as a classroom question developed into a working prototype, an experimental platform and a wider vision for cleaner urban infrastructure.</p>
        </div>
        <ol className="evolution-rail">
          {evolutionStages.map((stage, index) => (
            <li key={stage} className={index === evolutionStages.length - 1 ? "is-future" : ""}>
              <span>{String(index + 1).padStart(2, "0")}</span><h3>{stage}</h3>
              <div className={`evolution-object evolution-object-${index + 1}`} aria-hidden="true"><i /><i /></div>
              {index === evolutionStages.length - 1 && <em>Future phase</em>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
