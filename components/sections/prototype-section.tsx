"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, RotateCcw, Wind } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { StaticPrototypeVisual, type PrototypeView } from "@/components/three/prototype-scene";
import { SectionTransition } from "@/components/motion/section-transition";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { SectionHeading } from "@/components/ui/section-heading";

const PrototypeScene = dynamic(() => import("@/components/three/prototype-scene"), { ssr: false, loading: () => <StaticPrototypeVisual /> });

export function PrototypeSection() {
  const { reduced } = useMotionPreference();
  const inspectionRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const [stage, setStage] = useState(reduced ? 5 : 0);
  const [view, setView] = useState<PrototypeView>("exterior");
  const [resetKey, setResetKey] = useState(0);
  const [mobileChamber, setMobileChamber] = useState<"control" | "active">("control");
  const [selectedCallout, setSelectedCallout] = useState(0);
  const { scrollYProgress } = useScroll({ target: inspectionRef, offset: ["start 68%", "end 38%"] });
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!reduced) setStage(Math.min(5, Math.floor(value * 6)));
  });

  const callouts = stage < 2
    ? ["MQ-135 sensor", "12 V circulation fan", "House model", "Lower entry point"]
    : ["Nano-anatase TiO₂ coating", "UV LED strip", "Activated surface"];

  return (
    <section className="section section-dark prototype-section" id="prototype" aria-labelledby="prototype-title">
      <SectionTransition tone="dark" />
      <div className="content-wrap">
        <SectionHeading index="04 · Comparative prototype" title={<>Two chambers.<br /><span className="accent">One critical difference.</span></>} copy={<p id="prototype-title">Each sealed chamber has an approximate 30 cm × 30 cm footprint and comparable internal architecture. No exact height is claimed.</p>} />
        <div className="prototype-inspection" ref={inspectionRef} data-inspection-stage={stage + 1}>
          <div className="prototype-stage surface-panel-dark" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 45) setMobileChamber(delta < 0 ? "active" : "control"); touchStart.current = null; }}>
            <div className="prototype-view-controls" role="group" aria-label="Prototype view">
              {(["exterior", "airflow", "components"] as PrototypeView[]).map((option) => <button key={option} className={view === option ? "is-active" : ""} aria-pressed={view === option} onClick={() => setView(option)}>{option === "airflow" && <Wind size={15} aria-hidden="true" />}{option[0].toUpperCase() + option.slice(1)} view</button>)}
              <button onClick={() => setResetKey((value) => value + 1)}><RotateCcw size={15} aria-hidden="true" />Reset camera</button>
            </div>
            <PrototypeScene view={view} resetKey={resetKey} inspectable variant="inspection" />
            <div className={`prototype-callouts callout-stage-${stage + 1}`} aria-label="Visible prototype components">
              {callouts.map((callout, index) => <button key={callout} className={`prototype-hotspot hotspot-${index + 1}${selectedCallout === index ? " is-selected" : ""}`} aria-pressed={selectedCallout === index} onClick={() => setSelectedCallout(index)}><i aria-hidden="true" /><span>{callout}</span></button>)}
            </div>
            <div className="chamber-comparison">
              <article className={mobileChamber === "control" ? "is-mobile-active" : ""}><span>Control chamber</span><p>Shows the natural change in relative sensor response inside the untreated chamber.</p></article>
              <article className={mobileChamber === "active" ? "is-mobile-active" : ""}><span>Project Tejasvayu chamber</span><p>Adds TiO₂-coated surfaces and ultraviolet activation to explore whether the pollutant-response curve declines more rapidly.</p></article>
            </div>
            <p className="prototype-swipe-note">Swipe to switch chamber information · {mobileChamber === "control" ? "Control chamber" : "Project Tejasvayu chamber"}</p>
            {stage === 5 && <p className="prototype-final-statement">Two chambers. One critical difference.</p>}
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
