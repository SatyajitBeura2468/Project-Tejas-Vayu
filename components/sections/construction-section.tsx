"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionTransition } from "@/components/motion/section-transition";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { constructionSteps } from "@/content/project";
import { SafetyNote } from "@/components/ui/safety-note";
import { SectionHeading } from "@/components/ui/section-heading";

export function ConstructionSection() {
  const { reduced } = useMotionPreference();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setInterval(() => {
      setStep((current) => {
        if (current >= constructionSteps.length - 1) { setPlaying(false); return current; }
        return current + 1;
      });
    }, 1800);
    return () => window.clearInterval(timer);
  }, [playing, reduced]);

  return (
    <section className="section section-white construction-section" id="construction" aria-labelledby="construction-title">
      <SectionTransition tone="light" />
      <div className="content-wrap">
        <SectionHeading index="05 · Construction overview" title={<>Built as a<br /><span className="accent">controlled comparison.</span></>} copy={<p id="construction-title">The assembly sequence keeps the two chambers comparable, then introduces TiO₂ coating and enclosed UV illumination only in the active chamber.</p>} />
        <div className="construction-assembly" data-step={step + 1}>
          <div className="assembly-visual" role="img" aria-label={`Assembly step ${step + 1}: ${constructionSteps[step]}`}>
            <i className="assembly-base" /><i className="assembly-glass glass-left" /><i className="assembly-glass glass-right" /><i className="assembly-house" /><i className="assembly-sensor" /><i className="assembly-fan" /><i className="assembly-coating" /><i className="assembly-uv" /><i className="assembly-electrical" /><i className="assembly-seal" />
          </div>
          <div className="assembly-copy">
            <p className="assembly-counter">Step {String(step + 1).padStart(2, "0")} / {String(constructionSteps.length).padStart(2, "0")}</p>
            <h3>{constructionSteps[step]}</h3>
            <div className="assembly-progress" aria-hidden="true"><i style={{ width: `${((step + 1) / constructionSteps.length) * 100}%` }} /></div>
            <div className="assembly-controls">
              <button onClick={() => { setStep((current) => Math.max(0, current - 1)); setPlaying(false); }} disabled={step === 0}><ArrowLeft aria-hidden="true" />Previous step</button>
              <button onClick={() => setPlaying((value) => !value)} disabled={reduced && step >= constructionSteps.length - 1}>{playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}{playing ? "Pause" : "Auto-play assembly"}</button>
              <button onClick={() => { setStep((current) => Math.min(constructionSteps.length - 1, current + 1)); setPlaying(false); }} disabled={step === constructionSteps.length - 1}>Next step<ArrowRight aria-hidden="true" /></button>
            </div>
          </div>
          <ol className="assembly-step-rail" aria-label="Construction steps">
            {constructionSteps.map((item, index) => <li key={item}><button className={step === index ? "is-active" : step > index ? "is-complete" : ""} aria-current={step === index ? "step" : undefined} onClick={() => { setStep(index); setPlaying(false); }}><span>{String(index + 1).padStart(2, "0")}</span>{item}</button></li>)}
          </ol>
        </div>
        {reduced && <p className="assembly-reduced-note">Reduced motion is active. Use the step controls to inspect the completed assembly stages.</p>}
        <SafetyNote compact />
        <Link className="text-route-link text-route-link-dark" href="/prototype#construction">See components and construction detail <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
