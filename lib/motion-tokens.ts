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

export const homeMotionTokens = {
  duration: {
    micro: 0.16,
    fast: 0.28,
    standard: 0.48,
    slow: 0.74,
    cinematic: 1.08,
  },
  ease: {
    standard: [0.22, 1, 0.36, 1],
    enter: [0.16, 1, 0.3, 1],
    exit: [0.7, 0, 0.84, 0],
    cinematic: [0.25, 1, 0.5, 1],
  },
  spring: {
    soft: { stiffness: 120, damping: 24, mass: 0.86 },
    responsive: { stiffness: 235, damping: 30, mass: 0.72 },
    cinematic: { stiffness: 82, damping: 24, mass: 1.02 },
    scroll: { stiffness: 92, damping: 28, mass: 0.82 },
  },
  viewport: {
    amount: 0.22,
    margin: "0px 0px -12% 0px",
  },
} as const;

export type MotionDuration = keyof typeof motionTokens.duration;
