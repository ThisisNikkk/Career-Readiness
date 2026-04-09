// ─── Types ───────────────────────────────────────────────────────────────────

export type Dimension = "clarity" | "ownership" | "curiosity" | "confidence" | "network";
export type Band = "low" | "medium" | "high";
export type RoleLevel = "Student" | "Early Career" | "Mid Career" | "Seasoned Professional";
export type Goal = "Grow in Current Role" | "Career Pivot" | "Leadership Transition" | "Entrepreneur";
export type AssessmentPlan = "standard" | "advanced";

export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  type: "core" | "advanced";
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
  planType: AssessmentPlan;
}

// ─── Question Bank ────────────────────────────────────────────────────────────

export const questions: Question[] = [
  // ── Core Questions (1–25) ──────────────────────────────

  // Clarity
  { id: 1, type: "core", dimension: "clarity", text: "I can describe the kind of work I want next without overthinking it." },
  { id: 2, type: "core", dimension: "clarity", text: "I know what \u201ccareer growth\u201d means for me right now." },
  { id: 3, type: "core", dimension: "clarity", text: "I have a realistic picture of where I want to be in the next 1\u20133 years." },
  { id: 4, type: "core", dimension: "clarity", text: "I can name the biggest gap between where I am and where I want to go." },
  { id: 5, type: "core", dimension: "clarity", text: "I regularly check whether my current path still fits my goals." },

  // Ownership
  { id: 6, type: "core", dimension: "ownership", text: "I take action on my career instead of waiting for someone else to guide me." },
  { id: 7, type: "core", dimension: "ownership", text: "I follow through when I set career goals for myself." },
  { id: 8, type: "core", dimension: "ownership", text: "I actively look for opportunities to grow, even if they are outside my comfort zone." },
  { id: 9, type: "core", dimension: "ownership", text: "I keep track of my wins, skills, or accomplishments in a way I can use later." },
  { id: 10, type: "core", dimension: "ownership", text: "When I feel stuck, I make a plan rather than staying in place." },

  // Curiosity
  { id: 11, type: "core", dimension: "curiosity", text: "I like exploring career options I have not seriously considered before." },
  { id: 12, type: "core", dimension: "curiosity", text: "I ask questions and learn about different roles, industries, or paths." },
  { id: 13, type: "core", dimension: "curiosity", text: "I pay attention to trends that could affect my future opportunities." },
  { id: 14, type: "core", dimension: "curiosity", text: "I am open to trying new experiences that could expand my career direction." },
  { id: 15, type: "core", dimension: "curiosity", text: "I seek out people, content, or resources that broaden how I think about my future." },

  // Confidence
  { id: 16, type: "core", dimension: "confidence", text: "I believe I can handle the challenges that come with career growth." },
  { id: 17, type: "core", dimension: "confidence", text: "I feel capable of learning what I need to succeed in my next role." },
  { id: 18, type: "core", dimension: "confidence", text: "I can recover when a career goal does not work out the first time." },
  { id: 19, type: "core", dimension: "confidence", text: "I am comfortable advocating for myself when an opportunity matters." },
  { id: 20, type: "core", dimension: "confidence", text: "I trust that I have value to offer, even if I am still growing." },

  // Network & Visibility
  { id: 21, type: "core", dimension: "network", text: "I have people in my network I could reach out to for career advice." },
  { id: 22, type: "core", dimension: "network", text: "I make a point to stay visible to the people and spaces that matter for my goals." },
  { id: 23, type: "core", dimension: "network", text: "I am intentional about building relationships that support my growth." },
  { id: 24, type: "core", dimension: "network", text: "I know how to talk about my strengths in a way that feels natural." },
  { id: 25, type: "core", dimension: "network", text: "I use my online presence to reflect the direction I want my career to go." },

  // ── Advanced Questions (26–50) ─────────────────────────

  // Clarity (Advanced)
  { id: 26, type: "advanced", dimension: "clarity", text: "I can explain my value clearly." },
  { id: 27, type: "advanced", dimension: "clarity", text: "I know what to strengthen next." },
  { id: 28, type: "advanced", dimension: "clarity", text: "I make intentional career decisions." },
  { id: 29, type: "advanced", dimension: "clarity", text: "I can adapt when plans change." },
  { id: 30, type: "advanced", dimension: "clarity", text: "I know how to position myself for more." },

  // Ownership (Advanced)
  { id: 31, type: "advanced", dimension: "ownership", text: "I take initiative in my career." },
  { id: 32, type: "advanced", dimension: "ownership", text: "I follow through on my goals." },
  { id: 33, type: "advanced", dimension: "ownership", text: "I ask for help when needed." },
  { id: 34, type: "advanced", dimension: "ownership", text: "I use feedback to improve." },
  { id: 35, type: "advanced", dimension: "ownership", text: "I stay consistent, even when motivation dips." },

  // Curiosity (Advanced)
  { id: 36, type: "advanced", dimension: "curiosity", text: "I explore new career possibilities." },
  { id: 37, type: "advanced", dimension: "curiosity", text: "I seek out useful perspectives." },
  { id: 38, type: "advanced", dimension: "curiosity", text: "I pay attention to industry trends." },
  { id: 39, type: "advanced", dimension: "curiosity", text: "I stay open to new experiences." },
  { id: 40, type: "advanced", dimension: "curiosity", text: "I look for ways to grow my credibility." },

  // Confidence (Advanced)
  { id: 41, type: "advanced", dimension: "confidence", text: "I speak about my achievements with ease." },
  { id: 42, type: "advanced", dimension: "confidence", text: "I believe I can grow into new roles." },
  { id: 43, type: "advanced", dimension: "confidence", text: "I recover quickly from setbacks." },
  { id: 44, type: "advanced", dimension: "confidence", text: "I trust my ability to handle challenges." },
  { id: 45, type: "advanced", dimension: "confidence", text: "I can advocate for what I need." },

  // Network & Visibility (Advanced)
  { id: 46, type: "advanced", dimension: "network", text: "I build new connections with confidence." },
  { id: 47, type: "advanced", dimension: "network", text: "I stay visible to the right people." },
  { id: 48, type: "advanced", dimension: "network", text: "I communicate my strengths clearly." },
  { id: 49, type: "advanced", dimension: "network", text: "I know how to follow up professionally." },
  { id: 50, type: "advanced", dimension: "network", text: "I use my presence to attract opportunity." },
];

