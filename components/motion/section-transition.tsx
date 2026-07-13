"use client";

import { motion } from "motion/react";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { motionTokens } from "@/lib/motion-tokens";

export function SectionTransition({ tone = "light" }: { tone?: "light" | "dark" | "violet" }) {
  const { reduced } = useMotionPreference();
  return (
    <div className={`section-transition section-transition-${tone}`} aria-hidden="true">
      <motion.i initial={reduced ? false : { scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: reduced ? 0.01 : motionTokens.duration.cinematic, ease: motionTokens.ease.cinematic }} />
      <motion.i initial={reduced ? false : { scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 0.5 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: reduced ? 0.01 : motionTokens.duration.cinematic, delay: 0.12, ease: motionTokens.ease.cinematic }} />
    </div>
  );
}
