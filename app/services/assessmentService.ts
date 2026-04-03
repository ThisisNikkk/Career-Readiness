import { cacheLife } from "next/cache";
import { questions, dimensionMeta, DIMENSION_ORDER, likertLabels } from "../utils/assessmentData";

/**
 * Accesses assessment metadata with high-performance caching.
 * 'use cache' in Next.js 16 ensures this data is pre-rendered and served instantly.
 */
export async function getAssessmentMetadata() {
  "use cache";
  cacheLife("days"); // Static content, refreshes daily at most or on build

  return {
    questions,
    dimensionMeta,
    DIMENSION_ORDER,
    likertLabels,
  };
}
