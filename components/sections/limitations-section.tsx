import { validationNeeds } from "@/content/project";
import { SectionHeading } from "@/components/ui/section-heading";

export function LimitationsSection() {
  return (
    <section className="section section-paper limitations-section" id="limitations" aria-labelledby="limitations-title">
      <div className="content-wrap">
        <SectionHeading index="12 · Next validation" title={<>What must be<br /><span className="accent">tested next</span></>} copy={<p id="limitations-title">A promising prototype becomes stronger when its limits define the next experiment.</p>} />
        <ol className="limitations-index">{validationNeeds.map((need, index) => <li key={need}><span>{String(index + 1).padStart(2, "0")}</span>{need}</li>)}</ol>
      </div>
    </section>
  );
}
