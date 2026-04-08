"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SubscriptionScreen from "../components/assessment/SubscriptionScreen";

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if result exists in localStorage
    const saved = localStorage.getItem("career_assessment_result");
    if (!saved) {
      router.replace("/assessment");
      return;
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Authenticating Session...</p>
      </div>
    );
  }

  return <SubscriptionScreen />;
}
