"use client";

import React, { useRef, useState, useEffect, memo } from "react";
import html2canvas from "html2canvas";
import { ArrowRight, RotateCcw, TrendingUp, Download, Link, Check, Mail } from "lucide-react";
import ShareCard from "./ShareCard";
import { type AssessmentResult, type Dimension, DIMENSION_ORDER, dimensionMeta } from "../utils/assessmentData";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa6";
import SocialShareModal from "./assessment/modals/SocialShareModal";
import RetakeModal from "./assessment/modals/RetakeModal";
import EmailShareModal from "./assessment/modals/EmailShareModal";
import { getShareContent, PLATFORMS } from "./assessment/shareConstants";

const BAND_STYLES = {
  low: { badge: "bg-red-50 text-red-700 border-red-200", bar: "bg-red-500", glow: "shadow-red-200", accent: "text-red-500" },
  medium: { badge: "bg-amber-50 text-amber-700 border-amber-200", bar: "bg-amber-500", glow: "shadow-amber-200", accent: "text-amber-500" },
  high: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", bar: "bg-emerald-500", glow: "shadow-emerald-200", accent: "text-emerald-500" },
};

const SubstackIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
  </svg>
);

const RadarChart = memo(({ scores, overallScore }: { scores: Record<Dimension, number>, overallScore: number }) => {
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const r = 110;
  const dims = DIMENSION_ORDER;
  const N = dims.length;

  function getPoint(idx: number, pct: number) {
    const angle = (Math.PI * 2 * idx) / N - Math.PI / 2;
    return { x: cx + r * pct * Math.cos(angle), y: cy + r * pct * Math.sin(angle) };
  }

  const rings = [0.25, 0.5, 0.75, 1];
  const axisPoints = dims.map((_, i) => getPoint(i, 1));
  const scorePoints = dims.map((d, i) => getPoint(i, scores[d] / 100));
  const scorePolygon = scorePoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      <circle cx={cx} cy={cy} r={r} fill="rgba(241,245,249,0.3)" />
      {rings.map((ring) => {
        const pts = dims.map((_, i) => getPoint(i, ring));
        const poly = pts.map((p) => `${p.x},${p.y}`).join(" ");
        return <polygon key={ring} points={poly} fill="none" stroke="#E2E8F0" strokeWidth={1} strokeDasharray="4 4" />;
      })}
      {axisPoints.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#CBD5E1" strokeWidth={1} />
      ))}
      <polygon
        points={scorePolygon}
        fill={overallScore < 50 ? 'rgba(239,68,68,0.12)' : overallScore < 75 ? 'rgba(245,158,11,0.12)' : 'rgba(16,185,129,0.12)'}
        stroke={overallScore < 50 ? 'rgba(239,68,68,0.8)' : overallScore < 75 ? 'rgba(245,158,11,0.8)' : 'rgba(16,185,129,0.8)'}
        strokeWidth={3}
        strokeLinejoin="round"
        className="filter drop-shadow-[0_0_8px_rgba(16,185,129,0.2)]"
      />
      {scorePoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={5} fill={overallScore < 50 ? '#EF4444' : overallScore < 75 ? '#F59E0B' : '#10B981'} stroke="white" strokeWidth={2} />
      ))}
      {dims.map((d, i) => {
        const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
        const lx = cx + (r + 32) * Math.cos(angle);
        const ly = cy + (r + 32) * Math.sin(angle);
        return (
          <text key={d} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="text-[9px] font-black uppercase tracking-widest fill-slate-500" fontFamily="inherit">
            {dimensionMeta[d].label}
          </text>
        );
      })}
    </svg>
  );
});

RadarChart.displayName = "RadarChart";

