import Assessment from "../components/Assessment";
import { getAssessmentMetadata } from "../services/assessmentService";
import { cacheLife } from "next/cache";

export default async function AssessmentPage() {
  "use cache";
  cacheLife("days");
  
  const metadata = await getAssessmentMetadata();
  
  return <Assessment initialMetadata={metadata} />;
}
