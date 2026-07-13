"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { springPresets } from "@/lib/spring-presets";

export function CursorField() {
  const { reduced } = useMotionPreference();
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const smoothX = useSpring(x, springPresets.soft);
  const smoothY = useSpring(y, springPresets.soft);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCapability = () => setFinePointer(media.matches);
    const updatePointer = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    updateCapability();
    media.addEventListener("change", updateCapability);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => {
      media.removeEventListener("change", updateCapability);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, [x, y]);

  if (reduced || !finePointer) return null;
  return <motion.div className="cursor-field" style={{ x: smoothX, y: smoothY }} aria-hidden="true" />;
}