// ─── Filtered Question Sets ──────────────────────────────────────────────────

export const coreQuestions = questions.filter((q) => q.type === "core");
export const advancedQuestions = questions.filter((q) => q.type === "advanced");

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

// ─── Main Scoring Function (Standard — core only) ────────────────────────────

export function calculateResults(answers: Record<number, number>): AssessmentResult {
  const dimensionScores: Record<Dimension, number[]> = {
    clarity: [], ownership: [], curiosity: [], confidence: [], network: [],
  };

  coreQuestions.forEach((q) => {
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
    planType: "standard",
  };
}

// ─── Advanced Scoring Function (70% core + 30% advanced) ─────────────────────

export function calculateAdvancedResults(
  coreAnswers: Record<number, number>,
  advancedAnswerSet: Record<number, number>,
): AssessmentResult {
  // Compute per-dimension core scores (0–100)
  const coreDimScores: Record<Dimension, number> = { clarity: 0, ownership: 0, curiosity: 0, confidence: 0, network: 0 };
  const advDimScores: Record<Dimension, number> = { clarity: 0, ownership: 0, curiosity: 0, confidence: 0, network: 0 };

  for (const dim of DIMENSION_ORDER) {
    const coreQs = coreQuestions.filter((q) => q.dimension === dim);
    const coreSum = coreQs.reduce((acc, q) => acc + (coreAnswers[q.id] ?? 3), 0);
    coreDimScores[dim] = (coreSum / (coreQs.length * 5)) * 100;

    const advQs = advancedQuestions.filter((q) => q.dimension === dim);
    const advSum = advQs.reduce((acc, q) => acc + (advancedAnswerSet[q.id] ?? 3), 0);
    advDimScores[dim] = (advSum / (advQs.length * 5)) * 100;
  }

  // Blend: Final = (0.7 × Core) + (0.3 × Advanced)
  const dimResults: DimensionResult[] = DIMENSION_ORDER.map((dim) => {
    const blended = 0.7 * coreDimScores[dim] + 0.3 * advDimScores[dim];
    const score = Math.round(blended);
    const band = getDimensionBand(score);
    return {
      dimension: dim,
      label: dimensionMeta[dim].label,
      score,
      band,
      insight: dimensionInsights[dim][band],
    };
  });

  // Weighted overall
  const totalWeight = Object.values(dimensionMeta).reduce((a, m) => a + m.weight, 0);
  const weightedSum = dimResults.reduce((a, d) => a + d.score * dimensionMeta[d.dimension].weight, 0);
  const overallScore = Math.round(weightedSum / totalWeight);
  const band = getOverallBand(overallScore);

  const { name, description } = getArchetype(band, dimResults);
  const lowestDim = [...dimResults].sort((a, b) => a.score - b.score)[0].dimension;

  return {
    overallScore,
    band,
    bandLabel: bandLabels[band],
    archetype: name,
    archetypeDescription: description,
    dimensions: dimResults,
    actionPlan: actionPlans[lowestDim],
    planType: "advanced",
  };
}
