export interface QuizOption {
  label: string;
  gymScore: number;
  homeScore: number;
  boutiqueScore: number;
  couchScore: number;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  eyebrow: string;
  options: QuizOption[];
}

export const FALLBACK_QUESTION_TEMPLATES: Omit<QuizQuestion, "id">[] = [
  {
    eyebrow: "The Track Record",
    prompt: "Be honest with your maker. The last time you had a fitness-adjacent goal, what happened?",
    options: [
      { label: "I went 4 times a week, tracking every macro like a scientist.", gymScore: 2, homeScore: 1, boutiqueScore: 1, couchScore: 0 },
      { label: "I bought a yoga mat, used it once as a stretching pad, and it is now gathering dust under my bed.", gymScore: 0, homeScore: 0, boutiqueScore: 0, couchScore: 3 },
      { label: "I paid for a membership for 8 months without going because I was too polite to cancel.", gymScore: 0, homeScore: 0, boutiqueScore: 0, couchScore: 3 },
      { label: "I run outside until my knees click, then stop for three months.", gymScore: 0, homeScore: 2, boutiqueScore: 0, couchScore: 1 }
    ],
  },
  {
    eyebrow: "The Commute Reality Check",
    prompt: "It is Tuesday at 6:45 PM. It is dark, slightly drizzling, and you just finished a brutal work meeting. The gym is a 12-minute drive away. What are you doing?",
    options: [
      { label: "Driving there. The iron calls to me.", gymScore: 3, homeScore: 0, boutiqueScore: 0, couchScore: 0 },
      { label: "Sitting in my car in the driveway for 25 minutes scrolling TikTok, eventually eating cereal.", gymScore: 0, homeScore: 0, boutiqueScore: 0, couchScore: 3 },
      { label: "I would go, but only if I have a pre-workout drink that makes my face itch so badly I have to lift things.", gymScore: 2, homeScore: 1, boutiqueScore: 0, couchScore: 0 },
      { label: "Opening a bottle of wine and doing three aggressive air squats to alleviate the guilt.", gymScore: 0, homeScore: 0, boutiqueScore: 0, couchScore: 3 }
    ],
  },
  {
    eyebrow: "The Social Comfort Level",
    prompt: "How do you feel about making accidental eye contact with a stranger who is grunting loudly while doing biceps curls directly in front of the mirror?",
    options: [
      { label: "Standard Tuesday behavior. I will nod respectfully.", gymScore: 3, homeScore: 0, boutiqueScore: 0, couchScore: 0 },
      { label: "I would rather swallow a live wasp than navigate the social anxiety of a crowded free-weight section.", gymScore: 0, homeScore: 3, boutiqueScore: 0, couchScore: 0 },
      { label: "I only care if the lighting is optimal for my post-workout pump selfie.", gymScore: 1, homeScore: 0, boutiqueScore: 3, couchScore: 0 },
      { label: "I prefer to sweat in the dark, isolated privacy of my own existential dread.", gymScore: 0, homeScore: 3, boutiqueScore: 0, couchScore: 1 }
    ],
  },
  {
    eyebrow: "The Atmosphere Preference",
    prompt: "What does your ideal workout environment smell like?",
    options: [
      { label: "Chalk, stale sweat, and iron.", gymScore: 3, homeScore: 0, boutiqueScore: 0, couchScore: 0 },
      { label: "Eucalyptus, expensive candles, and a $16 cold-pressed juice.", gymScore: 0, homeScore: 0, boutiqueScore: 3, couchScore: 0 },
      { label: "My own living room, specifically because nobody else is there.", gymScore: 0, homeScore: 3, boutiqueScore: 0, couchScore: 0 },
      { label: "I don't know, what does a Netflix binge smell like?", gymScore: 0, homeScore: 0, boutiqueScore: 0, couchScore: 3 }
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

export type ArchetypeId = "january-idealist" | "closet-athlete" | "gym-crusader" | "smoothie-socialite";

export interface ArchetypeResult {
  id: ArchetypeId;
  name: string;
  roast: string;
  shareHeadline: string;
  color: "green" | "purple" | "alert" | "amber";
  cta: { label: string; href: string; type: "affiliate" | "leadgen" | "classpass" };
}

export function computeArchetype(gymScore: number, homeScore: number, boutiqueScore: number, couchScore: number): ArchetypeResult {
  const scores = [
    { id: "gym-crusader", score: gymScore },
    { id: "closet-athlete", score: homeScore },
    { id: "smoothie-socialite", score: boutiqueScore },
    { id: "january-idealist", score: couchScore }
  ];
  scores.sort((a, b) => b.score - a.score);
  const dominant = scores[0].id as ArchetypeId;

  if (dominant === "january-idealist") {
    return {
      id: "january-idealist",
      name: "The January Idealist",
      roast: "You don't want a gym membership; you want the dopamine hit of buying a gym membership. You love the idea of neon lights and lifting heavy weights, but the reality of driving past a Taco Bell to go run on a motorized belt makes you sad.",
      shareHeadline: "I took the Gym or Not quiz and got 'The January Idealist.' Save your money, Planet Fitness isn't getting a dime of mine.",
      color: "alert",
      cta: { label: "Don't buy a membership. Explore anti-gym setups here.", href: "/dont-wanna-gym", type: "affiliate" }
    };
  }
  
  if (dominant === "closet-athlete") {
    return {
      id: "closet-athlete",
      name: "The Closet Athlete",
      roast: "You actually want to get fit, but you deeply despise other human beings, their sweat, and their terrible bluetooth speaker choices. You are disciplined enough to work out, but only if nobody is looking at you.",
      shareHeadline: "Diagnosed as a 'Closet Athlete.' I will be building muscle in my garage like a caveman, thank you very much.",
      color: "purple",
      cta: { label: "Garage workouts only. Compare zero-fluff home gear setups.", href: "/dont-wanna-gym", type: "affiliate" }
    };
  }

  if (dominant === "smoothie-socialite") {
    return {
      id: "smoothie-socialite",
      name: "The Smoothie Socialite",
      roast: "Standard commercial gyms will depress you. You don't want a gym; you want a luxury locker room with eucalyptus towels and a $16 post-workout smoothie. You need to be financially penalized ($35 per missed class) to actually show up.",
      shareHeadline: "I am a 'Smoothie Socialite.' Please pray for my bank account.",
      color: "amber",
      cta: { label: "Skip traditional gyms. Look into ClassPass or pay-per-visit Pilates.", href: "#classpass-placeholder", type: "affiliate" }
    };
  }

  return {
    id: "gym-crusader",
    name: "The Gym Crusader",
    roast: "You are the person the ghost-members are subsidizing. You actually like the smell of chalk and commercial cleaning products. Go sign up immediately before you start lifting your living room couch for recreation.",
    shareHeadline: "Verified 'Gym Crusader.' Time to go annoy people by taking up three sets of dumbbells at once.",
    color: "green",
    cta: { label: "You belong in a gym. Find the 3 best-rated near you + how to skip sign-up fees.", href: "#gyms-placeholder", type: "leadgen" }
  };
}
