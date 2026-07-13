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
