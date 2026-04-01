import React, { forwardRef } from "react";
import { type AssessmentResult, type Dimension, DIMENSION_ORDER, dimensionMeta } from "../utils/assessmentData";

// Ensure this matches the visual logic of the main RadarChart, but with inline styles
// more suitable for html2canvas consistency.
function ShareRadarChart({ scores }: { scores: Record<Dimension, number> }) {
  const width = 460;
  const height = 340;
  const cx = width / 2;
  const cy = height / 2;
  const r = 90; // Slightly larger for better visibility
  const dims = DIMENSION_ORDER;
  const N = dims.length;

  function getPoint(idx: number, pct: number) {
    const angle = (Math.PI * 2 * idx) / N - Math.PI / 2;
    return {
      x: cx + r * pct * Math.cos(angle),
      y: cy + r * pct * Math.sin(angle),
    };
  }

  const rings = [0.25, 0.5, 0.75, 1];
  const axisPoints = dims.map((_, i) => getPoint(i, 1));
  const scorePoints = dims.map((d, i) => getPoint(i, scores[d] / 100));
  const scorePolygon = scorePoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: "visible", margin: "16px auto" }}>
      {/* Rings */}
      {rings.map((ring) => {
        const pts = dims.map((_, i) => getPoint(i, ring));
        const poly = pts.map((p) => `${p.x},${p.y}`).join(" ");
        return <polygon key={ring} points={poly} fill="none" stroke="#E2E8F0" strokeWidth={1.5} />;
      })}

      {/* Axes */}
      {axisPoints.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#CBD5E1" strokeWidth={1.5} strokeDasharray="4 4" />
      ))}

      {/* Score polygon */}
      <polygon
        points={scorePolygon}
        fill="rgba(37,99,235,0.2)"
        stroke="#2563EB"
        strokeWidth={4}
        strokeLinejoin="round"
      />

      {/* Score dots */}
      {scorePoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={7} fill="#2563EB" stroke="#ffffff" strokeWidth={2} />
      ))}

      {/* Labels */}
      {dims.map((d, i) => {
        const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        // Use directional alignment for labels
        const isLeft = cos < -0.2;
        const isRight = cos > 0.2;
        const isBottom = sin > 0.5;
        const isTop = sin < -0.5;

        const offset = 14;
        const lx = cx + (r + offset) * cos;
        const ly = cy + (r + offset) * sin;

        let anchor = "middle";
        if (isLeft) anchor = "end";
        if (isRight) anchor = "start";

        let baseline = "middle";
        if (isTop) baseline = "auto";
        if (isBottom) baseline = "hanging";

        return (
          <text
            key={d}
            x={lx}
            y={ly}
            textAnchor={anchor as any}
            dominantBaseline={baseline as any}
            fill="#475569"
            fontFamily="inherit"
            letterSpacing={0.5}
            style={{ textTransform: "uppercase", fontSize: "10px", fontWeight: 800 }}
          >
            {dimensionMeta[d].label}
          </text>
        );
      })}
    </svg>
  );
}

interface ShareCardProps {
  result: AssessmentResult;
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ result }, ref) => {
  const radarScores = Object.fromEntries(
    result.dimensions.map((d) => [d.dimension, d.score])
  ) as Record<Dimension, number>;

  // A vertical poster layout (1080x1920 ratio equivalent)
  return (
    <div
      ref={ref}
      style={{
        width: "540px",
        height: "960px",
        backgroundColor: "#0F172A", // Deep Navy background
        display: "flex",
        flexDirection: "column",
        padding: "32px 24px",
        position: "relative",
        boxSizing: "border-box",
        overflow: "hidden",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Decorative Blobs */}
      <div style={{
        position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px",
        backgroundColor: "rgba(37, 99, 235, 0.2)", filter: "blur(100px)", borderRadius: "50%", zIndex: 0
      }} />
      <div style={{
        position: "absolute", bottom: "-100px", left: "-100px", width: "400px", height: "400px",
        backgroundColor: "rgba(14, 165, 233, 0.15)", filter: "blur(100px)", borderRadius: "50%", zIndex: 0
      }} />

      {/* Content Container */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>
              Career Readiness Assessment
            </div>
          </div>
          <div style={{ minWidth: "80px", padding: "8px 16px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: 'center' }}>
            <span style={{ color: "#ffffff", fontSize: "14px", fontWeight: 700 }}>{new Date().getFullYear()}</span>
          </div>
        </div>

        {/* Main Score & Archetype */}
        <div style={{ backgroundColor: "#ffffff", borderRadius: "32px", padding: "28px 20px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", marginTop: "auto", marginBottom: "auto" }}>

          <div style={{ padding: "8px 24px", backgroundColor: "rgba(37,99,235,0.1)", color: "#2563EB", borderRadius: "100px", fontSize: "11px", fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "24px", textAlign: 'center', alignSelf: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {result.bandLabel}
          </div>

          <div style={{ fontSize: "84px", fontWeight: 900, color: "#0F172A", lineHeight: "1", letterSpacing: "-3px", marginBottom: "8px" }}>
            {result.overallScore}
          </div>
          <div style={{ color: "#64748B", fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "28px", marginTop: "10px" }}>
            Out of 100
          </div>

          <h1 style={{ fontSize: "32px", fontWeight: 900, color: "#0F172A", lineHeight: 1.1, letterSpacing: "1px", marginBottom: "4px", maxWidth: "95%" }}>
            {result.archetype}
          </h1>

          <ShareRadarChart scores={radarScores} />

          <p style={{ color: "#64748B", fontSize: "14px", fontWeight: 500, lineHeight: 1.4, marginTop: "0px", maxWidth: "95%" }}>
            {result.archetypeDescription}
          </p>

        </div>

        {/* Footer / CTA */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "40px" }}>
          <div>
            <div style={{ color: "#ffffff", fontSize: "20px", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "8px" }}>
              What's your score?
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", fontWeight: 500 }}>
              Take the free assessment at <strong style={{ color: "#38BDF8" }}>titagray.com</strong>
            </div>
          </div>
          {/* Mock QR placeholder or brand mark */}
          <div style={{ width: "64px", height: "64px", display: "flex", backgroundColor: "#ffffff", borderRadius: "16px", alignItems: "center", justifyContent: "center" }}>
            <img
              src="/logo.png"
              alt="Logo"
              crossOrigin="anonymous"
              style={{ width: "60px", height: "60px", objectFit: "contain" }}
            />
          </div>
        </div>

      </div>
    </div>
  );
});

ShareCard.displayName = "ShareCard";
export default ShareCard;
