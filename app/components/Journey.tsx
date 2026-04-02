import React from "react";
import { ClipboardCheck, BarChart3, Rocket, ArrowRight } from "lucide-react";

export default function Journey({ onStartAssessment }: { onStartAssessment?: () => void }) {
  const steps = [
    {
      number: "01",
      title: "The Assessment",
      description: "Complete a targeted 20-question diagnostic designed to pinpoint your exact career readiness state in under 3 minutes.",
      icon: <ClipboardCheck className="w-6 h-6 text-accent-blue" />,
    },
    {
      number: "02",
      title: "The Analysis",
      description: "Receive instant, real-time feedback across the five core dimensions of professional growth—identifying both strengths and hidden gaps.",
      icon: <BarChart3 className="w-6 h-6 text-accent-blue" />,
    },
    {
      number: "03",
      title: "The Playbook",
      description: "Unlock your career archetype and a personalized 30-day action plan to move from where you are to where you want to be.",
      icon: <Rocket className="w-6 h-6 text-accent-blue" />,
    },
  ];

  return (
    <section id="path" className="w-full py-16 md:py-24 px-6 md:px-16 flex flex-col items-center bg-slate-50 relative overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 30%, #f8fafc 100%)",
        }}
      />

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/5 blur-[120px] rounded-full -mr-64 -mt-64" />

      {/* Section Header */}
      <div className="max-w-4xl w-full text-center mb-16 md:mb-12 relative z-10 px-4">
        <div className="inline-flex bg-white text-accent-blue text-[10px] tracking-[0.2em] font-bold px-4 py-2 rounded-full mb-6 uppercase shadow-sm">
          The Roadmap
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.15] text-primary mb-6 tracking-tight">
          Your 3-Step Path to <br className="hidden md:block" /> Career Mastery
        </h2>
        <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          The road to high impact doesn't have to be complicated. We've simplified the transition from "stuck" to "steering" into three clear milestones.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 relative z-10">

        {/* Connecting Line (Desktop Only) */}
        <div className="hidden lg:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-slate-100" />

        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-start gap-8 group relative">

            {/* Step Header: Circle with Icon */}
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center shrink-0 shadow-lg group-hover:border-accent-blue group-hover:shadow-accent-blue/20 transition-all duration-300">
                {step.icon}
              </div>
              <div className="text-6xl font-black text-slate-100 group-hover:text-accent-blue transition-colors duration-500 select-none opacity-40 group-hover:opacity-100">
                {step.number}
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-white p-8 md:p-10 rounded-[32px] border border-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-500 h-full w-full">
              <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
                {step.title}
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-accent-blue group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
                {step.description}
              </p>
            </div>

          </div>
        ))}

      </div>

      {/* Floating CTA (Subtle)
      <div className="mt-20 relative z-10">
        <button className="text-accent-blue font-bold text-sm tracking-widest uppercase border-b-2 border-accent-blue pb-1 hover:text-primary hover:border-primary transition-all">
          Learn More About The Scoring System
        </button>
      </div> */}

    </section>
  );
}
