"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { indiaEvidence } from "@/content/sources";
import { SourceLink } from "@/components/ui/source-link";
import { Reveal } from "@/components/motion/reveal";
import { SectionTransition } from "@/components/motion/section-transition";
import { useMotionPreference } from "@/components/motion/motion-provider";

function AnimatedStatistic({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const { reduced } = useMotionPreference();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduced) return;
    const match = value.match(/-?\d+(?:\.\d+)?/);
    if (!match) return;
    const target = Number(match[0]);
    const decimals = match[0].includes(".") ? match[0].split(".")[1].length : 0;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const amount = Math.min(1, (now - start) / 1050);
      const eased = 1 - Math.pow(1 - amount, 4);
      setDisplay(value.replace(match[0], (target * eased).toFixed(decimals)));
      if (amount < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value]);

  return <strong ref={ref} aria-label={value}><span aria-hidden="true">{reduced ? value : display}</span></strong>;
}

function UrbanDensityVisual({ activeSurface, onExplore }: { activeSurface: number; onExplore: (index: number) => void }) {
  return (
    <svg className="urban-density" viewBox="0 0 840 420" role="img" aria-label="Abstract network of existing urban walls, roads, transit lines and public infrastructure across India" tabIndex={0} data-active-surface={activeSurface} onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); onExplore(Math.min(4, Math.floor(((event.clientX - rect.left) / rect.width) * 5))); }} onKeyDown={(event) => { if (event.key === "ArrowRight") onExplore((activeSurface + 1) % 5); if (event.key === "ArrowLeft") onExplore((activeSurface + 4) % 5); }}>
      <defs>
        <linearGradient id="surface-path" x1="0" x2="1"><stop stopColor="#22d3ee" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient>
      </defs>
      <path className="india-outline" d="M367 31 420 61l40 71 62 12 13 44-32 55 14 77-58 60-66-13-34-49-65-16-31-69 25-65-22-58 42-28Z" />
      {Array.from({ length: 24 }, (_, index) => {
        const x = 86 + ((index * 79) % 690);
        const y = 72 + ((index * 47) % 280);
        return <circle key={index} cx={x} cy={y} r={index % 4 === 0 ? 5 : 3} className="density-node" />;
      })}
      <path className="density-path" d="M52 328C144 259 174 310 239 214S359 142 424 196 534 307 609 221 728 101 800 127" />
      <path className="density-path density-path-secondary" d="M86 92C160 124 208 89 280 150S411 307 502 267 631 116 765 330" />
      <g className="density-surfaces"><path className="density-surface density-surface-1" d="M101 321v-78h65v47h48v31" /><path className="density-surface density-surface-2" d="M612 227v-91h72v91" /><path className="density-surface density-surface-3" d="M701 211h70v87h-97" /><path className="density-surface density-surface-4" d="M250 219h91m-78-39h54" /><path className="density-surface density-surface-5" d="M467 271v-82h68v51h43v31" /></g>
    </svg>
  );
}

export function ProblemSection() {
  const [activeSurface, setActiveSurface] = useState(0);
  return (
    <section className="section section-white problem-section" id="problem" aria-labelledby="problem-title">
      <SectionTransition tone="light" />
      <div className="content-wrap">
        <Reveal className="problem-heading">
          <p className="section-index">01 · The urban problem</p>
          <h2 id="problem-title">Air pollution fills cities.<br /><span>New infrastructure cannot fill every street.</span></h2>
        </Reveal>
        <div className="problem-layout">
          <Reveal className="problem-explanation" delay={0.08}>
            <p>Cities already contain large areas of walls, transport structures and public infrastructure. Conventional purification equipment needs its own space, power, installation and maintenance.</p>
            <p>Project Tejasvayu asks a more spatially efficient question: can suitable surfaces that cities already possess become part of the response?</p>
            <p className="problem-caveat">Not every material is automatically suitable. Substrate preparation, binder chemistry, coating durability, exposure and local conditions must be tested.</p>
          </Reveal>
          <Reveal delay={0.14}><UrbanDensityVisual activeSurface={activeSurface} onExplore={setActiveSurface} /><p className="surface-network-caption">Cities already contain enormous usable surface area.</p></Reveal>
        </div>
        <div className="evidence-rail" aria-label="Verified India air-pollution evidence">
          {indiaEvidence.map((item, index) => (
            <Reveal key={`${item.value}-${item.label}`} delay={index * 0.08}>
            <article>
              <AnimatedStatistic value={item.value} />
              <h3>{item.label}</h3>
              <p>{item.geography} · data {item.dataYear} · published {item.publicationYear}</p>
              <SourceLink sourceId={item.sourceId} />
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
