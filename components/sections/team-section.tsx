"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { SectionTransition } from "@/components/motion/section-transition";
import { team } from "@/content/team";
import { SectionHeading } from "@/components/ui/section-heading";

export function TeamSection() {
  const [active, setActive] = useState(0);
  const projectFunctions = [
    ["Strategy", "Research"], ["Electronics", "Execution"], ["Prototype architecture", "Technical layout"], ["Visual presentation", "Creative direction"],
  ] as const;
  return (
    <section className="section section-white team-section" id="team" aria-labelledby="team-title">
      <SectionTransition tone="light" />
      <div className="content-wrap">
        <SectionHeading index="10 · Team system" title={<>Built by students.<br /><span className="accent">Designed for scale.</span></>} copy={<p id="team-title">Four complementary responsibilities connect theory, execution, structural design and visual communication.</p>} />
        <div className="team-system">
          <div className="team-project-centre" aria-live="polite"><span>PROJECT</span><strong>TEJASVAYU</strong><p>{projectFunctions[active].join(" · ")}</p></div>
          {team.map((member, index) => (
            <article key={member.name} className={`${member.leader ? "team-member is-leader" : "team-member"}${active === index ? " is-active" : ""}`} tabIndex={0} role="button" aria-pressed={active === index} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActive(index); } }}>
              <div className="member-monogram">{member.initials}</div><span>{String(index + 1).padStart(2, "0")}</span><h3>{member.name}</h3><h4>{member.role}</h4><p>{member.focus}</p>
              <ul>{projectFunctions[index].map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <Link className="text-route-link text-route-link-dark" href="/team">Meet the complete team system <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
