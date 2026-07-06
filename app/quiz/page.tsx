"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QuizQuestion, buildQuizQuestions } from "../../lib/quiz";

type Archetype = {
  name: string;
  verdict: string;
  color: "green" | "purple" | "alert";
};

function getArchetype(score: number, maxScore: number): Archetype {
  const ratio = maxScore > 0 ? score / maxScore : 0;
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
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"quiz" | "loading" | "result">("quiz");
  const [stepIndex, setStepIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [loadingLine, setLoadingLine] = useState(0);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const response = await fetch("/api/quiz-data", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Failed to load quiz questions (${response.status}).`);
        }

        const json = await response.json();
        if (!Array.isArray(json.questions) || json.questions.length === 0) {
          throw new Error("Quiz data is invalid.");
        }

        setQuestions(json.questions);
        if (typeof json.warning === "string") {
          setFetchError(json.warning);
        }
      } catch (error) {
        console.error("Quiz data fetch error:", error);
        setFetchError(
          error instanceof Error
            ? error.message
            : "Unable to load quiz questions. Using fallback."
        );
        setQuestions(buildQuizQuestions());
      } finally {
        setIsLoadingQuestions(false);
      }
    }

    loadQuestions();
  }, []);

  const activeQuestion = questions.length > 0 ? questions[stepIndex] : null;
  const maxScore = questions.length
    ? questions.reduce((sum, q) => sum + Math.max(...q.options.map((o) => o.score)), 0)
    : 0;
  const progressPct = questions.length
    ? Math.round(((stepIndex + 1) / questions.length) * 100)
    : 0;

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
    setTotalScore((current) => current + score);
    if (stepIndex + 1 < questions.length) {
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
    window.localStorage.setItem("gymornot_risk_max_score", String(maxScore));
    const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
    window.localStorage.setItem("gymornot_risk_percentage", String(percentage));
    setUnlocked(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 900);
  };

  const archetype = getArchetype(totalScore, maxScore);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.16),transparent_24%),#0b0f19] text-ink">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <div className="mb-6 flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-surface/80 px-6 py-4 text-sm text-ink-dim shadow-[0_20px_70px_-50px_rgba(0,0,0,0.8)] sm:px-10">
          <div className="text-lg font-semibold text-ink">GymOrNot<span className="text-gym-green">.</span>com</div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="cta-secondary px-4 py-2 text-sm">
              Home
            </Link>
            <Link href="/dashboard" className="cta-primary px-4 py-2 text-sm">
              Dashboard
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-4 flex items-center justify-between gap-4 rounded-full border border-white/10 bg-surface/80 px-4 py-3 text-sm text-ink-dim shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]">
            <div className="eyebrow text-[0.65rem]">
              {phase === "quiz"
                ? `Question ${stepIndex + 1} of ${questions.length}`
                : phase === "loading"
                ? "Loading result"
                : "Final verdict"}
              {phase === "quiz" ? ` ${progressPct}% complete` : " Nearly there"}
            </div>
          </div>

          <div className="panel-card overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="mb-8 h-2 rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gym-green to-anti-purple transition-all duration-500"
                style={{ width: phase === "quiz" ? `${progressPct}%` : "100%" }}
              />
            </div>

            {isLoadingQuestions ? (
              <div className="grid gap-6 rounded-[1.75rem] border border-white/10 bg-[#0f1726]/80 px-8 py-12 text-center backdrop-blur-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#131a2a]/80">
                  <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-gym-green" />
                </div>
                <p className="text-base font-medium text-ink">Loading quiz…</p>
                <p className="eyebrow text-[0.65rem] text-ink-dim">
                  Fetching fresh questions for your gym habits.
                </p>
              </div>
            ) : !activeQuestion ? (
              <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-[#0f1726]/80 px-8 py-12 text-center">
                <p className="text-base font-medium text-ink">Unable to load quiz questions.</p>
                <p className="text-sm text-ink-dim">Please refresh the page or try again later.</p>
              </div>
            ) : (
              <>
                {fetchError ? (
                  <div className="mb-6 rounded-[1.5rem] border border-alert/20 bg-[#3b0e0e]/90 p-4 text-sm text-alert">
                    {fetchError}
                  </div>
                ) : null}

                {phase === "quiz" && (
                  <div className="grid gap-6">
                    <div>
                      <p className="eyebrow">{activeQuestion.eyebrow}</p>
                      <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                        {activeQuestion.prompt}
                      </h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {activeQuestion.options.map((option) => (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => handleAnswer(option.score)}
                          className="group rounded-[1.35rem] border border-white/10 bg-[#111827]/90 px-5 py-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-gym-green/40 hover:bg-[#172130] focus:outline-none focus:ring-2 focus:ring-gym-green/40"
                        >
                          <span className="font-medium text-ink">{option.label}</span>
                          <span className="mt-4 inline-flex items-center gap-2 text-sm font-mono text-ink-dim opacity-80 group-hover:text-gym-green">
                            Select
                            <span aria-hidden>→</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {phase === "loading" && (
                  <div className="grid gap-6 rounded-[1.75rem] border border-white/10 bg-[#0f1726]/80 px-8 py-12 text-center backdrop-blur-sm">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#131a2a]/80">
                      <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-gym-green" />
                    </div>
                    <p className="text-base font-medium text-ink">Crunching the numbers...</p>
                    <p className="eyebrow text-[0.65rem]">{LOADING_LINES[loadingLine]}</p>
                  </div>
                )}

                {phase === "result" && (
                  <div className="grid gap-8">
                    <div className="grid gap-3 rounded-[1.75rem] bg-[#111827]/80 p-8 shadow-[0_30px_80px_-30px_rgba(16,185,129,0.35)]">
                      <span className="eyebrow">Diagnosis complete</span>
                      <h2
                        className={`text-4xl font-semibold ${
                          archetype.color === "green"
                            ? "text-gym-green"
                            : archetype.color === "purple"
                            ? "text-anti-purple"
                            : "text-alert"
                        }`}
                      >
                        {archetype.name}
                      </h2>
                      <p className="max-w-2xl text-base leading-8 text-ink-dim">
                        {archetype.verdict}
                      </p>
                    </div>

                    {!unlocked ? (
                      <form
                        onSubmit={handleEmailSubmit}
                        className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-[#0f1726]/80 p-6 sm:p-8"
                      >
                        <div>
                          <label htmlFor="email" className="eyebrow text-[0.65rem]">
                            Unlock your official verdict
                          </label>
                          <p className="mt-2 text-sm text-ink-dim">
                            A polished result and the full breakdown will be ready once you confirm your email.
                          </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full rounded-2xl border border-white/10 bg-[#0b1320] px-4 py-4 text-sm text-ink outline-none transition focus:border-gym-green focus:ring-2 focus:ring-gym-green/15"
                          />
                          <button
                            type="submit"
                            className="cta-primary whitespace-nowrap px-6 py-4"
                          >
                            Reveal verdict
                          </button>
                        </div>
                        {emailError && <p className="text-sm text-alert">{emailError}</p>}
                        <p className="text-xs text-ink-dim">
                          No spam. Just one honest verdict and maybe a friendly nudge.
                        </p>
                      </form>
                    ) : (
                      <div className="rounded-[1.75rem] bg-[#0f1726]/80 p-6 text-center">
                        <p className="text-base text-gym-green">
                          Verdict unlocked. Redirecting to your dashboard…
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
