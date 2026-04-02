"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, X, CheckCircle2, BarChart3 } from "lucide-react";
import {
  questions,
  likertLabels,
  calculateResults,
  DIMENSION_ORDER,
  dimensionMeta,
  type RoleLevel,
  type Goal,
  type AssessmentResult,
} from "../utils/assessmentData";
import Results from "./Results";

type Step = "onboarding" | "quiz" | "calculating" | "results";

const ROLE_OPTIONS: RoleLevel[] = ["Student", "Early Career", "Mid", "Senior"];
const GOAL_OPTIONS: Goal[] = ["Grow in current role", "Pivot", "Leadership", "Entrepreneurship"];

interface OnboardingData {
  role: RoleLevel | null;
  goal: Goal | null;
}

// ─── Visual Sidebar Component ───────────────────────────────────────────

const DIMENSION_IMAGES: Record<string, string> = {
  clarity: "/4.png",
  ownership: "/2.png",
  curiosity: "/5.png",
  confidence: "/1.png",
  network: "/3.png",
};

function VisualSidebar({ activeDimension }: { activeDimension?: string }) {
  const imageUrl = activeDimension ? DIMENSION_IMAGES[activeDimension] : "/6.png";
  const dimensionLabel = activeDimension ? dimensionMeta[activeDimension as keyof typeof dimensionMeta]?.label : null;

  return (
    <div className="hidden lg:flex relative w-full h-full items-center justify-center p-12 bg-slate-50/20">

      {/* Central Hub Container */}
      <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">

        {dimensionLabel && (
          <div className="absolute -top-24 left-0 w-full text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-blue/10 rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
              <span className="text-[10px] font-black text-accent-blue tracking-[0.2em] uppercase leading-none">Current Metric</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tighter leading-none">
              {dimensionLabel}
            </h2>
          </div>
        )}

        {/* Main Illustration Box */}
        <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-100 flex flex-col items-center justify-center p-10 z-10 transition-all duration-500">
          <img
            key={imageUrl}
            src={imageUrl}
            alt={dimensionLabel ? `${dimensionLabel} illustration` : "Professional"}
            className="w-full h-full object-contain animate-fade-in-up"
          />
          {/* Soft overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        </div>
        {!activeDimension && (
          <>
            {/* Floating Card: Community (Top Right) */}
            <div className="absolute top-10 -right-8 bg-accent-blue/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4 text-white animate-float z-20">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-accent-blue bg-white overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="avatar" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-accent-blue bg-white flex items-center justify-center text-accent-blue text-[10px] font-bold">
                  +10k
                </div>
              </div>
              <div className="text-[10px] font-bold leading-tight uppercase tracking-wider">
                Join 10,000+<br />Professionals
              </div>
            </div>

            {/* Floating Card: Strategy (Right Middle) */}
            <div className="absolute top-1/2 -right-16 transform -translate-y-1/2 bg-white/95 backdrop-blur-md p-5 rounded-[24px] shadow-2xl flex flex-col gap-3 border border-blue-50 hover:scale-105 transition-transform max-w-[180px] animate-float z-20" style={{ animationDelay: '1s' }}>
              <div className="w-10 h-10 bg-accent-blue/10 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-accent-blue" />
              </div>
              <div>
                <div className="text-lg font-bold text-primary mb-1 tracking-tight leading-none">Strategy</div>
                <div className="text-[11px] text-slate-500 font-medium leading-relaxed mt-2">
                  Identify your gaps and get a tailored growth plan.
                </div>
              </div>
            </div>

            {/* Floating Card: Analysis (Bottom Left) */}
            <div className="absolute bottom-10 -left-12 bg-white/95 backdrop-blur-md p-6 rounded-[24px] shadow-2xl flex flex-col gap-2 border border-blue-50 animate-float z-20 shadow-blue-200/20" style={{ animationDelay: '1.5s' }}>
              <div className="text-[10px] font-black tracking-widest text-accent-blue uppercase">Analysis</div>
              <div className="text-primary font-bold text-xl leading-none">5 Dimensions</div>
              <div className="text-accent-blue text-[11px] font-bold mt-1">Ready in 3 mins</div>
            </div>
          </>
        )}

      </div>

    </div>
  );
}

