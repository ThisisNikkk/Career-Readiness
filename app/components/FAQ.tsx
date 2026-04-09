'use client'

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    question: "How long does the assessment take?",
    answer: "The core assessment takes 3-5 minutes (25 questions). The premium version with advanced questions takes 7-10 minutes (50 questions). You can save progress and return anytime.",
  },
  {
    question: "What kind of questions will I answer?",
    answer: "You'll rate statements about your career clarity, ownership, curiosity, confidence, and networking using a simple 1-5 scale (Strongly Disagree to Strongly Agree). No right or wrong answers, it's about honest self-reflection.",
  },
  {
    question: "Is this like a personality test?",
    answer: "No, this measures your current career readiness and momentum across 5 key dimensions. It shows where you're strong and what to focus on next, rather than 'what career fits your personality.'",
  },
  {
    question: "What do I get with each pricing option?",
    answer: "Basic ($9.99): Full dimension breakdown, results card, personalized recommendations, and PDF report. Premium ($19.99): Advanced questions, results card, personalized recommendations, PDF report, and free eBook.",
  },
  {
    question: "Are my results private and secure?",
    answer: "Yes. Your responses and results are stored securely and privately. We never share individual results without your explicit permission. You control what you share on social media.",
  },
  {
    question: "What do Low, Medium, and High readiness mean?",
    answer: "Low (0-49): Foundation needed — focus on clarity and basic momentum. Medium (50-74): Momentum building — strengthen consistency and visibility. High (75-100): Advancement ready — position for leadership and bigger moves.",
  },
  {
    question: "Can I retake the assessment?",
    answer: "Yes! Take it every 3-6 months to track your progress. Results are timestamped so you can see how your readiness evolves.",
  },
  {
    question: "What if I don't agree with my results?",
    answer: "Results reflect your current self-assessment. They're a starting point for reflection, not a final judgment. Use them as a conversation starter with a coach or mentor.",
  },
  {
    question: "Do I need any special preparation?",
    answer: "No prep needed. Answer honestly based on how you feel right now. The assessment works best when you're reflective rather than overthinking your responses.",
  },
  {
    question: "What happens after I get my results?",
    answer: "You'll receive your overall readiness score and band, a breakdown by 5 dimensions (Clarity, Ownership, Curiosity, Confidence, Network), and personalized next steps. Premium users also get advanced recommendations and an eBook.",
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

      {/* Still have questions? */}
      <div className="mt-16 text-center relative z-10">
        <p className="text-slate-500 font-medium">
          Still have questions?{" "}Email{" "}
          <a
            href="mailto:careerreadiness10@gmail.com"
            className="text-accent-blue hover:underline font-semibold transition-all"
          >
            careerreadiness10@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}