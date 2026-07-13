import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://project-tejas-vayu.vercel.app";

export function createPageMetadata(title: string, description: string, path = "/"): Metadata {
  const canonical = new URL(path, siteUrl).toString();
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Project Tejasvayu",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Project Tejasvayu prototype and smarter urban surfaces" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
