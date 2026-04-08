"use client";

import React from "react";
import { RotateCcw } from "lucide-react";

interface RetakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RetakeModal({ isOpen, onClose, onConfirm }: RetakeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/50 backdrop-blur-sm animate-fade-in-up" onClick={onClose}>
      <div
        className="w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl border border-slate-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>

        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-accent-blue mb-6">
          <RotateCcw className="w-6 h-6" />
        </div>

        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Retake Assessment</h2>
        <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">
          This assessment is limited to one attempt per user. Additional attempts require a <span className="font-bold text-slate-900">$9.99</span> fee.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest bg-slate-900 hover:bg-slate-800 text-white transition-all flex items-center justify-center gap-2"
          >
            Accept & Retake ($9.99)
          </button>
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
