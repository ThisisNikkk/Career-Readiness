import React from "react";
import { ArrowRight, Globe, Share2, Mail } from "lucide-react";

export default function Footer({ onStartAssessment }: { onStartAssessment?: () => void }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white pt-16 px-6 md:px-16 flex flex-col items-center">
      <div className="max-w-7xl w-full mx-auto">

        {/* Top Section: Split into 3 columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr_1fr] py-16 gap-12 lg:gap-0 lg:border-b border-slate-200">

          {/* Left Column: Contact */}
          <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left lg:pr-12 lg:border-r border-slate-200">
            <span className="text-[13px] font-semibold text-slate-500 mb-3 tracking-wide">
              Contact Us
            </span>
            <span className="text-base font-medium text-[#0F172A]">
              careerreadiness@gmail.com
            </span>
          </div>

          {/* Center Column: CTA & Newsletter */}
          <div className="flex flex-col items-center justify-center text-center px-4 lg:px-16">
            <h2 className="text-3xl md:text-[40px] font-medium text-[#0F172A] tracking-tight leading-tight mb-4">
              Start Your Career Journey Today!
            </h2>
            <p className="text-[15px] font-medium text-slate-500 mb-10 max-w-[400px]">
              Take the assessment and unlock new skills to steer your professional growth.
            </p>

            {/* Input Row matching the exact shape in the reference */}
            <div className="flex items-center w-full max-w-[460px] bg-white border border-slate-300 rounded-full p-1.5 focus-within:border-[#0F172A] transition-all shadow-sm">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-none pl-6 text-sm font-medium w-full focus:outline-none placeholder:text-slate-400 text-[#0F172A]"
              />
              <button className="bg-white border text-[#0F172A] border-slate-200 hover:border-[#0F172A] ml-2 w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm">
                <ArrowRight className="w-4 h-4 -rotate-45" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Right Column: Social Media */}
          <div className="flex flex-col items-center lg:items-end justify-center text-center lg:text-right lg:pl-12 lg:border-l border-slate-200">
            <span className="text-[13px] font-semibold text-slate-500 mb-5 tracking-wide">
              Social Media
            </span>
            <div className="flex items-center gap-5">
              <SocialIcon icon={<Globe className="w-5 h-5" />} href="#" />
              <SocialIcon icon={<Share2 className="w-5 h-5" />} href="#" />
              <SocialIcon icon={<Mail className="w-5 h-5" />} href="#" />
            </div>
          </div>

        </div>

        {/* Middle Section: Links Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-2 gap-8 lg:gap-0 border-b lg:border-0 border-slate-200">

          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Tita Gray Logo" className="h-32 w-auto" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <FooterLink label="Assessment" href="#" onClick={onStartAssessment} />
            <FooterLink label="Path" href="#path" />
            <FooterLink label="Method" href="#method" />
            <FooterLink label="FAQ" href="#faq" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10">
            <FooterLink label="Terms & Conditions" href="#" />
            <FooterLink label="Privacy Policy" href="#" />
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-slate-200 py-8 gap-4">
          <p className="text-[13px] font-medium text-slate-500">
            Copyright © {currentYear} Career Readiness Assessment, All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[13px] font-semibold text-[#0F172A] bg-slate-100 px-3 py-1 rounded-md">Built For Career Clarity.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

function FooterLink({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        } else if (href.startsWith('#')) {
          e.preventDefault();
          document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
        }
      }}
      className="text-[15px] font-medium text-[#0F172A] hover:text-blue-600 transition-colors"
    >
      {label}
    </a>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="text-slate-600 hover:text-[#0F172A] hover:-translate-y-1 transition-transform"
    >
      {icon}
    </a>
  );
}
