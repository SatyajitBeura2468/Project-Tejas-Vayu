"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { futureStages } from "@/content/project";
import { SectionHeading } from "@/components/ui/section-heading";
import { useMotionPreference } from "@/components/motion/motion-provider";

export function FutureSection() {
  const { reduced } = useMotionPreference();
  return (
    <section className="section section-dark future-section" id="future" aria-labelledby="future-title">
      <div className="content-wrap">
        <SectionHeading index="11 · Future scope" title={<>From one model<br /><span className="green">to cleaner cities.</span></>} copy={<p id="future-title">Each step is a proposed validation stage—not a claim that city-scale deployment already exists.</p>} />
        <div className="future-path">
          <motion.div className="future-path-line" initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.35 }} />
          {futureStages.map((stage, index) => <article key={stage}><div className={`future-object future-object-${index + 1}`} aria-hidden="true"><i /><i /></div><span>{String(index + 1).padStart(2, "0")}</span><h3>{stage}</h3></article>)}
        </div>
        <div className="vayu-net">
          <div><p className="future-label">Future phase</p><h3>VAYU-NET</h3><p>A future distributed school environmental research network.</p></div>
          <div className="school-network" aria-hidden="true">{["Kalahandi", "Koraput", "Sambalpur", "Cuttack", "Puri"].map((label) => <span key={label}>{label}</span>)}</div>
          <p>Participating schools could eventually assemble standardised low-cost stations, conduct comparable experiments, upload validated observations and contribute to an Odisha-wide student research dataset.</p>
        </div>
        <Link className="text-route-link" href="/future">Explore the future roadmap <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
