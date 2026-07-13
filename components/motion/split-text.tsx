"use client";

import { motion } from "motion/react";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { motionTokens } from "@/lib/motion-tokens";

export function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const { reduced } = useMotionPreference();
  return (
    <span className={`split-text${className ? ` ${className}` : ""}`} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span className="split-text-mask" aria-hidden="true" key={`${word}-${index}`}>
          <motion.span initial={reduced ? false : { y: "108%" }} animate={{ y: 0 }} transition={{ duration: reduced ? 0.01 : motionTokens.duration.slow, delay: reduced ? 0 : delay + index * 0.055, ease: motionTokens.ease.enter }}>{word}&nbsp;</motion.span>
        </span>
      ))}
    </span>
  );
}
