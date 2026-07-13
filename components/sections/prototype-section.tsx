"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StaticPrototypeVisual } from "@/components/three/prototype-scene";
import { SectionHeading } from "@/components/ui/section-heading";

const PrototypeScene = dynamic(() => import("@/components/three/prototype-scene"), { ssr: false, loading: () => <StaticPrototypeVisual /> });

export function PrototypeSection() {
  return (
    <section className="section section-dark prototype-section" id="prototype" aria-labelledby="prototype-title">
      <div className="content-wrap">
        <SectionHeading index="04 · Comparative prototype" title={<>Two chambers.<br /><span className="accent">One critical difference.</span></>} copy={<p id="prototype-title">Each sealed chamber has an approximate 30 cm × 30 cm footprint and comparable internal architecture. No exact height is claimed.</p>} />
        <div className="prototype-stage surface-panel-dark">
          <PrototypeScene />
          <div className="chamber-comparison">
            <article><span>Control chamber</span><p>Shows the natural change in relative sensor response inside the untreated chamber.</p></article>
            <article><span>Project Tejasvayu chamber</span><p>Adds TiO₂-coated surfaces and ultraviolet activation to explore whether the pollutant-response curve declines more rapidly.</p></article>
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
