"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { SectionTransition } from "@/components/motion/section-transition";
import { team } from "@/content/team";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeMotionTokens as motionTokens } from "@/lib/motion-tokens";

export function TeamSection() {
  const [active, setActive] = useState(0);
  const { reduced } = useMotionPreference();
  const projectFunctions = [
    ["Strategy", "Research"], ["Electronics", "Execution"], ["Prototype architecture", "Technical layout"], ["Visual presentation", "Creative direction"],
  ] as const;
  return (
    <section className="section section-white team-section" id="team" aria-labelledby="team-title">
      <SectionTransition tone="light" />
      <div className="content-wrap">
        <SectionHeading animated index="10 · Team system" title={<>Built by students.<br /><span className="accent">Designed for scale.</span></>} copy={<p id="team-title">Four complementary responsibilities connect theory, execution, structural design and visual communication.</p>} />
        <div className="team-system">
          <div className="team-project-centre" aria-live="polite">
            <span>PROJECT</span>
            <strong>TEJASVAYU</strong>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={active}
                initial={reduced ? false : { opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -5 }}
                transition={{ duration: reduced ? 0.01 : motionTokens.duration.fast, ease: motionTokens.ease.cinematic }}
              >
                {projectFunctions[active].join(" · ")}
              </motion.p>
            </AnimatePresence>
          </div>
          {team.map((member, index) => (
            <motion.article
              key={member.name}
              className={`${member.leader ? "team-member is-leader" : "team-member"}${active === index ? " is-active" : ""}`}
              tabIndex={0}
              role="button"
              aria-pressed={active === index}
              initial={reduced ? false : { opacity: 0, clipPath: "inset(0 0 14% 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              whileHover={reduced ? undefined : { y: -5 }}
              whileTap={reduced ? undefined : { y: -2 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{
                opacity: { duration: reduced ? 0.01 : motionTokens.duration.slow, delay: reduced ? 0 : index * 0.075, ease: motionTokens.ease.cinematic },
                clipPath: { duration: reduced ? 0.01 : motionTokens.duration.slow, delay: reduced ? 0 : index * 0.075, ease: motionTokens.ease.cinematic },
                y: { ...motionTokens.spring.responsive, delay: 0 },
              }}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActive(index); } }}
            >
              <div className="member-monogram">{member.initials}</div><span>{String(index + 1).padStart(2, "0")}</span><h3>{member.name}</h3><h4>{member.role}</h4><p>{member.focus}</p>
              <ul>{projectFunctions[index].map((item) => <li key={item}>{item}</li>)}</ul>
            </motion.article>
          ))}
        </div>
        <Link className="text-route-link text-route-link-dark" href="/team">Meet the complete team system <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
