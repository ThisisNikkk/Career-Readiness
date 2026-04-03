"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

interface StartAssessmentButtonProps {
  className?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
}

export default function StartAssessmentButton({
  className = "inline-flex items-center gap-3 bg-gradient-to-r from-accent-blue to-secondary hover:from-secondary hover:to-accent-blue text-white rounded-full pl-6 pr-2 py-2 transition-all duration-300 group shadow-lg hover:shadow-accent-blue/20",
  children,
  showIcon = true,
}: StartAssessmentButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/assessment")}
      className={className}
    >
      <span className={children ? "" : "text-sm font-medium tracking-wide"}>
        {children || "TAKE ASSESSMENT"}
      </span>
      {showIcon && (
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
          <ArrowUpRight className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </div>
      )}
    </button>
  );
}
