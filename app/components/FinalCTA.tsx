import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA({ onStartAssessment }: { onStartAssessment?: () => void }) {
  return (
    <section className="w-full py-24 md:py-32 px-6 md:px-16 flex flex-col items-center relative overflow-hidden bg-[#0F172A] rounded-[48px] mx-auto max-w-[95%] mb-12">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-blue/20 blur-[120px] rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-sky/10 blur-[100px] rounded-full -ml-40 -mb-40" />
      
      {/* Content */}
      <div className="max-w-4xl w-full text-center relative z-10 px-4">
        <div className="inline-flex bg-white/10 text-accent-sky text-[10px] tracking-[0.2em] font-bold px-4 py-2 rounded-full mb-8 uppercase backdrop-blur-md border border-white/10 flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-accent-sky" />
          The Final Milestone
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black leading-[1.1] text-white mb-8 tracking-tighter">
          Ready to Uncover <br className="hidden md:block" /> Your Career Mastery?
        </h2>
        
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
          Stop guessing your next move. Get the data, identify your gaps, and start steering your professional growth with a personalized action plan.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button onClick={onStartAssessment} className="bg-accent-blue hover:bg-accent-blue/90 text-white font-bold px-10 py-5 rounded-full text-base shadow-xl shadow-accent-blue/30 transition-all hover:-translate-y-1 flex items-center gap-3">
            Start Assessment Now <ArrowRight className="w-5 h-5 text-white" strokeWidth={3} />
          </button>
          
          <div className="text-xs md:text-sm text-slate-400 font-bold tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Join 10,000+ Others
          </div>
        </div>
      </div>
    </section>
  );
}
