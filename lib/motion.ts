export type MotionPreference = "system" | "full" | "reduced";

export function resolveReducedMotion(preference: MotionPreference, systemPrefersReduced: boolean): boolean {
  if (preference === "reduced") return true;
  if (preference === "full") return false;
  return systemPrefersReduced;
}

export const motionDurations = {
  response: 0.18,
  standard: 0.56,
  cinematic: 1.1,
} as const;

export const MOTION_STORAGE_KEY = "tejasvayu-motion-preference";
export const INTRO_SESSION_KEY = "tejasvayu-intro-seen";

export function getIntroDuration(repeatVisit: boolean) {
  return repeatVisit ? 1.1 : 3.1;
}
