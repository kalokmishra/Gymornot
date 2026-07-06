"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface QuizOption {
  label: string;
  score: number;
}

interface QuizQuestion {
  id: string;
  prompt: string;
  eyebrow: string;
  options: QuizOption[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
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
    id: "q2",
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
    id: "q3",
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
    id: "q4",
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

type Archetype = {
  name: string;
  verdict: string;
  color: "green" | "purple" | "alert";
};

function getArchetype(score: number, maxScore: number): Archetype {
  const ratio = score / maxScore;
  if (ratio <= 0.25) {
    return {
      name: "The Actual Athlete",
      verdict:
        "Statistically rare. Your habits already look like someone who shows up on a Tuesday for no reason. A membership will not go to waste on you.",
      color: "green",
    };
  }
  if (ratio <= 0.65) {
    return {
      name: "The January Idealist",
      verdict:
        "You have real intentions and a 6-to-8 week runway before they quietly evaporate. That's still enough time to build a habit — if the friction is near zero.",
      color: "alert",
    };
  }
  return {
    name: "The Corporate Donor",
    verdict:
      "You are, financially speaking, a philanthropist for a gym chain you will visit twice. This is not an insult. It's a receipt.",
    color: "purple",
  };
}

const LOADING_LINES = [
  "Analyzing proximity to couch vectors...",
  "Cross-referencing gym bag dust density...",
  "Calculating January decay curve...",
  "Estimating true cost per visit...",
  "Compiling honest verdict...",
];

export default function QuizPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"quiz" | "loading" | "result">("quiz");
  const [stepIndex, setStepIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [loadingLine, setLoadingLine] = useState(0);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const maxScore = QUESTIONS.reduce(
    (sum, q) => sum + Math.max(...q.options.map((o) => o.score)),
    0
  );

  useEffect(() => {
    if (phase !== "loading") return;
    const lineTimer = setInterval(() => {
      setLoadingLine((prev) => Math.min(prev + 1, LOADING_LINES.length - 1));
    }, 550);
    const advanceTimer = setTimeout(() => {
      setPhase("result");
    }, 2900);
    return () => {
      clearInterval(lineTimer);
      clearTimeout(advanceTimer);
    };
  }, [phase]);

  const handleAnswer = (score: number) => {
    const nextScore = totalScore + score;
    setTotalScore(nextScore);
    if (stepIndex + 1 < QUESTIONS.length) {
      setStepIndex(stepIndex + 1);
    } else {
      setLoadingLine(0);
      setPhase("loading");
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!validEmail) {
      setEmailError("Enter a real email — no fake ones, this isn't a gym contract.");
      return;
    }
    setEmailError("");
    window.localStorage.setItem("gymornot_email", trimmed);
    window.localStorage.setItem("gymornot_risk_score", String(totalScore));
    setUnlocked(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 900);
  };

  const archetype = getArchetype(totalScore, maxScore);
  const progressPct = Math.round(((stepIndex) / QUESTIONS.length) * 100);

  return (
    <main className="flex min-h-screen w-full flex-col bg-void">
      <div className="flex items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="font-display text-sm font-bold text-ink">
          GymOrNot<span className="text-gym-green">.</span>com
        </Link>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim">
          {phase === "quiz"
            ? `Question ${stepIndex + 1} / ${QUESTIONS.length}`
            : phase === "loading"
            ? "Diagnosing"
            : "Result"}
        </span>
      </div>

      <div className="h-[2px] w-full bg-surface">
        <div
          className="h-full bg-gradient-to-r from-gym-green to-anti-purple transition-all duration-500"
          style={{
            width:
              phase === "quiz"
                ? `${progressPct}%`
                : phase === "loading"
                ? "100%"
                : "100%",
          }}
        />
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-16">
        {phase === "quiz" && (
          <div className="w-full max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-gym-green">
              {QUESTIONS[stepIndex].eyebrow}
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {QUESTIONS[stepIndex].prompt}
            </h1>
            <div className="mt-10 flex flex-col gap-3">
              {QUESTIONS[stepIndex].options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleAnswer(opt.score)}
                  className="group flex items-center justify-between border border-hairline bg-surface px-5 py-4 text-left font-body text-ink transition-colors hover:border-gym-green hover:bg-gym-green/[0.06]"
                >
                  <span>{opt.label}</span>
                  <span className="font-mono text-ink-dim opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "loading" && (
          <div className="scanline-container w-full max-w-md border border-hairline bg-surface px-8 py-12 text-center">
            <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-2 border-hairline border-t-gym-green" />
            <p className="font-mono text-sm text-gym-green">
              {LOADING_LINES[loadingLine]}
              <span className="cursor" />
            </p>
          </div>
        )}

        {phase === "result" && (
          <div className="w-full max-w-lg border border-hairline bg-surface p-8 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-dim">
              Diagnosis complete
            </p>
            <h1
              className={`mt-3 font-display text-3xl font-bold sm:text-4xl ${
                archetype.color === "green"
                  ? "text-gym-green"
                  : archetype.color === "purple"
                  ? "text-anti-purple"
                  : "text-alert"
              }`}
            >
              {archetype.name}
            </h1>

            <div className="relative mt-6 overflow-hidden">
              <p
                className={`font-body text-ink-dim ${
                  unlocked ? "" : "blur-sm select-none"
                }`}
              >
                {archetype.verdict}
              </p>

              {!unlocked && (
                <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-surface via-surface/80 to-transparent pb-1" />
              )}
            </div>

            {!unlocked ? (
              <form onSubmit={handleEmailSubmit} className="mt-6">
                <label
                  htmlFor="email"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim"
                >
                  Enter your email to unlock your full verdict
                </label>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="flex-1 border border-hairline bg-void px-4 py-3 font-body text-ink placeholder:text-ink-dim/60 focus:border-gym-green"
                  />
                  <button
                    type="submit"
                    className="whitespace-nowrap border border-gym-green bg-gym-green/10 px-5 py-3 font-mono text-sm text-gym-green transition-colors hover:bg-gym-green hover:text-void"
                  >
                    Unlock verdict →
                  </button>
                </div>
                {emailError && (
                  <p className="mt-2 font-mono text-xs text-alert">{emailError}</p>
                )}
                <p className="mt-3 font-mono text-[11px] text-ink-dim">
                  No spam. We're too busy judging gym contracts to email you twice a day.
                </p>
              </form>
            ) : (
              <p className="mt-6 font-mono text-sm text-gym-green">
                Verdict unlocked. Redirecting to your dashboard
                <span className="cursor" />
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
