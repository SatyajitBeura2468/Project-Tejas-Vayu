"use client";

import { motion } from "motion/react";
import { SectionTransition } from "@/components/motion/section-transition";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { validationNeeds } from "@/content/project";
import { SectionHeading } from "@/components/ui/section-heading";

export function LimitationsSection() {
  const { reduced } = useMotionPreference();
  return (
    <section className="section section-paper limitations-section" id="limitations" aria-labelledby="limitations-title">
      <SectionTransition tone="light" />
      <div className="content-wrap">
        <SectionHeading index="12 · Next validation" title={<>What must be<br /><span className="accent">tested next</span></>} copy={<p id="limitations-title">A promising prototype becomes stronger when its limits define the next experiment.</p>} />
        <div className="validation-framework"><span>TEST</span><i /><span>DOCUMENT</span><i /><span>VALIDATE</span></div>
        <ol className="limitations-index">{validationNeeds.map((need, index) => <motion.li key={need} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.7 }} transition={{ duration: reduced ? 0.01 : 0.5, delay: reduced ? 0 : (index % 4) * 0.06 }}><span>{String(index + 1).padStart(2, "0")}</span><strong>{need}</strong><i aria-hidden="true" /></motion.li>)}</ol>
      </div>
    </section>
  );
}
