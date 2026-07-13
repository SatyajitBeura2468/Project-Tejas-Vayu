"use client";

import { CursorField } from "@/components/motion/cursor-field";
import { RouteTransition } from "@/components/motion/route-transition";
import { ScrollProgress } from "@/components/motion/scroll-progress";

export function MotionShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <CursorField />
      <RouteTransition>{children}</RouteTransition>
    </>
  );
}
