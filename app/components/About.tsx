import React from "react";
import { Check, Target, Compass, Zap, ShieldCheck, Share2 } from "lucide-react";

export default function About() {
  const dimensions = [
    {
      title: "Clarity",
      icon: <Target className="w-5 h-5 text-accent-blue" strokeWidth={3} />,
      description: "How clear you are on your career direction and long-term goals.",
      gridArea: "lg:col-span-4 lg:row-span-1",
    },
    {
      title: "Ownership",
      icon: <Zap className="w-5 h-5 text-accent-blue" strokeWidth={3} />,
      description: "How much you take control, create options, and follow through.",
      gridArea: "lg:col-span-4 lg:row-span-1",
    },
    {
      title: "Curiosity",
      icon: <Compass className="w-5 h-5 text-accent-blue" strokeWidth={3} />,
      description: "How actively you seek new information and explore possibilities.",
      gridArea: "lg:col-span-4 lg:row-span-1",
    },
    {
      title: "Confidence",
      icon: <ShieldCheck className="w-5 h-5 text-accent-blue" strokeWidth={3} />,
      description: "How resilient you feel and your comfort in owning your value.",
      gridArea: "lg:col-span-3 lg:row-span-1",
    },
    {
      title: "Network & Visibility",
      icon: <Share2 className="w-5 h-5 text-accent-blue" strokeWidth={3} />,
      description: "How well you build relationships and showcase your impact.",
      gridArea: "lg:col-span-5 lg:row-span-1",
    },
  ];

  return (
    <section id="about" className="w-full py-24 md:py-32 px-6 md:px-16 flex flex-col items-center bg-background overflow-hidden relative">
      {/* Section Header */}
      <div className="max-w-4xl w-full text-center mb-16 md:mb-24">
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

      {/* Asymmetric Bento Grid - Anchored Around Image */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-auto">

        {/* Left Column Area (Upper) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <BentoCard dimension={dimensions[0]} className="flex-1" />
          <BentoCard dimension={dimensions[2]} className="flex-1" />
        </div>

        {/* Center Main Image (Vertical Pivot) */}
        <div className="col-span-12 lg:col-span-4 h-full min-h-[400px] lg:min-h-0 bg-white border-2 border-slate-50 rounded-[48px] overflow-hidden shadow-2xl relative order-first lg:order-none">
          <img
            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800"
            alt="Professional Excellence"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Right Column Area (Upper) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <BentoCard dimension={dimensions[1]} className="flex-1" />
          <BentoCard dimension={dimensions[3]} className="flex-1" />
        </div>

        {/* Bottom Full-Width Or Large Wide Card */}
        <div className="col-span-12 flex justify-center">
          <BentoCard
            dimension={dimensions[4]}
            className="lg:max-w-4xl w-full flex-col sm:flex-row items-start sm:items-center text-left sm:min-h-[188px] sm:py-12"
          />
        </div>

      </div>
    </section>
  );
}

interface BentoCardProps {
  dimension: {
    title: string;
    icon: React.ReactNode;
    description: string;
  };
  className?: string;
}

function BentoCard({ dimension, className = "" }: BentoCardProps) {
  return (
    <div
      className={`bg-white border border-slate-100 p-8 rounded-[32px] flex flex-col items-start gap-5 shadow-sm hover:shadow-md transition-all group cursor ${className}`}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
        <div className="text-accent-blue">
          {dimension.icon}
        </div>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-xl font-bold text-primary mb-2 hover:text-accent-blue transition-colors leading-tight">
          {dimension.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">
          {dimension.description}
        </p>
      </div>
    </div>
  );
}
