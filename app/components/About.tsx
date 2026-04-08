import { FaShieldAlt } from "react-icons/fa";
import StartAssessmentButton from "./StartAssessmentButton";
import { FaBrain, FaCrown, FaGlobe, FaMagnifyingGlass } from "react-icons/fa6";

const dimensions = [
  {
    id: "clarity",
    title: "Clarity",
    tagline: "Know your north star",
    description: "How clear you are on your career direction and long-term goals.",
    icon: <FaMagnifyingGlass className="w-7 h-7" />,
    image: "/4.png",
  },
  {
    id: "ownership",
    title: "Ownership",
    tagline: "Drive your own story",
    description: "How much you take control, create options, and follow through.",
    icon: <FaCrown className="w-7 h-7" />,
    image: "/2.png",
  },
  {
    id: "curiosity",
    title: "Curiosity",
    tagline: "Stay hungry, explore",
    description: "How actively you seek new information and explore possibilities.",
    icon: <FaBrain className="w-7 h-7" />,
    image: "/5.png",
  },
  {
    id: "confidence",
    title: "Confidence",
    tagline: "Own your worth",
    description: "How resilient you feel and your comfort in owning your value.",
    icon: <FaShieldAlt className="w-7 h-7" />,
    image: "/img1.png",
  },
  {
    id: "network",
    title: "Network & Visibility",
    tagline: "Build your orbit",
    description: "How well you build relationships and showcase your impact.",
    icon: <FaGlobe className="w-7 h-7" />,
    image: "/3.png",
  },
];

function BentoCard({ dimension }: { dimension: (typeof dimensions)[number] }) {
  return (
    <div
      className="group bg-white border border-slate-100 rounded-[32px] overflow-hidden flex flex-col
                 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer h-full"
      style={{ boxShadow: "0 2px 12px 0 rgba(0,0,0,0.04)" }}
    >
      {/* Icon & Title Area */}
      <div className="bg-slate-50/50 flex flex-col items-center justify-center relative overflow-hidden group/icon pt-10 pb-8 px-6">
        <div className="w-24 h-24 rounded-[28px] bg-white flex items-center justify-center text-accent-blue shadow-sm border border-slate-100 transition-all duration-500 group-hover:scale-110 group-hover:shadow-md mb-4">
          <div className="[&>svg]:w-10 [&>svg]:h-10">
            {dimension.icon}
          </div>
        </div>

        <h3 className="text-[22px] font-bold text-primary leading-tight tracking-tight relative z-10 transition-transform duration-300 group-hover:scale-105">
          {dimension.title}
        </h3>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent-blue/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Description Area */}
      <div className="px-8 py-8 flex flex-col items-center text-center bg-white border-t border-slate-50 flex-1">
        <p className="text-[18px] leading-relaxed text-slate-500 font-medium">
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
      className="w-full py-16 md:py-16 px-6 md:px-12 flex flex-col items-center bg-background overflow-hidden relative"
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

      {/* 3 + 2 Centered Grid */}
      <div className="max-w-7xl w-full mx-auto relative z-10 px-4 md:px-0">

        {/* Desktop & Tablet: 3 + 2 Centered using 6-col Grid */}
        <div className="hidden md:grid grid-cols-6 gap-6 w-full">
          {/* Top row: 3 cards, spanning 2 cols each */}
          <div className="col-span-2">
            <BentoCard dimension={dimensions[0]} />
          </div>
          <div className="col-span-2">
            <BentoCard dimension={dimensions[1]} />
          </div>
          <div className="col-span-2">
            <BentoCard dimension={dimensions[2]} />
          </div>

          {/* Bottom row: 2 cards, centered via col-start */}
          <div className="col-span-2 col-start-2">
            <BentoCard dimension={dimensions[3]} />
          </div>
          <div className="col-span-2 col-start-4">
            <BentoCard dimension={dimensions[4]} />
          </div>
        </div>

        {/* Mobile: 1-col */}
        <div className="flex md:hidden flex-col gap-6">
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
