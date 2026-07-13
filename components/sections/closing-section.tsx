"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionTransition } from "@/components/motion/section-transition";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { homeMotionTokens as motionTokens } from "@/lib/motion-tokens";

export function ClosingSection() {
  const ref = useRef<HTMLElement>(null);
  const { reduced } = useMotionPreference();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, motionTokens.spring.scroll);

  const cityScale = useTransform(progress, [0, 0.72, 1], [1.055, 1.012, 1]);
  const cityY = useTransform(progress, [0, 1], [44, 0]);
  const cityOpacity = useTransform(progress, [0, 0.22], [0.7, 1]);

  const chamberScale = useTransform(progress, [0, 0.55, 1], [1.34, 1.02, 0.82]);
  const chamberX = useTransform(progress, [0, 1], [-96, 144]);
  const chamberY = useTransform(progress, [0, 0.72, 1], [92, 14, 0]);

  const pathScale = useTransform(progress, [0.16, 0.74], [0, 1]);
  const pathOpacity = useTransform(progress, [0.12, 0.3, 1], [0, 0.72, 1]);

  const copyOpacity = useTransform(progress, [0.24, 0.52], [0, 1]);
  const copyY = useTransform(progress, [0.2, 0.62], [54, 0]);
  const copyScale = useTransform(progress, [0.2, 0.62], [0.985, 1]);
  const firstLineY = useTransform(progress, [0.27, 0.52], ["108%", "0%"]);
  const secondLineY = useTransform(progress, [0.38, 0.65], ["108%", "0%"]);

  return (
    <section ref={ref} className="closing-section" aria-labelledby="closing-title">
      <div className="closing-sticky">
        <SectionTransition tone="dark" />
        <motion.div
          className="closing-city"
          style={{
            opacity: reduced ? 1 : cityOpacity,
            scale: reduced ? 1 : cityScale,
            y: reduced ? 0 : cityY,
          }}
          aria-hidden="true"
        >
          <motion.div
            className="closing-chambers"
            style={{
              scale: reduced ? 1 : chamberScale,
              x: reduced ? 0 : chamberX,
              y: reduced ? 0 : chamberY,
            }}
          >
            <i />
            <i />
          </motion.div>
          <motion.div
            className="closing-path"
            style={{
              opacity: reduced ? 1 : pathOpacity,
              scaleX: reduced ? 1 : pathScale,
            }}
          />
          <div className="closing-buildings">
            {Array.from({ length: 12 }, (_, index) => (
              <i key={index} />
            ))}
          </div>
          <div className="closing-airflow">
            <i />
            <i />
            <i />
          </div>
        </motion.div>

        <motion.div
          className="content-wrap closing-copy"
          style={{
            opacity: reduced ? 1 : copyOpacity,
            scale: reduced ? 1 : copyScale,
            y: reduced ? 0 : copyY,
          }}
        >
          <h2 id="closing-title">
            <span className="closing-line-mask">
              <motion.span style={{ y: reduced ? 0 : firstLineY }}>
                The city does not need more spaces.
              </motion.span>
            </span>
            <span className="closing-line-mask">
              <motion.span style={{ y: reduced ? 0 : secondLineY }}>
                It needs smarter surfaces.
              </motion.span>
            </span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
