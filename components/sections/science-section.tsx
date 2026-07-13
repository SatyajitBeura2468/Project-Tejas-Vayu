"use client";

import Link from "next/link";
import { ArrowRight, Droplets, Gauge, Lightbulb, Move3d, Paintbrush, Timer, Waves } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { mechanismStages } from "@/content/project";
import { SectionTransition } from "@/components/motion/section-transition";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { SourceLink } from "@/components/ui/source-link";
import { SectionHeading } from "@/components/ui/section-heading";

const variables = [
  ["Surface area", Move3d], ["UV intensity", Lightbulb], ["Airflow", Waves], ["Contact time", Timer], ["Humidity", Droplets], ["Coating coverage", Paintbrush],
] as const;

const relationshipNotes = [
  ["Fewer active contact opportunities", "Balanced active area", "More contact opportunity"],
  ["Reduced effective activation", "Moderate conceptual activation", "Stronger conceptual activation"],
  ["Limited circulation", "Balanced circulation", "Faster passage may reduce contact time"],
  ["Brief surface contact", "Moderate contact opportunity", "More contact opportunity"],
  ["Lower moisture availability", "Moderate humidity relationship", "Surface competition may increase"],
  ["Limited coated area", "Partial coated coverage", "More coated area is available"],
] as const;

export function ScienceSection() {
  const [active, setActive] = useState(0);
  const [variableValues, setVariableValues] = useState([1, 1, 1, 1, 1, 1]);
  const { reduced } = useMotionPreference();
  const stage = mechanismStages[active];
  return (
    <section className="section section-dark science-section" id="science" aria-labelledby="science-title">
      <SectionTransition tone="violet" />
      <div className="content-wrap">
        <SectionHeading index="06 · Photocatalytic principle" title={<>Light activates the surface.<br /><span className="accent">Chemistry does the rest.</span></>} copy={<p id="science-title">A simplified sequence explains the surface mechanism without suggesting that every pollutant is instantly converted into only carbon dioxide and water.</p>} />
        <div className="science-stage">
          <div className="mechanism-visual" data-chapter={active + 1} aria-hidden="true">
            <div className={`photon-beam stage-${active + 1}`} />
            <div className="tio-surface">TiO₂ <span /></div>
            <i className="electron">e⁻</i><i className="hole">h⁺</i><i className="radical">•OH</i><i className="oxygen">O₂•⁻</i>
            <div className="pollutant-molecule"><i /><i /><i /><i /></div>
            <div className="science-lattice">{Array.from({ length: 18 }, (_, index) => <i key={index} />)}</div>
          </div>
          <div className="mechanism-content">
            <div className="mechanism-tabs" role="tablist" aria-label="Photocatalytic reaction stages">
              {mechanismStages.map((item, index) => <button key={item.title} role="tab" aria-selected={active === index} aria-controls="mechanism-panel" onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span>{item.title}</button>)}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={stage.title} id="mechanism-panel" role="tabpanel" className="mechanism-panel" initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }} transition={{ duration: reduced ? 0.01 : 0.42 }}>
                <p>{stage.copy}</p>
                <pre aria-label={`Equation for ${stage.title}`}>{stage.equation}</pre>
                {active === 3 && <small>Exact oxidation products depend on pollutant type, surface chemistry and operating conditions.</small>}
              </motion.div>
            </AnimatePresence>
            <SourceLink sourceId="schneider-2014" label="Mechanism reference · Chemical Reviews" />
          </div>
        </div>
        <div className="surface-insight science-variable-system">
          <div><h3>Photocatalysis is a surface reaction.</h3><p>Increasing usable active area can increase opportunities for pollutant molecules to contact the catalyst, provided that light, airflow and coating conditions remain suitable.</p></div>
          <ul>{variables.map(([label, Icon], index) => <li key={label}><div><Icon aria-hidden="true" /><span>{label}</span><output htmlFor={`science-variable-${index}`}>{["Low", "Balanced", "High"][variableValues[index]]}</output></div><input id={`science-variable-${index}`} aria-label={label} type="range" min="0" max="2" step="1" value={variableValues[index]} onChange={(event) => setVariableValues((current) => current.map((value, itemIndex) => itemIndex === index ? Number(event.target.value) : value))} /><p><Gauge size={14} aria-hidden="true" />{relationshipNotes[index][variableValues[index]]}</p></li>)}</ul>
          <p className="variable-integrity-note">Conceptual relationships only · No purification efficiency is calculated.</p>
        </div>
        <Link className="text-route-link" href="/science">Enter scientific mode <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
