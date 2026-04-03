import React from "react";
import Image from "next/image";
import { Target, Zap, Compass, ShieldCheck, Share2, ArrowUpRight } from "lucide-react";
import StartAssessmentButton from "./StartAssessmentButton";

const dimensions = [
  {
    id: "clarity",
    title: "Clarity",
    tagline: "Know your north star",
    description: "How clear you are on your career direction and long-term goals.",
    icon: <Target className="w-7 h-7" />,
    image: "/4.png",
  },
  {
    id: "ownership",
    title: "Ownership",
    tagline: "Drive your own story",
    description: "How much you take control, create options, and follow through.",
    icon: <Zap className="w-7 h-7" />,
    image: "/2.png",
  },
  {
    id: "curiosity",
    title: "Curiosity",
    tagline: "Stay hungry, explore",
    description: "How actively you seek new information and explore possibilities.",
    icon: <Compass className="w-7 h-7" />,
    image: "/5.png",
  },
  {
    id: "confidence",
    title: "Confidence",
    tagline: "Own your worth",
    description: "How resilient you feel and your comfort in owning your value.",
    icon: <ShieldCheck className="w-7 h-7" />,
    image: "/1.png",
  },
  {
    id: "network",
    title: "Network & Visibility",
    tagline: "Build your orbit",
    description: "How well you build relationships and showcase your impact.",
    icon: <Share2 className="w-7 h-7" />,
    image: "/3.png",
  },
];

function BentoCard({ dimension }: { dimension: (typeof dimensions)[number] }) {
  return (
    <div
      className="group bg-white border border-slate-100 rounded-[28px] overflow-hidden flex flex-col
                 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer"
      style={{ boxShadow: "0 2px 12px 0 rgba(0,0,0,0.04)" }}
    >
      {/* Illustration Container */}
      <div className="w-full bg-slate-50 flex items-center justify-center relative overflow-hidden group/img" style={{ height: 220 }}>
        {dimension.image ? (
          <div className="relative w-full h-full p-6 transition-transform duration-500 group-hover:scale-105">
            <Image
              src={dimension.image}
              alt={dimension.title}
              fill
              className="object-contain p-2"
              priority={dimension.id === "clarity"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-50/50">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-slate-200 shadow-sm">
              {dimension.icon}
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100 mx-6" />

      {/* Text content */}
      <div className="flex flex-col gap-2.5 px-6 py-5 flex-1">

        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-accent-blue">
            {dimension.icon}
          </div>
          <h3 className="text-[20px] font-bold text-primary leading-tight tracking-tight">
            {dimension.title}
          </h3>
        </div>

        <p className="text-[15px] text-slate-400 leading-relaxed font-medium">
          {dimension.description}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="w-full py-16 md:py-24 px-6 md:px-12 flex flex-col items-center bg-background overflow-hidden relative"
    >
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

      {/* Header — untouched */}
      <div className="max-w-4xl w-full text-center mb-16 md:mb-24 relative z-10">
        <div className="inline-flex bg-slate-100 text-accent-blue text-[10px] tracking-[0.2em] font-bold px-4 py-2 rounded-full mb-6 uppercase">
          What We Measure
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.15] text-primary mb-6 tracking-tight">
          Uncover the Five Dimensions of Career Readiness
        </h2>
        <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          From feeling stuck to knowing your exact next move. We evaluate the core pillars that separate those who coast from those who lead.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="max-w-8xl w-full mx-auto relative z-10">

        {/* Desktop: 5-col */}
        <div className="hidden xl:grid xl:grid-cols-5 gap-5">
          {dimensions.map((dim) => (
            <BentoCard key={dim.id} dimension={dim} />
          ))}
        </div>

        {/* Tablet: 3 + 2 */}
        <div className="hidden md:flex xl:hidden flex-col gap-5">
          <div className="grid grid-cols-3 gap-5">
            {dimensions.slice(0, 3).map((dim) => (
              <BentoCard key={dim.id} dimension={dim} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-5 max-w-2xl mx-auto w-full">
            {dimensions.slice(3).map((dim) => (
              <BentoCard key={dim.id} dimension={dim} />
            ))}
          </div>
        </div>

        {/* Mobile: 1-col */}
        <div className="grid md:hidden grid-cols-1 gap-4">
          {dimensions.map((dim) => (
            <BentoCard key={dim.id} dimension={dim} />
          ))}
        </div>

      </div>

      {/* CTA */}
      <div className="mt-16 flex flex-col sm:flex-row items-center gap-3 relative z-10">
        <StartAssessmentButton>
          TAKE THE FREE ASSESSMENT
        </StartAssessmentButton>
      </div>
    </section>
  );
}
