"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useMotionPreference } from "@/components/motion/motion-provider";

export function ParallaxLayer({ children, className, distance = 70 }: { children: React.ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const animatedY = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  return <motion.div ref={ref} className={className} style={{ y: reduced ? 0 : animatedY }}>{children}</motion.div>;
}
