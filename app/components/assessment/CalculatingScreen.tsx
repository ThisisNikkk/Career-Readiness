"use client";

import React from "react";
import { BarChart3, CheckCircle2 } from "lucide-react";
import { DIMENSION_ORDER, dimensionMeta } from "../../utils/assessmentData";

export default function CalculatingScreen() {
  const dims = DIMENSION_ORDER.map((d) => dimensionMeta[d].label);

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center gap-12 px-6 relative overflow-hidden">
      {/* Sleek Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Subtle Professional Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />

      {/* Main Content Hub */}
      <div className="text-center flex flex-col items-center gap-10 relative z-10 max-w-3xl">

        {/* Professional Loader Group */}
        <div className="relative group">
          {/* External Ring */}
          <div className="w-32 h-32 rounded-full border border-slate-100 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border-t-2 border-accent-blue animate-spin" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-2 rounded-full border-b-2 border-slate-200 animate-spin-reverse" style={{ animationDuration: '4s' }} />

            {/* Center Icon Box */}
            <div className="w-20 h-20 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-xl relative overflow-hidden transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent" />
              <BarChart3 className="w-10 h-10 text-accent-blue" />

              {/* Scanning Beam */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent animate-scan" />
            </div>
          </div>

          {/* Subtle Orbiting Points */}
          <div className="absolute -top-4 -left-4 w-3 h-3 bg-accent-blue/40 rounded-full blur-[1px] animate-orbit" />
          <div className="absolute -bottom-4 -right-4 w-2 h-2 bg-slate-300 rounded-full blur-[0.5px] animate-orbit" style={{ animationDelay: '-2.5s' }} />
        </div>

        {/* Branding & Status */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white border border-slate-100 rounded-full shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
            </span>
            <span className="text-[11px] font-black text-accent-blue tracking-[0.25em] uppercase">Analysis In Progress</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-[#0F172A] tracking-tighter leading-[1.05]">
            Synthesizing Your <br />
            <span className="bg-gradient-to-r from-accent-blue to-indigo-600 bg-clip-text text-transparent">Professional DNA</span>
          </h2>

          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-lg mx-auto leading-relaxed">
            Benchmarking your profile across <span className="text-accent-blue font-black">5 critical metrics</span> to generate your personalized readiness roadmap.
          </p>
        </div>
      </div>

      {/* Progress Chips (Light Mode) */}
      <div className="flex flex-wrap gap-4 justify-center max-w-2xl relative z-10 px-4">
        {dims.map((d, i) => (
          <div
            key={d}
            className="group bg-white border border-slate-100 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            style={{
              animation: 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: `${i * 0.15 + 0.8}s`
            }}
          >
            <div className="w-5 h-5 rounded-full bg-accent-blue/10 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue" />
            </div>
            <span className="text-slate-600 text-xs font-black uppercase tracking-widest leading-none">
              {d}
            </span>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scan { 0% { transform: translateY(-10px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(80px); opacity: 0; } }
        @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes orbit { 0% { transform: rotate(0deg) translateX(80px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        .animate-scan { animation: scan 2.5s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 8s linear infinite; }
        .animate-orbit { animation: orbit 10s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
      ` }} />
    </div>
  );
}
