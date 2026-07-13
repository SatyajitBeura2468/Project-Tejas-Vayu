"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionTransition } from "@/components/motion/section-transition";
import { useMotionPreference } from "@/components/motion/motion-provider";

export function ClosingSection() {
  const ref = useRef<HTMLElement>(null);
  const { reduced } = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const cityScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const chamberScale = useTransform(scrollYProgress, [0, 1], [1.8, 0.7]);
  const pathScale = useTransform(scrollYProgress, [0.18, 0.82], [0, 1]);
  return (
    <section ref={ref} className="closing-section" aria-labelledby="closing-title">
      <SectionTransition tone="dark" />
      <motion.div className="closing-city" style={{ scale: reduced ? 1 : cityScale }} aria-hidden="true"><motion.div className="closing-chambers" style={{ scale: reduced ? 1 : chamberScale }}><i /><i /></motion.div><motion.div className="closing-path" style={{ scaleX: reduced ? 1 : pathScale }} /><div className="closing-buildings">{Array.from({ length: 12 }, (_, index) => <i key={index} />)}</div><div className="closing-airflow"><i /><i /><i /></div></motion.div>
      <div className="content-wrap closing-copy">
        <h2 id="closing-title"><span className="closing-line-mask"><motion.span initial={reduced ? false : { y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: reduced ? 0.01 : 1, ease: [0.16, 1, 0.3, 1] }}>The city does not need more spaces.</motion.span></span><span className="closing-line-mask"><motion.span initial={reduced ? false : { y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: reduced ? 0.01 : 1, delay: reduced ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}>It needs smarter surfaces.</motion.span></span></h2>
      </div>
    </section>
  );
}
