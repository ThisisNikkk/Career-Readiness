import { type AssessmentResult } from "../../utils/assessmentData";

export const getShareContent = (result: AssessmentResult, origin: string) => {
  const url = origin;
  const shareText = `🎯 I just scored ${result.overallScore}/100 on the Career Readiness Assessment! My archetype: "${result.archetype}". Take yours 👇: ${url}`;
  const linkedInText = `🎯 I just scored ${result.overallScore}/100 on the Career Readiness Assessment!\n\n💡 Archetype: ${result.archetype}\n\nDiscover yours 👇: ${url}`;

  return {
    text: shareText,
    linkedInText,
    url
  };
};

export const PLATFORMS = {
  LINKEDIN: {
    name: 'LinkedIn',
    getUrl: (text: string) => `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`,
  },
  FACEBOOK: {
    name: 'Facebook',
    url: 'https://www.facebook.com/',
  },
  SUBSTACK: {
    name: 'Substack',
    url: 'https://substack.com/notes',
  }
};
