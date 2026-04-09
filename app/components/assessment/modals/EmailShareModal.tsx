"use client";

import React, { useState } from "react";
import { X, Mail, Send, CheckCircle2 } from "lucide-react";

interface EmailShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailShareModal({ isOpen, onClose }: EmailShareModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-10 pt-16 flex flex-col items-center text-center gap-8">
          {!isSuccess ? (
            <>
              <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center text-accent-blue shadow-inner">
                <Mail className="w-10 h-10" />
              </div>
              
              <div className="space-y-3">
                <h2 className="text-3xl font-black text-[#0F172A] tracking-tight">Email Your Report</h2>
                <p className="text-sm text-slate-500 font-medium leading-relaxed px-4">
                  Enter your email address below to receive a high-resolution copy of your readiness architecture.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-50/50 border border-slate-100 px-6 py-5 rounded-2xl text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-4 focus:ring-accent-blue/5 focus:border-accent-blue/30 transition-all"
                  />
                  <div className="absolute inset-0 rounded-2xl border border-accent-blue/0 group-hover:border-accent-blue/10 pointer-events-none transition-all" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0F172A] text-white py-5 rounded-2x font-black text-xs uppercase tracking-widest hover:bg-accent-blue hover:shadow-xl hover:shadow-accent-blue/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  style={{ borderRadius: '20px' }}
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Report <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-inner scale-110 animate-in zoom-in-50 duration-500">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              
              <div className="space-y-3">
                <h2 className="text-3xl font-black text-[#0F172A] tracking-tight">Report Dispatched!</h2>
                <p className="text-sm text-slate-500 font-medium leading-relaxed px-4">
                  We've sent your strategic analysis to <span className="text-[#0F172A] font-bold">{email}</span>. Please check your inbox (and spam just in case).
                </p>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all"
              >
                Return to Analysis
              </button>
            </>
          )}
        </div>

        {/* Decorative corner */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent blur-3xl" />
      </div>
    </div>
  );
}