export default function Assessment({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<Step>("onboarding");
  const [onboarding, setOnboarding] = useState<OnboardingData>({ role: null, goal: null });
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state on mount
  useEffect(() => {
    const saved = localStorage.getItem("assessmentState");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.step) setStep(parsed.step);
        if (parsed.onboarding) setOnboarding(parsed.onboarding);
        if (typeof parsed.currentQ === 'number') setCurrentQ(parsed.currentQ);
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.result) setResult(parsed.result);
      } catch (e) {
        console.error("Failed to parse assessment state", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save state on change
  useEffect(() => {
    if (isLoaded) {
      const state = { step, onboarding, currentQ, answers, result };
      localStorage.setItem("assessmentState", JSON.stringify(state));
    }
  }, [step, onboarding, currentQ, answers, result, isLoaded]);

  // Clear state on exit/back
  const handleExit = () => {
    localStorage.removeItem("assessmentState");
    localStorage.removeItem("appMode");
    onBack();
  };

  if (!isLoaded) return <div className="min-h-screen bg-[#FDFDFD]" />;

  const totalQ = questions.length;
  // const progress = Math.round(((currentQ) / totalQ) * 100);

  function handleAnswer(value: number) {
    setSelected(value);
    setTimeout(() => {
      const qId = questions[currentQ].id;
      const newAnswers = { ...answers, [qId]: value };
      setAnswers(newAnswers);
      setSelected(null);

      if (currentQ < totalQ - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        // Last question — calculate
        setStep("calculating");
        setTimeout(() => {
          setResult(calculateResults(newAnswers));
          setStep("results");
        }, 2800);
      }
    }, 350);
  }

  function handleBack() {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    } else {
      setStep("onboarding");
    }
  }

  if (step === "results" && result) {
    return (
      <Results
        result={result}
        onRetake={() => {
          setStep("onboarding");
          setAnswers({});
          setCurrentQ(0);
          setOnboarding({ role: null, goal: null });
        }}
        onBack={onBack}
      />
    );
  }

  if (step === "calculating") {
    return <CalculatingScreen />;
  }

  const q = questions[currentQ];
  const dimLabel = dimensionMeta[q.dimension].label;

  return (
    <div className="min-h-screen bg-white relative font-sans selection:bg-accent-blue/10 selection:text-accent-blue overflow-hidden flex flex-col">
      {/* Background patterns */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: "radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 20%, white 100%)",
        }}
      />

      {/* Progress Bar Top */}
      <div className="fixed top-0 left-0 w-full bg-slate-100 h-1 z-[100]">
        <div
          className="h-full bg-accent-blue transition-all duration-700 ease-out shadow-[0_0_12px_rgba(59,130,246,0.5)]"
          style={{ width: step === "onboarding" ? "0%" : `${((currentQ + 1) / totalQ) * 100}%` }}
        />
      </div>

      <div className="relative z-10 flex-1 grid lg:grid-cols-2 min-h-screen">

        {/* Left Column: Interactive */}
        <div className="flex flex-col h-full bg-white/40 backdrop-blur-sm border-r border-slate-100">

          {/* Internal Header */}
          <div className="w-full px-6 md:px-12 pt-8 pb-4 flex items-center justify-between">
            <button
              onClick={handleExit}
              className="group flex items-center gap-2.5 text-slate-400 hover:text-primary transition-all font-bold text-xs tracking-widest uppercase bg-white/50 px-4 py-2 rounded-full border border-slate-100 hover:border-slate-200 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 transition-transform" /> Go Back
            </button>
            {step !== "onboarding" && (
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-slate-300 tracking-[0.2em] uppercase">Step</span>
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 border border-blue-100 text-accent-blue font-black tabular-nums shadow-sm">
                  {currentQ + 1}
                </span>
                <span className="text-[10px] font-black text-slate-300 tracking-[0.2em] uppercase">of {totalQ}</span>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto px-6 md:px-12 py-10 flex flex-col justify-center">
            <div className="max-w-xl w-full mx-auto">
              {step === "onboarding" ? (
                <OnboardingStep
                  data={onboarding}
                  onChange={setOnboarding}
                  onStart={() => setStep("quiz")}
                  onExit={handleExit}
                />
              ) : (
                <div className="flex flex-col gap-10 animate-fade-in-up">
                  {/* Dimension Pill */}
                  <div className="flex items-center gap-3 bg-blue-50/50 self-start px-4 py-1.5 rounded-full border border-blue-100/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                    <span className="text-[10px] font-black tracking-[0.2em] text-accent-blue uppercase">
                      {dimLabel}
                    </span>
                  </div>

                  {/* Question */}
                  <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-[1.1] tracking-tight">
                    {q.text}
                  </h2>

                  {/* Likert Scale */}
                  <div className="flex flex-col gap-3">
                    {likertLabels.map((label, idx) => {
                      const val = idx + 1;
                      const isSelected = selected === val;
                      const isPrev = answers[q.id] === val && selected === null;

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
                          onClick={() => handleAnswer(val)}
                          className={`group w-full text-left px-7 py-5 rounded-[24px] border-2 font-bold text-base transition-all duration-300 relative overflow-hidden
                            ${isSelected
                              ? `${colors.active} shadow-xl scale-[0.98]`
                              : isPrev
                                ? `${colors.base} opacity-100`
                                : `${colors.base}`
                            }`}
                        >
                          <div className="flex items-center gap-5 relative z-10">
                            <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0 border-2 transition-all
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
                  <div className="mt-4 flex items-center justify-between pt-8 border-t border-slate-100">
                    <button onClick={handleBack} className="flex items-center gap-2.5 text-slate-400 hover:text-primary text-[11px] font-black uppercase tracking-widest transition-all">
                      <ArrowLeft className="w-4 h-4" />
                      {currentQ === 0 ? "Back to Start" : "Previous"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Visuals */}
        <VisualSidebar activeDimension={step === "onboarding" ? undefined : q?.dimension} />

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(15px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes bounce-short { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-bounce-short { animation: bounce-short 0.5s ease-in-out 1; }
      `}} />
    </div>
  );
}

// ─── Onboarding Step ──────────────────────────────────────────────────────────

function OnboardingStep({
  data, onChange, onStart,
}: {
  data: OnboardingData;
  onChange: (d: OnboardingData) => void;
  onStart: () => void;
  onExit: () => void;
}) {
  const canStart = data.role !== null && data.goal !== null;

  return (
    <div className="flex flex-col gap-10 animate-fade-in-up">
      {/* Header Text */}
      <div className="flex flex-col gap-4">
        <div className="inline-flex self-start bg-blue-50/80 backdrop-blur-sm text-accent-blue text-[10px] font-black tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-blue-100/50 mb-2">
          Step 01: Identification
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-[1.05] tracking-tighter">
          Tell us a bit<br />about yourself.
        </h1>
        <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-md">
          This helps us personalize your results and benchmark your readiness against peers.
        </p>
      </div>

      {/* Role Level */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-black text-slate-300 uppercase tracking-[0.2em]">Current Professional Level</h3>
        <div className="grid grid-cols-2 gap-3">
          {ROLE_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => onChange({ ...data, role: r })}
              className={`px-5 py-4 rounded-[20px] border-2 font-bold text-md transition-all duration-300 ${data.role === r ? "bg-accent-blue border-accent-blue text-white shadow-lg shadow-accent-blue/20 scale-[0.98]" : "bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50/50"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Goal */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-black text-slate-300 uppercase tracking-[0.2em]">Primary Career Objective</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {GOAL_OPTIONS.map((g) => (
            <button
              key={g}
              onClick={() => onChange({ ...data, goal: g })}
              className={`px-5 py-4 rounded-[20px] border-2 font-bold text-md transition-all duration-300 ${data.goal === g ? "bg-accent-blue border-accent-blue text-white shadow-lg shadow-accent-blue/20 scale-[0.98]" : "bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50/50"}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div className="pt-6 border-t border-slate-100">
        <button
          onClick={onStart}
          disabled={!canStart}
          className={`w-full group flex items-center justify-center gap-3 py-5 rounded-[24px] font-black text-base transition-all duration-300 ${canStart ? "bg-accent-blue text-white hover:bg-blue-600 shadow-xl shadow-accent-blue/30 hover:-translate-y-1" : "bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed"}`}
        >
          Check My Readiness <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${canStart ? "group-hover:translate-x-1" : ""}`} strokeWidth={3} />
        </button>

        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">20 Questions</span>
          </div>
          <div className="w-px h-3 bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">~3 Minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Calculating Screen ───────────────────────────────────────────────────────

function CalculatingScreen() {
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

