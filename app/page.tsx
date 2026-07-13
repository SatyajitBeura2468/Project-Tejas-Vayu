import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { ConceptSection } from "@/components/sections/concept-section";
import { EvolutionSection } from "@/components/sections/evolution-section";
import { PrototypeSection } from "@/components/sections/prototype-section";
import { ConstructionSection } from "@/components/sections/construction-section";
import { ScienceSection } from "@/components/sections/science-section";
import { MethodologySection } from "@/components/sections/methodology-section";
import { ResultsSection } from "@/components/sections/results-section";
import { DashboardPreviewSection } from "@/components/sections/dashboard-preview-section";
import { TeamSection } from "@/components/sections/team-section";
import { FutureSection } from "@/components/sections/future-section";
import { LimitationsSection } from "@/components/sections/limitations-section";
import { ClosingSection } from "@/components/sections/closing-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { HomeMotionObserver } from "@/components/motion/home-motion-observer";
import { Reveal } from "@/components/motion/reveal";

export default function HomePage() {
  return (
    <div className="page-shell">
      <HomeMotionObserver />
      <main id="main-content" className="home-main">
        <HeroSection />
        <ProblemSection />
        <ConceptSection />
        <EvolutionSection />
        <PrototypeSection homeMotion />
        <ConstructionSection />
        <ScienceSection homeMotion />
        <MethodologySection />
        <ResultsSection />
        <DashboardPreviewSection />
        <TeamSection />
        <FutureSection />
        <LimitationsSection />
        <ClosingSection />
      </main>
      <Reveal className="home-footer-reveal" distance={16}><SiteFooter /></Reveal>
    </div>
  );
}
