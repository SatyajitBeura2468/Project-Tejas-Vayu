import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const routes = ["", "/prototype", "/science", "/methodology", "/results", "/dashboard", "/team", "/future", "/judge", "/sources"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date("2026-07-13"), changeFrequency: route === "" ? "monthly" : "yearly", priority: route === "" ? 1 : route === "/judge" ? 0.8 : 0.7 }));
}
