import { resultMilestones } from "@/content/results";

export type ReconstructedPoint = {
  seconds: number;
  control: number;
  active: number;
};

export function interpolateValue(start: number, end: number, amount: number): number {
  const clamped = Math.min(1, Math.max(0, amount));
  const eased = clamped * clamped * (3 - 2 * clamped);
  return start + (end - start) * eased;
}

export function reconstructAt(seconds: number): ReconstructedPoint {
  const clampedSeconds = Math.min(600, Math.max(0, seconds));
  const rightIndex = resultMilestones.findIndex((milestone) => milestone.seconds >= clampedSeconds);
  if (rightIndex <= 0) {
    const first = resultMilestones[0];
    return { seconds: clampedSeconds, control: first.control, active: first.active };
  }
  const left = resultMilestones[rightIndex - 1];
  const right = resultMilestones[rightIndex];
  const range = right.seconds - left.seconds;
  const amount = range === 0 ? 0 : (clampedSeconds - left.seconds) / range;
  return {
    seconds: clampedSeconds,
    control: interpolateValue(left.control, right.control, amount),
    active: interpolateValue(left.active, right.active, amount),
  };
}

export function createReconstruction(stepSeconds = 5): ReconstructedPoint[] {
  const points: ReconstructedPoint[] = [];
  for (let seconds = 0; seconds <= 600; seconds += stepSeconds) points.push(reconstructAt(seconds));
  return points;
}

export function formatReplayTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}
