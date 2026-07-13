import { ExternalLink } from "lucide-react";
import { getSource } from "@/content/sources";

export function SourceLink({ sourceId, label }: { sourceId: string; label?: string }) {
  const source = getSource(sourceId);
  const external = source.url.startsWith("http");
  return (
    <a className="source-link" href={source.url} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      {label ?? `${source.organisation}, ${source.publicationYear}`}
      {external && <ExternalLink size={13} aria-hidden="true" />}
    </a>
  );
}
