"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { innovationPillars } from "@/content/project";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { useDesktopStory } from "@/components/motion/use-desktop-story";
import { SectionTransition } from "@/components/motion/section-transition";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeMotionTokens as motionTokens } from "@/lib/motion-tokens";

const surfaces = ["Wall", "Road divider", "Bus stop", "Flyover", "School or hospital wall", "Urban pilot zone"];

export function ConceptSection() {
  const { reduced } = useMotionPreference();
  const desktopStory = useDesktopStory();
  const storyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef(0);
  const [stage, setStage] = useState(reduced ? 5 : 0);
  const visibleStage = reduced || desktopStory === false ? 5 : stage;
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ["start 75%", "end 35%"] });
  const progress = useSpring(scrollYProgress, motionTokens.spring.scroll);
  const wallY = useTransform(progress, [0, 0.16, 1], [26, 0, -10]);
  const wallScale = useTransform(progress, [0, 1], [0.97, 1.025]);
  const coatingOpacity = useTransform(progress, [0.08, 0.28], [0, 1]);
  const coatingScale = useTransform(progress, [0.08, 0.3], [0.12, 1]);
  const uvOpacity = useTransform(progress, [0.2, 0.42], [0, 1]);
  const uvX = useTransform(progress, [0.18, 0.44], ["-28%", "0%"]);
  const airflowScale = useTransform(progress, [0.32, 0.58], [0, 1]);
  const networkScale = useTransform(progress, [0.58, 0.94], [0.72, 1]);
  const networkOpacity = useTransform(progress, [0.56, 0.82], [0, 1]);
  useMotionValueEvent(progress, "change", (value) => {
    if (reduced || desktopStory !== true) return;
    const next = Math.min(5, Math.floor(Math.min(0.999, value) * 6));
    if (next === stageRef.current) return;
    stageRef.current = next;
    setStage(next);
  });

  return (
    <section className="section section-paper concept-section" id="concept" aria-labelledby="concept-title">
      <SectionTransition tone="light" />
      <div className="content-wrap">
        <SectionHeading animated index="02 · The smarter-surface insight" title={<>Turn ordinary surfaces into <span className="accent">active surfaces.</span></>} copy={<p id="concept-title">The project does not begin by demanding new urban land. It begins with the surfaces already present.</p>} />
        <div className="surface-story" ref={storyRef} data-stage={visibleStage + 1}>
          <div className="surface-story-sticky">
            <div className="active-surface-visual" aria-hidden="true">
              <motion.div className="active-wall" style={{ rotateX: 2, rotateY: -9, y: reduced ? 0 : wallY, scale: reduced ? 1 : wallScale }}><motion.i className="coating-layer" style={{ opacity: reduced ? 1 : coatingOpacity, scaleX: reduced ? 1 : coatingScale }} /><motion.i className="uv-layer" style={{ opacity: reduced ? 1 : uvOpacity, x: reduced ? 0 : uvX }} /></motion.div>
              <motion.div className="concept-airflow" style={{ scaleX: reduced ? 1 : airflowScale }}><i /><i /><i /></motion.div>
              <div className="concept-molecules">{Array.from({ length: 9 }, (_, index) => <i key={index} className={index % 4 === 0 ? "is-reacted" : ""} />)}</div>
              <motion.div className="surface-network-lines" style={{ scale: reduced ? 1 : networkScale, opacity: reduced ? 1 : networkOpacity }}><i /><i /><i /><i /><i /></motion.div>
            </div>
            <ol className="surface-sequence" aria-label="Smarter-surface transformation sequence">
              {surfaces.map((surface, index) => <li key={surface} className={visibleStage === index ? "is-active" : visibleStage > index ? "is-complete" : ""}><span>{String(index + 1).padStart(2, "0")}</span><h3>{surface}</h3></li>)}
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
