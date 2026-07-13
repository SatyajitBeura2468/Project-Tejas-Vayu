"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { projectIdentity } from "@/content/project";

const chapters = [
  { title: "The urban problem", heading: "Pollution is distributed across the city.", copy: "Purification infrastructure cannot occupy every road, neighbourhood and public space.", visual: "city" },
  { title: "The smarter-surface insight", heading: "Use the surfaces already present.", copy: "Walls, dividers and transit infrastructure offer area without demanding separate urban land.", visual: "surface" },
  { title: "The two-chamber prototype", heading: "Two chambers. One critical difference.", copy: "The control records natural change. The active chamber adds TiO₂-coated surfaces and suitable ultraviolet activation.", visual: "chambers" },
  { title: "The photocatalytic principle", heading: "Light activates the surface.", copy: "Electron–hole separation and surface reactions can form reactive species that support oxidation of selected pollutants.", visual: "science" },
  { title: "The experimental comparison", heading: "Compare. Observe. Repeat.", copy: "A stable baseline, controlled input and matched observation window make the two response trends comparable.", visual: "method" },
  { title: "The observed result", heading: "The separation becomes clear with time.", copy: "The active chamber generally returned near baseline sooner in the supplied prototype observations.", visual: "result" },
  { title: "The scale-up vision", heading: projectIdentity.tagline, copy: "", visual: "future" },
] as const;

function JudgeVisual({ type }: { type: (typeof chapters)[number]["visual"] }) {
  return (
    <div className={`judge-visual visual-${type}`} aria-hidden="true">
      {type === "city" && <><div className="judge-buildings">{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</div><span className="judge-road" /></>}
      {type === "surface" && <><span className="judge-surface-path" />{["Wall", "Divider", "Bus stop", "Flyover"].map((item) => <i key={item}>{item}</i>)}</>}
      {type === "chambers" && <>{[false, true].map((active) => <div key={String(active)} className={`judge-chamber${active ? " active" : ""}`}><i /><span>MQ-135<br />relative response</span></div>)}</>}
      {type === "science" && <><span className="judge-photon">hν</span><strong>TiO₂</strong><i>e⁻</i><i>h⁺</i><i>•OH</i></>}
      {type === "method" && <>{["Baseline", "Input", "Mix", "Activate", "Observe"].map((item, index) => <i key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</i>)}</>}
      {type === "result" && <svg viewBox="0 0 600 300"><path d="M20 200C90 190 110 80 180 88S310 124 580 196" /><path d="M20 200C90 190 110 80 180 88S270 185 360 203 480 202 580 200" /></svg>}
      {type === "future" && <><div className="judge-buildings">{Array.from({ length: 11 }, (_, index) => <i key={index} />)}</div><span className="judge-future-path" /></>}
    </div>
  );
}

export function JudgeExperience() {
  const { reduced } = useMotionPreference();
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const chapter = chapters[index];

  const go = useCallback((next: number) => setIndex(Math.max(0, Math.min(chapters.length - 1, next))), []);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (["ArrowRight", " ", "PageDown"].includes(event.key)) { event.preventDefault(); go(index + 1); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); go(index - 1); }
      if (event.key === "Home") go(0);
      if (event.key === "End") go(chapters.length - 1);
    };
    window.addEventListener("keydown", keydown);
    const mainNode = mainRef.current;
    if (mainNode) mainNode.dataset.judgeReady = "true";
    return () => {
      window.removeEventListener("keydown", keydown);
      if (mainNode) delete mainNode.dataset.judgeReady;
    };
  }, [go, index]);

  const requestFullscreen = async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  };

  return (
    <main ref={mainRef} id="main-content" className="judge-experience" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 55) go(index + (delta < 0 ? 1 : -1)); touchStart.current = null; }}>
      <header className="judge-header"><Link href="/" aria-label="Exit judge mode"><X aria-hidden="true" /><span>Exit to full website</span></Link><button onClick={requestFullscreen}><Expand aria-hidden="true" /><span>Full screen</span></button></header>
      <nav className="judge-progress" aria-label="Judge mode chapters">{chapters.map((item, chapterIndex) => <button key={item.title} aria-current={index === chapterIndex ? "step" : undefined} onClick={() => go(chapterIndex)}><span>{String(chapterIndex + 1).padStart(2, "0")}</span><em>{item.title}</em></button>)}</nav>
      <div className="judge-chapter-window">
        <AnimatePresence mode="wait">
          <motion.section key={chapter.title} className={`judge-chapter chapter-${chapter.visual}`} initial={reduced ? false : { opacity: 0, x: 44 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? { opacity: 0 } : { opacity: 0, x: -44 }} transition={{ duration: reduced ? 0.01 : 0.62, ease: [0.22, 1, 0.36, 1] }} aria-labelledby="judge-heading">
            <div className="judge-copy"><p>{String(index + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}</p><h1 id="judge-heading">{chapter.heading}</h1>{chapter.copy && <p>{chapter.copy}</p>}</div>
            <JudgeVisual type={chapter.visual} />
          </motion.section>
        </AnimatePresence>
      </div>
      <footer className="judge-controls"><button onClick={() => go(index - 1)} disabled={index === 0}><ArrowLeft aria-hidden="true" />Previous</button><p><span>Arrow keys</span><span>Space</span><span>Swipe</span></p><button onClick={() => go(index + 1)} disabled={index === chapters.length - 1}>Next<ArrowRight aria-hidden="true" /></button></footer>
    </main>
  );
}
