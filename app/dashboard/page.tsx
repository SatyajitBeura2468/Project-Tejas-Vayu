import type { Metadata } from "next";
import { DetailHero, DetailPage, DetailSection } from "@/components/layout/detail-page";
import { ReplayDashboard } from "@/components/dashboard/replay-dashboard";
import { resultInterpretation } from "@/content/results";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("Recorded Dashboard Demonstration | Project Tejasvayu", "Replay the observation-based normalised reconstruction with accessible controls. This interface is not connected to live hardware.", "/dashboard");

export default function DashboardPage() {
  return (
    <DetailPage nextHref="/team" nextLabel="Meet the team">
      <DetailHero number="Dashboard preview / 01" status="Recorded demonstration" title={<>An observation,<br /><span className="accent">made navigable.</span></>} description="Play, pause, restart, change speed or jump directly to any supplied milestone. The interface is an observation replay—not a live hardware dashboard." />
      <section className="section section-dark dashboard-route-section"><div className="content-wrap"><ReplayDashboard /></div></section>
      <DetailSection index="Dashboard preview / 02" title="Read the replay responsibly." intro={<p>{resultInterpretation}</p>}>
        <div className="integrity-columns"><article><h3>What moves</h3><p>A modelled cursor follows a smooth visual reconstruction between qualitative milestones.</p></article><article><h3>What does not exist</h3><p>No serial connection, real-time feed, official AQI, calibration result or hardware control is present.</p></article><article><h3>What is accessible</h3><p>Every chart state has labels, a textual milestone summary and a screen-reader playback status.</p></article></div>
      </DetailSection>
    </DetailPage>
  );
}
