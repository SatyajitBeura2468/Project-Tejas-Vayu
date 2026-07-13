export const motionTokens = {
  duration: {
    micro: 0.18,
    fast: 0.32,
    standard: 0.56,
    slow: 0.9,
    cinematic: 1.35,
  },
  ease: {
    standard: [0.22, 1, 0.36, 1],
    enter: [0.16, 1, 0.3, 1],
    exit: [0.7, 0, 0.84, 0],
    cinematic: [0.25, 1, 0.5, 1],
  },
  spring: {
    soft: { stiffness: 110, damping: 22, mass: 0.9 },
    responsive: { stiffness: 260, damping: 28, mass: 0.75 },
    cinematic: { stiffness: 70, damping: 18, mass: 1.1 },
  },
  viewport: {
    amount: 0.22,
    margin: "0px 0px -12% 0px",
  },
} as const;

export type MotionDuration = keyof typeof motionTokens.duration;
