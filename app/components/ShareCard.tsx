"use client";
import React, { forwardRef } from "react";
import { type AssessmentResult, type Dimension, DIMENSION_ORDER, dimensionMeta } from "../utils/assessmentData";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scoreColor(score: number) {
  if (score < 40) return "#EF4444";
  if (score < 75) return "#F59E0B";
  return "#10B981";
}
function scoreBg(score: number) {
  if (score < 40) return "rgba(239,68,68,0.12)";
  if (score < 75) return "rgba(245,158,11,0.12)";
  return "rgba(16,185,129,0.12)";
}
function bandLabel(score: number) {
  if (score < 40) return "Growth Area";
  if (score < 75) return "Strong";
  return "Exceptional";
}

// ─── Mini Score Ring ──────────────────────────────────────────────────────────

function ScoreRing({ score }: { score: number }) {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  const col = scoreColor(score);
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" style={{ display: "block", margin: "0 auto" }}>
      <circle cx="90" cy="90" r={r} fill="none" stroke="#F1F5F9" strokeWidth="10" />
      <circle
        cx="90" cy="90" r={r} fill="none"
        stroke={col} strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 90 90)"
        style={{ filter: `drop-shadow(0 0 6px ${col}60)` }}
      />
      <text x="90" y="84" textAnchor="middle" fill="#0F172A"
        style={{ fontSize: "36px", fontWeight: 900, fontFamily: "Outfit, sans-serif", letterSpacing: "-2px" }}>
        {score}
      </text>
      <text x="90" y="102" textAnchor="middle" fill="#94A3B8"
        style={{ fontSize: "8px", fontWeight: 700, fontFamily: "Outfit, sans-serif", letterSpacing: "2px", textTransform: "uppercase" }}>
        READINESS SCORE
      </text>
    </svg>
  );
}

// ─── Radar Chart ──────────────────────────────────────────────────────────────

function ShareRadarChart({ scores, overallScore }: { scores: Record<Dimension, number>, overallScore: number }) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = 95;
  const dims = DIMENSION_ORDER;
  const N = dims.length;
  const col = scoreColor(overallScore);
  const bg = scoreBg(overallScore);

  function getPoint(idx: number, pct: number) {
    const angle = (Math.PI * 2 * idx) / N - Math.PI / 2;
    return { x: cx + r * pct * Math.cos(angle), y: cy + r * pct * Math.sin(angle) };
  }

  const rings = [0.25, 0.5, 0.75, 1];
  const axisPoints = dims.map((_, i) => getPoint(i, 1));
  const scorePoints = dims.map((d) => getPoint(dims.indexOf(d), scores[d] / 100));
  const scorePolygon = scorePoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible", display: "block", margin: "0 auto" }}>
      {rings.map((ring) => {
        const pts = dims.map((_, i) => getPoint(i, ring));
        const poly = pts.map((p) => `${p.x},${p.y}`).join(" ");
        return <polygon key={ring} points={poly} fill="none" stroke="#E2E8F0" strokeWidth={1} strokeDasharray="3 3" />;
      })}
      {axisPoints.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#CBD5E1" strokeWidth={1} />
      ))}
      <polygon points={scorePolygon} fill={bg} stroke={col} strokeWidth={2.5} strokeLinejoin="round" />
      {scorePoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={5} fill={col} stroke="white" strokeWidth={2} />
      ))}
      {dims.map((d, i) => {
        const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
        const lx = cx + (r + 22) * Math.cos(angle);
        const ly = cy + (r + 22) * Math.sin(angle);
        const cos = Math.cos(angle);
        let anchor = "middle";
        if (cos < -0.2) anchor = "end";
        if (cos > 0.2) anchor = "start";
        return (
          <text key={d} x={lx} y={ly} textAnchor={anchor as "middle" | "end" | "start"}
            fill="#64748B" fontFamily="Outfit, sans-serif"
            style={{ fontSize: "8px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase" }}>
            {dimensionMeta[d].label}
          </text>
        );
      })}
    </svg>
  );
}

// ─── Main ShareCard ───────────────────────────────────────────────────────────

