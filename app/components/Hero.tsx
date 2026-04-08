"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, BarChart3, CheckCircle2, ShieldCheck } from "lucide-react";
import StartAssessmentButton from "./StartAssessmentButton";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error("Video autoplay failed:", err);
      });
    }
  }, []);
  return (
    <section id="home" className="w-full min-h-screen pt-32 pb-16 px-6 md:px-16 flex flex-col justify-center relative overflow-hidden">
      {/* Live Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-60"
      >
        <source src="/bg-hero.mov" type="video/quicktime" />
        <source src="/bg-hero.mov" type="video/mp4" />
      </video>

      {/* Dot grid */}
      {/* <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          backgroundImage: "radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
        }}
      /> */}
      {/* Vignette */}
      {/* <div
        className="absolute inset-0 pointer-events-none z-2"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 30%, var(--background, #ffffff) 100%)",
        }}
      /> */}

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

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-semibold leading-[1.05] tracking-tight text-primary mb-6">
              Are You Secretly
              <br />
              <span className="text-primary-deep">Underplaying Your</span>
              <br />
              <span>Career Potential?</span>
            </h1>

            <p className="text-base md:text-lg text-primary/70 leading-relaxed max-w-md mb-10">
              Answer 25 quick questions to reveal if you&apos;re coasting, climbing, or ready to leap. Find out where you stand and get your personalized action plan.
            </p>

            <StartAssessmentButton />
          </div>
        </div>

        {/* Stats Divider Bottom */}
        <div className="mt-12 lg:mt-12 w-full bg-slate-50/50 border border-slate-100 rounded-[32px] md:rounded-[40px] px-6 py-8 md:px-8 md:py-10 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-y-8 gap-x-4 md:flex md:flex-wrap md:justify-between md:items-center md:gap-4 max-w-5xl mx-auto">

            <div className="flex flex-col items-center justify-center text-center flex-1 min-w-[120px]">
              <div className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary mb-2 tracking-tight">100%</div>
              <div className="text-xs sm:text-sm font-medium text-slate-500">Privacy Guaranteed</div>
            </div>

            <div className="hidden md:block w-px h-12 bg-slate-200" />

            <div className="flex flex-col items-center justify-center text-center flex-1 min-w-[120px]">
              <div className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary mb-2 tracking-tight">25</div>
              <div className="text-xs sm:text-sm font-medium text-primary/60">Quick Questions</div>
            </div>

            <div className="hidden md:block w-px h-12 bg-slate-200" />

            <div className="flex flex-col items-center justify-center text-center flex-1 min-w-[120px]">
              <div className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary mb-2 tracking-tight">5</div>
              <div className="text-xs sm:text-sm font-medium text-primary/60">Key Dimensions</div>
            </div>

            <div className="hidden md:block w-px h-12 bg-slate-200" />

            <div className="flex flex-col items-center justify-center text-center flex-1 min-w-[120px]">
              <div className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary mb-2 tracking-tight">1</div>
              <div className="text-xs sm:text-sm font-medium text-primary/60">Action Plan</div>
            </div>

          </div>
        </div>

      </div>

      {/* Global style for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-draw-line {
          animation: draw-line 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 1s;
        }
      `}} />
    </section>
  );
}
