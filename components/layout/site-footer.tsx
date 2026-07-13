import Link from "next/link";
import { BrandMark } from "@/components/ui/brand-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="content-wrap site-footer-grid">
        <div>
          <BrandMark />
          <p>A student-led experimental exploration of photocatalytic surfaces and cleaner urban infrastructure.</p>
        </div>
        <nav aria-label="Footer project links">
          <Link href="/prototype">Prototype</Link>
          <Link href="/science">Science</Link>
          <Link href="/methodology">Methodology</Link>
          <Link href="/results">Results</Link>
        </nav>
        <nav aria-label="Footer project information">
          <Link href="/team">Team</Link>
          <Link href="/future">Future</Link>
          <Link href="/sources">Sources</Link>
          <a href="https://github.com/SatyajitBeura2468/Project-Tejas-Vayu" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </div>
      <div className="content-wrap site-footer-base">
        <span>© 2026 Satyajit Beura. MIT License.</span>
        <span>Version 1 · Observation-led, not a live hardware interface.</span>
      </div>
    </footer>
  );
}
