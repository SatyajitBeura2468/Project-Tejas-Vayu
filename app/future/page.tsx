import type { Metadata } from "next";
import { DetailHero, DetailPage, DetailSection } from "@/components/layout/detail-page";
import { futureInitiatives, futureStages, validationNeeds } from "@/content/project";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("Future Scope & VAYU-NET | Project Tejasvayu", "Explore the proposed Project Tejasvayu validation path, future urban pilot concepts and the VAYU-NET school research network vision.", "/future");

export default function FuturePage() {
  return (
    <DetailPage nextHref="/sources" nextLabel="Review every source">
      <DetailHero number="Future / 01" status="Future scope · Not an operating deployment" title={<>From one model<br /><span className="green">to cleaner cities.</span></>} description="The roadmap grows only as evidence grows: improved controls first, carefully bounded pilot surfaces next, then wider testing if performance and safety are independently validated."><div className="future-hero-path" aria-hidden="true">{futureStages.map((_, index) => <i key={index} />)}</div></DetailHero>
      <DetailSection index="Future / 02" title="Scale the evidence before the surface area." intro={<p>Six proposed stages connect the current chamber model to a hypothetical Odisha smart-city pilot.</p>}>
        <ol className="future-detail-path">{futureStages.map((stage, index) => <li key={stage}><div className={`future-detail-object object-${index + 1}`} aria-hidden="true"><i /><i /></div><span>{String(index + 1).padStart(2, "0")}</span><h3>{stage}</h3></li>)}</ol>
      </DetailSection>
      <DetailSection index="Future / 03" title="The research agenda is wider than one coating." dark>
        <ul className="initiative-index">{futureInitiatives.map((initiative, index) => <li key={initiative}><span>{String(index + 1).padStart(2, "0")}</span>{initiative}</li>)}</ul>
      </DetailSection>
      <DetailSection index="Future / 04" title={<>VAYU-NET <span className="violet">connects classrooms.</span></>} intro={<div><p className="detail-status detail-status-light">Future phase</p><p>A future distributed school environmental research network.</p></div>}>
        <div className="vayu-net-detail">
          <div className="network-map" aria-hidden="true">{["Bhawanipatna", "Koraput", "Sambalpur", "Cuttack", "Puri", "Rourkela"].map((place) => <i key={place}>{place}</i>)}</div>
          <ul><li>Assemble standardised low-cost monitoring stations.</li><li>Conduct comparable surface experiments.</li><li>Upload validated environmental observations.</li><li>Compare district-level trends.</li><li>Contribute to an Odisha-wide student research dataset.</li><li>Learn experimental design and environmental science.</li></ul>
        </div>
      </DetailSection>
      <DetailSection index="Future / 05" title="What must be tested next" intro={<p>A promising prototype becomes stronger when its limits define the next experiment.</p>}>
        <ol className="validation-detail">{validationNeeds.map((need, index) => <li key={need}><span>{String(index + 1).padStart(2, "0")}</span>{need}</li>)}</ol>
      </DetailSection>
    </DetailPage>
  );
}
