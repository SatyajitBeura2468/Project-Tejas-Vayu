import type { Metadata } from "next";
import { DetailHero, DetailPage, DetailSection } from "@/components/layout/detail-page";
import { StaticPrototypeVisual } from "@/components/three/prototype-scene";
import { PrototypeSection } from "@/components/sections/prototype-section";
import { SafetyNote } from "@/components/ui/safety-note";
import { SourceLink } from "@/components/ui/source-link";
import { constructionSteps, prototypeComponents } from "@/content/project";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("Prototype & Construction | Project Tejasvayu", "Explore the two-chamber Project Tejasvayu prototype, its components, physical arrangement, construction sequence and safety practices.", "/prototype");

export default function PrototypePage() {
  return (
    <DetailPage nextHref="/science" nextLabel="Understand the science">
      <DetailHero number="Prototype / 01" title={<>A comparison you can <span className="accent">see.</span></>} description="Two sealed glass chambers create an accessible platform for comparing natural response change with a TiO₂-coated, UV-activated condition."><StaticPrototypeVisual /></DetailHero>
      <PrototypeSection />
      <DetailSection index="Prototype / 02" title="Components with a clear purpose." intro={<p>Every component belongs to either sensing and control, atmosphere circulation, activation, or the physical test environment.</p>}>
        <div className="component-inventory">
          {prototypeComponents.map((component, index) => <article key={component.name}><span>{component.quantity ?? "—"}</span><p>{String(index + 1).padStart(2, "0")}</p><h3>{component.name}</h3><p>{component.description}</p>{component.name.includes("MQ-135") && <SourceLink sourceId="mq135-manual" />}{component.name.includes("Arduino") && <SourceLink sourceId="arduino-uno-r3" />}</article>)}
        </div>
      </DetailSection>
      <DetailSection index="Prototype / 03" title="Build the comparison, step by step." intro={<p>No smoke-generation instructions, wiring diagram or unverified component specification is included in Version 1.</p>} id="construction">
        <ol className="detail-step-list">{constructionSteps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol>
        <SafetyNote />
      </DetailSection>
      <DetailSection index="Prototype / 04" title="The next control is more precise." intro={<p>Refinement strengthens what the prototype can establish.</p>} dark>
        <div className="control-comparison">
          <article><span>Current demonstration</span><h3>Untreated chamber</h3><p>No TiO₂ coating and no UV illumination.</p></article>
          <article><span>Current active condition</span><h3>TiO₂ + enclosed UV</h3><p>The coating and illumination change together in the present setup.</p></article>
          <article className="is-future"><span>Research-grade refinement</span><h3>Equivalent illumination</h3><p>Expose both chambers to equivalent light and vary only the presence of TiO₂. Add a metered splitter to improve equal initial dosing.</p></article>
        </div>
      </DetailSection>
    </DetailPage>
  );
}
