"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { motionTokens } from "@/lib/motion-tokens";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  distance?: number;
  once?: boolean;
};

export function Reveal({ children, className, delay = 0, distance = 28, once = true, ...props }: RevealProps) {
  const { reduced } = useMotionPreference();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: distance, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount: motionTokens.viewport.amount, margin: motionTokens.viewport.margin }}
      transition={{ duration: reduced ? 0.01 : motionTokens.duration.slow, delay: reduced ? 0 : delay, ease: motionTokens.ease.enter }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
