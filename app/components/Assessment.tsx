"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, BarChart3 } from "lucide-react";
import {
  calculateResults,
  type RoleLevel,
  type Goal,
  type Question,
  type Dimension,
} from "../utils/assessmentData";

// Sub-components
import OnboardingFlow from "./assessment/OnboardingFlow";
import QuizFlow from "./assessment/QuizFlow";
import CalculatingScreen from "./assessment/CalculatingScreen";
import PreAssessmentModal from "./assessment/PreAssessmentModal";

type Step = "onboarding" | "quiz" | "calculating" | "results";

interface OnboardingData {
  role: RoleLevel | null;
  goal: Goal | null;
}

interface AssessmentMetadata {
  questions: Question[];
  dimensionMeta: Record<string, { label: string; weight: number }>;
  DIMENSION_ORDER: string[];
  likertLabels: string[];
}

interface AssessmentProps {
  onBack?: () => void;
  initialMetadata: AssessmentMetadata;
}

// ─── Visual Sidebar Component ───────────────────────────────────────────

const DIMENSION_IMAGES: Record<string, string> = {
  clarity: "/clarity.png",
  ownership: "/ownership.png",
  curiosity: "/curiosity.png",
  confidence: "/confidence.png",
  network: "/network.png",
};

function VisualSidebar({
  activeDimension,
  dimensionMeta
}: {
  activeDimension?: string;
  dimensionMeta: Record<string, { label: string; weight: number }>
}) {
  const imageUrl = activeDimension ? DIMENSION_IMAGES[activeDimension] : "/onboard.png";
  const dimensionLabel = activeDimension ? dimensionMeta[activeDimension]?.label : null;

  return (
    <div className="hidden lg:flex sticky top-0 h-screen w-full items-center justify-center p-12 bg-slate-50/20 overflow-hidden">
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

        <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-100 flex flex-col items-end justify-center z-10 transition-all duration-500">
          <Image
            key={imageUrl}
            src={imageUrl}
            alt={dimensionLabel ? `${dimensionLabel} illustration` : "Professional"}
            width={800}
            height={800}
            className="w-full h-auto object-contain origin-bottom animate-fade-in-up"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        </div>

        {!activeDimension && (
          <>
            <div className="absolute top-10 -right-8 bg-accent-blue/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4 text-white animate-float z-20">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-accent-blue bg-white overflow-hidden relative">
                    <Image
                      src={`https://i.pravatar.cc/100?img=${i + 20}`}
                      alt="avatar"
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
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

export default function Assessment({ onBack, initialMetadata }: AssessmentProps) {
  const router = useRouter();
  const { questions, dimensionMeta, totalQ } = {
    ...initialMetadata,
    totalQ: initialMetadata.questions.length
  };

  const [step, setStep] = useState<Step>("onboarding");
  const [onboarding, setOnboarding] = useState<OnboardingData>({ role: null, goal: null });
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [showPreModal, setShowPreModal] = useState(false);

  // Robust fix for the retake flow landing on the calculating screen
  React.useEffect(() => {
    // Clear any existing results to enforce a fresh completion for access to results/checkout
    if (typeof window !== "undefined") {
      localStorage.removeItem("career_assessment_result");
    }
    
    setStep("onboarding");
    setOnboarding({ role: null, goal: null });
    setCurrentQ(0);
    setAnswers({});
    setSelected(null);
    setShowPreModal(false);
  }, []);

  const handleExit = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/");
    }
  };

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
        setStep("calculating");
        const res = calculateResults(newAnswers);
        if (typeof window !== "undefined") {
          localStorage.setItem("career_assessment_result", JSON.stringify(res));
        }
        setTimeout(() => {
          router.push("/checkout");
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

  if (step === "calculating") {
    return <CalculatingScreen />;
  }

  const q = questions[currentQ];

  return (
    <div className="h-screen bg-white relative font-sans selection:bg-accent-blue/10 selection:text-accent-blue overflow-hidden flex flex-col">
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

      <div className="fixed top-0 left-0 w-full bg-slate-100 h-1 z-[100]">
        <div
          className="h-full bg-accent-blue transition-all duration-700 ease-out shadow-[0_0_12px_rgba(59,130,246,0.5)]"
          style={{ width: step === "onboarding" ? "0%" : `${((currentQ + 1) / totalQ) * 100}%` }}
        />
      </div>

      <div className="relative z-10 flex-1 grid lg:grid-cols-2 h-full overflow-hidden">
        <div className="flex flex-col bg-white/40 backdrop-blur-sm border-r border-slate-100">
          <div className="w-full px-4 sm:px-8 md:px-12 pt-6 sm:pt-10 pb-4 flex items-center justify-between">
            <button
              onClick={handleExit}
              className="group flex items-center gap-2.5 text-slate-400 hover:text-primary transition-all font-bold text-xs tracking-widest uppercase bg-white/50 px-5 py-2.5 rounded-full border border-slate-100 hover:border-slate-200 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Go Back
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

          <div className="flex-1 px-4 sm:px-8 md:px-12 py-6 flex flex-col justify-center overflow-hidden">
            <div className="max-w-xl w-full mx-auto lg:-mt-16">
              {step === "onboarding" ? (
                <OnboardingFlow
                  data={onboarding}
                  onChange={setOnboarding}
                  onStart={() => setShowPreModal(true)}
                />
              ) : (
                <QuizFlow
                  question={q}
                  currentQ={currentQ}
                  totalQ={totalQ}
                  answers={answers}
                  selected={selected}
                  onAnswer={handleAnswer}
                  onBack={handleBack}
                />
              )}
            </div>
          </div>
        </div>

        <VisualSidebar
          activeDimension={step === "onboarding" ? undefined : q?.dimension}
          dimensionMeta={dimensionMeta}
        />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(15px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}} />

      {showPreModal && (
        <PreAssessmentModal
          onStart={() => {
            setShowPreModal(false);
            setStep("quiz");
          }}
          onClose={() => setShowPreModal(false)}
        />
      )}
    </div>
  );
}

