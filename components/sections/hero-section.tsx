"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MagneticLink } from "@/components/motion/magnetic-link";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { projectIdentity } from "@/content/project";
import { INTRO_SESSION_KEY } from "@/lib/motion";
import { homeMotionTokens as motionTokens } from "@/lib/motion-tokens";

const PrototypeScene = dynamic(() => import("@/components/three/prototype-scene"), {
  ssr: false,
  loading: () => <div className="hero-scene-loading" aria-label="Loading interactive prototype visual"><span /></div>,
});

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { reduced } = useMotionPreference();
  const [introMode, setIntroMode] = useState<"pending" | "first" | "repeat">("pending");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, motionTokens.spring.scroll);
  const copyY = useTransform(smoothProgress, [0, 0.76, 1], [0, -30, -44]);
  const copyOpacity = useTransform(smoothProgress, [0, 0.42, 0.84, 1], [1, 1, 0.22, 0]);
  const visualScale = useTransform(smoothProgress, [0, 0.82, 1], [1, 1.025, 1.038]);
  const visualY = useTransform(smoothProgress, [0, 1], [0, 34]);
  const visualOpacity = useTransform(smoothProgress, [0, 0.72, 1], [1, 1, 0.58]);

  useEffect(() => {
    const seen = window.sessionStorage.getItem(INTRO_SESSION_KEY) === "true";
    window.sessionStorage.setItem(INTRO_SESSION_KEY, "true");
    const frame = requestAnimationFrame(() => setIntroMode(seen ? "repeat" : "first"));
    return () => cancelAnimationFrame(frame);
  }, []);

  const ready = introMode !== "pending";
  const repeatVisit = introMode === "repeat";
  const enter = (delay: number, duration: number = motionTokens.duration.slow) => ({
    duration: reduced ? 0.01 : duration * (repeatVisit ? 0.62 : 1),
    delay: reduced ? 0 : delay * (repeatVisit ? 0.48 : 1),
    ease: motionTokens.ease.enter,
  });

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title" data-intro={introMode}>
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="urban-horizon"><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="airflow airflow-one" /><div className="airflow airflow-two" />
        <motion.div className="hero-ready-horizon" initial={reduced ? false : { scaleX: 0, opacity: 0 }} animate={ready ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }} transition={enter(0.12, 0.95)} />
      </div>
      <div className="content-wrap hero-grid">
        <motion.div className="hero-copy" initial={reduced ? false : { opacity: 0, y: 22 }} animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} transition={enter(0.02, 0.72)}>
        <motion.div className="hero-copy-scroll" style={{ y: reduced ? 0 : copyY, opacity: reduced ? 1 : copyOpacity }}>
          <h1 id="hero-title">
            <motion.span className="hero-project-word" initial={reduced ? false : { opacity: 0, y: 14 }} animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }} transition={enter(0.04, 0.62)}>PROJECT</motion.span>
            <span className="hero-word-mask"><motion.span className="hero-name-word" initial={reduced ? false : { y: "104%" }} animate={ready ? { y: 0 } : { y: "104%" }} transition={enter(0.14, 0.82)}>TEJASVAYU<i aria-hidden="true" /></motion.span></span>
          </h1>
          <p className="hero-tagline">
            <span className="hero-line-mask"><motion.span initial={reduced ? false : { y: "104%" }} animate={ready ? { y: 0 } : { y: "104%" }} transition={enter(0.38, 0.72)}>The city does not need more spaces.</motion.span></span>
            <span className="hero-line-mask"><motion.span className="hero-tagline-emphasis" initial={reduced ? false : { y: "104%" }} animate={ready ? { y: 0 } : { y: "104%" }} transition={enter(0.47, 0.72)}>It needs smarter surfaces.</motion.span></span>
          </p>
          <motion.p className="hero-summary" initial={reduced ? false : { opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} transition={enter(0.62, 0.68)}>{projectIdentity.summary}</motion.p>
          <motion.div className="button-row" initial={reduced ? false : { opacity: 0, y: 14 }} animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }} transition={enter(0.74, 0.66)}>
            <MagneticLink><a className="button button-primary" href="#problem">Explore the project <ArrowRight size={18} aria-hidden="true" /></a></MagneticLink>
            <MagneticLink><Link className="button button-secondary" href="/judge">Enter judge mode <ArrowRight size={18} aria-hidden="true" /></Link></MagneticLink>
          </motion.div>
        </motion.div>
        </motion.div>
        <motion.div className="hero-visual-enter" initial={reduced ? false : { opacity: 0, scale: 0.985, y: 24 }} animate={ready ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.985, y: 24 }} transition={enter(0.18, 0.96)}>
        <motion.div className="hero-visual" style={{ scale: reduced ? 1 : visualScale, y: reduced ? 0 : visualY, opacity: reduced ? 1 : visualOpacity }}>
          <PrototypeScene className="hero-prototype-scene" variant="hero" homeMotion />
          <div className="hero-chamber-labels" aria-hidden="true"><span>Untreated control</span><span>TiO₂ + UV activation</span></div>
        </motion.div>
        </motion.div>
      </div>
      <motion.a className="hero-scroll" href="#problem" initial={reduced ? false : { opacity: 0, y: 8 }} animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }} transition={enter(0.94, 0.62)}><ArrowDown aria-hidden="true" /><span>Continue</span></motion.a>
    </section>
  );
}
