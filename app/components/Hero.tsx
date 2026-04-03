import React from "react";
import Image from "next/image";
import { ArrowUpRight, BarChart3, CheckCircle2, ShieldCheck } from "lucide-react";
import StartAssessmentButton from "./StartAssessmentButton";

export default function Hero() {
  return (
    <section id="home" className="w-full min-h-screen pt-32 pb-16 px-6 md:px-16 flex flex-col justify-center relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Copy */}
          <div className="flex flex-col items-start pt-8">
            <div className="inline-flex items-center bg-surface text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 relative overflow-hidden group">
              <span className="relative z-10 block tracking-wide">
                #1 CAREER READINESS TOOL
              </span>
              <div className="absolute inset-0 bg-accent-sky/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-semibold leading-[1.05] tracking-tight text-primary mb-6">
              Are You Secretly
              <br />
              <span className="text-primary-deep">Underplaying Your</span>
              <br />
              <span>Career Potential?</span>
            </h1>

            <p className="text-base md:text-lg text-primary/70 leading-relaxed max-w-md mb-10">
              Answer 20 quick questions to reveal if you&apos;re coasting, climbing, or ready to leap. Find out where you stand and get your personalized action plan.
            </p>

            <StartAssessmentButton />
          </div>

          {/* Right Column - Image & Floating Cards */}
          <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center mt-8 lg:mt-0">
            {/* Image Container */}
            <div className="w-[85%] h-[90%] relative rounded-[32px] overflow-hidden shadow-2xl bg-white border border-slate-100 flex items-center justify-center">
              <div className="relative w-full h-full p-8">
                <Image
                  src="/6.png"
                  alt="Frustrated professional at computer"
                  fill
                  className="object-contain p-8 animate-float"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Soft gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
            </div>

            {/* Floating Card 1: Top Right */}
            <div className="absolute top-10 -right-4 sm:-right-8 bg-accent-blue/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4 text-white hover:-translate-y-1 transition-transform animate-float">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-accent-blue bg-white overflow-hidden relative">
                    <Image 
                      src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                      alt="avatar" 
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-accent-blue bg-white flex items-center justify-center text-accent-blue text-xs font-bold shadow-inner">
                  +
                </div>
              </div>
              <div className="text-xs font-medium leading-tight text-white/90">
                Join 10,000+<br />Professionals
              </div>
            </div>

            {/* Floating Card 2: Right Middle */}
            <div className="absolute top-1/2 -right-12 lg:-right-20 transform -translate-y-1/2 bg-white/95 backdrop-blur-md p-5 rounded-[24px] shadow-2xl flex flex-col gap-3 border border-blue-50 hover:scale-105 transition-transform max-w-[200px] animate-float" style={{ animationDelay: '1s' }}>
              <div className="w-10 h-10 bg-accent-blue/10 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-accent-blue" />
              </div>
              <div>
                <div className="text-lg font-bold text-primary mb-1 tracking-tight">Career Strategy</div>
                <div className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  Identify your gaps and get a tailored growth plan across 5 metrics.
                </div>
              </div>
            </div>

            {/* Floating Card 3: Bottom Left */}
            <div className="absolute bottom-16 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-5 rounded-[24px] shadow-2xl flex flex-col gap-2 border border-blue-50 hover:translate-y-1 transition-transform" style={{ animationDelay: '1.5s' }}>
              <div className="text-[10px] font-bold tracking-widest text-accent-blue uppercase">Analysis</div>
              <div className="text-primary font-bold text-lg leading-none">5 Dimensions</div>
              <div className="text-accent-blue text-xs font-semibold">Ready in 3 mins</div>
            </div>
          </div>
        </div>

        {/* Stats Divider Bottom */}
        <div className="mt-12 lg:mt-12 w-full bg-slate-50/50 border border-slate-100 rounded-[40px] px-8 py-10 backdrop-blur-sm">
          <div className="flex flex-wrap justify-between items-center gap-8 md:gap-4 max-w-5xl mx-auto">

            <div className="flex flex-col items-center justify-center text-center flex-1 min-w-[120px]">
              <div className="text-4xl md:text-5xl font-semibold text-primary mb-2 tracking-tight">100%</div>
              <div className="text-sm font-medium text-slate-500">Privacy Guaranteed</div>
            </div>

            <div className="hidden md:block w-px h-12 bg-slate-200" />

            <div className="flex flex-col items-center justify-center text-center flex-1 min-w-[120px]">
              <div className="text-4xl md:text-5xl font-semibold text-primary mb-2 tracking-tight">20</div>
              <div className="text-sm font-medium text-primary/60">Quick Questions</div>
            </div>

            <div className="hidden md:block w-px h-12 bg-slate-200" />

            <div className="flex flex-col items-center justify-center text-center flex-1 min-w-[120px]">
              <div className="text-4xl md:text-5xl font-semibold text-primary mb-2 tracking-tight">5</div>
              <div className="text-sm font-medium text-primary/60">Key Dimensions</div>
            </div>

            <div className="hidden md:block w-px h-12 bg-slate-200" />

            <div className="flex flex-col items-center justify-center text-center flex-1 min-w-[120px]">
              <div className="text-4xl md:text-5xl font-semibold text-primary mb-2 tracking-tight">1</div>
              <div className="text-sm font-medium text-primary/60">Clear Action Plan</div>
            </div>

          </div>
        </div>

      </div>

      {/* Global style for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}} />
    </section>
  );
}
