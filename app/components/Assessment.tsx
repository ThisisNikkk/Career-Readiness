"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, X, CheckCircle2 } from "lucide-react";
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
  const progress = Math.round(((currentQ) / totalQ) * 100);

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
    return <Results result={result} onRetake={() => { setStep("onboarding"); setAnswers({}); setCurrentQ(0); setOnboarding({ role: null, goal: null }); }} onBack={onBack} />;
  }

  if (step === "calculating") {
    return <CalculatingScreen />;
  }

  if (step === "onboarding") {
    return (
      <OnboardingStep
        data={onboarding}
        onChange={setOnboarding}
        onStart={() => setStep("quiz")}
        onExit={handleExit}
      />
    );
  }

  const q = questions[currentQ];
  const dimLabel = dimensionMeta[q.dimension].label;

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">

      {/* Header */}
      <div className="w-full px-6 md:px-16 pt-8 pb-6 flex items-center justify-between max-w-5xl mx-auto">
        <button onClick={handleExit} className="text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2 text-sm font-semibold">
          <X className="w-5 h-5" /> Exit
        </button>
        <span className="text-sm font-bold text-slate-400 tracking-widest uppercase">
          {currentQ + 1} / {totalQ}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5">
        <div
          className="h-full bg-[#2563EB] rounded-full transition-all duration-500"
          style={{ width: `${((currentQ + 1) / totalQ) * 100}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full mx-auto flex flex-col gap-10">

          {/* Dimension Pill */}
          <div className="flex items-center justify-center">
            <span className="bg-blue-50 text-[#2563EB] text-[11px] font-bold tracking-[0.18em] uppercase px-4 py-2 rounded-full border border-blue-100">
              {dimLabel}
            </span>
          </div>

          {/* Question */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#0F172A] leading-[1.3] tracking-tight">
              {q.text}
            </h2>
          </div>

          {/* Likert Scale */}
          <div className="flex flex-col gap-4">
            {likertLabels.map((label, idx) => {
              const val = idx + 1;
              const isSelected = selected === val;
              const isPrev = answers[q.id] === val && selected === null;
              return (
                <button
                  key={val}
                  onClick={() => handleAnswer(val)}
                  className={`w-full text-left px-6 py-5 rounded-2xl border-2 font-semibold text-base transition-all duration-200
                    ${isSelected
                      ? "bg-[#2563EB] border-[#2563EB] text-white scale-[0.99] shadow-lg shadow-blue-200"
                      : isPrev
                        ? "bg-blue-50 border-[#2563EB] text-[#2563EB]"
                        : "bg-white border-slate-200 text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 border ${isSelected ? "bg-white/20 border-white/40 text-white" : "border-slate-200 text-slate-400"}`}>
                      {val}
                    </span>
                    <span>{label}</span>
                    {isSelected && <CheckCircle2 className="w-5 h-5 ml-auto text-white/80" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <button onClick={handleBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm font-semibold transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {currentQ === 0 ? "Back to Start" : "Previous Question"}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

// ─── Onboarding Step ──────────────────────────────────────────────────────────

function OnboardingStep({
  data, onChange, onStart, onExit,
}: {
  data: OnboardingData;
  onChange: (d: OnboardingData) => void;
  onStart: () => void;
  onExit: () => void;
}) {
  const canStart = data.role !== null && data.goal !== null;

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">

      {/* Header */}
      <div className="w-full px-6 md:px-16 pt-8 flex items-center justify-between max-w-5xl mx-auto">
        <button onClick={onExit} className="text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2 text-sm font-semibold">
          <X className="w-5 h-5" /> Exit
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full mx-auto flex flex-col gap-10">

          {/* Header Text */}
          <div className="text-center flex flex-col gap-4">
            <div className="inline-flex self-center bg-blue-50 text-[#2563EB] text-[11px] font-bold tracking-[0.18em] uppercase px-4 py-2 rounded-full border border-blue-100 mb-2">
              Before We Begin
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] leading-tight tracking-tighter">
              Tell us a bit<br />about yourself.
            </h1>
            <p className="text-base md:text-lg text-slate-500 font-medium">
              This helps us personalize your results. Takes 10 seconds.
            </p>
          </div>

          {/* Role Level */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-black text-[#0F172A] uppercase tracking-[0.15em]">I am currently a...</h3>
            <div className="grid grid-cols-2 gap-3">
              {ROLE_OPTIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => onChange({ ...data, role: r })}
                  className={`px-5 py-4 rounded-2xl border-2 font-semibold text-sm transition-all ${data.role === r ? "bg-[#2563EB] border-[#2563EB] text-white shadow-lg shadow-blue-200" : "bg-white border-slate-200 text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB]"}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-black text-[#0F172A] uppercase tracking-[0.15em]">My primary career goal right now is to...</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GOAL_OPTIONS.map((g) => (
                <button
                  key={g}
                  onClick={() => onChange({ ...data, goal: g })}
                  className={`px-5 py-4 rounded-2xl border-2 font-semibold text-sm transition-all ${data.goal === g ? "bg-[#2563EB] border-[#2563EB] text-white shadow-lg shadow-blue-200" : "bg-white border-slate-200 text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB]"}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={onStart}
            disabled={!canStart}
            className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-bold text-base transition-all ${canStart ? "bg-[#2563EB] text-white hover:bg-blue-700 shadow-xl shadow-blue-200 hover:-translate-y-0.5" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
          >
            Start the Assessment <ArrowRight className="w-5 h-5" strokeWidth={3} />
          </button>

          <p className="text-center text-xs text-slate-400 font-medium">15 questions · ~3 minutes · No sign-up required</p>

        </div>
      </div>
    </div>
  );
}

// ─── Calculating Screen ───────────────────────────────────────────────────────

function CalculatingScreen() {
  const dims = DIMENSION_ORDER.map((d) => dimensionMeta[d].label);

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center gap-10 px-6">
      <div className="text-center flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full border-4 border-[#2563EB]/30 border-t-[#2563EB] animate-spin" />
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Analysing your profile...</h2>
        <p className="text-slate-400 text-base font-medium max-w-md">
          We're crunching your answers across 5 dimensions to build your personalised Career Readiness profile.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 justify-center max-w-lg">
        {dims.map((d, i) => (
          <span
            key={d}
            className="bg-white/5 border border-white/10 text-slate-300 text-xs font-bold px-4 py-2 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}
