"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { innovationPillars } from "@/content/project";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { SectionTransition } from "@/components/motion/section-transition";
import { SectionHeading } from "@/components/ui/section-heading";

const surfaces = ["Wall", "Road divider", "Bus stop", "Flyover", "School or hospital wall", "Urban pilot zone"];

export function ConceptSection() {
  const { reduced } = useMotionPreference();
  const storyRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(reduced ? 5 : 0);
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ["start 75%", "end 35%"] });
  const coatingOpacity = useTransform(scrollYProgress, [0.08, 0.26], [0, 1]);
  const uvOpacity = useTransform(scrollYProgress, [0.2, 0.38], [0, 1]);
  const airflowScale = useTransform(scrollYProgress, [0.34, 0.55], [0, 1]);
  const networkScale = useTransform(scrollYProgress, [0.58, 0.94], [0, 1]);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!reduced) setStage(Math.min(5, Math.floor(value * 6)));
  });

  return (
    <section className="section section-paper concept-section" id="concept" aria-labelledby="concept-title">
      <SectionTransition tone="light" />
      <div className="content-wrap">
        <SectionHeading index="02 · The smarter-surface insight" title={<>Turn ordinary surfaces into <span className="accent">active surfaces.</span></>} copy={<p id="concept-title">The project does not begin by demanding new urban land. It begins with the surfaces already present.</p>} />
        <div className="surface-story" ref={storyRef} data-stage={stage + 1}>
          <div className="surface-story-sticky">
            <div className="active-surface-visual" aria-hidden="true">
              <div className="active-wall"><motion.i className="coating-layer" style={{ opacity: reduced ? 1 : coatingOpacity }} /><motion.i className="uv-layer" style={{ opacity: reduced ? 1 : uvOpacity }} /></div>
              <motion.div className="concept-airflow" style={{ scaleX: reduced ? 1 : airflowScale }}><i /><i /><i /></motion.div>
              <div className="concept-molecules">{Array.from({ length: 9 }, (_, index) => <i key={index} className={index % 4 === 0 ? "is-reacted" : ""} />)}</div>
              <motion.div className="surface-network-lines" style={{ scale: reduced ? 1 : networkScale }}><i /><i /><i /><i /><i /></motion.div>
            </div>
            <ol className="surface-sequence" aria-label="Smarter-surface transformation sequence">
              {surfaces.map((surface, index) => <li key={surface} className={stage === index ? "is-active" : stage > index ? "is-complete" : ""}><span>{String(index + 1).padStart(2, "0")}</span><h3>{surface}</h3></li>)}
            </ol>
          </div>
        </div>
        <ol className="pillar-rail concept-pillars">
          {innovationPillars.map((pillar, index) => <motion.li key={pillar} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ delay: reduced ? 0 : index * 0.08 }}><span>{String(index + 1).padStart(2, "0")}</span>{pillar}</motion.li>)}
        </ol>
      </div>
    </section>
  );
}
