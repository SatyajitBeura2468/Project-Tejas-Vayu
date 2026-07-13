"use client";

import { motion } from "motion/react";
import { SectionTransition } from "@/components/motion/section-transition";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { evolutionStages } from "@/content/project";

export function EvolutionSection() {
  const { reduced } = useMotionPreference();
  return (
    <section className="section section-dark evolution-section" id="evolution" aria-labelledby="evolution-title">
      <SectionTransition tone="dark" />
      <div className="content-wrap evolution-grid">
        <div className="evolution-intro">
          <p className="section-index">03 · Project evolution</p>
          <h2 id="evolution-title">A classroom question,<br /><span className="accent">still evolving.</span></h2>
          <p>What began as a classroom question developed into a working prototype, an experimental platform and a wider vision for cleaner urban infrastructure.</p>
        </div>
        <ol className="evolution-rail evolution-motion-rail">
          <motion.div className="evolution-progress-line" initial={reduced ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduced ? 0.01 : 1.5, ease: [0.22, 1, 0.36, 1] }} aria-hidden="true" />
          {evolutionStages.map((stage, index) => (
            <motion.li key={stage} className={index === evolutionStages.length - 1 ? "is-future" : ""} initial={reduced ? false : { opacity: 0.28, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.62 }} transition={{ duration: reduced ? 0.01 : 0.7, delay: reduced ? 0 : index * 0.08 }}>
              <span>{String(index + 1).padStart(2, "0")}</span><h3>{stage}</h3>
              <div className={`evolution-object evolution-object-${index + 1}`} aria-hidden="true"><i /><i /></div>
              {index === evolutionStages.length - 1 && <em>Future phase</em>}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
