"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, type MotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { futureStages } from "@/content/project";
import { Reveal } from "@/components/motion/reveal";
import { SectionTransition } from "@/components/motion/section-transition";
import { SectionHeading } from "@/components/ui/section-heading";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { useDesktopStory } from "@/components/motion/use-desktop-story";
import { homeMotionTokens as motionTokens } from "@/lib/motion-tokens";

function FutureMilestone({
  activeStage,
  index,
  progress,
  reduced,
  stage,
  total,
}: {
  activeStage: number;
  index: number;
  progress: MotionValue<number>;
  reduced: boolean;
  stage: string;
  total: number;
}) {
  const centre = total === 1 ? 0.5 : (index + 0.35) / total;
  const revealStart = Math.max(0, centre - 0.14);
  const revealEnd = Math.min(1, centre + 0.08);
  const opacity = useTransform(progress, [revealStart, centre, revealEnd], [0.32, 1, index < total - 1 ? 0.7 : 1]);
  const y = useTransform(progress, [revealStart, centre, revealEnd], [18, -8, 0]);
  const objectScale = useTransform(progress, [revealStart, centre], [0.94, 1]);

  return (
    <motion.article
      className={index === activeStage ? "is-active" : index < activeStage ? "is-reached" : ""}
      style={{ opacity: reduced ? 1 : opacity, y: reduced ? 0 : y }}
    >
      <motion.div className={`future-object future-object-${Math.min(index + 1, 7)}`} aria-hidden="true" style={{ scale: reduced ? 1 : objectScale }}><i /><i /></motion.div>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <h3>{stage}</h3>
    </motion.article>
  );
}

export function FutureSection() {
  const { reduced } = useMotionPreference();
  const desktopStory = useDesktopStory();
  const pathRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef(0);
  const allStages = [...futureStages, "VAYU-NET distributed network"];
  const [activeStage, setActiveStage] = useState(reduced ? allStages.length - 1 : 0);
  const visibleStage = reduced || desktopStory === false ? allStages.length - 1 : activeStage;
  const { scrollYProgress } = useScroll({ target: pathRef, offset: ["start 72%", "end 35%"] });
  const progress = useSpring(scrollYProgress, motionTokens.spring.scroll);
  const lineScale = useTransform(progress, [0.03, 0.94], [0, 1]);

  useMotionValueEvent(progress, "change", (value) => {
    if (reduced || desktopStory !== true) return;
    const next = Math.min(allStages.length - 1, Math.floor(Math.min(0.999, value) * allStages.length));
    if (next === stageRef.current) return;
    stageRef.current = next;
    setActiveStage(next);
  });

  return (
    <section className="section section-dark future-section" id="future" aria-labelledby="future-title">
      <SectionTransition tone="dark" />
      <div className="content-wrap">
        <SectionHeading animated index="11 · Future scope" title={<>From one model<br /><span className="green">to cleaner cities.</span></>} copy={<p id="future-title">Each step is a proposed validation stage—not a claim that city-scale deployment already exists.</p>} />
        <div className="future-scroll-story" ref={pathRef}>
        <div className="future-path" data-active-stage={visibleStage + 1}>
          <motion.div className="future-path-line" style={{ scaleX: reduced ? 1 : lineScale }} />
          {allStages.map((stage, index) => <FutureMilestone key={stage} activeStage={visibleStage} index={index} progress={progress} reduced={reduced || desktopStory === false} stage={stage} total={allStages.length} />)}
        </div>
        </div>
        <Reveal className="vayu-net" distance={22}>
          <div><p className="future-label">Future phase</p><h3>VAYU-NET</h3><p>A future distributed school environmental research network.</p></div>
          <div className="school-network" role="img" aria-label="Simplified Odisha geographic orientation with future school research nodes">
            <svg viewBox="0 0 420 340" aria-hidden="true"><path className="odisha-outline" d="M94 42 154 25l50 22 47-7 45 28 18 48 52 28-23 49 8 53-43 39-56 9-39 27-55-12-22-42-42-27 12-53-31-45 27-40Z" /><path className="odisha-coast" d="M366 144c-17 20-17 42-15 102-13 18-27 31-43 39" /><path className="network-connection" d="M129 98 184 147l78-51 48 91-62 55-94 29-25-173Z" /></svg>
            {["Kalahandi", "Koraput", "Sambalpur", "Cuttack", "Puri"].map((label, index) => <span key={label} className={`network-node node-${index + 1}`} style={{ "--network-delay": `${index * 0.12}s` } as React.CSSProperties}>{label}</span>)}
          </div>
          <p>Participating schools could eventually assemble standardised low-cost stations, conduct comparable experiments, upload validated observations and contribute to an Odisha-wide student research dataset.</p>
        </Reveal>
        <Link className="text-route-link" href="/future">Explore the future roadmap <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
