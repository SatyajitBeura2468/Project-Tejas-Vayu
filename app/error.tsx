"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main id="main-content" className="system-state">
      <p className="section-index">A project view could not load</p>
      <h1>The interface paused safely.</h1>
      <p>Retry this view, or return to the complete Project Tejasvayu overview.</p>
      <div className="button-row"><button className="button button-primary" onClick={reset}>Try again</button><Link className="button button-secondary" href="/">Return to overview</Link></div>
    </main>
  );
}
