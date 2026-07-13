"use client";

import { motion } from "motion/react";
import { innovationPillars } from "@/content/project";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { SectionHeading } from "@/components/ui/section-heading";

const surfaces = ["Wall", "Road divider", "Bus stop", "Flyover", "School or hospital wall", "Urban pilot zone"];

export function ConceptSection() {
  const { reduced } = useMotionPreference();
  return (
    <section className="section section-paper concept-section" id="concept" aria-labelledby="concept-title">
      <div className="content-wrap">
        <SectionHeading index="02 · The smarter-surface insight" title={<>Turn ordinary surfaces into <span className="accent">active surfaces.</span></>} copy={<p id="concept-title">The project does not begin by demanding new urban land. It begins with the surfaces already present.</p>} />
        <div className="surface-journey">
          <motion.div className="surface-path" initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 1.2 }} />
          {surfaces.map((surface, index) => (
            <motion.article key={surface} className="surface-stage" initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ delay: reduced ? 0 : index * 0.08 }}>
              <div className={`surface-silhouette surface-${index + 1}`} aria-hidden="true"><span /></div>
              <p>{String(index + 1).padStart(2, "0")}</p>
              <h3>{surface}</h3>
            </motion.article>
          ))}
        </div>
        <ol className="pillar-rail">
          {innovationPillars.map((pillar, index) => <li key={pillar}><span>{String(index + 1).padStart(2, "0")}</span>{pillar}</li>)}
        </ol>
      </div>
    </section>
  );
}
