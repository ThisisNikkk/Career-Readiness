"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Zap, ArrowRight, ShieldCheck, Star } from "lucide-react";

interface PlanProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isHighlighted?: boolean;
  buttonText: string;
  onSelect: () => void;
  icon: React.ReactNode;
}

function PlanCard({ title, price, description, features, isHighlighted, buttonText, onSelect, icon }: PlanProps) {
  return (
    <div
      className={`relative group flex flex-col p-8 rounded-[32px] transition-all duration-500 hover:scale-[1.02] ${isHighlighted
        ? "bg-slate-900 text-white shadow-2xl shadow-blue-500/20 border border-slate-800"
        : "bg-white text-slate-900 border border-slate-100 shadow-xl shadow-slate-200/50"
        }`}
    >
      {isHighlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-600/30">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-12 ${isHighlighted ? "bg-blue-600/20 text-blue-400" : "bg-blue-50 text-blue-600"
          }`}>
          {icon}
        </div>
        <h3 className="text-2xl font-black tracking-tight mb-2">{title}</h3>
        <p className={`text-sm leading-relaxed ${isHighlighted ? "text-slate-400" : "text-slate-500"}`}>
          {description}
        </p>
      </div>

      <div className="mb-8 flex items-baseline gap-1">
        <span className="text-4xl font-black tracking-tighter">${price}</span>
        <span className={`text-sm font-bold ${isHighlighted ? "text-slate-500" : "text-slate-400"}`}>/one-time</span>
      </div>

      <div className="flex-1 space-y-4 mb-10">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${isHighlighted ? "text-blue-400" : "text-blue-600"}`} />
            <span className="text-sm font-medium leading-tight">{feature}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onSelect}
        className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 ${isHighlighted
          ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
          : "bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20"
          }`}
      >
        {buttonText}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function SubscriptionScreen() {
  const router = useRouter();

  const handleStandard = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("career_assessment_plan", "standard");
    }
    router.push("/result");
  };

  const handleAdvanced = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("career_assessment_plan", "advanced");
    }
    router.push("/assessment?plan=advanced");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] font-black text-blue-600 tracking-[0.2em] uppercase">Results Secured</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-none">
            Your Career Analysis <br />
            <span className="text-blue-600">is Ready.</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Our algorithms have processed your answers. Choose a plan to unlock your full report and start your professional transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          <PlanCard
            title="Standard"
            price="9.99"
            description="Perfect for individual professionals seeking clarity on their current career readiness."
            features={[
              "Comprehensive 5-Dimension Score",
              "Detailed Gap Analysis",
              "Personalized Strengths Report",
              "Downloadable PDF Result"
            ]}
            buttonText="Unlock Results"
            onSelect={handleStandard}
            icon={<Star className="w-6 h-6" />}
          />

          <PlanCard
            title="Advanced"
            price="19.99"
            isHighlighted
            description="For those committed to elite performance. Deep dive into your potential."
            features={[
              "Everything in Standard",
              "25 Advanced Readiness Questions",
              "Strategic Growth Roadmap",
              "FREE 'Career Catalyst' Ebook",
              "Priority Support"
            ]}
            buttonText="Get Advanced Access"
            onSelect={handleAdvanced}
            icon={<Zap className="w-6 h-6" />}
          />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fade-in-up { 
          0% { opacity: 0; transform: translateY(20px); } 
          100% { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-in-up { 
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
      `}} />
    </div>
  );
}
