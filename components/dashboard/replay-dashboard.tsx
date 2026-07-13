"use client";

import Link from "next/link";
import { Eye, Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ResultsChart } from "@/components/charts/results-chart";
import { resultMilestones } from "@/content/results";
import { formatReplayTime, reconstructAt } from "@/lib/results";
import { useMotionPreference } from "@/components/motion/motion-provider";

export function ReplayDashboard({ compact = false }: { compact?: boolean }) {
  const { reduced } = useMotionPreference();
  const [seconds, setSeconds] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [focus, setFocus] = useState<"both" | "control" | "active">("both");
  const [showLabels, setShowLabels] = useState(true);
  const frameRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing || reduced) return;
    const loop = (now: number) => {
      const last = lastRef.current ?? now;
      const delta = Math.min(0.1, (now - last) / 1000);
      lastRef.current = now;
      setSeconds((current) => {
        const next = current + delta * speed * 12;
        if (next >= 600) {
          setPlaying(false);
          return 600;
        }
        return next;
      });
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      lastRef.current = null;
    };
  }, [playing, reduced, speed]);

  const restart = () => {
    setSeconds(0);
    setPlaying(false);
  };

  const nearestMilestone = resultMilestones.reduce((nearest, milestone) =>
    Math.abs(milestone.seconds - seconds) < Math.abs(nearest.seconds - seconds) ? milestone : nearest,
  );
  const current = reconstructAt(seconds);
  const controlDensity = Math.max(0.18, Math.min(0.9, (current.control - 98) / 22));
  const activeDensity = Math.max(0.18, Math.min(0.9, (current.active - 98) / 22));

  return (
    <section className={`replay-dashboard${compact ? " is-compact" : ""}`} aria-labelledby={compact ? "dashboard-preview-title" : "dashboard-title"}>
      <div className="replay-head">
        <div>
          <p className="replay-status">Observation replay</p>
          <h2 id={compact ? "dashboard-preview-title" : "dashboard-title"}>{compact ? "Recorded comparison, replayed clearly." : "Recorded demonstration"}</h2>
        </div>
        <div className="replay-time"><span>Current replay time</span><strong>{formatReplayTime(seconds)}</strong></div>
      </div>
      <div className="replay-controls" aria-label="Replay controls">
        <button onClick={() => setPlaying((value) => !value)} disabled={reduced}>
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          {playing ? "Pause" : "Play"}
        </button>
        <button onClick={restart}><RotateCcw aria-hidden="true" />Restart</button>
        <label>
          <span>Playback speed</span>
          <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
            <option value={1}>0.5×</option>
            <option value={2}>1×</option>
            <option value={4}>2×</option>
          </select>
        </label>
        <label>
          <span>Jump to milestone</span>
          <select value={nearestMilestone.seconds} onChange={(event) => { setSeconds(Number(event.target.value)); setPlaying(false); }}>
            {resultMilestones.map((milestone) => <option value={milestone.seconds} key={milestone.id}>{milestone.label}</option>)}
          </select>
        </label>
        <Link href="/methodology">Methodology</Link>
      </div>
      {reduced && <p className="replay-reduced-note">Reduced motion is active. Use “Jump to milestone” to inspect the reconstruction.</p>}
      <label className="replay-scrubber"><span>Replay playhead</span><input type="range" min="0" max="600" step="1" value={Math.round(seconds)} onChange={(event) => { setSeconds(Number(event.target.value)); setPlaying(false); }} /></label>
      <div className="replay-visual-grid">
        <div className="chamber-miniatures" aria-label="Visual reconstruction of conceptual chamber atmosphere">
          <p>Visual reconstruction</p>
          <div className="chamber-miniature"><span style={{ opacity: controlDensity }} />{Array.from({ length: 12 }, (_, index) => <i key={index} style={{ opacity: controlDensity }} />)}<strong>Control chamber</strong></div>
          <div className="chamber-miniature is-active"><span style={{ opacity: activeDensity }} />{Array.from({ length: 12 }, (_, index) => <i key={index} style={{ opacity: activeDensity }} />)}<strong>TiO₂ + UV</strong></div>
        </div>
        <div className="replay-chart-shell">
          <div className="replay-chart-focus" role="group" aria-label="Curve focus controls">
            {(["both", "control", "active"] as const).map((curve) => <button key={curve} aria-pressed={focus === curve} onClick={() => setFocus(curve)}><Eye aria-hidden="true" />{curve === "both" ? "Both" : curve[0].toUpperCase() + curve.slice(1)}</button>)}
            <button aria-pressed={showLabels} onClick={() => setShowLabels((value) => !value)}>Labels</button>
          </div>
          <ResultsChart currentSeconds={reduced ? 600 : seconds} dark compact={compact} focus={focus} showLabels={showLabels} zoomed={seconds > 90 && seconds < 155} />
        </div>
      </div>
      <div className="replay-milestones" aria-label="Textual milestone summary">
        {resultMilestones.map((milestone) => {
          const active = seconds >= milestone.seconds;
          return <button key={milestone.id} className={active ? "is-reached" : ""} onClick={() => { setSeconds(milestone.seconds); setPlaying(false); }}><strong>{milestone.label}</strong><span>{milestone.observation}</span></button>;
        })}
      </div>
      <p className="sr-only" aria-live="polite">Replay {playing ? "playing" : "paused"} at {formatReplayTime(seconds)}.</p>
    </section>
  );
}
