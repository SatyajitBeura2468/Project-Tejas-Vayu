export default function Loading() {
  return (
    <main className="system-state" aria-live="polite" aria-busy="true">
      <div className="system-state-mark" aria-hidden="true" />
      <p>Loading this project view…</p>
    </main>
  );
}
