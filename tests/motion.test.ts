import { describe, expect, it } from "vitest";
import { getIntroDuration } from "@/lib/motion";
import { motionTokens } from "@/lib/motion-tokens";

describe("motion system", () => {
  it("uses a shorter same-session entrance without removing the first-visit sequence", () => {
    expect(getIntroDuration(false)).toBeGreaterThanOrEqual(2.5);
    expect(getIntroDuration(false)).toBeLessThanOrEqual(3.5);
    expect(getIntroDuration(true)).toBeLessThan(getIntroDuration(false));
  });

  it("keeps shared durations and springs inside controlled ranges", () => {
    expect(motionTokens.duration.micro).toBeLessThan(motionTokens.duration.standard);
    expect(motionTokens.duration.standard).toBeLessThan(motionTokens.duration.cinematic);
    expect(motionTokens.spring.responsive.damping).toBeGreaterThan(20);
  });
});
