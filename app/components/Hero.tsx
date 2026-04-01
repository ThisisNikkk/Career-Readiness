import React from "react";
import { ArrowUpRight, BarChart3, CheckCircle2, ShieldCheck } from "lucide-react";

export default function Hero({ onStartAssessment }: { onStartAssessment?: () => void }) {
  return (
    <section className="w-full min-h-screen pt-32 pb-16 px-6 md:px-16 flex flex-col justify-center max-w-7xl mx-auto">
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
            Answer 15 quick questions to reveal if you&apos;re coasting, climbing, or ready to leap. Find out where you stand and get your personalized action plan.
          </p>

          <button onClick={onStartAssessment} className="inline-flex items-center gap-3 bg-gradient-to-r from-accent-blue to-secondary hover:from-secondary hover:to-accent-blue text-white rounded-full pl-6 pr-2 py-2 transition-all duration-300 group shadow-lg hover:shadow-accent-blue/20">
            <span className="text-sm font-medium tracking-wide">TAKE ASSESSMENT</span>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </div>
          </button>
        </div>

        {/* Right Column - Image & Floating Cards */}
        <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center mt-8 lg:mt-0">
          {/* Main Decorative Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-surface rounded-[40px] rotate-3 -z-10" />

          {/* Image Container */}
          <div className="w-[85%] h-[90%] relative rounded-[32px] overflow-hidden shadow-2xl bg-border border-8 border-white">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
              alt="Professional looking forward"
              className="w-full h-full object-cover object-center"
            />
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>

          {/* Floating Card 1: Top Right */}
          <div className="absolute top-10 -right-4 sm:-right-8 bg-accent-blue/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4 text-white hover:-translate-y-1 transition-transform animate-float">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-accent-blue bg-white overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" />
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
          <div className="absolute top-1/2 -right-6 bg-accent-sky/90 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-3 text-white hover:scale-105 transition-transform" style={{ animationDelay: '1s' }}>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm font-semibold pr-2">
              Free Action Plan
            </div>
          </div>

          {/* Floating Card 3: Bottom Left */}
          <div className="absolute bottom-16 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-5 rounded-[24px] shadow-2xl flex flex-col gap-2 border border-blue-50 hover:translate-y-1 transition-transform" style={{ animationDelay: '1.5s' }}>
            <div className="text-[10px] font-bold tracking-widest text-accent-blue uppercase">Analysis</div>
            <div className="text-primary font-bold text-lg leading-none">5 Dimensions</div>
            <div className="text-accent-blue text-xs font-semibold">Ready in 3 mins</div>
          </div>

          {/* Decorative squiggles (CSS pseudo-elements or SVGs) */}
          <svg className="absolute top-[5%] left-[5%] text-accent-blue w-12 h-12 -z-10" viewBox="0 0 100 100" fill="none">
            <path d="M10 50 Q 25 10, 50 50 T 90 50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <svg className="absolute bottom-[20%] right-[5%] text-accent-sky w-10 h-10 -z-10" viewBox="0 0 100 100" fill="none">
            <path d="M10 90 L 90 10 M 90 10 L 40 10 M 90 10 L 90 60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Stats Divider Bottom */}
      <div className="mt-24 lg:mt-32 w-full bg-slate-50/50 border border-slate-100 rounded-[40px] px-8 py-10 backdrop-blur-sm">
        <div className="flex flex-wrap justify-between items-center gap-8 md:gap-4 max-w-5xl mx-auto">

          <div className="flex flex-col items-center justify-center text-center flex-1 min-w-[120px]">
            <div className="text-4xl md:text-5xl font-semibold text-primary mb-2 tracking-tight">100%</div>
            <div className="text-sm font-medium text-slate-500">Privacy Guaranteed</div>
          </div>

          <div className="hidden md:block w-px h-12 bg-slate-200" />

          <div className="flex flex-col items-center justify-center text-center flex-1 min-w-[120px]">
            <div className="text-4xl md:text-5xl font-semibold text-primary mb-2 tracking-tight">15</div>
            <div className="text-sm font-medium text-primary/60">Quick Questions</div>
          </div>

          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-primary/20" />

          <div className="flex flex-col items-center justify-center text-center flex-1 min-w-[120px]">
            <div className="text-4xl md:text-5xl font-semibold text-primary mb-2 tracking-tight">5</div>
            <div className="text-sm font-medium text-primary/60">Key Dimensions</div>
          </div>

          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-primary/20" />

          <div className="flex flex-col items-center justify-center text-center flex-1 min-w-[120px]">
            <div className="text-4xl md:text-5xl font-semibold text-primary mb-2 tracking-tight">1</div>
            <div className="text-sm font-medium text-primary/60">Clear Action Plan</div>
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
