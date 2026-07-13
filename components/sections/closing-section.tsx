import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ClosingSection() {
  return (
    <section className="closing-section" aria-labelledby="closing-title">
      <div className="closing-city" aria-hidden="true"><div className="closing-chambers"><i /><i /></div><div className="closing-path" /><div className="closing-buildings">{Array.from({ length: 12 }, (_, index) => <i key={index} />)}</div></div>
      <div className="content-wrap closing-copy">
        <h2 id="closing-title">The city does not need more spaces.<br /><span>It needs smarter surfaces.</span></h2>
        <Link className="button button-primary" href="/judge">Enter judge mode <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
