import { ImageResponse } from "next/og";

export const alt = "Project Tejasvayu — smarter surfaces for cleaner cities";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#04111d", color: "#f8fbff", padding: "64px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ position: "absolute", right: 50, top: 55, width: 500, height: 500, border: "1px solid rgba(34,211,238,.28)", borderRadius: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 210, height: 180, border: "3px solid #22d3ee", display: "flex", alignItems: "flex-end", justifyContent: "center", marginRight: 24, paddingBottom: 20, color: "#67e8f9", fontSize: 24 }}>Control</div>
        <div style={{ width: 210, height: 180, border: "3px solid #8b5cf6", boxShadow: "inset 0 0 50px rgba(139,92,246,.22)", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 20, color: "#a78bfa", fontSize: 24 }}>TiO₂ + UV</div>
      </div>
      <div style={{ position: "relative", width: 650, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ color: "#22d3ee", fontSize: 24, letterSpacing: 8, marginBottom: 28 }}>PROJECT TEJASVAYU</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 800, letterSpacing: -4, lineHeight: .95 }}><span>The city needs</span><span>smarter surfaces.</span></div>
        <div style={{ marginTop: 30, color: "#a9bacb", fontSize: 25, lineHeight: 1.4 }}>A student-led exploration of TiO₂ photocatalytic surfaces and comparative chamber testing.</div>
      </div>
    </div>,
    size,
  );
}
