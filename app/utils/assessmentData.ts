// ─── Types ───────────────────────────────────────────────────────────────────

export type Dimension = "clarity" | "ownership" | "curiosity" | "confidence" | "network";
export type Band = "low" | "medium" | "high";
export type RoleLevel = "Student" | "Early Career" | "Mid" | "Senior";
export type Goal = "Grow in current role" | "Pivot" | "Leadership" | "Entrepreneurship";

export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
}

export interface DimensionResult {
  dimension: Dimension;
  label: string;
  score: number; // 0–100
  band: Band;
  insight: string;
}

export interface AssessmentResult {
  overallScore: number;
  band: Band;
  bandLabel: string;
  archetype: string;
  archetypeDescription: string;
  dimensions: DimensionResult[];
  actionPlan: string[];
}

// ─── Question Bank ────────────────────────────────────────────────────────────

export const questions: Question[] = [
  // Clarity
  { id: 1, dimension: "clarity", text: "I can describe the kind of work I want to be doing in the next 3 years in one clear sentence." },
  { id: 2, dimension: "clarity", text: "I know which skills I must build in the next 12 months to reach my next role." },
  { id: 3, dimension: "clarity", text: "I regularly review my career direction instead of just 'seeing what happens'." },
  { id: 4, dimension: "clarity", text: "In the past 30 days, I have spent at least one hour actively mapping out my career trajectory." }, // Behavioral Receipt

  // Ownership
  { id: 5, dimension: "ownership", text: "In the last 90 days, I've taken a specific action (course, project, application) to move my career forward." },
  { id: 6, dimension: "ownership", text: "If I feel stuck at work, I create options instead of waiting for my manager or company to fix it." },
  { id: 7, dimension: "ownership", text: "I track my achievements so I can clearly show my impact." },
  { id: 8, dimension: "ownership", text: "In the past 30 days, I have proactively asked for feedback to improve my performance." }, // Behavioral Receipt

  // Curiosity
  { id: 9, dimension: "curiosity", text: "I consistently seek out new information about my industry or roles I'm interested in." },
  { id: 10, dimension: "curiosity", text: "I talk to people in roles I aspire to, even if it feels uncomfortable at first." },
  { id: 11, dimension: "curiosity", text: "I treat my career like an experiment and regularly try small tests (side projects, stretch tasks, etc.)." },
  { id: 12, dimension: "curiosity", text: "In the past 30 days, I have read an article, book, or attended a seminar outside of my immediate job requirements." }, // Behavioral Receipt

  // Confidence
  { id: 13, dimension: "confidence", text: "I believe my skills will stay valuable even if my current role disappeared tomorrow." },
  { id: 14, dimension: "confidence", text: "Rejection (e.g., from an application or promotion) motivates me to adjust and try again." },
  { id: 15, dimension: "confidence", text: "I feel comfortable asking for promotions, raises, or new opportunities when I'm ready." },
  { id: 16, dimension: "confidence", text: "In the past 30 days, I have confidently voiced an unpopular opinion or new idea in a professional setting." }, // Behavioral Receipt

  // Network & Visibility
  { id: 17, dimension: "network", text: "I have at least 3–5 people I could message today for advice or referrals related to my next move." },
  { id: 18, dimension: "network", text: "My online presence (e.g., LinkedIn, portfolio, social) clearly reflects the kind of roles I want." },
  { id: 19, dimension: "network", text: "I intentionally add value to my network (sharing insights, connections, support), not just ask for help." },
  { id: 20, dimension: "network", text: "In the past 30 days, I have initiated contact with someone solely to build or maintain a professional relationship." }, // Behavioral Receipt
];

// ─── Labels & Weights ─────────────────────────────────────────────────────────

export const dimensionMeta: Record<Dimension, { label: string; weight: number }> = {
  clarity: { label: "Clarity", weight: 1.2 },
  ownership: { label: "Ownership", weight: 1.2 },
  curiosity: { label: "Curiosity", weight: 1.0 },
  confidence: { label: "Confidence", weight: 1.0 },
  network: { label: "Network & Visibility", weight: 1.0 },
};

export const DIMENSION_ORDER: Dimension[] = ["clarity", "ownership", "curiosity", "confidence", "network"];

export const likertLabels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];

// ─── Scoring ──────────────────────────────────────────────────────────────────

function getDimensionBand(score: number): Band {
  if (score < 50) return "low";
  if (score < 75) return "medium";
  return "high";
}

function getOverallBand(score: number): Band {
  if (score < 50) return "low";
  if (score < 75) return "medium";
  return "high";
}

const bandLabels: Record<Band, string> = {
  low: "Coasting",
  medium: "Climbing",
  high: "Ready to Leap",
};

// ─── Insights ─────────────────────────────────────────────────────────────────

const dimensionInsights: Record<Dimension, Record<Band, string>> = {
  clarity: {
    low: "Your direction feels foggy right now — and that's okay. The first step is committing to getting specific about what you actually want.",
    medium: "You have a general sense of where you're heading, but your vision could be sharper. Getting crystal-clear will accelerate everything.",
    high: "You know exactly where you're going. This clarity is your superpower — now it's about consistent follow-through.",
  },
  ownership: {
    low: "You're waiting for conditions to improve or for others to create opportunities. The shift starts when you decide to act anyway.",
    medium: "You take action sometimes, but not consistently. Building a habit of proactive moves — even small ones — will compound fast.",
    high: "You own your career momentum. You create opportunities rather than waiting for them — keep that energy.",
  },
  curiosity: {
    low: "You're operating in a comfort zone. The market evolves fast — a little deliberate exploration each week can change everything.",
    medium: "You're curious, but inconsistently. Committing to regular learning and conversations will open doors you didn't know existed.",
    high: "Your hunger to learn and explore is a major asset. Pair curiosity with execution and you're unstoppable.",
  },
  confidence: {
    low: "Doubt is loud for you right now. Your value is real — even if it doesn't feel that way. Start by documenting your wins consistently.",
    medium: "Your confidence has room to grow. The more you rehearse your value story, the more natural it will feel to advocate for yourself.",
    high: "You believe in yourself and bounce back from setbacks. That resilience will take you further than most skills will.",
  },
  network: {
    low: "Your network is quiet. You don't need to be an extrovert — but strategic, intentional connection can open massive doors.",
    medium: "You have some connections, but they're not fully activated. Start by checking in with 2–3 people this week with no agenda.",
    high: "You've built real relationships and show up for people. Your network is already a career multiplier — keep nurturing it.",
  },
};

