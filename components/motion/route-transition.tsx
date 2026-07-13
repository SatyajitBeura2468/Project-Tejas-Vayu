"use client";

import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { usePathname } from "next/navigation";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { motionTokens } from "@/lib/motion-tokens";

function RouteFrame({ children, reduced }: { children: React.ReactNode; reduced: boolean }) {
  const isPresent = useIsPresent();

  return (
    <motion.div
      className="route-transition-shell"
      aria-hidden={!isPresent}
      inert={!isPresent}
      initial={reduced ? { opacity: 0.86 } : { opacity: 0, y: 14, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={reduced ? { opacity: 0.9 } : { opacity: 0, y: -8, filter: "blur(3px)" }}
      transition={{ duration: reduced ? motionTokens.duration.micro : motionTokens.duration.standard, ease: motionTokens.ease.enter }}
    >
      {children}
    </motion.div>
  );
}

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { reduced } = useMotionPreference();

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <RouteFrame key={pathname} reduced={reduced}>
        {children}
      </RouteFrame>
    </AnimatePresence>
  );
}
