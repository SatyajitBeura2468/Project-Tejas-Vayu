import type { Metadata } from "next";
import { DetailHero, DetailPage, DetailSection } from "@/components/layout/detail-page";
import { ScienceSection } from "@/components/sections/science-section";
import { SourceLink } from "@/components/ui/source-link";
import { mechanismStages } from "@/content/project";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("Scientific Mode | Project Tejasvayu", "A sourced explanation of TiO₂ photocatalysis, surface reactions, activation requirements, operating variables and scientific limitations.", "/science");

const variables = ["Available active surface area", "Light wavelength and intensity", "Catalyst coverage", "Pollutant type and concentration", "Airflow and contact time", "Humidity and temperature", "Surface contamination", "Coating durability", "Reactor or urban geometry"];

export default function SciencePage() {
  return (
    <DetailPage nextHref="/methodology" nextLabel="Review the methodology">
      <DetailHero number="Scientific mode / 01" title={<>A surface reaction,<br /><span className="violet">carefully explained.</span></>} description="Project Tejasvayu uses simplified equations to communicate the photocatalytic pathway while preserving uncertainty about efficiency, selectivity and intermediate products."><div className="science-orbit" aria-hidden="true"><i>hν</i><i>e⁻</i><i>h⁺</i><i>•OH</i><strong>TiO₂</strong></div></DetailHero>
      <ScienceSection />
      <DetailSection index="Scientific mode / 02" title="The mechanism, line by line." intro={<p>These equations are simplified teaching representations; actual surface chemistry can follow multiple pathways.</p>}>
        <div className="equation-ledger">{mechanismStages.map((stage, index) => <article key={stage.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{stage.title}</h3><p>{stage.copy}</p><pre>{stage.equation}</pre></article>)}</div>
        <div className="citation-pair"><SourceLink sourceId="schneider-2014" /><SourceLink sourceId="irga-2021" /></div>
      </DetailSection>
      <DetailSection index="Scientific mode / 03" title="Performance is a relationship, not a guarantee." intro={<p>No slider or diagram on this site outputs a fictional removal percentage.</p>} dark>
        <ul className="variable-index">{variables.map((variable, index) => <li key={variable}><span>{String(index + 1).padStart(2, "0")}</span>{variable}</li>)}</ul>
      </DetailSection>
      <DetailSection index="Scientific mode / 04" title="Where responsible claims stop." intro={<p>Laboratory promise and field performance are not the same thing.</p>}>
        <div className="integrity-columns">
          <article><h3>What the literature supports</h3><p>TiO₂-based materials have been studied for photocatalytic oxidation of selected gaseous pollutants, including NOₓ and certain VOCs, when suitable light and contact conditions are available.</p></article>
          <article><h3>What still varies</h3><p>Field effectiveness depends on exposure, pollutant mix, flow, humidity, surface state, coating formulation, binder chemistry, weathering and geometry.</p></article>
          <article><h3>What must be measured</h3><p>Durability, selectivity, by-products, adhesion and real-world performance need controlled and independent validation before a quantitative deployment claim.</p></article>
        </div>
        <SourceLink sourceId="irga-2021" label="Urban NOₓ remediation review and limitations" />
      </DetailSection>
    </DetailPage>
  );
}
