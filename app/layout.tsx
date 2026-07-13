import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, League_Spartan, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "@/styles/layout.css";
import "@/styles/visuals.css";
import "@/styles/home.css";
import "@/styles/detail.css";
import "@/styles/judge.css";
import "@/styles/motion.css";
import { MotionProvider } from "@/components/motion/motion-provider";
import { MotionShell } from "@/components/motion/motion-shell";
import { SiteHeader } from "@/components/layout/site-header";
import { createPageMetadata, siteUrl } from "@/lib/seo";

const display = League_Spartan({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  ...createPageMetadata(
    "Project Tejasvayu | Smarter Surfaces for Cleaner Cities",
    "Project Tejasvayu is a student-led exploration of TiO₂ photocatalytic surfaces, comparative chamber testing and scalable urban air-purification concepts.",
  ),
  metadataBase: new URL(siteUrl),
  applicationName: "Project Tejasvayu",
  authors: [{ name: "Project Tejasvayu student team" }],
  creator: "Satyajit Beura",
  category: "education",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#04111d",
  colorScheme: "dark light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Project Tejasvayu",
  url: siteUrl,
  description: "A student-led experimental exploration of TiO₂ photocatalytic surfaces and comparative chamber testing.",
  creator: ["Satyajit Beura", "Amit Ku. Panigrahi", "Ansuman Dakua", "Nabin Sahu"].map((name) => ({ "@type": "Person", name })),
  educationalUse: "Scientific communication and prototype documentation",
  license: "https://opensource.org/license/mit",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <MotionProvider>
          <SiteHeader />
          <MotionShell>
            {children}
          </MotionShell>
        </MotionProvider>
        <Script id="structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