export default function Results({ result, onRetake, onBack }: { result: AssessmentResult; onRetake: () => void; onBack: () => void; }) {
  const bandStyle = BAND_STYLES[result.band];
  const radarScores = Object.fromEntries(result.dimensions.map((d) => [d.dimension, d.score])) as Record<Dimension, number>;
  const shareCardRef = useRef<HTMLDivElement>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeModal, setActiveModal] = useState<'facebook' | 'substack' | 'retake' | 'email' | null>(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  const handleCopy = () => {
    const url = window.location.origin;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: 'linkedin' | 'facebook' | 'substack') => {
    const { linkedInText } = getShareContent(result, typeof window !== 'undefined' ? window.location.origin : '');

    if (platform === 'linkedin') {
      window.open(PLATFORMS.LINKEDIN.getUrl(linkedInText), '_blank', 'noopener,noreferrer');
    } else {
      setActiveModal(platform as any);
    }
  };

  const handleEmailShare = () => {
    setActiveModal('email');
  };

  const handleDownload = async () => {
    if (!shareCardRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(shareCardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#FDFDFD",
        logging: false,
      });
      canvas.toBlob((blob) => {
        if (!blob) { setIsGenerating(false); return; }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `career-readiness-result-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); setIsGenerating(false); }, 100);
      }, "image/png", 1.0);
    } catch (err) {
      console.error("Error generating share card", err);
      setIsGenerating(false);
    }
  };

  const shareContent = typeof window !== 'undefined' ? getShareContent(result, window.location.origin) : { text: '' };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col relative overflow-x-hidden pt-20">
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)", backgroundSize: "32px 32px" }} />
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-xl border-b border-slate-100 px-6 md:px-16 py-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="text-slate-400 hover:text-primary text-xs font-black tracking-[0.15em] uppercase transition-colors flex items-center gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
          </button>
          <div className="flex items-center gap-4">
            <button onClick={handleDownload} disabled={isGenerating} className="group flex items-center gap-2.5 text-[11px] font-black uppercase tracking-widest bg-primary text-white px-6 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-primary/10 disabled:opacity-50">
              {isGenerating ? <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />}
              {isGenerating ? "Processing..." : "Save Report"}
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-10 py-16 flex flex-col gap-16">
        <div className="flex flex-col items-center text-center gap-8 animate-fade-in-up">
          <div className={`inline-flex items-center gap-2.5 text-[11px] font-black tracking-[0.2em] uppercase px-5 py-2 rounded-full border shadow-sm ${bandStyle.badge}`}>
            <span className="flex h-1.5 w-1.5 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${bandStyle.bar}`}></span>
              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${bandStyle.bar}`}></span>
            </span>
            {result.bandLabel}
          </div>

          <div className="relative flex items-center justify-center w-56 h-56">
            <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
              <circle cx="100" cy="100" r="82" fill="none" stroke="#F1F5F9" strokeWidth="12" />
              <circle cx="100" cy="100" r="82" fill="none" stroke={result.overallScore < 50 ? '#EF4444' : result.overallScore < 75 ? '#F59E0B' : '#10B981'} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 82}`} strokeDashoffset={`${2 * Math.PI * 82 * (1 - result.overallScore / 100)}`} className="transition-all duration-1000 ease-out" style={{ filter: `drop-shadow(0 0 8px ${result.overallScore < 50 ? 'rgba(239,68,68,0.3)' : result.overallScore < 75 ? 'rgba(245,158,11,0.3)' : 'rgba(16,185,129,0.3)'})` }} />
            </svg>
            <div className="absolute text-center">
              <div className="text-7xl font-black text-[#0F172A] tracking-tighter leading-none">{result.overallScore}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.25em] mt-3">Readiness Score</div>
            </div>
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black text-[#0F172A] tracking-tighter leading-[1.05]">{result.archetype}</h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">{result.archetypeDescription}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white/80 backdrop-blur-md border border-white p-10 rounded-[40px] shadow-2xl shadow-slate-200/50 flex flex-col items-center gap-10 hover:translate-y-[-4px] transition-all animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-full flex items-center justify-between">
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Profile Architecture</div>
              <TrendingUp className="w-5 h-5 text-accent-blue" />
            </div>
            <RadarChart scores={radarScores} overallScore={result.overallScore} />
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-white p-10 rounded-[40px] shadow-2xl shadow-slate-200/50 flex flex-col gap-10 hover:translate-y-[-4px] transition-all animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Competency Metrics</div>
            <div className="flex flex-col gap-8">
              {result.dimensions.map((d) => {
                const ds = BAND_STYLES[d.band];
                return (
                  <div key={d.dimension} className="group flex flex-col gap-3">
                    <div className="flex items-end justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-[#0F172A] uppercase tracking-wider">{d.label}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${ds.accent}`}>{d.band === 'low' ? 'Growth Area' : d.band === 'medium' ? 'Strong' : 'Exceptional'}</span>
                      </div>
                      <span className="text-xl font-black text-[#0F172A] tabular-nums">{d.score}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div className={`h-full rounded-full ${ds.bar} transition-all duration-1000 ease-out delay-500 shadow-[0_0_8px_rgba(37,99,235,0.2)]`} style={{ width: `${d.score}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-4 text-center">
            <div className="h-px bg-slate-200 flex-1" />
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap">Deep Insight Analysis</h2>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.dimensions.map((d, i) => (
              <div key={d.dimension} className="bg-white/60 backdrop-blur-sm border border-slate-100 rounded-[32px] p-8 shadow-sm flex flex-col gap-5 hover:bg-white hover:shadow-xl hover:translate-y-[-4px] transition-all group duration-500" style={{ animationDelay: `${0.7 + i * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform ${BAND_STYLES[d.band].badge}`}>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className={`text-[9px] font-black px-2.5 py-1 rounded-full border uppercase tracking-widest ${BAND_STYLES[d.band].badge}`}>
                    {d.band === "low" ? "Focus" : d.band === "medium" ? "Solid" : "Master"}
                  </span>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-black text-[#0F172A] uppercase tracking-wider">{d.label}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-[1.7]">{d.insight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10 animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
          <div className="flex items-center gap-4 text-center">
            <div className="h-px bg-slate-200 flex-1" />
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap">Broadcast Your Results</h2>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* LinkedIn */}
            <button
              onClick={() => handleShare('linkedin')}
              aria-label="Share on LinkedIn"
              className="bg-white border border-slate-100 p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center gap-3 sm:gap-4"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] group-hover:bg-[#0A66C2] group-hover:text-white transition-all duration-300 text-xl sm:text-2xl">
                <FaLinkedinIn />
              </div>
              <div className="text-center">
                <div className="text-xs sm:text-sm font-black text-[#0F172A] uppercase tracking-widest mb-1">LinkedIn</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Share to Network</div>
              </div>
            </button>

            {/* Facebook */}
            <button
              onClick={() => handleShare('facebook')}
              aria-label="Share on Facebook"
              className="bg-white border border-slate-100 p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center gap-3 sm:gap-4"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-all duration-300 text-xl sm:text-2xl">
                <FaFacebook />
              </div>
              <div className="text-center">
                <div className="text-xs sm:text-sm font-black text-[#0F172A] uppercase tracking-widest mb-1">Facebook</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Post an Update</div>
              </div>
            </button>

            {/* Substack */}
            <button
              onClick={() => handleShare('substack')}
              aria-label="Share on Substack"
              className="bg-white border border-slate-100 p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center gap-3 sm:gap-4"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FF6719]/10 flex items-center justify-center text-[#FF6719] group-hover:bg-[#FF6719] group-hover:text-white transition-all duration-300 text-xl sm:text-2xl">
                <SubstackIcon />
              </div>
              <div className="text-center">
                <div className="text-xs sm:text-sm font-black text-[#0F172A] uppercase tracking-widest mb-1">Substack</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Write a Post</div>
              </div>
            </button>

            {/* Email */}
            <button
              onClick={handleEmailShare}
              aria-label="Share via Email"
              className="bg-white border border-slate-100 p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center gap-3 sm:gap-4"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-all duration-300 text-xl sm:text-2xl">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-center">
                <div className="text-xs sm:text-sm font-black text-[#0F172A] uppercase tracking-widest mb-1">Email</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Send Report</div>
              </div>
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopy}
              aria-label="Copy share link"
              className="bg-white border border-slate-100 p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center gap-3 sm:gap-4"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl transition-all duration-300 ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white'}`}>
                {copied ? <Check className="w-6 h-6" /> : <Link className="w-6 h-6" />}
              </div>
              <div className="text-center">
                <div className="text-xs sm:text-sm font-black text-[#0F172A] uppercase tracking-widest mb-1">{copied ? 'Copied!' : 'Copy Link'}</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Share Anywhere</div>
              </div>
            </button>
          </div>
        </div>

        <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-indigo-600 rounded-[48px] blur-2xl opacity-10 group-hover:opacity-15 transition-opacity" />
          <div className="relative bg-[#0F172A] text-white rounded-[48px] p-10 md:p-16 flex flex-col gap-12 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
            <div className="space-y-4">
              <div className="inline-flex bg-blue-500/10 text-blue-300 text-[10px] font-black tracking-[0.3em] uppercase px-5 py-2 rounded-full border border-blue-500/20">Priority Roadmap</div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-2xl">Strategic Power Moves <br /><span className="text-blue-400">for Your Career Pivot</span></h2>
            </div>
            <div className="flex flex-col gap-8">
              {result.actionPlan.map((action, i) => (
                <div key={i} className="flex items-start gap-8 group/item">
                  <div className="w-14 h-14 rounded-3xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center font-black text-xl text-blue-400 shrink-0 mt-0.5 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all shadow-lg shadow-blue-900/20">0{i + 1}</div>
                  <div className="space-y-2 pt-2">
                    <p className="text-slate-100 font-bold text-lg md:text-xl leading-snug group-hover/item:text-white transition-colors">{action}</p>
                    <div className="w-12 h-1 bg-blue-600/30 rounded-full group-hover/item:w-24 group-hover/item:bg-blue-500 transition-all duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-10 py-12 px-10 bg-white/50 backdrop-blur-md rounded-[32px] border border-slate-100 mb-10 overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-[#0F172A] font-black text-2xl tracking-tight mb-2">Transform Results into Reality.</h3>
            <p className="text-slate-500 text-base font-medium">Join 5,000+ leaders building their future on Tita Gray's platform.</p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5">
            <button onClick={() => setActiveModal('retake')} className="w-full sm:w-auto flex items-center justify-center gap-2.5 border-2 border-slate-200 text-slate-700 font-black px-10 py-5 rounded-[24px] hover:border-slate-800 hover:text-[#0F172A] transition-all text-[11px] uppercase tracking-widest"><RotateCcw className="w-4 h-4" /> Retake</button>
            <button onClick={onBack} className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-emerald-500 text-white font-black px-10 py-5 rounded-[24px] hover:bg-emerald-600 hover:-translate-y-1 transition-all text-[11px] uppercase tracking-widest shadow-xl shadow-emerald-200">Access Resources <ArrowRight className="w-4 h-4" strokeWidth={3} /></button>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", top: "-9999px", left: "-9999px", pointerEvents: "none" }}>
        <ShareCard ref={shareCardRef} result={result} />
      </div>

      {/* Extracted Modals */}
      <SocialShareModal
        isOpen={activeModal === 'facebook' || activeModal === 'substack'}
        platform={(activeModal === 'facebook' || activeModal === 'substack') ? activeModal : 'facebook'}
        shareText={shareContent.text}
        onClose={() => setActiveModal(null)}
      />

      <RetakeModal
        isOpen={activeModal === 'retake'}
        onClose={() => setActiveModal(null)}
        onConfirm={onRetake}
      />

      <EmailShareModal
        isOpen={activeModal === 'email'}
        onClose={() => setActiveModal(null)}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
      ` }} />
    </div>
  );
}
