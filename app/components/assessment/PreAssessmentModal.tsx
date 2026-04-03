"use client";

import React from "react";
import { ArrowRight, Sparkles, BarChart3, Lightbulb, Info } from "lucide-react";

interface PreAssessmentModalProps {
  onStart: () => void;
  onClose: () => void;
}

export default function PreAssessmentModal({ onStart, onClose }: PreAssessmentModalProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-[24px] sm:rounded-[32px] shadow-2xl overflow-hidden animate-modal-enter border border-slate-100 flex flex-col max-h-[90vh]">

        {/* Decorative Top Accent */}
        <div className="h-2 w-full bg-gradient-to-r from-accent-blue via-indigo-500 to-accent-blue" />

        {/* Header content */}
        <div className="px-8 pt-10 pb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent-blue" />
            <span className="text-[10px] font-black text-accent-blue tracking-[0.2em] uppercase">Before You Start</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tighter leading-tight">
            Let's Set The Stage.
          </h2>
          <p className="mt-4 text-slate-500 font-medium max-w-md mx-auto">
            To get the most accurate results, please keep the following guidelines in mind as you answer.
          </p>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
          <div className="grid gap-6">

            {/* Instruction Card 1: Likert Scale */}
            <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5 text-accent-blue" />
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-lg">The Rating System</h4>
                    <p className="text-sm text-slate-500 mt-1">Questions are based on a 5-point scale. Choose the value that best represents your current reality.</p>
                  </div>

                  {/* Visual Scale Explanation (Desktop) */}
                  <div className="hidden sm:grid grid-cols-5 gap-3 pt-4">
                    {[1, 2, 3, 4, 5].map((val) => {
                      const meta = [
                        { label: "Strongly Disagree", desc: "Completely inconsistent with your experience." },
                        { label: "Disagree", desc: "Mostly differs from your general opinion." },
                        { label: "Neutral", desc: "Undecided or the statement does not apply strongly." },
                        { label: "Agree", desc: "Generally matches your experience with minor exceptions." },
                        { label: "Strongly Agree", desc: "Fully reflects your feelings, beliefs, or experience." }
                      ][val - 1];

                      return (
                        <div key={val} className="flex flex-col items-center gap-3">
                          <div className={`w-full aspect-[1/1] rounded-2xl flex items-center justify-center font-black text-[9px] sm:text-[11px] text-center px-1.5 border-2 transition-all hover:scale-105 hover:shadow-md uppercase leading-tight
                            ${val === 1 ? 'border-red-100 bg-red-50/50 text-red-500' :
                              val === 2 ? 'border-orange-100 bg-orange-50/50 text-orange-500' :
                                val === 3 ? 'border-slate-100 bg-slate-50/50 text-slate-500' :
                                  val === 4 ? 'border-blue-100 bg-blue-50/50 text-blue-500' :
                                    'border-emerald-100 bg-emerald-50/50 text-emerald-500'}`}
                          >
                            {meta.label}
                          </div>
                          <div className="flex flex-col items-center text-center gap-1.5 px-0.5 min-h-[40px]">
                            <span className="text-[10px] font-medium text-slate-400 leading-tight hidden sm:block">
                              {meta.desc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Mobile-only descriptions */}
                  <div className="sm:hidden flex flex-col gap-3 mt-4 pt-4 border-t border-slate-100">
                    {[1, 2, 3, 4, 5].map((val) => {
                      const meta = [
                        { label: "Strongly Disagree", desc: "Completely inconsistent with your experience." },
                        { label: "Disagree", desc: "Mostly differs from your general opinion." },
                        { label: "Neutral", desc: "Undecided or the statement does not apply strongly." },
                        { label: "Agree", desc: "Generally matches your experience with minor exceptions." },
                        { label: "Strongly Agree", desc: "Fully reflects your feelings, beliefs, or experience." }
                      ][val - 1];
                      return (
                        <div key={val} className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border-2
                            ${val === 1 ? 'border-red-100 bg-red-50 text-red-500' : 
                              val === 2 ? 'border-orange-100 bg-orange-50 text-orange-500' : 
                              val === 3 ? 'border-slate-100 bg-slate-50 text-slate-500' : 
                              val === 4 ? 'border-blue-100 bg-blue-50 text-blue-500' : 
                              'border-emerald-100 bg-emerald-50 text-emerald-500'}`}>
                            {val}
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[11px] font-black uppercase tracking-tight text-[#0F172A]">
                              {meta.label}
                            </span>
                            <span className="text-[10px] text-slate-500 leading-tight">
                              {meta.desc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Instruction Card 2: Brutal Honesty */}
            <div className="bg-blue-50/30 rounded-2xl p-6 border border-blue-100/50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-blue-100/30 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-lg">Be Brutally Honest</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                    There are no "right" or "wrong" answers. This is a tool for <span className="text-accent-blue font-bold">your growth</span>. Answering based on how you actually behave, rather than how you wish you did will give you the most actionable roadmap.
                  </p>
                </div>
              </div>
            </div>

            {/* Instruction Card 3: Quick Pulse */}
            <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                  <Info className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-lg">Trust Your Gut</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                    The assessment takes about <span className="text-[#0F172A] font-bold">3 minutes</span>. Don't overthink it—your first instinct is usually the most accurate reflection of your professional state.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-8 border-t border-slate-50 bg-slate-50/20 flex flex-col gap-3">
          <button
            onClick={onStart}
            className="w-full bg-accent-blue text-white py-5 rounded-2xl font-black text-sm tracking-widest uppercase shadow-xl shadow-accent-blue/20 hover:bg-blue-600 transition-all hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3 group"
          >
            I'm Ready, Let's Start
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
