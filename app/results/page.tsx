import type { Metadata } from "next";
import { DetailHero, DetailPage, DetailSection } from "@/components/layout/detail-page";
import { ResultsChart } from "@/components/charts/results-chart";
import { SourceLink } from "@/components/ui/source-link";
import { reconstructionNotice, resultInterpretation, resultMilestones } from "@/content/results";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("Observation-Based Results | Project Tejasvayu", "Explore the qualitative observation timeline and transparent normalised reconstruction of Project Tejasvayu prototype trials.", "/results");

export default function ResultsPage() {
  return (
    <DetailPage nextHref="/dashboard" nextLabel="Replay the observation">
      <DetailHero number="Results / 01" status="Observation-based normalised reconstruction · Not raw instrument logs" title={<>The separation becomes<br /><span className="violet">clear with time.</span></>} description="The public result view preserves the supplied qualitative milestones without fabricating raw logs, exact removal percentages, statistical significance or error bars."><div className="result-hero-curves" aria-hidden="true"><i /><i /><span>4 min</span><span>10 min</span></div></DetailHero>
      <DetailSection index="Results / 02" title="Eight observations. No invented precision." intro={<p id="observation-notice"><strong>{reconstructionNotice.title}.</strong> {reconstructionNotice.detail}.</p>}>
        <ol className="result-ledger">{resultMilestones.map((milestone, index) => <li key={milestone.id}><span>{String(index + 1).padStart(2, "0")}</span><h3>{milestone.label}</h3><p>{milestone.observation}</p></li>)}</ol>
      </DetailSection>
      <DetailSection index="Results / 03" title="A curve shaped by the notes." dark>
        <ResultsChart dark />
        <p className="results-page-interpretation">{resultInterpretation}</p>
        <SourceLink sourceId="project-observations" label="Project observation basis" />
      </DetailSection>
      <DetailSection index="Results / 04" title="Encouraging is not conclusive." intro={<p>Three layers of validation are still needed before quantitative conclusions.</p>}>
        <div className="integrity-columns">
          <article><h3>Calibrated instrumentation</h3><p>Use stable, calibrated and more selective sensing suitable for the target pollutants.</p></article>
          <article><h3>Better variable isolation</h3><p>Equalise light and dosing while varying the coating as the primary independent variable.</p></article>
          <article><h3>Repeated controlled trials</h3><p>Record raw logs across enough replicates to estimate uncertainty and compare conditions rigorously.</p></article>
        </div>
      </DetailSection>
    </DetailPage>
  );
}
