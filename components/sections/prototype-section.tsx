"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, RotateCcw, Wind } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { StaticPrototypeVisual, type PrototypeView } from "@/components/three/prototype-static";
import { SectionTransition } from "@/components/motion/section-transition";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { useDesktopStory } from "@/components/motion/use-desktop-story";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeMotionTokens, motionTokens } from "@/lib/motion-tokens";

const PrototypeScene = dynamic(() => import("@/components/three/prototype-scene"), { ssr: false, loading: () => <StaticPrototypeVisual /> });

export function PrototypeSection({ homeMotion = false }: { homeMotion?: boolean } = {}) {
  const { reduced } = useMotionPreference();
  const desktopStory = useDesktopStory();
  const inspectionRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const stageRef = useRef(0);
  const [stage, setStage] = useState(reduced ? 5 : 0);
  const [view, setView] = useState<PrototypeView>("exterior");
  const [manualView, setManualView] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [mobileChamber, setMobileChamber] = useState<"control" | "active">("control");
  const [selectedCallout, setSelectedCallout] = useState(0);
  const visibleStage = homeMotion && (reduced || desktopStory === false) ? 5 : stage;
  const visibleView = !homeMotion || manualView
    ? view
    : visibleStage >= 5
      ? "exterior"
      : visibleStage >= 4
        ? "components"
        : visibleStage >= 2
          ? "airflow"
          : "exterior";
  const { scrollYProgress } = useScroll({ target: inspectionRef, offset: ["start 68%", "end 38%"] });
  const sectionMotion = homeMotion ? homeMotionTokens : motionTokens;
  const progress = useSpring(scrollYProgress, homeMotion ? homeMotionTokens.spring.scroll : motionTokens.spring.cinematic);
  useMotionValueEvent(homeMotion ? progress : scrollYProgress, "change", (value) => {
    if (!homeMotion) {
      if (!reduced) setStage(Math.min(5, Math.floor(value * 6)));
      return;
    }
    if (reduced || desktopStory !== true) return;
    const next = Math.min(5, Math.floor(Math.min(0.999, value) * 6));
    if (next === stageRef.current) return;
    stageRef.current = next;
    setStage(next);
  });

  const callouts = visibleStage < 2
    ? ["MQ-135 sensor", "12 V circulation fan", "House model", "Lower entry point"]
    : ["Nano-anatase TiO₂ coating", "UV LED strip", "Activated surface"];

  return (
    <section className="section section-dark prototype-section" id="prototype" aria-labelledby="prototype-title">
      <SectionTransition tone="dark" />
      <div className="content-wrap">
        <SectionHeading animated={homeMotion} index="04 · Comparative prototype" title={<>Two chambers.<br /><span className="accent">One critical difference.</span></>} copy={<p id="prototype-title">Each sealed chamber has an approximate 30 cm × 30 cm footprint and comparable internal architecture. No exact height is claimed.</p>} />
        <div className="prototype-inspection" ref={inspectionRef} data-inspection-stage={visibleStage + 1}>
          <div className="prototype-stage surface-panel-dark" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 45) setMobileChamber(delta < 0 ? "active" : "control"); touchStart.current = null; }}>
            <div className="prototype-view-controls" role="group" aria-label="Prototype view">
              {(["exterior", "airflow", "components"] as PrototypeView[]).map((option) => <button key={option} className={visibleView === option ? "is-active" : ""} aria-pressed={visibleView === option} onClick={() => { if (homeMotion) setManualView(true); setView(option); }}>{option === "airflow" && <Wind size={15} aria-hidden="true" />}{option[0].toUpperCase() + option.slice(1)} view</button>)}
              <button onClick={() => setResetKey((value) => value + 1)}><RotateCcw size={15} aria-hidden="true" />Reset camera</button>
            </div>
            <PrototypeScene view={visibleView} resetKey={resetKey} inspectable variant="inspection" homeMotion={homeMotion} />
            <div className={`prototype-callouts callout-stage-${visibleStage + 1}`} aria-label="Visible prototype components">
              {callouts.map((callout, index) => <button key={callout} className={`prototype-hotspot hotspot-${index + 1}${selectedCallout === index ? " is-selected" : ""}`} aria-pressed={selectedCallout === index} onClick={() => setSelectedCallout(index)}><i aria-hidden="true" /><span>{callout}</span></button>)}
            </div>
            <div className="chamber-comparison">
              <article className={mobileChamber === "control" ? "is-mobile-active" : ""}><span>Control chamber</span><p>Shows the natural change in relative sensor response inside the untreated chamber.</p></article>
              <article className={mobileChamber === "active" ? "is-mobile-active" : ""}><span>Project Tejasvayu chamber</span><p>Adds TiO₂-coated surfaces and ultraviolet activation to explore whether the pollutant-response curve declines more rapidly.</p></article>
            </div>
            <p className="prototype-swipe-note">Swipe to switch chamber information · {mobileChamber === "control" ? "Control chamber" : "Project Tejasvayu chamber"}</p>
            {homeMotion ? (
              <AnimatePresence>{visibleStage === 5 && <motion.p className="prototype-final-statement" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: reduced ? 0.01 : sectionMotion.duration.slow, ease: sectionMotion.ease.cinematic }}>Two chambers. One critical difference.</motion.p>}</AnimatePresence>
            ) : stage === 5 && <p className="prototype-final-statement">Two chambers. One critical difference.</p>}
          </div>
        </div>
        <div className="prototype-detail-rail">
          <span>House model · rear central</span><span>MQ-135 · near base</span><span>Circulation fan · toward front</span><span>Lower-corner access · closable</span>
        </div>
        <Link className="text-route-link" href="/prototype">Explore the complete prototype <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
