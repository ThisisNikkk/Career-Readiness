"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Journey from "./components/Journey";
import Impact from "./components/Impact";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import Assessment from "./components/Assessment";

export default function Home() {
  const [mode, setMode] = useState<"landing" | "assessment">("landing");
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize mode from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("appMode");
    if (savedMode === "assessment" || savedMode === "landing") {
      setMode(savedMode);
    }
    setIsLoaded(true);
  }, []);

  // Update localStorage when mode changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("appMode", mode);
    }
  }, [mode, isLoaded]);

  if (!isLoaded) {
    return <div className="min-h-screen bg-background" />; // Prevent flash of landing
  }

  if (mode === "assessment") {
    return <Assessment onBack={() => setMode("landing")} />;
  }

  return (
    <main className="relative min-h-screen bg-background">
      <Header onStartAssessment={() => setMode("assessment")} />
      <Hero onStartAssessment={() => setMode("assessment")} />
      <About onStartAssessment={() => setMode("assessment")} />
      <Journey onStartAssessment={() => setMode("assessment")} />
      {/* <Impact onStartAssessment={() => setMode("assessment")} /> */}
      <FAQ />
      <FinalCTA onStartAssessment={() => setMode("assessment")} />
      <Footer onStartAssessment={() => setMode("assessment")} />
    </main>
  );
}
