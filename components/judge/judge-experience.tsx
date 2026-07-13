"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Expand, Minimize2, X } from "lucide-react";
import { AnimatePresence, motion, useIsPresent } from "motion/react";
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

function AnimatedJudgeChapter({
  chapter,
  chapterIndex,
  direction,
  reduced,
}: {
  chapter: (typeof chapters)[number];
  chapterIndex: number;
  direction: number;
  reduced: boolean;
}) {
  const isPresent = useIsPresent();
  const headingId = `judge-heading-${chapterIndex}`;

  return (
    <motion.section
      custom={direction}
      className={`judge-chapter chapter-${chapter.visual}`}
      initial={reduced ? false : chapter.visual === "surface" ? { opacity: 0, clipPath: direction > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" } : chapter.visual === "science" ? { opacity: 0, scale: 1.08 } : chapter.visual === "chambers" ? { opacity: 0, scale: 0.94, x: direction * 30 } : chapter.visual === "result" ? { opacity: 0, x: direction * 62 } : { opacity: 0, x: direction * 34, filter: "blur(7px)" }}
      animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)", clipPath: "inset(0 0% 0 0%)" }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction * -32, scale: chapter.visual === "future" ? 0.97 : 1, filter: "blur(5px)" }}
      transition={{ duration: reduced ? 0.01 : 0.68, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby={headingId}
      aria-hidden={!isPresent}
      inert={!isPresent}
    >
      <div className="judge-copy"><p>{String(chapterIndex + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}</p><h1 id={headingId}>{chapter.heading}</h1>{chapter.copy && <p>{chapter.copy}</p>}</div>
      <JudgeVisual type={chapter.visual} />
    </motion.section>
  );
}

export function JudgeExperience() {
  const { reduced } = useMotionPreference();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const touchStart = useRef<number | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const chapter = chapters[index];

  const go = useCallback((next: number) => {
    setIndex((current) => {
      const bounded = Math.max(0, Math.min(chapters.length - 1, next));
      setDirection(bounded >= current ? 1 : -1);
      return bounded;
    });
  }, []);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (["ArrowRight", " ", "PageDown"].includes(event.key)) { event.preventDefault(); go(index + 1); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); go(index - 1); }
      if (event.key === "Home") go(0);
      if (event.key === "End") go(chapters.length - 1);
    };
    window.addEventListener("keydown", keydown);
    const fullscreenChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", fullscreenChange);
    const mainNode = mainRef.current;
    if (mainNode) mainNode.dataset.judgeReady = "true";
    return () => {
      window.removeEventListener("keydown", keydown);
      document.removeEventListener("fullscreenchange", fullscreenChange);
      if (mainNode) delete mainNode.dataset.judgeReady;
    };
  }, [go, index]);

  const requestFullscreen = async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  };

  return (
    <main ref={mainRef} id="main-content" className="judge-experience" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 55) go(index + (delta < 0 ? 1 : -1)); touchStart.current = null; }}>
      <header className="judge-header"><Link href="/" aria-label="Exit judge mode"><X aria-hidden="true" /><span>Exit to full website</span></Link><button onClick={requestFullscreen}>{fullscreen ? <Minimize2 aria-hidden="true" /> : <Expand aria-hidden="true" />}<span>{fullscreen ? "Exit full screen" : "Full screen"}</span></button></header>
      <nav className="judge-progress" aria-label="Judge mode chapters">{chapters.map((item, chapterIndex) => <button key={item.title} aria-current={index === chapterIndex ? "step" : undefined} onClick={() => go(chapterIndex)}><span>{String(chapterIndex + 1).padStart(2, "0")}</span><em>{item.title}</em>{index === chapterIndex && <motion.i layoutId="judge-active-chapter" transition={{ type: "spring", stiffness: 260, damping: 28 }} />}</button>)}</nav>
      <div className="judge-chapter-window">
        <AnimatePresence mode="sync" custom={direction}>
          <AnimatedJudgeChapter key={chapter.title} chapter={chapter} chapterIndex={index} direction={direction} reduced={reduced} />
        </AnimatePresence>
      </div>
      <footer className="judge-controls"><button onClick={() => go(index - 1)} disabled={index === 0}><ArrowLeft aria-hidden="true" />Previous</button><p><span>Arrow keys</span><span>Space</span><span>Swipe</span></p><button onClick={() => go(index + 1)} disabled={index === chapters.length - 1}>Next<ArrowRight aria-hidden="true" /></button></footer>
    </main>
  );
}
