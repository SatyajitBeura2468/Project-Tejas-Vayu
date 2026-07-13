import type { Metadata } from "next";
import { JudgeExperience } from "@/components/judge/judge-experience";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("Judge Mode | Project Tejasvayu", "A concise seven-chapter presentation of the Project Tejasvayu urban problem, prototype, scientific principle, observations and scale-up vision.", "/judge");

export default function JudgePage() {
  return <JudgeExperience />;
}
