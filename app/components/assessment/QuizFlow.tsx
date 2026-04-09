"use client";

import React from "react";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { Question, dimensionMeta, likertLabels } from "../../utils/assessmentData";

interface QuizFlowProps {
  question: Question;
  currentQ: number;
  totalQ: number;
  answers: Record<number, number>;
  selected: number | null;
  onAnswer: (value: number) => void;
  onBack: () => void;
  isAdvanced?: boolean;
}

export default function QuizFlow({
  question,
  currentQ,
  totalQ,
  answers,
  selected,
  onAnswer,
  onBack,
  isAdvanced,
}: QuizFlowProps) {
  const dimLabel = dimensionMeta[question.dimension].label;

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">

      {/* Advanced Indicator */}
      {/* {isAdvanced && (
        <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-100/50">
          <Sparkles className="w-3 h-3 text-blue-600" />
          <span className="text-[9px] font-black text-blue-600 tracking-[0.15em] uppercase">Advanced Question</span>
        </div>
      )} */}

      {/* Question */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A] leading-[1.1] tracking-tight">
        {question.text}
      </h2>

      {/* Likert Scale */}
      <div className="flex flex-col gap-3">
        {likertLabels.map((label, idx) => {
          const val = idx + 1;
          const isSelected = selected === val;
          const isPrev = answers[question.id] === val && selected === null;

          // Semantic Color Map
          const colors = [
            { base: "border-red-100 text-red-600 bg-red-50/30 hover:border-red-200 hover:bg-red-50/50", active: "bg-red-500 border-red-500 text-white shadow-red-200", icon: "text-red-200" },
            { base: "border-orange-100 text-orange-600 bg-orange-50/30 hover:border-orange-200 hover:bg-orange-50/50", active: "bg-orange-500 border-orange-500 text-white shadow-orange-200", icon: "text-orange-200" },
            { base: "border-slate-100 text-slate-600 bg-slate-50/30 hover:border-slate-200 hover:bg-slate-50/50", active: "bg-slate-500 border-slate-500 text-white shadow-slate-200", icon: "text-slate-200" },
            { base: "border-blue-100 text-accent-blue bg-blue-50/30 hover:border-blue-200 hover:bg-blue-50/50", active: "bg-accent-blue border-accent-blue text-white shadow-blue-200", icon: "text-blue-200" },
            { base: "border-emerald-100 text-emerald-600 bg-emerald-50/30 hover:border-emerald-200 hover:bg-emerald-50/50", active: "bg-emerald-500 border-emerald-500 text-white shadow-emerald-200", icon: "text-emerald-200" },
          ][idx];

          return (
            <button
              key={val}
              onClick={() => onAnswer(val)}
              className={`group w-full text-left px-4 sm:px-6 py-3 sm:py-4 rounded-[20px] border-2 font-bold text-sm sm:text-[15px] transition-all duration-300 relative overflow-hidden
                ${isSelected
                  ? `${colors.active} shadow-xl scale-[0.98]`
                  : isPrev
                    ? `${colors.base} opacity-100`
                    : `${colors.base}`
                }`}
            >
              <div className="flex items-center gap-3 sm:gap-5 relative z-10">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 border-2 transition-all
                  ${isSelected
                    ? "bg-white/10 border-white/20 text-white"
                    : `border-transparent bg-white/50 ${colors.icon} group-hover:scale-110`}`}>
                  {val}
                </span>
                <span className="flex-1">{label}</span>
                {isSelected && <CheckCircle2 className="w-6 h-6 mr-1 text-white animate-bounce-short" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-2 flex items-center justify-between pt-4 border-t border-slate-100">
        <button onClick={onBack} className="flex items-center gap-2.5 text-slate-400 hover:text-primary text-[11px] font-black uppercase tracking-widest transition-all">
          <ArrowLeft className="w-4 h-4" />
          {currentQ === 0 ? "Back to Start" : "Previous"}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(15px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes bounce-short { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .animate-fade-in-up { animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-bounce-short { animation: bounce-short 0.5s ease-in-out 1; }
      `}} />
    </div>
  );
}
