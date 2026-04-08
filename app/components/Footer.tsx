"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Globe, Share2, Mail, MapPin, Users, Star, TrendingUp, Award, ChevronRight } from "lucide-react";
import { LiaLinkedin, LiaLinkedinIn } from "react-icons/lia";
import { ImInstagram } from "react-icons/im";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2025);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSubscribe = () => {
    if (email.trim()) { setSubmitted(true); setEmail(""); }
  };

  const quickLinks = [
    { label: "Home", href: "/#home", id: "home" },
    { label: "About", href: "/#about", id: "about" },
    { label: "The Assessment", href: "/#path", id: "path" },
    { label: "FAQ", href: "/#faq", id: "faq" },
    { label: "Contact Us", href: "/contact", id: "contact" },
  ];

  return (
    <footer className="w-full bg-white pt-16 px-6 md:px-16 flex flex-col items-center">
      <div className="max-w-7xl w-full mx-auto">


        {/* ── Main 3-col grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr_1fr] py-12 md:py-16 gap-12 md:gap-16 lg:gap-0 lg:border-b border-slate-200">

          {/* Left Column — Contact + Quick Links only */}
          <div className="flex flex-col items-center lg:items-start justify-start text-center lg:text-left lg:pr-12 lg:border-r border-slate-200 gap-8">

            <div>
              <span className="text-[13px] font-semibold text-slate-400 mb-3 tracking-wide uppercase block">
                Contact Info
              </span>
              <Link href="/contact"
                className="text-base font-medium text-[#0F172A] hover:text-accent-blue transition-colors block">
                careerreadiness@gmail.com
              </Link>
              <div className="flex items-start gap-2 mt-2 justify-center lg:justify-start">
                <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-500">Tita Gray Consulting, United States</span>
              </div>
            </div>

            <div>
              <span className="text-[13px] font-semibold text-slate-400 mb-3 tracking-wide uppercase block">
                Quick Links
              </span>
              <ul className="flex flex-col gap-2.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/#") ? (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          if (pathname === "/") {
                            e.preventDefault();
                            document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="group flex items-center gap-1 text-sm text-slate-600 hover:text-[#0F172A] transition-colors justify-center lg:justify-start"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" strokeWidth={2.5} />
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="group flex items-center gap-1 text-sm text-slate-600 hover:text-[#0F172A] transition-colors justify-center lg:justify-start"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" strokeWidth={2.5} />
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Center Column — your original, no extra buttons */}
          <div className="flex flex-col items-center justify-center text-center px-4 lg:px-16 gap-4">

            <Image
              src="/logo.png"
              alt="Tita Gray Logo"
              width={192}
              height={192}
              className="mb-2"
            />

            <div>
              <h2 className="text-3xl md:text-[40px] font-medium text-[#0F172A] tracking-tight leading-tight mb-4">
                Start Your Career Journey Today!
              </h2>
              <p className="text-[15px] font-medium text-slate-500 max-w-[400px] mx-auto">
                Take the assessment and unlock new skills to steer your professional growth.
              </p>
            </div>

            {/* Original pill input */}
            {submitted ? (
              <div className="flex items-center gap-2 text-sm font-medium py-3 px-6 rounded-full border border-slate-200 bg-slate-50 text-slate-600">
                <Star className="w-4 h-4 text-slate-400" /> You're on the list!
              </div>
            ) : (
              <div className="flex items-center w-full max-w-[460px] bg-white border border-slate-300 rounded-full p-1.5 focus-within:border-[#0F172A] transition-all shadow-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  placeholder="Email Address"
                  className="bg-transparent border-none pl-6 text-sm font-medium w-full focus:outline-none placeholder:text-slate-400 text-[#0F172A]"
                />
                <button
                  onClick={handleSubscribe}
                  aria-label="Subscribe"
                  className="bg-white border text-[#0F172A] border-slate-200 hover:border-[#0F172A] ml-2 w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm"
                >
                  <ArrowRight className="w-4 h-4 -rotate-45" strokeWidth={2.5} />
                </button>
              </div>
            )}

          </div>

          {/* Right Column — Social + Resources + 5 Dimensions pills */}
          <div className="flex flex-col items-center lg:items-end justify-start text-center lg:text-right lg:pl-12 lg:border-l border-slate-200 gap-8">

            <div>
              <span className="text-[13px] font-semibold text-slate-400 mb-4 tracking-wide uppercase block">
                Social Media
              </span>
              <div className="flex items-center gap-4 justify-center lg:justify-end">
                <SocialIcon icon={<FaLinkedin className="w-6 h-6" />} href="#" label="LinkedIn" />
                <SocialIcon icon={<FaInstagram className="w-6 h-6" />} href="#" label="Instagram" />
                <SocialIcon icon={<FaTwitter className="w-6 h-6" />} href="#" label="Twitter" />
                <SocialIcon icon={<FaFacebook className="w-6 h-6" />} href="#" label="Facebook" />
              </div>
            </div>

            <div>
              <span className="text-[13px] font-semibold text-slate-400 mb-3 tracking-wide uppercase block">
                Resources
              </span>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Career Power Moves App",
                  "Career Archetypes Guide",
                  "Blog & Insights",
                  "Tita Gray Consulting",
                  "Free Career Quiz",
                ].map((r) => (
                  <li key={r}>
                    <a href="#" className="text-sm text-slate-600 hover:text-[#0F172A] transition-colors">
                      {r}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Copyright Bar (original) ─────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-slate-200 py-8 gap-4">
          <p className="text-[13px] font-medium text-slate-500">
            Copyright © {currentYear} Career Readiness Assessment, All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[13px] font-semibold text-[#0F172A] bg-slate-100 px-3 py-1 rounded-md">
              Built For Career Clarity.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

function SocialIcon({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="text-slate-500 hover:text-[#0F172A] hover:-translate-y-1 transition-all duration-200"
    >
      {icon}
    </a>
  );
}