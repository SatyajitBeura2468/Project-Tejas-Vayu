import type { Metadata } from "next";
import { DetailHero, DetailPage, DetailSection } from "@/components/layout/detail-page";
import { SafetyNote } from "@/components/ui/safety-note";
import { methodologySteps } from "@/content/project";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("Experimental Methodology | Project Tejasvayu", "Review the Project Tejasvayu comparison protocol, variables, safety practices and proposed research-grade refinements.", "/methodology");

export default function MethodologyPage() {
  return (
    <DetailPage nextHref="/results" nextLabel="Inspect the observations">
      <DetailHero number="Methodology / 01" title={<>Compare. Observe.<br /><span className="accent">Repeat.</span></>} description="A transparent methodology separates what the current prototype demonstrates from the controls a research-grade experiment would add."><div className="method-clock" aria-hidden="true"><span>00</span><span>60s</span><span>2m</span><span>4m</span><span>10m</span><i /></div></DetailHero>
      <DetailSection index="Methodology / 02" title="One procedure, visible end to end." intro={<p>The current protocol uses a stable displayed baseline, controlled supervised input and qualitative comparison over time.</p>}>
        <ol className="procedure-ledger">{methodologySteps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.detail}</p></div></li>)}</ol>
      </DetailSection>
      <DetailSection index="Methodology / 03" title="Know what changes—and what should not." dark>
        <div className="variables-table" role="table" aria-label="Experimental variable structure">
          <div role="row"><strong role="columnheader">Role</strong><strong role="columnheader">Current representation</strong></div>
          <div role="row"><span role="cell">Primary experimental difference</span><p role="cell">Untreated chamber versus TiO₂-coated, UV-activated chamber.</p></div>
          <div role="row"><span role="cell">Observed outcome</span><p role="cell">Relative MQ-135 mixed-gas sensor response over time.</p></div>
          <div role="row"><span role="cell">Intended comparables</span><p role="cell">Chamber footprint, sensor model, house arrangement, fan type, initial input, observation duration and ambient conditions.</p></div>
          <div role="row"><span role="cell">Research-grade refinement</span><p role="cell">Equivalent illumination and equalised pollutant introduction, then repeated calibrated trials.</p></div>
        </div>
      </DetailSection>
      <DetailSection index="Methodology / 04" title="Safety is part of the method." intro={<p>The website intentionally omits hazardous smoke-generation instructions.</p>}>
        <SafetyNote />
      </DetailSection>
    </DetailPage>
  );
}
