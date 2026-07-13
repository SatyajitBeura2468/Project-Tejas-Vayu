import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { methodologySteps } from "@/content/project";
import { SectionHeading } from "@/components/ui/section-heading";

export function MethodologySection() {
  return (
    <section className="section section-paper methodology-section" id="methodology" aria-labelledby="methodology-title">
      <div className="content-wrap">
        <SectionHeading index="07 · Experimental method" title={<>Compare.<br /><span className="accent">Observe. Repeat.</span></>} copy={<p id="methodology-title">The current apparatus is a prototype demonstration: the untreated chamber provides a natural-decay comparison while the active chamber combines coating and UV illumination.</p>} />
        <ol className="methodology-timeline">
          {methodologySteps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}
        </ol>
        <aside className="refinement-note">
          <p className="section-index">Research-grade refinement</p>
          <h3>Change one variable at a time.</h3>
          <p>A stronger future control protocol would expose both chambers to equivalent illumination and vary only the presence of TiO₂. A metered Y-splitter or equivalent manifold could also equalise the initial test input.</p>
        </aside>
        <Link className="text-route-link text-route-link-dark" href="/methodology">Read the full methodology <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
