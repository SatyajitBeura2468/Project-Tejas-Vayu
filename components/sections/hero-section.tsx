"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { projectIdentity } from "@/content/project";

const PrototypeScene = dynamic(() => import("@/components/three/prototype-scene"), {
  ssr: false,
  loading: () => <div className="hero-scene-loading" aria-label="Loading interactive prototype visual"><span /></div>,
});

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="urban-horizon"><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="airflow airflow-one" /><div className="airflow airflow-two" />
      </div>
      <div className="content-wrap hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title"><span>PROJECT</span><span>TEJASVAYU</span></h1>
          <p className="hero-tagline">The city does not need more spaces.<br /><span>It needs smarter surfaces.</span></p>
          <p className="hero-summary">{projectIdentity.summary}</p>
          <div className="button-row">
            <a className="button button-primary" href="#problem">Explore the project <ArrowRight size={18} aria-hidden="true" /></a>
            <Link className="button button-secondary" href="/judge">Enter judge mode <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="hero-visual">
          <PrototypeScene className="hero-prototype-scene" />
          <div className="hero-chamber-labels" aria-hidden="true"><span>Untreated control</span><span>TiO₂ + UV activation</span></div>
        </div>
      </div>
      <a className="hero-scroll" href="#problem"><ArrowDown aria-hidden="true" /><span>Continue</span></a>
    </section>
  );
}
