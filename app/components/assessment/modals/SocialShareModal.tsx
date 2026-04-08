"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { FaFacebook } from "react-icons/fa6";

const SubstackIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
  </svg>
);

interface SocialShareModalProps {
  platform: 'facebook' | 'substack';
  shareText: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function SocialShareModal({ platform, shareText, isOpen, onClose }: SocialShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isFacebook = platform === 'facebook';
  const platformName = isFacebook ? 'Facebook' : 'Substack';
  const platformUrl = isFacebook ? 'https://www.facebook.com/' : 'https://substack.com/notes';
  const Icon = isFacebook ? FaFacebook : SubstackIcon;
  const brandColor = isFacebook ? '#1877F2' : '#FF6719';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText).catch(() => { });
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenPlatform = () => {
    window.open(platformUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

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

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl"
          style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}
        >
          <Icon />
        </div>

        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Share to {platformName}</h2>
        <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">
          {platformName} {' '}doesn&apos;t allow pre-filled posts. Copy the text below, then paste it into a new post.
        </p>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-6">
          <p className="text-sm text-slate-700 font-medium leading-relaxed">{shareText}</p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleCopy}
            className={`w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${copied
              ? 'bg-emerald-500 text-white'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
          >
            {copied ? (
              <><Check className="w-4 h-4" /> Copied! — Now Open {platformName}</>
            ) : (
              <>Copy Text</>
            )}
          </button>
          <button
            onClick={handleOpenPlatform}
            className="w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}
          >
            Open {platformName}
          </button>
        </div>
      </div>
    </div>
  );
}
