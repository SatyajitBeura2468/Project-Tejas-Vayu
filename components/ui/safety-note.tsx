import { ShieldCheck } from "lucide-react";
import { safetyPoints } from "@/content/project";

export function SafetyNote({ compact = false }: { compact?: boolean }) {
  return (
    <aside className={`safety-note${compact ? " safety-note-compact" : ""}`} aria-labelledby="safety-title">
      <div className="safety-note-title">
        <ShieldCheck aria-hidden="true" />
        <h3 id="safety-title">Operate the prototype responsibly</h3>
      </div>
      <ul>
        {safetyPoints.map((point) => <li key={point}>{point}</li>)}
      </ul>
    </aside>
  );
}
