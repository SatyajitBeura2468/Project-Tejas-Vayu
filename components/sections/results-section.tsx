"use client";

import Link from "next/link";
import { ArrowRight, Eye, Pause, Play } from "lucide-react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ResultsChart } from "@/components/charts/results-chart";
import { SectionTransition } from "@/components/motion/section-transition";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { reconstructionNotice, resultInterpretation, resultMilestones } from "@/content/results";
import { SectionHeading } from "@/components/ui/section-heading";

const REPLAY_UPDATE_INTERVAL = 1000 / 30;

function getNarrativeReplaySpeed(seconds: number) {
  const distanceFromKeyEvent = Math.min(1, Math.abs(seconds - 120) / 70);
  const easedDistance = distanceFromKeyEvent * distanceFromKeyEvent * (3 - 2 * distanceFromKeyEvent);

  return 58 + (205 - 58) * easedDistance;
}

export function ResultsSection() {
  const { reduced } = useMotionPreference();
  const explorerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const inView = useInView(explorerRef, { amount: 0.28 });
  const [seconds, setSeconds] = useState(reduced ? 600 : 0);
  const [playing, setPlaying] = useState(false);
  const [focus, setFocus] = useState<"both" | "control" | "active">("both");
  const [showLabels, setShowLabels] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(true);
  const effectivePlaying = playing && !reduced && inView && documentVisible;

  useEffect(() => {
    const syncDocumentVisibility = () => setDocumentVisible(document.visibilityState !== "hidden");

    syncDocumentVisibility();
    document.addEventListener("visibilitychange", syncDocumentVisibility);
    return () => document.removeEventListener("visibilitychange", syncDocumentVisibility);
  }, []);

  useEffect(() => {
    if (inView && !reduced && !startedRef.current) { startedRef.current = true; setPlaying(true); }
  }, [inView, reduced]);

  useEffect(() => {
    if (!effectivePlaying) return;
    const loop = (now: number) => {
      if (lastRef.current === null) lastRef.current = now;
      const elapsed = now - lastRef.current;

      if (elapsed >= REPLAY_UPDATE_INTERVAL) {
        const delta = Math.min(0.1, elapsed / 1000);
        lastRef.current = now - (elapsed % REPLAY_UPDATE_INTERVAL);
        setSeconds((current) => {
          const next = current + delta * getNarrativeReplaySpeed(current);
          if (next >= 600) { setPlaying(false); return 600; }
          return next;
        });
      }

      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => { if (frameRef.current !== null) cancelAnimationFrame(frameRef.current); lastRef.current = null; };
  }, [effectivePlaying]);

  const nearest = resultMilestones.reduce((best, item) => Math.abs(item.seconds - seconds) < Math.abs(best.seconds - seconds) ? item : best);
  return (
    <section className="section section-white results-section" id="results" aria-labelledby="results-title">
      <SectionTransition tone="light" />
      <div className="content-wrap">
        <SectionHeading animated index="08 · Observation-based results" title={<>The separation becomes<br /><span className="violet">clear with time.</span></>} copy={<div id="results-title"><strong>{reconstructionNotice.title}</strong><p>{reconstructionNotice.detail}. The curves are a transparent visual reconstruction of supplied qualitative milestones.</p></div>} />
        <div className="results-layout results-explorer" ref={explorerRef}>
          <ol className="observation-timeline">
            {resultMilestones.map((milestone) => <li key={milestone.id} className={nearest.id === milestone.id ? "is-active" : milestone.seconds <= seconds ? "is-reached" : ""}><button onClick={() => { setSeconds(milestone.seconds); setPlaying(false); }} aria-current={nearest.id === milestone.id ? "step" : undefined}><span>{milestone.label}</span><p>{milestone.observation}</p></button></li>)}
          </ol>
          <div>
            <div className="results-explorer-controls" aria-label="Result comparison controls">
              <button onClick={() => setPlaying((value) => !value)} disabled={reduced}>{effectivePlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}{effectivePlaying ? "Pause" : "Play reveal"}</button>
              {(["both", "control", "active"] as const).map((curve) => <button key={curve} aria-pressed={focus === curve} onClick={() => setFocus(curve)}><Eye aria-hidden="true" />{curve === "both" ? "Both curves" : `${curve[0].toUpperCase() + curve.slice(1)} curve`}</button>)}
              <button aria-pressed={showLabels} onClick={() => setShowLabels((value) => !value)}>Toggle labels</button>
            </div>
            <label className="results-time-scrubber"><span>Inspect the nearest milestone</span><input type="range" min="0" max="600" step="1" value={Math.round(seconds)} onChange={(event) => { setSeconds(Number(event.target.value)); setPlaying(false); }} /></label>
            <ResultsChart currentSeconds={reduced ? 600 : seconds} focus={focus} showLabels={showLabels} zoomed={seconds > 90 && seconds < 155} />
            <p className="result-interpretation">{resultInterpretation}</p>
          </div>
        </div>
        <Link className="text-route-link text-route-link-dark" href="/results">Examine the complete result view <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
