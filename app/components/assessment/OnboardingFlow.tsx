"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { RoleLevel, Goal } from "../../utils/assessmentData";

const ROLE_OPTIONS: RoleLevel[] = ["Student", "Early Career", "Mid", "Senior"];
const GOAL_OPTIONS: Goal[] = ["Grow in current role", "Pivot", "Leadership", "Entrepreneurship"];

interface OnboardingData {
  role: RoleLevel | null;
  goal: Goal | null;
}

interface OnboardingFlowProps {
  data: OnboardingData;
  onChange: (d: OnboardingData) => void;
  onStart: () => void;
}

export default function OnboardingFlow({
  data, onChange, onStart,
}: OnboardingFlowProps) {
  const canStart = data.role !== null && data.goal !== null;

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      {/* Header Text */}
      <div className="flex flex-col gap-3">
        <div className="inline-flex self-start bg-blue-50/80 backdrop-blur-sm text-accent-blue text-[10px] font-black tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-blue-100/50 mb-1">
          Step 01: Identification
        </div>
        <h1 className="text-3xl md:text-[44px] font-black text-[#0F172A] leading-[1.05] tracking-tighter">
          Tell us a bit<br />about yourself.
        </h1>
        <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-md">
          This helps us personalize your results and benchmark your readiness against peers.
        </p>
      </div>

      {/* Role Level */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Current Professional Level</h3>
        <div className="grid grid-cols-2 gap-3">
          {ROLE_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => onChange({ ...data, role: r })}
              className={`px-4 py-4 rounded-[16px] border-2 font-bold text-[15px] transition-all duration-300 ${data.role === r ? "bg-accent-blue border-accent-blue text-white shadow-lg shadow-accent-blue/20 scale-[0.98]" : "bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50/50"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Goal */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Primary Career Objective</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {GOAL_OPTIONS.map((g) => (
            <button
              key={g}
              onClick={() => onChange({ ...data, goal: g })}
              className={`px-4 py-4 rounded-[16px] border-2 font-bold text-[15px] transition-all duration-300 ${data.goal === g ? "bg-accent-blue border-accent-blue text-white shadow-lg shadow-accent-blue/20 scale-[0.98]" : "bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50/50"}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={onStart}
          disabled={!canStart}
          className={`w-full group flex items-center justify-center gap-3 py-4 rounded-[20px] font-black text-sm transition-all duration-300 ${canStart ? "bg-accent-blue text-white hover:bg-blue-600 shadow-xl shadow-accent-blue/30 hover:-translate-y-1" : "bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed"}`}
        >
          Check My Readiness <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${canStart ? "group-hover:translate-x-1" : ""}`} strokeWidth={3} />
        </button>

        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-emerald-400" />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">20 Questions</span>
          </div>
          <div className="w-px h-2.5 bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-amber-400" />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">~3 Minutes</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(15px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
}
