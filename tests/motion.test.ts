import { describe, expect, it } from "vitest";
import { getHomeIntroDuration, getIntroDuration } from "@/lib/motion";
import { homeMotionTokens, motionTokens } from "@/lib/motion-tokens";

describe("motion system", () => {
  it("uses a shorter same-session entrance without removing the first-visit sequence", () => {
    expect(getIntroDuration(false)).toBe(3.1);
    expect(getHomeIntroDuration(false)).toBeGreaterThanOrEqual(1.4);
    expect(getHomeIntroDuration(false)).toBeLessThanOrEqual(2.2);
    expect(getHomeIntroDuration(true)).toBeLessThan(getHomeIntroDuration(false));
  });

  it("keeps shared durations and springs inside controlled ranges", () => {
    expect(motionTokens.duration.micro).toBeLessThan(motionTokens.duration.standard);
    expect(motionTokens.duration.standard).toBeLessThan(motionTokens.duration.cinematic);
    expect(motionTokens.spring.responsive.damping).toBeGreaterThan(20);
    expect(homeMotionTokens.spring.scroll.damping).toBeGreaterThan(20);
    expect(homeMotionTokens.duration.cinematic).toBeLessThan(motionTokens.duration.cinematic);
  });
});
