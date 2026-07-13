"use client";

import { motion } from "motion/react";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { homeMotionTokens, motionTokens } from "@/lib/motion-tokens";

type SectionHeadingProps = {
  index?: string;
  title: React.ReactNode;
  copy?: React.ReactNode;
  stacked?: boolean;
  animated?: boolean;
};

export function SectionHeading({ index, title, copy, stacked = false, animated = false }: SectionHeadingProps) {
  const { reduced } = useMotionPreference();
  const motionEnabled = animated && !reduced;
  const tokens = animated ? homeMotionTokens : motionTokens;

  return (
    <motion.header
      className={`section-header${stacked ? " is-stacked" : ""}${animated ? " is-animated" : ""}`}
      initial={motionEnabled ? "hidden" : false}
      whileInView={animated ? "visible" : undefined}
      viewport={{ once: true, amount: 0.42, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.11, delayChildren: 0.02 } },
      }}
    >
      <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: tokens.duration.slow, ease: tokens.ease.cinematic } } }}>
        {index && <p className="section-index">{index}</p>}
        <h2 className="section-title">{title}</h2>
      </motion.div>
      {copy && <motion.div className="section-copy" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: tokens.duration.slow, ease: tokens.ease.cinematic } } }}>{copy}</motion.div>}
      {animated && <motion.i className="section-heading-signal" aria-hidden="true" variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { duration: tokens.duration.cinematic, ease: tokens.ease.cinematic } } }} />}
    </motion.header>
  );
}
