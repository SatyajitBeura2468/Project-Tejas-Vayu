"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionTransition } from "@/components/motion/section-transition";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { Reveal } from "@/components/motion/reveal";
import { evolutionStages } from "@/content/project";
import { homeMotionTokens as motionTokens } from "@/lib/motion-tokens";

function EvolutionMilestone({ stage, index, reduced }: { stage: string; index: number; reduced: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "end 48%"] });
  const progress = useSpring(scrollYProgress, motionTokens.spring.scroll);
  const opacity = useTransform(progress, [0, 0.38, 1], [0.22, 1, 1]);
  const x = useTransform(progress, [0, 0.62], [34, 0]);
  const objectScale = useTransform(progress, [0, 0.76], [0.86, 1]);

  return (
    <motion.li ref={ref} className={index === evolutionStages.length - 1 ? "is-future" : ""} style={{ opacity: reduced ? 1 : opacity, x: reduced ? 0 : x }}>
      <span>{String(index + 1).padStart(2, "0")}</span><h3>{stage}</h3>
      <motion.div className={`evolution-object evolution-object-${index + 1}`} style={{ scale: reduced ? 1 : objectScale }} aria-hidden="true"><i /><i /></motion.div>
      {index === evolutionStages.length - 1 && <em>Future phase</em>}
    </motion.li>
  );
}

export function EvolutionSection() {
  const { reduced } = useMotionPreference();
  return (
    <section className="section section-dark evolution-section" id="evolution" aria-labelledby="evolution-title">
      <SectionTransition tone="dark" />
      <div className="content-wrap evolution-grid">
        <Reveal className="evolution-intro" distance={24}>
          <p className="section-index">03 · Project evolution</p>
          <h2 id="evolution-title">A classroom question,<br /><span className="accent">still evolving.</span></h2>
          <p>What began as a classroom question developed into a working prototype, an experimental platform and a wider vision for cleaner urban infrastructure.</p>
        </Reveal>
        <ol className="evolution-rail evolution-motion-rail">
          <motion.i className="evolution-progress-line" initial={reduced ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduced ? 0.01 : 1.35, ease: motionTokens.ease.cinematic }} aria-hidden="true" />
          {evolutionStages.map((stage, index) => (
            <EvolutionMilestone key={stage} stage={stage} index={index} reduced={reduced} />
          ))}
        </ol>
      </div>
    </section>
  );
}
