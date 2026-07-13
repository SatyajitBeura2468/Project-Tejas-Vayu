export type PrototypeView = "exterior" | "airflow" | "components";

export function StaticPrototypeVisual({ view = "exterior" }: { view?: PrototypeView }) {
  return (
    <div className={`static-prototype static-view-${view}`} role="img" aria-label="Two transparent prototype chambers. The active chamber has a violet enclosed UV strip and coated surfaces; both contain a house model, base sensor and front circulation fan.">
      {[false, true].map((active) => (
        <div className={`static-chamber${active ? " is-active" : ""}`} key={String(active)}>
          <span className="static-uv" /><span className="static-house"><i /></span><span className="static-fan" /><span className="static-sensor" />
          <svg viewBox="0 0 240 150" aria-hidden="true"><path d="M24 104C40 32 159 24 207 77S153 139 80 115 35 78 82 60" /></svg>
          <strong>{active ? "TiO₂ + UV activation" : "Untreated control"}</strong>
        </div>
      ))}
    </div>
  );
}
