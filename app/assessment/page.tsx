import { Suspense } from "react";
import Assessment from "../components/Assessment";
import { getAssessmentMetadata } from "../services/assessmentService";
import { cacheLife } from "next/cache";

export default async function AssessmentPage() {
  "use cache";
  cacheLife("days");
  
  const metadata = await getAssessmentMetadata();
  
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Assessment...</p>
      </div>
    }>
      <Assessment initialMetadata={metadata} />
    </Suspense>
  );
}
