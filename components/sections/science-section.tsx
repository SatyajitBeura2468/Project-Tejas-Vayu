"use client";

import Link from "next/link";
import { ArrowRight, Droplets, Lightbulb, Move3d, Timer, Waves } from "lucide-react";
import { useState } from "react";
import { mechanismStages } from "@/content/project";
import { SourceLink } from "@/components/ui/source-link";
import { SectionHeading } from "@/components/ui/section-heading";

const variables = [
  ["Surface area", Move3d], ["Suitable light", Lightbulb], ["Airflow", Waves], ["Contact time", Timer], ["Humidity", Droplets],
] as const;

export function ScienceSection() {
  const [active, setActive] = useState(0);
  const stage = mechanismStages[active];
  return (
    <section className="section section-dark science-section" id="science" aria-labelledby="science-title">
      <div className="content-wrap">
        <SectionHeading index="06 · Photocatalytic principle" title={<>Light activates the surface.<br /><span className="accent">Chemistry does the rest.</span></>} copy={<p id="science-title">A simplified sequence explains the surface mechanism without suggesting that every pollutant is instantly converted into only carbon dioxide and water.</p>} />
        <div className="science-stage">
          <div className="mechanism-visual" aria-hidden="true">
            <div className={`photon-beam stage-${active + 1}`} />
            <div className="tio-surface">TiO₂ <span /></div>
            <i className="electron">e⁻</i><i className="hole">h⁺</i><i className="radical">•OH</i><i className="oxygen">O₂•⁻</i>
            <div className="pollutant-molecule"><i /><i /><i /><i /></div>
          </div>
          <div className="mechanism-content">
            <div className="mechanism-tabs" role="tablist" aria-label="Photocatalytic reaction stages">
              {mechanismStages.map((item, index) => <button key={item.title} role="tab" aria-selected={active === index} aria-controls="mechanism-panel" onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span>{item.title}</button>)}
            </div>
            <div id="mechanism-panel" role="tabpanel" className="mechanism-panel">
              <p>{stage.copy}</p>
              <pre aria-label={`Equation for ${stage.title}`}>{stage.equation}</pre>
            </div>
            <SourceLink sourceId="schneider-2014" label="Mechanism reference · Chemical Reviews" />
          </div>
        </div>
        <div className="surface-insight">
          <div><h3>Photocatalysis is a surface reaction.</h3><p>Increasing usable active area can increase opportunities for pollutant molecules to contact the catalyst, provided that light, airflow and coating conditions remain suitable.</p></div>
          <ul>{variables.map(([label, Icon]) => <li key={label}><Icon aria-hidden="true" /><span>{label}</span></li>)}</ul>
        </div>
        <Link className="text-route-link" href="/science">Enter scientific mode <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