// ─── Action Plans ─────────────────────────────────────────────────────────────

const actionPlans: Record<Dimension, string[]> = {
  clarity: [
    "Write your '3-year career sentence' today: one sentence describing your ideal role in 3 years. Refine it until it's specific.",
    "Book a 30-minute calendar block this week to do a career direction review — not just a to-do list, but a destination check.",
    "Identify the top 3 skills you need for your next role and create a simple 90-day learning plan around them.",
  ],
  ownership: [
    "Name one concrete action you can take in the next 48 hours to move your career forward — then do it before you sleep tonight.",
    "Start a simple 'Impact Log' document. Every Friday, add 2–3 things you accomplished that week.",
    "If your role feels limiting, brainstorm 3 options you could create — internal moves, side projects, or external applications.",
  ],
  curiosity: [
    "Reach out to one person this week whose role you find interesting and ask for a 20-minute conversation.",
    "Subscribe to one industry newsletter or podcast and block 30 minutes per week to actually engage with it.",
    "Launch one small career experiment — a side project, a new platform, a stretch task — and treat it as data, not a commitment.",
  ],
  confidence: [
    "Write a list of your top 10 professional wins — including small ones. Read it before any high-stakes conversation.",
    "Prepare your 'value story': a 2-minute script that clearly explains what you do, what you're great at, and where you're heading.",
    "Next time you're rejected or overlooked, write down one thing you'd do differently — not to blame yourself, but to grow.",
  ],
  network: [
    "Message 3 people in your network this week — not to ask for anything, just to reconnect or share something useful.",
    "Update your LinkedIn profile to reflect where you're going, not just where you've been. Add a clear headline and summary.",
    "Find one community (Slack group, alumni network, industry forum) to join this month, and contribute before you ask for anything.",
  ],
};

// ─── Archetype Assignment ─────────────────────────────────────────────────────

function getArchetype(band: Band, dims: DimensionResult[]): { name: string; description: string } {
  const sorted = [...dims].sort((a, b) => b.score - a.score);
  const top = sorted[0].dimension;
  const bottom = sorted[sorted.length - 1].dimension;

  if (band === "high") {
    if (top === "clarity" || top === "ownership") {
      return { name: "Strategic Climber", description: "Clear direction, actively moving, and building the right connections. You're not waiting — you're making it happen." };
    }
    return { name: "Ready to Launch", description: "You're firing on all cylinders. Your skills, confidence, and network are aligned. It's time to make your boldest move yet." };
  }

  if (band === "medium") {
    if (top === "confidence" && bottom === "network") {
      return { name: "Hidden Star", description: "You have real skills and believe in yourself, but the world doesn't fully see you yet. Visibility is your lever." };
    }
    if (top === "curiosity") {
      return { name: "Curious Climber", description: "You love to learn and explore, but it's time to convert that curiosity into committed action. Execution is your next leap." };
    }
    return { name: "On The Rise", description: "You're making progress on multiple fronts. With a little more focus and consistency, you'll hit your stride quickly." };
  }

  // low band
  if (bottom === "clarity" || bottom === "ownership") {
    return { name: "Stuck in Place", description: "Direction and initiative feel hard right now. A reset and a clear roadmap will change everything — and it starts with one honest decision." };
  }
  return { name: "Coasting", description: "You're drifting — and your potential is bigger than your current pace. The first step is simply deciding to steer." };
}

// ─── Main Scoring Function ────────────────────────────────────────────────────

export function calculateResults(answers: Record<number, number>): AssessmentResult {
  const dimensionScores: Record<Dimension, number[]> = {
    clarity: [], ownership: [], curiosity: [], confidence: [], network: [],
  };

  questions.forEach((q) => {
    const val = answers[q.id] ?? 3;
    dimensionScores[q.dimension].push(val);
  });

  const dimResults: DimensionResult[] = DIMENSION_ORDER.map((dim) => {
    const vals = dimensionScores[dim];
    const sum = vals.reduce((a, b) => a + b, 0);
    const max = vals.length * 5;
    const score = Math.round((sum / max) * 100);
    const band = getDimensionBand(score);
    return {
      dimension: dim,
      label: dimensionMeta[dim].label,
      score,
      band,
      insight: dimensionInsights[dim][band],
    };
  });

  // Weighted overall score
  const totalWeight = Object.values(dimensionMeta).reduce((a, m) => a + m.weight, 0);
  const weightedSum = dimResults.reduce((a, d) => a + d.score * dimensionMeta[d.dimension].weight, 0);
  const overallScore = Math.round(weightedSum / totalWeight);
  const band = getOverallBand(overallScore);

  const { name, description } = getArchetype(band, dimResults);

  // Action plan: lowest dimension
  const lowestDim = [...dimResults].sort((a, b) => a.score - b.score)[0].dimension;

  return {
    overallScore,
    band,
    bandLabel: bandLabels[band],
    archetype: name,
    archetypeDescription: description,
    dimensions: dimResults,
    actionPlan: actionPlans[lowestDim],
  };
}
