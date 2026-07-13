"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SectionTransition } from "@/components/motion/section-transition";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { methodologySteps } from "@/content/project";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeMotionTokens as motionTokens } from "@/lib/motion-tokens";

export function MethodologySection() {
  const { reduced } = useMotionPreference();
  const [active, setActive] = useState(0);
  return (
    <section className="section section-paper methodology-section" id="methodology" aria-labelledby="methodology-title">
      <SectionTransition tone="light" />
      <div className="content-wrap">
        <SectionHeading animated index="07 · Experimental method" title={<>Compare.<br /><span className="accent">Observe. Repeat.</span></>} copy={<p id="methodology-title">The current apparatus is a prototype demonstration: the untreated chamber provides a natural-decay comparison while the active chamber combines coating and UV illumination.</p>} />
        <div className="methodology-sequence" data-method-step={active + 1}>
          <div className="method-chambers" aria-label="Conceptual methodology animation">
            <p>Conceptual methodology animation</p>
            <div className="method-chamber method-control"><i className="method-fan" />{Array.from({ length: 10 }, (_, index) => <i className="method-particle" key={index} />)}<span>Control</span></div>
            <div className="method-chamber method-active"><i className="method-fan" /><i className="method-uv" />{Array.from({ length: 10 }, (_, index) => <i className="method-particle" key={index} />)}<span>TiO₂ + UV</span></div>
            <svg className="method-mini-graph" viewBox="0 0 500 120" role="img" aria-label="Conceptual response trends, not measured data"><motion.path d="M8 92 C100 90 110 22 175 28 S310 73 492 88" pathLength={1} initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: reduced ? 0.01 : motionTokens.duration.cinematic, ease: motionTokens.ease.cinematic }} /><motion.path d="M8 92 C100 90 110 22 175 28 S255 84 492 93" pathLength={1} initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: reduced ? 0.01 : motionTokens.duration.cinematic, delay: reduced ? 0 : 0.12, ease: motionTokens.ease.cinematic }} /></svg>
          </div>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={active} className="method-chapter-copy" aria-live="polite" initial={reduced ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? { opacity: 0 } : { opacity: 0, x: -12 }} transition={{ duration: reduced ? 0.01 : motionTokens.duration.standard, ease: motionTokens.ease.cinematic }}><span>{String(active + 1).padStart(2, "0")}</span><h3>{methodologySteps[active].title}</h3><p>{methodologySteps[active].detail}</p></motion.div>
          </AnimatePresence>
          <label className="method-scrubber"><span>Scrub through the methodology</span><input type="range" min="0" max={methodologySteps.length - 1} step="1" value={active} onChange={(event) => setActive(Number(event.target.value))} /></label>
          <ol className="methodology-timeline">
            {methodologySteps.map((step, index) => <li key={step.title} className={active === index ? "is-active" : active > index ? "is-complete" : ""}><button onClick={() => setActive(index)} aria-current={active === index ? "step" : undefined}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.detail}</p></button></li>)}
          </ol>
        </div>
        <aside className="refinement-note">
          <p className="section-index">Research-grade refinement</p>
          <h3>Change one variable at a time.</h3>
          <p>A stronger future control protocol would expose both chambers to equivalent illumination and vary only the presence of TiO₂. A metered Y-splitter or equivalent manifold could also equalise the initial test input.</p>
        </aside>
        <Link className="text-route-link text-route-link-dark" href="/methodology">Read the full methodology <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
