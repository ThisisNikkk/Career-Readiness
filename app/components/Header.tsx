"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import StartAssessmentButton from "./StartAssessmentButton";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScrollNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname === "/") {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", id: "home", href: "/#home" },
    { name: "Why Us", id: "why-us", href: "/#why-us" },
    { name: "About", id: "about", href: "/#about" },
    { name: "FAQ", id: "faq", href: "/#faq" },
  ];

  return (
    <header className="w-full h-20 md:h-24 flex items-center justify-between px-6 md:px-16 absolute top-0 left-0 z-50 bg-transparent">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 z-50 relative">
        <Image
          src="/logo.png"
          alt="Career Readiness Assessment Logo"
          width={100}
          height={100}
          className="h-20 sm:h-28 md:h-32 w-auto object-contain"
          priority
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={(e) => handleScrollNav(e, link.id)}
            className="text-md font-medium text-black-700 hover:text-accent-blue transition-colors cursor-pointer"
          >
            {link.name}
          </a>
        ))}
        <Link
          href="/contact"
          className={`text-md font-medium transition-colors ${pathname === "/contact" ? "text-accent-blue" : "text-black-700 hover:text-accent-blue"
            }`}
        >
          Contact
        </Link>
      </nav>

      {/* Desktop CTA & Mobile Toggle */}
      <div className="flex items-center gap-4 z-50">
        <div className="hidden sm:block">
          <StartAssessmentButton className="inline-flex items-center gap-3 bg-gradient-to-r from-accent-blue to-secondary hover:from-secondary hover:to-accent-blue text-white rounded-full pl-6 pr-2 py-2 transition-all duration-300 group shadow-lg hover:shadow-accent-blue/20">
            <span className="text-sm font-medium tracking-wide ml-1 uppercase">Start Now</span>
          </StartAssessmentButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center text-primary shadow-sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-xl px-6 py-6 flex flex-col gap-6 animate-in slide-in-from-top-2 duration-300 z-40 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleScrollNav(e, link.id)}
                className="text-lg font-bold text-primary hover:text-accent-blue transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-lg font-bold transition-colors ${pathname === "/contact" ? "text-accent-blue" : "text-primary hover:text-accent-blue"
                }`}
            >
              Contact
            </Link>
          </nav>
          <div className="pt-4 border-t border-slate-100 sm:hidden">
            <StartAssessmentButton className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-accent-blue to-secondary text-white rounded-xl py-4 transition-all duration-300 shadow-md">
              <span className="text-sm font-bold tracking-wide uppercase">Start Assessment</span>
            </StartAssessmentButton>
          </div>
        </div>
      )}
    </header>
  );
}
