"use client";

import React from "react";
import { ArrowRight, Sparkles, Zap, Target, Brain, Users, Eye, Clock, BarChart3 } from "lucide-react";

interface AdvancedUnlockModalProps {
  onStart: () => void;
  onClose: () => void;
}

const DIMENSION_PREVIEWS = [
  { label: "Clarity", icon: <Target className="w-4 h-4" />, color: "text-blue-500 bg-blue-50 border-blue-100" },
  { label: "Ownership", icon: <Zap className="w-4 h-4" />, color: "text-amber-500 bg-amber-50 border-amber-100" },
  { label: "Curiosity", icon: <Brain className="w-4 h-4" />, color: "text-violet-500 bg-violet-50 border-violet-100" },
  { label: "Confidence", icon: <Eye className="w-4 h-4" />, color: "text-emerald-500 bg-emerald-50 border-emerald-100" },
  { label: "Network & Visibility", icon: <Users className="w-4 h-4" />, color: "text-rose-500 bg-rose-50 border-rose-100" },
];

export default function AdvancedUnlockModal({ onStart, onClose }: AdvancedUnlockModalProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-[24px] sm:rounded-[32px] shadow-2xl overflow-hidden animate-modal-enter border border-slate-100 flex flex-col max-h-[90vh]">

        {/* Gradient Top Accent */}
        <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500" />

        {/* Header */}
        <div className="px-5 sm:px-8 pt-8 sm:pt-10 pb-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full mb-5 border border-blue-100/50">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] font-black text-blue-600 tracking-[0.2em] uppercase">Advanced Unlocked</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tighter leading-tight">
            Premium Access<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Activated.</span>
          </h2>
          <p className="mt-4 text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
            You&apos;ve unlocked <span className="text-blue-600 font-bold">25 advanced questions</span> that go deeper into each dimension. Your results will use a blended score for premium-grade insights.
          </p>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 pb-6 custom-scrollbar">
          <div className="grid gap-5">

            {/* Dimension Grid */}
            <div className="bg-slate-50/50 rounded-2xl p-5 sm:p-6 border border-slate-100">
              <h4 className="font-bold text-[#0F172A] text-base mb-4 flex items-center gap-2">
                <BarChart3 className="w-4.5 h-4.5 text-blue-600" />
                5 Advanced Questions per Dimension
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DIMENSION_PREVIEWS.map((dim) => (
                  <div key={dim.label} className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${dim.color} transition-all hover:scale-[1.02]`}>
                    <div className="shrink-0">{dim.icon}</div>
                    <span className="text-sm font-bold text-[#0F172A]">{dim.label}</span>
                    <span className="ml-auto text-[9px] font-black uppercase tracking-wider opacity-50">+5 Qs</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Cards Row */}
            <div className="grid grid-cols-2 gap-3">
              {/* Scoring Info */}
              <div className="bg-blue-50/40 rounded-2xl p-5 border border-blue-100/50">
                <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 border border-blue-100/30">
                  <BarChart3 className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Blended Scoring</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  70% core + 30% advanced for deeper, more precise results.
                </p>
              </div>

              {/* Time Info */}
              <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 border border-slate-100">
                  <Clock className="w-4.5 h-4.5 text-slate-400" />
                </div>
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time Estimate</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  ~5-7 additional minutes. Your core answers are saved.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 sm:px-8 py-6 sm:py-8 border-t border-slate-50 bg-slate-50/20 flex flex-col gap-3">
          <button
            onClick={onStart}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 rounded-2xl font-black text-sm tracking-widest uppercase shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30 transition-all hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3 group"
          >
            Start Advanced Questions
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={3} />
          </button>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-primary text-[10px] font-black uppercase tracking-[0.2em] transition-colors py-2"
          >
            Go Back
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modal-enter { 
          from { opacity: 0; transform: scale(0.95) translateY(20px); } 
          to { opacity: 1; transform: scale(1) translateY(0); } 
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-modal-enter { animation: modal-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      ` }} />
    </div>
  );
}
