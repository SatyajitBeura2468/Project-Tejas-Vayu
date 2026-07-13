import { describe, expect, it } from "vitest";
import { mobileNavigation, modeNavigation, primaryNavigation } from "@/content/navigation";
import { resultMilestones, reconstructionNotice } from "@/content/results";
import { getSource, indiaEvidence, sources } from "@/content/sources";
import { resolveReducedMotion } from "@/lib/motion";

describe("content integrity", () => {
  it("keeps milestones chronological and explicitly reconstructed", () => {
    expect(resultMilestones.map((item) => item.seconds)).toEqual([0, 5, 8, 30, 60, 120, 240, 600]);
    expect(reconstructionNotice.detail).toMatch(/not raw instrument logs/i);
  });

  it("resolves every evidence record to a dated source", () => {
    for (const evidence of indiaEvidence) {
      const source = getSource(evidence.sourceId);
      expect(source.publicationYear).toBe(evidence.publicationYear);
      expect(source.accessedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(source.supportedClaims.length).toBeGreaterThan(0);
    }
  });

  it("uses unique source identifiers and secure external links", () => {
    expect(new Set(sources.map((source) => source.id)).size).toBe(sources.length);
    for (const source of sources.filter((item) => item.url.startsWith("http"))) {
      expect(source.url).toMatch(/^https:\/\//);
    }
  });

  it("keeps every required mode and deep route discoverable", () => {
    expect(modeNavigation.map((item) => item.href)).toEqual(["/", "/science", "/judge", "/dashboard"]);
    expect(primaryNavigation.some((item) => item.href === "/results")).toBe(true);
    expect(mobileNavigation.some((item) => item.href === "/sources")).toBe(true);
  });
});
describe("motion preference", () => {
  it("honours explicit choices and otherwise follows the system", () => {
    expect(resolveReducedMotion("reduced", false)).toBe(true);
    expect(resolveReducedMotion("full", true)).toBe(false);
    expect(resolveReducedMotion("system", true)).toBe(true);
    expect(resolveReducedMotion("system", false)).toBe(false);
  });
});
