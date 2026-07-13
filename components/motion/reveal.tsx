"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { usePathname } from "next/navigation";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { homeMotionTokens, motionTokens } from "@/lib/motion-tokens";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  distance?: number;
  once?: boolean;
};

export function Reveal({ children, className, delay = 0, distance = 28, once = true, ...props }: RevealProps) {
  const { reduced } = useMotionPreference();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const tokens = isHome ? homeMotionTokens : motionTokens;

  return (
    <motion.div
      className={className}
      initial={reduced ? false : isHome ? { opacity: 0, y: distance, scale: 0.992 } : { opacity: 0, y: distance, filter: "blur(8px)" }}
      whileInView={isHome ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount: tokens.viewport.amount, margin: tokens.viewport.margin }}
      transition={{ duration: reduced ? 0.01 : tokens.duration.slow, delay: reduced ? 0 : delay, ease: isHome ? tokens.ease.cinematic : tokens.ease.enter }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
