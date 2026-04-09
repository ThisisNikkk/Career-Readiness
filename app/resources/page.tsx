import React, { Suspense } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EbookCard from "../components/resources/EbookCard";
import { getEbooks } from "../utils/resourcesData";
import { Sparkles } from "lucide-react";

export default async function ResourcesPage() {
  const ebooks = await getEbooks();

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col relative overflow-x-hidden pt-32">
      <Header />
      
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)", backgroundSize: "32px 32px" }} />
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <main className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-10 py-16 flex flex-col gap-20">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center gap-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-blue-50 text-blue-600 rounded-full border border-blue-100/50">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Premium Library</span>
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-[#0F172A] tracking-tighter leading-[1.05] max-w-4xl mx-auto">
              Strategic Assets for <br />
              <span className="text-accent-blue">Exponential Growth.</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Curated eBooks and toolkits designed by Tita Gray to help you own your momentum and master professional visibility.
            </p>
          </div>
        </div>

        {/* Ebook Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ebooks.map((ebook, idx) => (
            <div key={ebook.id} className="animate-in fade-in slide-in-from-bottom-8 duration-1000" style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}>
              <EbookCard ebook={ebook} />
            </div>
          ))}
        </section>

        {/* Support Section */}
        <section className="bg-slate-900 rounded-[48px] p-10 md:p-20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Need a custom roadmap?</h2>
            <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto">
              Our eBooks are just the beginning. Book a consulting session for personalized career architecture.
            </p>
            <div className="pt-6">
              <a href="/contact" className="inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent-blue hover:text-white transition-all hover:shadow-2xl hover:shadow-accent-blue/30">
                Book a Session
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
