"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartSummary from "../components/cart/CartSummary";
import { ShoppingBag } from "lucide-react";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col relative overflow-x-hidden pt-32">
      <Header />
      
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)", backgroundSize: "32px 32px" }} />
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <main className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-10 py-16 flex flex-col gap-12">
        
        {/* Page Title */}
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-4 text-emerald-500">
            <ShoppingBag className="w-6 h-6" />
            <span className="text-sm font-black uppercase tracking-[0.3em]">Your Selection</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#0F172A] tracking-tighter leading-none">
            Checkout.
          </h1>
        </div>

        <CartSummary />

        {/* Confidence Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-100">
          <div className="space-y-2">
            <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-widest">Instant Delivery</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Your digital assets are delivered to your email immediately after purchase.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-widest">Secure Payment</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">We use industry-standard encryption to protect your transaction details.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-widest">Lifetime Access</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Download your resources anytime from your personalized link.</p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
