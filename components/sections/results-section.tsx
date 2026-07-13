import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ResultsChart } from "@/components/charts/results-chart";
import { reconstructionNotice, resultInterpretation, resultMilestones } from "@/content/results";
import { SectionHeading } from "@/components/ui/section-heading";

export function ResultsSection() {
  return (
    <section className="section section-white results-section" id="results" aria-labelledby="results-title">
      <div className="content-wrap">
        <SectionHeading index="08 · Observation-based results" title={<>The separation becomes<br /><span className="violet">clear with time.</span></>} copy={<div id="results-title"><strong>{reconstructionNotice.title}</strong><p>{reconstructionNotice.detail}. The curves are a transparent visual reconstruction of supplied qualitative milestones.</p></div>} />
        <div className="results-layout">
          <ol className="observation-timeline">
            {resultMilestones.map((milestone) => <li key={milestone.id}><span>{milestone.label}</span><p>{milestone.observation}</p></li>)}
          </ol>
          <div>
            <ResultsChart />
            <p className="result-interpretation">{resultInterpretation}</p>
          </div>
        </div>
        <Link className="text-route-link text-route-link-dark" href="/results">Examine the complete result view <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
