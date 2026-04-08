"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import StartAssessmentButton from "./StartAssessmentButton";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleScrollNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname === "/") {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on home page, navigate to home with the hash
      // The browser will handle the scroll if it's a standard link, 
      // but we can also use router.push
    }
  };

  const navLinks = [
    { name: "Home", id: "home", href: "/#home" },
    { name: "Why Us", id: "why-us", href: "/#why-us" },
    { name: "About", id: "about", href: "/#about" },
    { name: "Path", id: "path", href: "/#path" },
    { name: "FAQ", id: "faq", href: "/#faq" },
  ];

  return (
    <header className="w-full h-24 flex items-center justify-between px-8 md:px-16 absolute top-0 left-0 z-50 bg-transparent">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Career Readiness Assessment Logo"
          width={100}
          height={100}
          className="h-32 w-auto object-contain"
        />
      </Link>

      {/* Navigation */}
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

      {/* CTA section */}
      <div className="flex items-center">
        <StartAssessmentButton className="inline-flex items-center gap-3 bg-gradient-to-r from-accent-blue to-secondary hover:from-secondary hover:to-accent-blue text-white rounded-full pl-6 pr-2 py-2 transition-all duration-300 group shadow-lg hover:shadow-accent-blue/20">
          <span className="text-sm font-medium tracking-wide ml-1 uppercase">Start Now</span>
        </StartAssessmentButton>
      </div>
    </header>
  );
}
