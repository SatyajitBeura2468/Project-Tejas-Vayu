import { indiaEvidence } from "@/content/sources";
import { SourceLink } from "@/components/ui/source-link";

function UrbanDensityVisual() {
  return (
    <svg className="urban-density" viewBox="0 0 840 420" role="img" aria-label="Abstract network of existing urban walls, roads, transit lines and public infrastructure across India">
      <defs>
        <linearGradient id="surface-path" x1="0" x2="1"><stop stopColor="#22d3ee" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient>
      </defs>
      <path className="india-outline" d="M367 31 420 61l40 71 62 12 13 44-32 55 14 77-58 60-66-13-34-49-65-16-31-69 25-65-22-58 42-28Z" />
      {Array.from({ length: 24 }, (_, index) => {
        const x = 86 + ((index * 79) % 690);
        const y = 72 + ((index * 47) % 280);
        return <circle key={index} cx={x} cy={y} r={index % 4 === 0 ? 5 : 3} className="density-node" />;
      })}
      <path className="density-path" d="M52 328C144 259 174 310 239 214S359 142 424 196 534 307 609 221 728 101 800 127" />
      <path className="density-path density-path-secondary" d="M86 92C160 124 208 89 280 150S411 307 502 267 631 116 765 330" />
      <g className="density-surfaces"><path d="M101 321v-78h65v47h48v31M612 227v-91h72v91M701 211h70v87h-97" /><path d="M250 219h91m-78-39h54M467 271v-82h68v51h43v31" /></g>
    </svg>
  );
}

export function ProblemSection() {
  return (
    <section className="section section-white problem-section" id="problem" aria-labelledby="problem-title">
      <div className="content-wrap">
        <header className="problem-heading">
          <p className="section-index">01 · The urban problem</p>
          <h2 id="problem-title">Air pollution fills cities.<br /><span>New infrastructure cannot fill every street.</span></h2>
        </header>
        <div className="problem-layout">
          <div className="problem-explanation">
            <p>Cities already contain large areas of walls, transport structures and public infrastructure. Conventional purification equipment needs its own space, power, installation and maintenance.</p>
            <p>Project Tejasvayu asks a more spatially efficient question: can suitable surfaces that cities already possess become part of the response?</p>
            <p className="problem-caveat">Not every material is automatically suitable. Substrate preparation, binder chemistry, coating durability, exposure and local conditions must be tested.</p>
          </div>
          <UrbanDensityVisual />
        </div>
        <div className="evidence-rail" aria-label="Verified India air-pollution evidence">
          {indiaEvidence.map((item) => (
            <article key={`${item.value}-${item.label}`}>
              <strong>{item.value}</strong>
              <h3>{item.label}</h3>
              <p>{item.geography} · data {item.dataYear} · published {item.publicationYear}</p>
              <SourceLink sourceId={item.sourceId} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
