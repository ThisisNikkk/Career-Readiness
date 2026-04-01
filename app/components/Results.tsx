"use client";

import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { ArrowRight, RotateCcw, TrendingUp, Download } from "lucide-react";
import ShareCard from "./ShareCard";
import { type AssessmentResult, type Dimension, DIMENSION_ORDER, dimensionMeta } from "../utils/assessmentData";

const BAND_STYLES = {
  low: { badge: "bg-amber-50 text-amber-700 border-amber-200", bar: "bg-amber-400", glow: "shadow-amber-200" },
  medium: { badge: "bg-sky-50 text-sky-700 border-sky-200", bar: "bg-sky-500", glow: "shadow-sky-200" },
  high: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", bar: "bg-emerald-500", glow: "shadow-emerald-200" },
};

// ─── Radar Chart (pure SVG, no deps) ─────────────────────────────────────────

function RadarChart({ scores }: { scores: Record<Dimension, number> }) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = 100;
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
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {/* Rings */}
      {rings.map((ring) => {
        const pts = dims.map((_, i) => getPoint(i, ring));
        const poly = pts.map((p) => `${p.x},${p.y}`).join(" ");
        return <polygon key={ring} points={poly} fill="none" stroke="#E2E8F0" strokeWidth={1} />;
      })}

      {/* Axes */}
      {axisPoints.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#CBD5E1" strokeWidth={1} />
      ))}

      {/* Score polygon */}
      <polygon
        points={scorePolygon}
        fill="rgba(37,99,235,0.15)"
        stroke="#2563EB"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* Score dots */}
      {scorePoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={5} fill="#2563EB" />
      ))}

      {/* Labels */}
      {dims.map((d, i) => {
        const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
        const lx = cx + (r + 28) * Math.cos(angle);
        const ly = cy + (r + 28) * Math.sin(angle);
        return (
          <text
            key={d}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={11}
            fontWeight={700}
            fill="#64748B"
            fontFamily="inherit"
          >
            {dimensionMeta[d].label.split(" ")[0]}
          </text>
        );
      })}
    </svg>
  );
}

// ─── Main Results Component ───────────────────────────────────────────────────

export default function Results({
  result,
  onRetake,
  onBack,
}: {
  result: AssessmentResult;
  onRetake: () => void;
  onBack: () => void;
}) {
  const bandStyle = BAND_STYLES[result.band];
  const radarScores = Object.fromEntries(
    result.dimensions.map((d) => [d.dimension, d.score])
  ) as Record<Dimension, number>;

  const shareCardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleDownload = async () => {
    if (!shareCardRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(shareCardRef.current, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: "#0F172A",
        logging: false, // Cleaner console
      });

      // Convert canvas to Blob for a more reliable download across all browsers
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas toBlob failed");
          setIsGenerating(false);
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `career-readiness-result-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        
        // Use a small delay before cleanup to ensure the browser captures the click
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          setIsGenerating(false);
        }, 100);
      }, "image/png", 1.0);

    } catch (err) {
      console.error("Error generating share card", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">

      {/* Sticky Top Nav */}
      <div className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 md:px-16 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="text-slate-400 hover:text-slate-700 text-sm font-semibold transition-colors">
            ← Back to Homepage
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex items-center gap-2 text-sm font-bold bg-[#0F172A] text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {isGenerating ? "Generating..." : "Save Result"}
            </button>
            <button
              onClick={onRetake}
              className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-blue-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Retake
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-6 md:px-10 py-16 flex flex-col gap-16">

        {/* ── Section 1: Hero Score ── */}
        <div className="flex flex-col items-center text-center gap-6">
          <div className={`inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full border ${bandStyle.badge}`}>
            <TrendingUp className="w-4 h-4" /> {result.bandLabel}
          </div>

          <div className="relative flex items-center justify-center w-48 h-48">
            <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#E2E8F0" strokeWidth="16" />
              <circle
                cx="100" cy="100" r="80"
                fill="none"
                stroke="#2563EB"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 80}`}
                strokeDashoffset={`${2 * Math.PI * 80 * (1 - result.overallScore / 100)}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute text-center">
              <div className="text-5xl font-black text-[#0F172A] leading-none">{result.overallScore}</div>
              <div className="text-sm text-slate-400 font-semibold mt-1">out of 100</div>
            </div>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight mb-2">
              {result.archetype}
            </h1>
            <p className="text-base md:text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
              {result.archetypeDescription}
            </p>
          </div>
        </div>

        {/* ── Section 2: Radar + Dimension Bars ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Radar Chart Card */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm flex flex-col items-center gap-6">
            <div className="text-sm font-black text-[#0F172A] uppercase tracking-[0.15em] self-start">Your Profile Shape</div>
            <RadarChart scores={radarScores} />
          </div>

          {/* Dimension Score Bars */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm flex flex-col gap-6">
            <div className="text-sm font-black text-[#0F172A] uppercase tracking-[0.15em]">Dimension Breakdown</div>
            {result.dimensions.map((d) => {
              const ds = BAND_STYLES[d.band];
              return (
                <div key={d.dimension} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#0F172A]">{d.label}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${ds.badge}`}>{d.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div
                      className={`h-full rounded-full ${ds.bar} transition-all duration-700`}
                      style={{ width: `${d.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ── Section 3: Per-Dimension Insights ── */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-black text-[#0F172A] tracking-tight">What Your Scores Mean</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {result.dimensions.map((d) => (
              <div key={d.dimension} className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0F172A] text-base">{d.label}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${BAND_STYLES[d.band].badge}`}>
                    {d.band === "low" ? "Low" : d.band === "medium" ? "Solid" : "Strong"}
                  </span>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-[1.7]">{d.insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 4: Personalized Action Plan ── */}
        <div className="bg-[#0F172A] text-white rounded-[32px] p-8 md:p-12 flex flex-col gap-8">
          <div>
            <div className="inline-flex bg-white/10 text-blue-300 text-[11px] font-bold tracking-[0.18em] uppercase px-4 py-2 rounded-full border border-white/10 mb-4">
              Your 3-Step Action Plan
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
              Start Here This Week
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            {result.actionPlan.map((action, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-slate-300 font-medium text-base leading-[1.7]">{action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 5: CTA Strip ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 border-t border-slate-100">
          <div>
            <p className="text-[#0F172A] font-bold text-lg">Ready to act on your results?</p>
            <p className="text-slate-500 text-sm font-medium">Explore the Career Power Moves app to build on your strengths.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onRetake}
              className="flex items-center gap-2 border-2 border-slate-200 text-slate-700 font-bold px-7 py-4 rounded-full hover:border-slate-400 transition-all text-sm"
            >
              <RotateCcw className="w-4 h-4" /> Retake Assessment
            </button>
            <button
              onClick={onBack}
              className="flex items-center gap-2 bg-[#2563EB] text-white font-bold px-7 py-4 rounded-full hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-200"
            >
              Explore Career Moves <ArrowRight className="w-4 h-4" strokeWidth={3} />
            </button>
          </div>
        </div>

      </div>

      {/* Hidden Share Card Container */}
      <div
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          pointerEvents: "none"
        }}
      >
        <ShareCard ref={shareCardRef} result={result} />
      </div>
    </div>
  );
}
