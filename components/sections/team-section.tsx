import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { team } from "@/content/team";
import { SectionHeading } from "@/components/ui/section-heading";

export function TeamSection() {
  return (
    <section className="section section-white team-section" id="team" aria-labelledby="team-title">
      <div className="content-wrap">
        <SectionHeading index="10 · Team system" title={<>Built by students.<br /><span className="accent">Designed for scale.</span></>} copy={<p id="team-title">Four complementary responsibilities connect theory, execution, structural design and visual communication.</p>} />
        <div className="team-system">
          {team.map((member, index) => (
            <article key={member.name} className={member.leader ? "team-member is-leader" : "team-member"}>
              <div className="member-monogram">{member.initials}</div><span>{String(index + 1).padStart(2, "0")}</span><h3>{member.name}</h3><h4>{member.role}</h4><p>{member.focus}</p>
            </article>
          ))}
        </div>
        <Link className="text-route-link text-route-link-dark" href="/team">Meet the complete team system <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
