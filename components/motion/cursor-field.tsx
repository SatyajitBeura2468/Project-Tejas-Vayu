"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { homeMotionTokens } from "@/lib/motion-tokens";
import { springPresets } from "@/lib/spring-presets";

export function CursorField() {
  const { reduced } = useMotionPreference();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const spring = isHome ? homeMotionTokens.spring.soft : springPresets.soft;
  const smoothX = useSpring(x, spring);
  const smoothY = useSpring(y, spring);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCapability = () => setFinePointer(media.matches);
    const updatePointer = (event: PointerEvent) => {
      if (isHome && (!media.matches || reduced)) return;
      x.set(event.clientX);
      y.set(event.clientY);
      if (!isHome) {
        document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
      }
    };
    updateCapability();
    media.addEventListener("change", updateCapability);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => {
      media.removeEventListener("change", updateCapability);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, [isHome, reduced, x, y]);

  if (reduced || !finePointer) return null;
  return <motion.div className={isHome ? "cursor-field is-home-motion" : "cursor-field"} style={{ x: smoothX, y: smoothY }} aria-hidden="true" />;
}
