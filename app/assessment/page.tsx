import Assessment from "../components/Assessment";
import { getAssessmentMetadata } from "../services/assessmentService";

export default async function AssessmentPage() {
  const metadata = await getAssessmentMetadata();
  
  return <Assessment initialMetadata={metadata} />;
}
