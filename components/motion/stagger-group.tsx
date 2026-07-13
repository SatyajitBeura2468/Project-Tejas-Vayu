"use client";

import { Children } from "react";
import { motion } from "motion/react";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { motionTokens } from "@/lib/motion-tokens";

export function StaggerGroup({ children, className, as = "div", delay = 0 }: { children: React.ReactNode; className?: string; as?: "div" | "ol" | "ul"; delay?: number }) {
  const { reduced } = useMotionPreference();
  const Component = motion[as];
  return (
    <Component className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.16 }} variants={{ visible: { transition: { staggerChildren: reduced ? 0 : 0.08, delayChildren: reduced ? 0 : delay } } }}>
      {Children.map(children, (child) => <motion.li variants={{ hidden: reduced ? {} : { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: motionTokens.duration.standard, ease: motionTokens.ease.enter } } }}>{child}</motion.li>)}
    </Component>
  );
}
