"use client";

import { motion } from "motion/react";
import { SectionTransition } from "@/components/motion/section-transition";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { validationNeeds } from "@/content/project";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeMotionTokens as motionTokens } from "@/lib/motion-tokens";

export function LimitationsSection() {
  const { reduced } = useMotionPreference();
  return (
    <section className="section section-paper limitations-section" id="limitations" aria-labelledby="limitations-title">
      <SectionTransition tone="light" />
      <div className="content-wrap">
        <SectionHeading animated index="12 · Next validation" title={<>What must be<br /><span className="accent">tested next</span></>} copy={<p id="limitations-title">A promising prototype becomes stronger when its limits define the next experiment.</p>} />
        <motion.div
          className="validation-framework"
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.75 }}
          variants={{ visible: { transition: { staggerChildren: reduced ? 0 : 0.1, delayChildren: reduced ? 0 : 0.06 } } }}
        >
          <motion.span variants={{ hidden: { opacity: 0, y: 7 }, visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0.01 : motionTokens.duration.standard, ease: motionTokens.ease.cinematic } } }}>TEST</motion.span>
          <motion.i aria-hidden="true" style={{ originX: 0 }} variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1, transition: { duration: reduced ? 0.01 : motionTokens.duration.slow, ease: motionTokens.ease.cinematic } } }} />
          <motion.span variants={{ hidden: { opacity: 0, y: 7 }, visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0.01 : motionTokens.duration.standard, ease: motionTokens.ease.cinematic } } }}>DOCUMENT</motion.span>
          <motion.i aria-hidden="true" style={{ originX: 0 }} variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1, transition: { duration: reduced ? 0.01 : motionTokens.duration.slow, ease: motionTokens.ease.cinematic } } }} />
          <motion.span variants={{ hidden: { opacity: 0, y: 7 }, visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0.01 : motionTokens.duration.standard, ease: motionTokens.ease.cinematic } } }}>VALIDATE</motion.span>
        </motion.div>
        <motion.ol
          className="limitations-index"
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
          variants={{ visible: { transition: { staggerChildren: reduced ? 0 : 0.045, delayChildren: reduced ? 0 : 0.08 } } }}
        >
          {validationNeeds.map((need, index) => (
            <motion.li
              key={need}
              variants={{
                hidden: { opacity: 0, y: 13 },
                visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0.01 : motionTokens.duration.standard, ease: motionTokens.ease.cinematic } },
              }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{need}</strong>
              <i aria-hidden="true" />
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
