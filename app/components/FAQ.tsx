'use client'

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    question: "What exactly do I get in my report?",
    answer: "You'll receive your 'Readiness Archetype', a detailed breakdown of your 5 dimensions (Clarity, Ownership, Curiosity, Confidence, Network), and a personalized 30-day action plan.",
  },
  {
    question: "How long does the assessment take?",
    answer: "The assessment is designed to be quick yet deep. It takes approximately 3 minutes to complete 15 targeted questions.",
  },
  {
    question: "Is my data private and secure?",
    answer: "Absolutely. We only use your responses to generate your personal career readiness report. We do not sell or share your individual data with third parties.",
  },
  {
    question: "Can I retake the assessment later?",
    answer: "Yes! We recommend retaking the assessment every 3-6 months to track your professional growth and see how your dimensions have evolved.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <section id="faq" className="w-full py-24 md:py-32 px-6 md:px-16 flex flex-col items-center bg-white relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-4xl w-full text-center mb-16 md:mb-20">
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

      {/* Accordion List */}
      <div className="max-w-4xl w-full mx-auto flex flex-col">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`transition-all duration-300 border-b border-slate-100 last:border-0 ${openIndex === index ? "bg-[#F8FAFC] rounded-[24px] border-b-0 my-2" : "bg-transparent"
              }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left px-4 md:px-8 py-8 md:py-10 flex items-center justify-between gap-6"
            >
              <span className={`text-lg md:text-xl font-bold transition-colors ${openIndex === index ? "text-[#0F172A]" : "text-slate-600 hover:text-primary"}`}>
                {faq.question}
              </span>

              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${openIndex === index ? "bg-accent-blue text-white" : "text-slate-300"
                }`}>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                ) : (
                  <Plus className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                )}
              </div>
            </button>

            <div
              className={`grid transition-all duration-500 ease-in-out ${openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 md:px-8 pb-10 pt-0 text-sm md:text-base text-slate-400 leading-relaxed font-medium max-w-3xl">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
