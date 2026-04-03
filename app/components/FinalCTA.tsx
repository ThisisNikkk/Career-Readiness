"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Zap, Target, BarChart3 } from "lucide-react";
import StartAssessmentButton from "./StartAssessmentButton";

export default function FinalCTA() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.4 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 196, 255, ${p.opacity})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 162, 255, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const stats = [
    { icon: <Zap className="w-4 h-4" />, value: "~3 min", label: "To complete" },
    { icon: <Target className="w-4 h-4" />, value: "5", label: "Dimensions scored" },
    { icon: <BarChart3 className="w-4 h-4" />, value: "10K+", label: "Careers unlocked" },
  ];

  return (
    <section className="w-full px-4 md:px-8 mb-12 relative z-10">
      <div
        className="relative w-full max-w-[95%] mx-auto rounded-[40px] overflow-hidden"
        style={{ background: "linear-gradient(135deg, #060D1F 0%, #0D1B3E 50%, #081428 100%)" }}
      >
        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,162,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,162,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Orbs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.14) 0%, transparent 70%)", filter: "blur(60px)" }} />

        {/* Shimmer beam */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ borderRadius: "40px" }}>
          <div className="absolute top-0 left-[-60%] w-[40%] h-full opacity-[0.04]"
            style={{ background: "linear-gradient(105deg, transparent, white, transparent)", animation: "shimmer 6s ease-in-out infinite" }} />
        </div>

        {/* Bottom edge glow */}
        <div className="absolute bottom-0 left-[10%] right-[10%] h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,162,255,0.3), transparent)" }} />

        <style>{`
          @keyframes shimmer { 0% { transform: translateX(0); } 100% { transform: translateX(400%); } }
          @keyframes float-up { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
          @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(1.6); opacity: 0; } }
          @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>

        {/* ── Centered content ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-16 py-20 md:py-28 gap-8">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{
              background: "rgba(255,255,255,0.06)",
              borderColor: "rgba(255,255,255,0.12)",
              color: "#7DD3FC",
              backdropFilter: "blur(8px)",
              animation: "fade-in-up 0.5s ease both",
            }}
          >
            <Sparkles className="w-3 h-3" />
            The Final Milestone
          </div>

          {/* Heading */}
          <h2
            className="text-4xl md:text-6xl font-black leading-[1.05] text-white tracking-tighter max-w-3xl"
            style={{ animation: "fade-in-up 0.5s 0.1s ease both" }}
          >
            Ready to Uncover{" "}
            <br className="hidden md:block" />
            <span style={{
              background: "linear-gradient(90deg, #60A5FA, #38BDF8, #93C5FD)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Your Career Mastery?
            </span>
          </h2>

          {/* Subtext */}
          <p
            className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-medium"
            style={{ animation: "fade-in-up 0.5s 0.2s ease both" }}
          >
            Stop guessing your next move. Get the data, identify your gaps, and start steering your professional growth with a personalized action plan.
          </p>

          {/* CTA row */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
            style={{ animation: "fade-in-up 0.5s 0.4s ease both" }}
          >
            <StartAssessmentButton className="inline-flex items-center gap-3 bg-gradient-to-r from-accent-blue to-secondary hover:from-secondary hover:to-accent-blue text-white rounded-full pl-6 pr-2 py-2 transition-all duration-300 group shadow-lg hover:shadow-accent-blue/20">
              <span className="text-sm font-medium tracking-wide ml-1 uppercase">Start Assessment Now</span>
            </StartAssessmentButton>

            <div className="flex items-center gap-2.5">
              <div className="relative w-2 h-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 absolute" />
                <div className="w-2 h-2 rounded-full bg-emerald-400 absolute"
                  style={{ animation: "pulse-ring 1.8s ease-out infinite" }} />
              </div>
              <span className="text-xs text-slate-400 font-bold tracking-widest uppercase">Join 10,000+ Others</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}