import { calculateResults, questions } from './app/utils/assessmentData';

// 1. Create Mock Answers
// We'll simulate the example provided:
// Clarity (IDs 1-5): [4, 5, 3, 4, 2]
// Ownership (IDs 6-10): [5, 4, 4, 3, 5]
// Curiosity (IDs 11-15): [2, 3, 2, 3, 2]
// Confidence (IDs 16-20): [4, 4, 3, 4, 5]
// Network (IDs 21-25): [2, 1, 2, 3, 2]

const mockAnswers: Record<number, number> = {
  // Clarity
  1: 4, 2: 5, 3: 3, 4: 4, 5: 2,
  // Ownership
  6: 5, 7: 4, 8: 4, 9: 3, 10: 5,
  // Curiosity
  11: 2, 12: 3, 13: 2, 14: 3, 15: 2,
  // Confidence
  16: 4, 17: 4, 18: 3, 19: 4, 20: 5,
  // Network
  21: 2, 22: 1, 23: 2, 24: 3, 25: 2,
};

console.log("🚀 STARTING SCORING LOGIC TEST\n");
console.log("--------------------------------------------------");
console.log("STEP 1: Input Answers Received");
console.log(mockAnswers);
console.log("--------------------------------------------------\n");

// 2. Run the logic
const result = calculateResults(mockAnswers);

// 3. Log results in a readable way
console.log("STEP 2: Dimension Breakdown");
result.dimensions.forEach(d => {
  console.log(`- ${d.label.padEnd(20)} | Score: ${d.score}% | Band: ${d.band.toUpperCase()}`);
});

console.log("\n--------------------------------------------------");
console.log("STEP 3: Overall Assessment Result");
console.log(`OVERALL SCORE: ${result.overallScore}%`);
console.log(`OVERALL BAND:  ${result.band.toUpperCase()} (${result.bandLabel})`);
console.log(`ARCHETYPE:     ${result.archetype}`);
console.log(`DESCRIPTION:   ${result.archetypeDescription}`);

console.log("\n--------------------------------------------------");
console.log("STEP 4: Action Plan (Based on lowest dimension)");
result.actionPlan.forEach((task, i) => {
  console.log(`${i + 1}. ${task}`);
});

console.log("\n🚀 TEST COMPLETE");