interface ShareCardProps { result: AssessmentResult }

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ result }, ref) => {
  const radarScores = Object.fromEntries(
    result.dimensions.map((d) => [d.dimension, d.score])
  ) as Record<Dimension, number>;

  const col = scoreColor(result.overallScore);
  const bg = scoreBg(result.overallScore);

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div ref={ref} style={{
      width: "800px",
      backgroundColor: "#FDFDFD",
      fontFamily: "'Outfit', sans-serif",
      position: "relative",
      boxSizing: "border-box",
      overflow: "hidden",
    }}>

      {/* Dotted grid background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5,
        backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      {/* Ambient glow top */}
      <div style={{
        position: "absolute", top: "-80px", right: "-80px", width: "360px", height: "360px",
        backgroundColor: `${col}18`, filter: "blur(80px)", borderRadius: "50%",
      }} />

      {/* ── CONTENT ── */}
      <div style={{ position: "relative", zIndex: 10, padding: "40px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <div>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "3px", color: "#94A3B8", textTransform: "uppercase", marginBottom: "4px" }}>
              Career Readiness Assessment
            </div>
            <div style={{ fontSize: "22px", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.5px" }}>
              Your Results
            </div>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#94A3B8", marginTop: "4px", letterSpacing: "0.3px" }}>
              {today}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Logo"
              crossOrigin="anonymous"
              style={{ height: "72px", width: '72px', objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Hero: Score + Archetype */}
        <div style={{
          backgroundColor: "#ffffff", borderRadius: "32px", padding: "32px",
          boxShadow: "0 4px 32px rgba(15,23,42,0.08)", border: "1px solid #F1F5F9",
          display: "flex", alignItems: "center", gap: "32px", marginBottom: "24px",
        }}>
          <ScoreRing score={result.overallScore} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "28px", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: "10px" }}>
              {result.archetype}
            </div>
            <p style={{ fontSize: "14px", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
              {result.archetypeDescription}
            </p>
          </div>
        </div>

        {/* ── Row: Radar + Dimension Bars ── */}
        <div style={{ display: "flex", gap: "24px", marginBottom: "24px" }}>

          {/* Radar Card */}
          <div style={{
            flex: 1, backgroundColor: "#ffffff", borderRadius: "28px", padding: "24px",
            boxShadow: "0 4px 24px rgba(15,23,42,0.06)", border: "1px solid #F1F5F9",
          }}>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "2px", color: "#94A3B8", textTransform: "uppercase", marginBottom: "16px" }}>
              Profile Architecture
            </div>
            <ShareRadarChart scores={radarScores} overallScore={result.overallScore} />
          </div>

          {/* Bars Card */}
          <div style={{
            flex: 1, backgroundColor: "#ffffff", borderRadius: "28px", padding: "24px",
            boxShadow: "0 4px 24px rgba(15,23,42,0.06)", border: "1px solid #F1F5F9",
          }}>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "2px", color: "#94A3B8", textTransform: "uppercase", marginBottom: "20px" }}>
              Competency Metrics
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {result.dimensions.map((d) => {
                const dc = scoreColor(d.score);
                return (
                  <div key={d.dimension}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "6px" }}>
                      <div>
                        <div style={{ fontSize: "11px", fontWeight: 900, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          {d.label}
                        </div>
                        <div style={{ fontSize: "9px", fontWeight: 700, color: dc, textTransform: "uppercase", letterSpacing: "1px" }}>
                          {bandLabel(d.score)}
                        </div>
                      </div>
                      <div style={{ fontSize: "18px", fontWeight: 900, color: "#0F172A" }}>{d.score}%</div>
                    </div>
                    <div style={{ height: "6px", backgroundColor: "#F1F5F9", borderRadius: "100px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${d.score}%`, backgroundColor: dc, borderRadius: "100px" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Deep Insight Analysis ── */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "3px", color: "#94A3B8", textTransform: "uppercase" }}>
              Deep Insight Analysis
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            {result.dimensions.map((d) => {
              const dc = scoreColor(d.score);
              const dbg = scoreBg(d.score);
              return (
                <div key={d.dimension} style={{
                  flex: "1 1 calc(33% - 10px)", backgroundColor: "#ffffff",
                  borderRadius: "20px", padding: "18px",
                  boxShadow: "0 2px 16px rgba(15,23,42,0.05)", border: "1px solid #F1F5F9",
                  minWidth: "180px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "10px", backgroundColor: dbg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={dc} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 7L13.5 15.5 8.5 10.5 2 17" /><path d="M16 7h6v6" />
                      </svg>
                    </div>
                    <span style={{ fontSize: "9px", fontWeight: 800, color: dc, backgroundColor: dbg, padding: "3px 10px", borderRadius: "100px", letterSpacing: "1px", textTransform: "uppercase" }}>
                      {bandLabel(d.score)}
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: 900, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                    {d.label}
                  </div>
                  <p style={{ fontSize: "11px", color: "#64748B", lineHeight: 1.5, margin: 0 }}>
                    {d.insight}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{
          backgroundColor: "#0F172A", borderRadius: "24px", padding: "20px 28px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "#ffffff", marginBottom: "4px" }}>
              What's your score?
            </div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
              Discover your career strengths at the link below.
            </div>
          </div>
          <div style={{ padding: "8px 20px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.2)" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#ffffff", letterSpacing: "1px", textTransform: "uppercase" }}>Career Readiness</span>
          </div>
        </div>

      </div>
    </div>
  );
});

ShareCard.displayName = "ShareCard";
export default ShareCard;
