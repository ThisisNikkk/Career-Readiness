import React from "react";
import Image from "next/image";
import { Award, Users, BarChart3, Star, TrendingUp } from "lucide-react";
import StartAssessmentButton from "./StartAssessmentButton";

const stages = [
    {
        title: "The Starter",
        description: "Breaking into the market with clarity. We help you identify your unique strengths and set a trajectory that avoids the 'early-career drift'.",
        audience: "Students & Graduates",
    },
    {
        title: "The Builder",
        description: "5-10 years in. You've proven you can do the work; now we audit your growth to identify leadership gaps and prepare you for the next leap.",
        audience: "Mid-Career Professionals",
    },
    {
        title: "The Expert",
        description: "Senior and seasoned. Maintaining relevance and maximum impact. We assess your strategic orbit and ensure your legacy continues to expand.",
        audience: "Senior Leaders & Executives",
    },
];

export default function WhyUs() {
    return (
        <section id="why-us" className="relative w-full py-24 px-6 md:px-16 bg-white overflow-hidden">

            {/* Subtle Dot Pattern Background */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-40"
                style={{
                    backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
                    backgroundSize: "24px 24px"
                }}
            />

            <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">

                {/* Authority Badge */}
                <div className="inline-flex items-center gap-2 bg-slate-50 text-accent-blue text-[11px] font-bold tracking-[.15em] px-4 py-2 rounded-full mb-8 uppercase border border-slate-100">
                    <Award className="w-4 h-4" />
                    Why This Assessment
                </div>

                {/* Headline */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-[1.1] mb-8 tracking-tight max-w-4xl">
                    Every Generation. <span className="text-accent-blue">One Shared Framework.</span>
                </h2>

                <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mb-16">
                    Success isn't about age; it's about readiness. Our evidence-based framework audits your position relative to the industry's most critical high-performance metrics.
                </p>

                {/* Panoramic Image - Standalone Framed Element */}
                <div className="relative w-full max-w-7xl group mb-16 md:mb-20">
                    <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 h-[280px] sm:aspect-[16/9] md:h-auto md:aspect-[2.4/1] bg-slate-50 z-10">
                        <Image
                            src="/why.png"
                            alt="A panoramic view of professionals from every generation"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            priority
                        />
                    </div>

                    {/* SVG Connector Line */}
                    <svg
                        className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible opacity-60"
                        viewBox="0 0 1000 400"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M 60,130 C 250,240 450,-30 950,50"
                            stroke="url(#gradient-line-why)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray="1500"
                            strokeDashoffset="1500"
                            className="animate-draw-line"
                        />
                        <defs>
                            <linearGradient id="gradient-line-why" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Primary Social Proof Card */}
                    <div
                        className="hidden md:flex absolute top-[25%] -left-6 lg:-left-8 bg-white/80 backdrop-blur-xl p-4 rounded-[24px] border border-white/40 shadow-2xl items-center gap-4 hover:scale-105 transition-all duration-500 animate-float z-50"
                        style={{ animationDuration: '6s' }}
                    >
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden relative shadow-sm group-hover:translate-x-1 transition-transform">
                                    <Image
                                        src={`https://i.pravatar.cc/100?img=${i + 15}`}
                                        alt="avatar"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-white bg-accent-blue flex items-center justify-center text-white text-[9px] font-bold shadow-sm">
                                +
                            </div>
                        </div>
                        <div className="flex flex-col text-left">
                            <div className="text-primary font-bold text-sm tracking-tight">Join 10,000+</div>
                            <div className="text-primary/60 text-[14px] font-medium">Professionals</div>
                        </div>
                    </div>

                    {/* Analysis Detail Card */}
                    <div
                        className="hidden md:flex absolute top-[10%] -right-6 lg:-right-8 bg-accent-blue/90 backdrop-blur-lg p-5 rounded-[28px] border border-white/20 shadow-2xl flex-col gap-2 hover:-translate-y-2 transition-transform animate-float z-50"
                        style={{ animationDuration: '8s', animationDelay: '1s' }}
                    >
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                            <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-col text-left">
                            <div className="text-white font-bold text-lg tracking-tight leading-none">5 Dimensions</div>
                            <div className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-0.5">Deep Analysis</div>
                        </div>
                    </div>
                </div>

                {/* ── Stats Strip ─────────────────────────────────────────── */}
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 md:pt-2 mt-2">
                    {[
                        { icon: Users, value: "10,000+", label: "Assessments Taken" },
                        { icon: Star, value: "4.9 / 5", label: "Average User Rating" },
                        { icon: TrendingUp, value: "90%", label: "Report Clarity Gained" },
                        { icon: Award, value: "5", label: "Career Dimensions Scored" },
                    ].map(({ icon: Icon, value, label }) => (
                        <div key={label} className="flex flex-col items-center text-center gap-1">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-1 shadow-sm">
                                <Icon className="w-6 h-6 text-slate-500" strokeWidth={1.5} />
                            </div>
                            <span className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">{value}</span>
                            <span className="text-xs sm:text-sm font-medium text-slate-500 leading-tight">{label}</span>
                        </div>
                    ))}
                </div>

            </div>

            {/* Global style for animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(1deg); }
                }
                @keyframes draw-line {
                    to { stroke-dashoffset: 0; }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                .animate-draw-line {
                    animation: draw-line 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    animation-delay: 1s;
                }
            `}} />
        </section>
    );
}
