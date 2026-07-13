import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";

type DetailHeroProps = {
  number: string;
  title: React.ReactNode;
  description: string;
  status?: string;
  children?: React.ReactNode;
};

export function DetailHero({ number, title, description, status, children }: DetailHeroProps) {
  return (
    <header className="detail-hero">
      <div className="detail-hero-grid" aria-hidden="true" />
      <div className="content-wrap detail-hero-inner">
        <div className="detail-hero-copy">
          <Link href="/" className="detail-back"><ArrowLeft aria-hidden="true" />Overview</Link>
          <p className="section-index">{number}</p>
          {status && <p className="detail-status">{status}</p>}
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {children && <div className="detail-hero-visual">{children}</div>}
      </div>
    </header>
  );
}

export function DetailPage({ children, nextHref, nextLabel }: { children: React.ReactNode; nextHref?: string; nextLabel?: string }) {
  return (
    <div className="page-shell detail-page">
      <main id="main-content">
        {children}
        {nextHref && nextLabel && <div className="detail-next section-dark"><div className="content-wrap"><span>Continue the project</span><Link href={nextHref}>{nextLabel}<ArrowRight aria-hidden="true" /></Link></div></div>}
      </main>
      <SiteFooter />
    </div>
  );
}

export function DetailSection({ index, title, intro, dark = false, id, children }: { index?: string; title: React.ReactNode; intro?: React.ReactNode; dark?: boolean; id?: string; children: React.ReactNode }) {
  return (
    <section className={`section detail-section ${dark ? "section-dark" : "section-white"}`} id={id}>
      <div className="content-wrap">
        <header className="detail-section-head">
          <div>{index && <p className="section-index">{index}</p>}<h2>{title}</h2></div>
          {intro && <div className="detail-section-intro">{intro}</div>}
        </header>
        {children}
      </div>
    </section>
  );
}
