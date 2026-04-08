"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Results from "../components/Results";
import { type AssessmentResult } from "../utils/assessmentData";

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("career_assessment_result");
    if (!saved) {
      router.replace("/assessment");
      return;
    }
    try {
      setResult(JSON.parse(saved));
    } catch (e) {
      router.replace("/assessment");
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
        <div className="w-12 h-12 border-4 border-accent-blue border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Results...</p>
      </div>
    );
  }

  return (
    <Results
      result={result}
      onRetake={() => {
        localStorage.removeItem("career_assessment_result");
        router.replace("/assessment");
      }}
      onBack={() => router.push("/")}
    />
  );
}
