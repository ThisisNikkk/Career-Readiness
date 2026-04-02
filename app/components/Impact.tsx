import React from "react";
import { User, QrCode, ArrowRight, ShieldCheck, TrendingUp, CheckCircle2 } from "lucide-react";

export default function Impact({ onStartAssessment }: { onStartAssessment?: () => void }) {
  return (
    <section id="method" className="w-full py-24 md:py-32 px-4 sm:px-6 md:px-12 flex flex-col items-center bg-background overflow-hidden relative">
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
            "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 30%, var(--background, #ffffff) 100%)",
        }}
      />
      <div className="max-w-7xl w-full mx-auto">

        {/* Section Header */}
        <div className="w-full text-center md:text-left mb-12 md:mb-16">
          <div className="inline-flex bg-slate-100 text-accent-blue text-[10px] tracking-[0.2em] font-bold px-4 py-2 rounded-full mb-6 uppercase">
            The Method
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] text-primary tracking-tight">
            Built for total <br className="hidden md:block" />career clarity.
          </h2>
        </div>

        {/* True Bento Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[340px]">

          {/* Card 1: Tall Blue Hero (Col 1, Rows 1-2) */}
          <div className="md:col-span-1 lg:col-span-1 md:row-span-2 bg-[#2563EB] rounded-[32px] overflow-hidden relative p-8 flex flex-col group shadow-md shadow-accent-blue/20">
            {/* Concentric Circle Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-auto aspect-square rounded-full border border-white/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-auto aspect-square rounded-full border border-white/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-auto aspect-square rounded-full border border-white/30" />

            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-3xl lg:text-4xl font-black text-white leading-[1.1] mb-2 tracking-tight">
                Interact with<br />your career path
              </h3>

              <button className="bg-white text-accent-blue text-[11px] font-extrabold px-5 py-2.5 rounded-full mt-4 w-max shadow-lg flex items-center gap-2 uppercase tracking-wide">
                Get Started <ArrowRight className="w-3 h-3" />
              </button>

              {/* Faux App Screen */}
              <div className="w-full bg-white rounded-t-[28px] mt-auto h-[180px] sm:h-[220px] shadow-2xl relative translate-y-8 group-hover:translate-y-4 transition-transform duration-700 flex flex-col p-6 items-center border-x-8 border-t-8 border-slate-900 border-b-0">
                {/* Dynamic Island / Notch */}
                <div className="w-24 h-6 bg-slate-900 absolute top-0 rounded-b-[14px]" />

                <h4 className="text-[10px] font-bold text-slate-400 mt-4 uppercase">Status</h4>
                <div className="flex items-center gap-3 mt-2 w-full">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-bold text-slate-800 leading-none">Verified</div>
                  </div>
                </div>

                <div className="w-full bg-slate-100 rounded-xl mt-4 p-3 flex justify-between items-center text-left">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Readiness</div>
                    <div className="text-base font-black text-slate-800">High</div>
                  </div>method
                  <CheckCircle2 className="w-5 h-5 text-secondary" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Top Middle Center (Col 2, Row 1) */}
          <div className="md:col-span-1 lg:col-span-1 bg-white border border-slate-100 rounded-[32px] p-8 flex flex-col shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden relative group">
            <div className="flex items-start justify-center flex-1 w-full h-1/2 relative">
              {/* Abstract ID / Document Mock */}
              <div className="w-[120%] h-32 bg-slate-50 border border-slate-200 rounded-2xl absolute -top-4 -rotate-6 shadow-sm flex flex-col p-4 transform transition-transform group-hover:-rotate-3 duration-500">
                <div className="w-1/2 h-2 bg-slate-200 rounded-full mb-3" />
                <div className="w-3/4 h-2 bg-slate-200 rounded-full mb-2" />
                <div className="w-2/3 h-2 bg-slate-200 rounded-full" />
                <div className="absolute right-4 bottom-4 w-10 h-10 bg-slate-200 rounded-full" />
              </div>
            </div>

            <div className="mt-auto pt-6 relative z-10 bg-white">
              <h3 className="text-[22px] font-extrabold text-[#0F172A] leading-[1.1] tracking-tight mb-2">
                Empowering<br />your ownership
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                We decrypt only what's necessary, keeping your master data solely in your control.
              </p>
            </div>
          </div>

          {/* Card 3: Top Right Wide (Col 3-4, Row 1) */}
          <div className="md:col-span-2 lg:col-span-2 bg-slate-50 border border-slate-100 rounded-[32px] p-8 flex flex-col shadow-[0_4px_20px_rgb(0,0,0,0.03)] justify-center">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center h-full gap-6">
              <div className="flex-1">
                <h3 className="text-3xl font-extrabold text-[#0F172A] leading-[1.1] mb-3 tracking-tight">Connect your<br />Career Wallet</h3>
                <p className="text-xs md:text-sm font-medium text-slate-500 leading-relaxed max-w-sm">
                  By completing the assessment, you securely sync your professional identity with actionable growth paths.
                </p>
              </div>

              {/* Faux interactive list */}
              <div className="flex flex-col gap-2.5 w-full md:w-[220px] shrink-0 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <button onClick={onStartAssessment} className="bg-[#2563EB] text-white text-[11px] font-bold px-4 py-3.5 rounded-xl text-left flex justify-between items-center shadow-md">
                  <span>ASSESSMENT</span>
                  <ShieldCheck className="w-4 h-4 text-white/80" />
                </button>
                <button className="bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 text-[#0F172A] text-[11px] font-bold px-4 py-3.5 rounded-xl text-left flex justify-between items-center">
                  <span>SAMPLE REPORT</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Bottom Left Middle (Portrait) (Col 2, Row 2) */}
          <div className="md:col-span-1 lg:col-span-1 relative bg-[#0F172A] rounded-[32px] overflow-hidden group shadow-[0_4px_20px_rgb(0,0,0,0.08)]">
            <img
              src="/1.png"
              className="absolute inset-0 w-full h-full object-contain p-8 opacity-70"
              alt="Career readiness visualization"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent p-6 flex flex-col justify-end">
              {/* Floating Faux Pill UI */}
              <div className="bg-white/95 backdrop-blur-md rounded-[20px] p-3 flex items-center gap-3 w-full shadow-2xl transform transition-transform group-hover:-translate-y-2 duration-500 border border-white/50">
                <div className="w-10 h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-[#38BDF8]" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Sending Result</div>
                  <div className="text-sm font-black text-slate-900 leading-none mt-1">Readiness 85%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Bottom Middle Chart (Col 3, Row 2) */}
          <div className="md:col-span-1 lg:col-span-1 bg-white border border-slate-100 rounded-[32px] p-6 lg:p-8 flex flex-col justify-end shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative overflow-hidden group">
            <div className="absolute top-6 lg:top-8 right-6 lg:right-8 left-6 lg:left-8 flex justify-between items-start">
              <div className="bg-slate-50 border border-slate-100 text-[#0F172A] px-4 py-2.5 rounded-[16px] shadow-sm">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Users Connected</div>
                <div className="text-xl font-black tracking-tight mt-0.5">+10,000</div>
              </div>
            </div>

            {/* Faux Bar Chart UI */}
            <div className="flex items-end justify-between gap-1.5 h-[120px] sm:h-[140px] w-full mt-24">
              {[40, 50, 70, 60].map((height, i) => (
                <div key={i} className="w-full bg-slate-100 rounded-t-lg transition-all duration-1000 group-hover:bg-slate-200" style={{ height: `${height}%` }} />
              ))}

              {/* Tall Blue Column */}
              <div className="w-full bg-[#2563EB] h-[100%] rounded-t-lg relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-[#2563EB] shadow-md" />
              </div>
            </div>
          </div>

          {/* Card 6: Bottom Right Tech (Col 4, Row 2) */}
          <div className="md:col-span-1 lg:col-span-1 bg-slate-50 border border-slate-100 rounded-[32px] p-8 flex flex-col shadow-[0_4px_20px_rgb(0,0,0,0.03)] items-center text-center justify-center relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-slate-200 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <div className="w-16 h-16 rounded-[20px] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center mb-6 z-10">
              <QrCode className="w-8 h-8 text-[#0F172A]" />
            </div>

            <div className="z-10">
              <h3 className="text-[10px] font-extrabold tracking-[0.2em] text-slate-400 uppercase mb-3">Our Technology</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-semibold max-w-[200px] mx-auto">
                Scan your profile and uncover efficient precision via our proprietary engine.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="text-[10px] font-bold text-[#0F172A] tracking-widest uppercase border-b-2 border-[#0F172A] pb-1 cursor-pointer hover:text-accent-blue hover:border-accent-blue transition-colors">
                  Learn More
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
