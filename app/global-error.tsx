"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en"><body><main className="system-state"><h1>Project Tejasvayu needs a fresh start.</h1><p>An unexpected application error interrupted the page.</p><button className="button button-primary" onClick={reset}>Reload the experience</button></main></body></html>
  );
}
