"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { springPresets } from "@/lib/spring-presets";

export function MagneticLink({ children, className }: { children: ReactNode; className?: string }) {
  const { reduced } = useMotionPreference();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springPresets.responsive);
  const y = useSpring(rawY, springPresets.responsive);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - rect.left - rect.width / 2) * 0.12);
    rawY.set((event.clientY - rect.top - rect.height / 2) * 0.12);
  };
  const reset = () => { rawX.set(0); rawY.set(0); };

  return <motion.div className={className} style={{ x, y }} onPointerMove={move} onPointerLeave={reset}>{children}</motion.div>;
}
