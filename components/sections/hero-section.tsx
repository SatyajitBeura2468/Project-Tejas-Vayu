"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MagneticLink } from "@/components/motion/magnetic-link";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { projectIdentity } from "@/content/project";
import { INTRO_SESSION_KEY } from "@/lib/motion";
import { motionTokens } from "@/lib/motion-tokens";

const PrototypeScene = dynamic(() => import("@/components/three/prototype-scene"), {
  ssr: false,
  loading: () => <div className="hero-scene-loading" aria-label="Loading interactive prototype visual"><span /></div>,
});

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { reduced } = useMotionPreference();
  const [repeatVisit, setRepeatVisit] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 0.72], [0, -86]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.12]);
  const visualScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.09]);
  const visualY = useTransform(scrollYProgress, [0, 0.8], [0, 76]);

  useEffect(() => {
    const seen = window.sessionStorage.getItem(INTRO_SESSION_KEY) === "true";
    window.sessionStorage.setItem(INTRO_SESSION_KEY, "true");
    const frame = requestAnimationFrame(() => setRepeatVisit(seen));
    return () => cancelAnimationFrame(frame);
  }, []);

  const pace = reduced ? 0 : repeatVisit ? 0.34 : 1;
  const enter = (delay: number, duration: number = motionTokens.duration.slow) => ({
    duration: reduced ? 0.01 : duration * (repeatVisit ? 0.52 : 1),
    delay: delay * pace,
    ease: motionTokens.ease.enter,
  });

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title" data-intro={repeatVisit ? "repeat" : "first"}>
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="urban-horizon"><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="airflow airflow-one" /><div className="airflow airflow-two" />
        <motion.div className="hero-ready-horizon" initial={reduced ? false : { scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={enter(0.32, 1.15)} />
      </div>
      <div className="content-wrap hero-grid">
        <motion.div className="hero-copy" style={{ y: reduced ? 0 : copyY, opacity: reduced ? 1 : copyOpacity }}>
          <h1 id="hero-title">
            <motion.span className="hero-project-word" initial={reduced ? false : { opacity: 0, letterSpacing: "0.24em" }} animate={{ opacity: 1, letterSpacing: "0.09em" }} transition={enter(0.08, 0.9)}>PROJECT</motion.span>
            <span className="hero-word-mask"><motion.span className="hero-name-word" initial={reduced ? false : { y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={enter(0.5, 1.05)}>TEJASVAYU<i aria-hidden="true" /></motion.span></span>
          </h1>
          <p className="hero-tagline">
            <span className="hero-line-mask"><motion.span initial={reduced ? false : { y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={enter(1.28)}>The city does not need more spaces.</motion.span></span>
            <span className="hero-line-mask"><motion.span className="hero-tagline-emphasis" initial={reduced ? false : { y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={enter(1.5)}>It needs smarter surfaces.</motion.span></span>
          </p>
          <motion.p className="hero-summary" initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={enter(1.86)}>{projectIdentity.summary}</motion.p>
          <motion.div className="button-row" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={enter(2.16)}>
            <MagneticLink><a className="button button-primary" href="#problem">Explore the project <ArrowRight size={18} aria-hidden="true" /></a></MagneticLink>
            <MagneticLink><Link className="button button-secondary" href="/judge">Enter judge mode <ArrowRight size={18} aria-hidden="true" /></Link></MagneticLink>
          </motion.div>
        </motion.div>
        <motion.div className="hero-visual" style={{ scale: reduced ? 1 : visualScale, y: reduced ? 0 : visualY }} initial={reduced ? false : { opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={enter(0.72, 1.2)}>
          <PrototypeScene className="hero-prototype-scene" variant="hero" />
          <div className="hero-chamber-labels" aria-hidden="true"><span>Untreated control</span><span>TiO₂ + UV activation</span></div>
        </motion.div>
      </div>
      <motion.a className="hero-scroll" href="#problem" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={enter(2.55)}><ArrowDown aria-hidden="true" /><span>Continue</span></motion.a>
    </section>
  );
}
