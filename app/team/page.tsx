import type { Metadata } from "next";
import { DetailHero, DetailPage, DetailSection } from "@/components/layout/detail-page";
import { evolutionStages } from "@/content/project";
import { team } from "@/content/team";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("Student Team | Project Tejasvayu", "Meet the four students responsible for Project Tejasvayu's theory, technical execution, physical design and visual communication.", "/team");

export default function TeamPage() {
  return (
    <DetailPage nextHref="/future" nextLabel="Explore the future scope">
      <DetailHero number="Team / 01" title={<>Four responsibilities.<br /><span className="accent">One project system.</span></>} description="Project Tejasvayu connects scientific curiosity, technical execution, structural design and visual communication through a student-led team." ><div className="team-constellation" aria-hidden="true">{team.map((member) => <i key={member.initials}>{member.initials}</i>)}</div></DetailHero>
      <DetailSection index="Team / 02" title="Built by students. Designed for scale." intro={<p>Version 1 uses typographic profiles because verified team photographs are not yet part of the project assets.</p>}>
        <div className="team-detail-list">{team.map((member, index) => <article key={member.name} className={member.leader ? "is-leader" : ""}><div>{member.initials}</div><span>{String(index + 1).padStart(2, "0")}</span><h2>{member.name}</h2><h3>{member.role}</h3><p>{member.focus}</p></article>)}</div>
      </DetailSection>
      <DetailSection index="Team / 03" title="A project that changed shape." dark>
        <ol className="team-evolution">{evolutionStages.map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><h3>{stage}</h3>{index === evolutionStages.length - 1 && <em>Future concept</em>}</li>)}</ol>
      </DetailSection>
    </DetailPage>
  );
}
