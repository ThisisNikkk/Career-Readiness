"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, Phone, Send, CheckCircle2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const startAssessment = () => router.push("/assessment");

  return (
    <main className="relative min-h-screen bg-background font-sans overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 30%, var(--background, #ffffff) 100%)",
          }}
        />
        {/* High-visibility Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)",
            backgroundSize: "28px 28px",
            opacity: 0.5,
          }}
        />
      </div>

      <div className="relative z-15">
        <Header onStartAssessment={startAssessment} />
      </div>

      <section className="relative z-10 pt-32 pb-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="mb-4">
              <div className="inline-flex bg-slate-100 text-[#2563EB] text-[10px] tracking-[0.2em] font-bold px-4 py-2 rounded-full mb-6 uppercase">
                Get in Touch
              </div>
              <h1 className="text-[44px] md:text-[56px] font-semibold text-[#0F172A] leading-[1.1] mb-6 tracking-tight">
                Let's Chat, Reach Out to Us
              </h1>
              <p className="text-[#64748B] text-lg font-medium leading-relaxed max-w-lg">
                Have questions or feedback? We're here to help. Send us a message, and we'll respond within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {status === "success" ? (
                <div className="bg-white rounded-3xl p-10 text-center shadow-xl shadow-blue-500/5 transition-all">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Message Sent Successfully!</h3>
                  <p className="text-slate-500 mb-8">We'll get back to you within 24 hours.</p>
                  <button onClick={() => setStatus("idle")} className="text-[#2563EB] font-bold hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label htmlFor="firstName" className="text-[15px] font-bold text-[#0F172A]">First Name</label>
                      <input
                        required
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className="w-full px-6 py-4 bg-[#F1F5F9] border border-transparent rounded-xl focus:outline-none focus:ring-0 focus:border-transparent text-[#0F172A] font-medium placeholder:text-[#94A3B8] transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="lastName" className="text-[15px] font-bold text-[#0F172A]">Last Name</label>
                      <input
                        required
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        className="w-full px-6 py-4 bg-[#F1F5F9] border border-transparent rounded-xl focus:outline-none focus:ring-0 focus:border-transparent text-[#0F172A] font-medium placeholder:text-[#94A3B8] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="email" className="text-[15px] font-bold text-[#0F172A]">Email Address</label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email address"
                      className="w-full px-6 py-4 bg-[#F1F5F9] border border-transparent rounded-xl focus:outline-none focus:ring-0 focus:border-transparent text-[#0F172A] font-medium placeholder:text-[#94A3B8] transition-all"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="message" className="text-[15px] font-bold text-[#0F172A]">Message</label>
                    <textarea
                      required
                      rows={6}
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Leave us message"
                      className="w-full px-6 py-4 bg-[#F1F5F9] border border-transparent rounded-xl focus:outline-none focus:ring-0 focus:border-transparent text-[#0F172A] font-medium placeholder:text-[#94A3B8] resize-none transition-all"
                    />
                  </div>

                  <button
                    disabled={status === "submitting"}
                    className="w-full py-5 bg-[#0F172A] text-white rounded-xl font-bold uppercase tracking-[0.1em] text-[15px] hover:bg-[#1E293B] transition-all shadow-lg shadow-black/5 disabled:opacity-50 flex items-center justify-center gap-3 group overflow-hidden relative"
                  >
                    <span className="relative z-10 font-bold tracking-widest">
                      {status === "submitting" ? "Sending..." : "Send Message"}
                    </span>
                    {status !== "submitting" && (
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </button>
                </>
              )}
            </form>
          </div>

          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="relative bg-[#DBEAFE] rounded-[40px] overflow-hidden aspect-[1.1] flex items-center justify-center group shadow-2xl shadow-blue-500/10">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-[100%] h-[100%] border-[2px] border-[#2563EB]/20 rounded-full scale-[1.2]" />
                <div className="absolute w-[80%] h-[80%] border-[2px] border-[#2563EB]/20 rounded-full" />
                <div className="absolute w-[60%] h-[60%] border-[2px] border-[#2563EB]/20 rounded-full" />
                <div className="absolute w-[40%] h-[40%] border-[2px] border-[#2563EB]/20 rounded-full" />
                <div className="absolute w-[20%] h-[20%] border-[2px] border-[#2563EB]/20 rounded-full" />
              </div>

              <Image
                src="/7.png"
                alt="Support Agent"
                width={800}
                height={800}
                className="relative z-10 object-cover w-[90%] h-[90%] group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "careerreadiness@gmail.com",
                  href: "mailto:careerreadiness@gmail.com",
                  bgColor: "bg-[#EFF6FF]",
                  iconColor: "text-[#2563EB]"
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+1 (555) 000-0000",
                  href: "tel:+15550000000",
                  bgColor: "bg-[#EFF6FF]",
                  iconColor: "text-[#2563EB]"
                }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
                >
                  <div className={`w-14 h-14 rounded-full ${item.bgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#0F172A] mb-1">{item.label}</h4>
                    <p className="text-[#64748B] font-medium group-hover:text-[#2563EB] transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <Footer onStartAssessment={startAssessment} />
      </div>
    </main>
  );
}