import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="system-state">
      <p className="section-index">404 · Route not found</p>
      <h1>This surface is not part of Version 1.</h1>
      <p>The requested page does not exist. Continue through the verified project routes instead.</p>
      <Link className="button button-primary" href="/">Return to overview</Link>
    </main>
  );
}
