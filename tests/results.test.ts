import { describe, expect, it } from "vitest";
import { resultMilestones } from "@/content/results";
import { createReconstruction, formatReplayTime, interpolateValue, reconstructAt } from "@/lib/results";

describe("observation reconstruction", () => {
  it("preserves every supplied milestone exactly", () => {
    for (const milestone of resultMilestones) {
      expect(reconstructAt(milestone.seconds)).toEqual({
        seconds: milestone.seconds,
        control: milestone.control,
        active: milestone.active,
      });
    }
  });

  it("clamps requests to the documented ten-minute window", () => {
    expect(reconstructAt(-20).seconds).toBe(0);
    expect(reconstructAt(900)).toEqual({ seconds: 600, control: 101, active: 100 });
  });

  it("uses bounded, smooth interpolation", () => {
    expect(interpolateValue(10, 20, -1)).toBe(10);
    expect(interpolateValue(10, 20, 0.5)).toBe(15);
    expect(interpolateValue(10, 20, 2)).toBe(20);
  });

  it("creates a complete, ordered reconstruction", () => {
    const points = createReconstruction(5);
    expect(points).toHaveLength(121);
    expect(points[0].seconds).toBe(0);
    expect(points.at(-1)?.seconds).toBe(600);
    expect(points.every((point, index) => index === 0 || point.seconds > points[index - 1].seconds)).toBe(true);
  });

  it("formats replay time for presentation", () => {
    expect(formatReplayTime(0)).toBe("00:00");
    expect(formatReplayTime(65.9)).toBe("01:05");
    expect(formatReplayTime(600)).toBe("10:00");
  });
});
