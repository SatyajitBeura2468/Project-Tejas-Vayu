"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { springPresets } from "@/lib/spring-presets";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, springPresets.responsive);
  return <motion.div className="global-scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
