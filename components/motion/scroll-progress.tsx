"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { homeMotionTokens } from "@/lib/motion-tokens";
import { springPresets } from "@/lib/spring-presets";

export function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, pathname === "/" ? homeMotionTokens.spring.scroll : springPresets.responsive);
  return <motion.div className="global-scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
