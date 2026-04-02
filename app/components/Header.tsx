import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Header({ onStartAssessment }: { onStartAssessment?: () => void }) {
  return (
    <header className="w-full h-24 flex items-center justify-between px-8 md:px-16 absolute top-0 left-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Career Readiness Assessment Logo"
          width={100}
          height={100}
          className="h-32 w-auto object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-md font-medium text-gray-600 hover:text-accent-blue transition-colors"
        >
          About
        </a>
        <a
          href="#path"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('path')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-md font-medium text-gray-600 hover:text-accent-blue transition-colors"
        >
          Path
        </a>
        <a
          href="#method"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('method')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-md font-medium text-gray-600 hover:text-accent-blue transition-colors"
        >
          Method
        </a>
        <a
          href="#faq"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-md font-medium text-gray-600 hover:text-accent-blue transition-colors"
        >
          FAQ
        </a>
      </nav>

      {/* CTA section */}
      <div className="flex items-center">
        <button onClick={onStartAssessment} className="inline-flex items-center gap-3 bg-gradient-to-r from-accent-blue to-secondary hover:from-secondary hover:to-accent-blue text-white rounded-full pl-5 pr-1.5 py-1.5 transition-all group shadow-sm hover:shadow-md">
          <span className="text-sm font-medium tracking-wide ml-1 uppercase">Start Now</span>
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </div>
        </button>
      </div>
    </header>
  );
}
