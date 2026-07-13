import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReplayDashboard } from "@/components/dashboard/replay-dashboard";
import { Reveal } from "@/components/motion/reveal";
import { SectionTransition } from "@/components/motion/section-transition";

export function DashboardPreviewSection() {
  return (
    <section className="section section-dark dashboard-section" id="dashboard-preview" aria-labelledby="dashboard-preview-heading">
      <SectionTransition tone="dark" />
      <div className="content-wrap">
        <Reveal distance={22}>
          <header className="dashboard-section-intro">
            <div><p className="section-index">09 · Recorded demonstration</p><h2 id="dashboard-preview-heading">The evidence has a timeline.<br /><span className="accent">Replay it.</span></h2></div>
            <div><p>This interface replays a modelled, observation-based curve. It is not connected to hardware and contains no real-time feed.</p><Link className="text-route-link" href="/dashboard">Open dashboard preview <ArrowRight aria-hidden="true" /></Link></div>
          </header>
        </Reveal>
        <Reveal delay={0.14} distance={34}>
          <ReplayDashboard compact />
        </Reveal>
      </div>
    </section>
  );
}
