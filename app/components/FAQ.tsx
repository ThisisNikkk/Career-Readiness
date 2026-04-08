'use client'

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    question: "What exactly do I get in my report?",
    answer:
      "You'll receive your 'Readiness Archetype', a detailed breakdown of your 5 dimensions (Clarity, Ownership, Curiosity, Confidence, Network), and a personalized 30-day action plan.",
    tag: "Results",
  },
  {
    question: "How long does the assessment take?",
    answer:
      "The assessment is designed to be quick yet deep. It takes approximately 3 minutes to complete 25 targeted behavioral statements.",
    tag: "Experience",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Absolutely. We only use your responses to generate your personal career readiness report. We do not sell or share your individual data with third parties.",
    tag: "Privacy",
  },
  {
    question: "Can I retake the assessment later?",
    answer:
      "Yes! We recommend retaking the assessment every 3–6 months to track your professional growth and see how your dimensions have evolved.",
    tag: "Access",
  },
  {
    question: "Is this only for experienced professionals?",
    answer:
      "No! Whether you are a student identifying your first career path or a senior leader looking to pivot, these 5 dimensions are universal indicators of growth potential and readiness.",
    tag: "Audience",
  },
  {
    question: "How are the dimensions calculated?",
    answer:
      "Your scores are based on weighted averages of your responses to specific behavioral statements within each category, compared against industry benchmarks for career adaptability.",
    tag: "Methodology",
  },
  {
    question: "Do I need to create an account to see results?",
    answer:
      "No. We believe in providing immediate value. You can take the assessment and view your initial results instantly without any sign-up required.",
    tag: "Access",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <section
      id="faq"
      className="w-full py-24 md:py-32 px-6 md:px-16 flex flex-col items-center bg-white relative overflow-hidden"
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

      {/* Header — original, untouched */}
      <div className="max-w-4xl w-full text-center mb-16 md:mb-20 relative z-10">
        <div className="inline-flex bg-slate-50 text-accent-blue text-[10px] tracking-[0.2em] font-bold px-4 py-2 rounded-full mb-6 uppercase border border-slate-100">
          Frequently Asked Questions
        </div>
        <h2 className="text-4xl md:text-5xl font-semibold leading-[1.15] text-[#0F172A] mb-6 tracking-tight">
          Your Questions, Answered
        </h2>
        <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Explore the answers to frequently asked questions about our platform and the assessment experience.
        </p>
      </div>

      {/* Accordion */}
      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col gap-3">
        {faqData.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className={`group rounded-[24px] border cursor-pointer transition-all duration-300 overflow-hidden
                ${isOpen
                  ? "border-accent-blue/20 bg-white"
                  : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
                }`}
              style={{ boxShadow: isOpen ? "0 4px 24px 0 rgba(59,130,246,0.07)" : undefined }}
            >
              {/* Question row */}
              <div className="flex items-center gap-4 px-6 md:px-8 py-6 md:py-7">
                {/* Index */}
                <span className="shrink-0 text-[10px] font-black text-slate-200 tabular-nums leading-none select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Question */}
                <span className={`flex-1 text-lg md:text-xl font-bold leading-snug transition-colors duration-200
                  ${isOpen ? "text-[#0F172A]" : "text-slate-600 group-hover:text-primary"}`}>
                  {faq.question}
                </span>

                {/* Tag + toggle */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`hidden sm:inline-flex text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full transition-all duration-200
                    ${isOpen ? "bg-accent-blue/10 text-accent-blue" : "bg-slate-100 text-slate-400"}`}>
                    {faq.tag}
                  </span>
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${isOpen ? "bg-accent-blue text-white" : "text-slate-300 group-hover:bg-slate-100 group-hover:text-slate-400"}`}>
                    {isOpen
                      ? <Minus className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                      : <Plus className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                    }
                  </div>
                </div>
              </div>

              {/* Answer */}
              <div className={`grid transition-all duration-500 ease-in-out
                ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <div className="px-6 md:px-8 pb-8 pt-0 flex gap-4">
                    <div className="w-px bg-accent-blue/25 shrink-0 ml-[18px]" />
                    <p className="text-sm md:text-base text-slate-400 leading-relaxed font-medium pl-3 max-w-3xl">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}