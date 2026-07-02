export interface QuizOption {
  label: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  eyebrow: string;
  options: QuizOption[];
}

export const FALLBACK_QUESTION_TEMPLATES: Omit<QuizQuestion, "id">[] = [
  {
    eyebrow: "Scenario 01",
    prompt: "It's 6:45 PM. The gym closes at 9. Right now, you are:",
    options: [
      { label: "Already on the couch, and I know it", score: 3 },
      { label: "Negotiating with myself about it", score: 2 },
      { label: "Mid-set, phone in a locker", score: 0 },
      { label: "Just got back and showered", score: 0 },
    ],
  },
  {
    eyebrow: "Scenario 02",
    prompt: "Your newest piece of workout clothing was purchased:",
    options: [
      { label: "This week. Tags are still on it", score: 3 },
      { label: "This month, worn maybe twice", score: 2 },
      { label: "Honestly? I could not tell you", score: 3 },
      { label: "It's older than most of my friendships", score: 0 },
    ],
  },
  {
    eyebrow: "Scenario 03",
    prompt: "A friend texts: \"gym together, 7am tomorrow?\" You:",
    options: [
      { label: "Say yes immediately, cancel by 6:58am", score: 3 },
      { label: "Say yes and actually set two alarms", score: 0 },
      { label: "Panic-suggest a walk around the block instead", score: 1 },
      { label: "Already have a standing slot nobody can move", score: 0 },
    ],
  },
  {
    eyebrow: "Scenario 04",
    prompt: "Be honest — what's currently sitting on your gym bag or mat?",
    options: [
      { label: "A visible layer of dust", score: 3 },
      { label: "Unrelated laundry", score: 2 },
      { label: "Nothing, it lives in a gym locker", score: 0 },
      { label: "I don't own one yet — buying today", score: 2 },
    ],
  },
];

export function shuffleArray<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function buildQuizQuestions(): QuizQuestion[] {
  return FALLBACK_QUESTION_TEMPLATES.map((question, index) => ({
    id: `q${index + 1}`,
    ...question,
    options: shuffleArray(question.options),
  }));
}
