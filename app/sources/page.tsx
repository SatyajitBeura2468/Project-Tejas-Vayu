import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { DetailHero, DetailPage, DetailSection } from "@/components/layout/detail-page";
import { sources } from "@/content/sources";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("Sources & Research | Project Tejasvayu", "The typed source registry behind Project Tejasvayu's air-pollution evidence, photocatalysis explanation, component descriptions and limitations.", "/sources");

export default function SourcesPage() {
  return (
    <DetailPage>
      <DetailHero number="Sources / 01" title={<>Every public claim<br /><span className="accent">has a trail.</span></>} description="Statistics, scientific explanations and hardware descriptions are drawn from institutional, peer-reviewed or manufacturer sources. The prototype curve is separately identified as an observation-based project record." ><div className="source-count" aria-hidden="true"><strong>{String(sources.length).padStart(2, "0")}</strong><span>registered sources</span></div></DetailHero>
      <DetailSection index="Sources / 02" title="Typed, dated and claim-specific." intro={<p>Each record includes its publisher, publication year, data year where applicable, access date and supported claims.</p>}>
        <div className="source-registry">{sources.map((source, index) => {
          const external = source.url.startsWith("http");
          return <article key={source.id} id={source.id}><div className="source-registry-number">{String(index + 1).padStart(2, "0")}</div><div><p>{source.kind.replace("-", " ")}</p><h2>{source.title}</h2><h3>{source.organisation}</h3><dl><div><dt>Publication</dt><dd>{source.publicationYear}</dd></div>{source.dataYear && <div><dt>Data year</dt><dd>{source.dataYear}</dd></div>}<div><dt>Accessed</dt><dd>{source.accessedOn}</dd></div></dl><ul>{source.supportedClaims.map((claim) => <li key={claim}>{claim}</li>)}</ul><a href={source.url} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>Open source {external && <ExternalLink size={15} aria-hidden="true" />}</a></div></article>;
        })}</div>
      </DetailSection>
    </DetailPage>
  );
}
