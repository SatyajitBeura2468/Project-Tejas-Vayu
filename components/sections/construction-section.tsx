import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { constructionSteps } from "@/content/project";
import { SafetyNote } from "@/components/ui/safety-note";
import { SectionHeading } from "@/components/ui/section-heading";

export function ConstructionSection() {
  return (
    <section className="section section-white construction-section" id="construction" aria-labelledby="construction-title">
      <div className="content-wrap">
        <SectionHeading index="05 · Construction overview" title={<>Built as a<br /><span className="accent">controlled comparison.</span></>} copy={<p id="construction-title">The assembly sequence keeps the two chambers comparable, then introduces TiO₂ coating and enclosed UV illumination only in the active chamber.</p>} />
        <ol className="construction-rail">
          {constructionSteps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div className={`construction-sketch construction-sketch-${index + 1}`} aria-hidden="true"><i /><i /><i /></div>
              <p>{step}</p>
            </li>
          ))}
        </ol>
        <SafetyNote compact />
        <Link className="text-route-link text-route-link-dark" href="/prototype#construction">See components and construction detail <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
