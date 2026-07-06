"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QuizQuestion, buildQuizQuestions, computeArchetype } from "../../lib/quiz";
import ShareCard from "./components/ShareCard";

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
  
  const [gymScore, setGymScore] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [boutiqueScore, setBoutiqueScore] = useState(0);
  const [couchScore, setCouchScore] = useState(0);

  const [loadingLine, setLoadingLine] = useState(0);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const savedEmail = window.localStorage.getItem("gymornot_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setUnlocked(true);
    }
  }, []);

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
      if (unlocked && email) {
        window.localStorage.setItem("gymornot_gymScore", String(gymScore));
        window.localStorage.setItem("gymornot_homeScore", String(homeScore));
        window.localStorage.setItem("gymornot_boutiqueScore", String(boutiqueScore));
        window.localStorage.setItem("gymornot_couchScore", String(couchScore));
        setIsRedirecting(true);
        setTimeout(() => router.push("/dashboard"), 1500);
      }
    }, 2900);
    return () => {
      clearInterval(lineTimer);
      clearTimeout(advanceTimer);
    };
  }, [phase, unlocked, email, gymScore, homeScore, boutiqueScore, couchScore, router]);

  const handleAnswer = (option: { gymScore: number; homeScore: number; boutiqueScore: number; couchScore: number }) => {
    setGymScore((current) => current + option.gymScore);
    setHomeScore((current) => current + option.homeScore);
    setBoutiqueScore((current) => current + option.boutiqueScore);
    setCouchScore((current) => current + option.couchScore);
    
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
    window.localStorage.setItem("gymornot_gymScore", String(gymScore));
    window.localStorage.setItem("gymornot_homeScore", String(homeScore));
    window.localStorage.setItem("gymornot_boutiqueScore", String(boutiqueScore));
    window.localStorage.setItem("gymornot_couchScore", String(couchScore));
    
    setUnlocked(true);
  };

  const archetype = computeArchetype(gymScore, homeScore, boutiqueScore, couchScore);
  const totalScore = gymScore + homeScore + boutiqueScore + couchScore || 1;
  const dropoffProbability = Math.round((couchScore / totalScore) * 100);
  const projectedLoss = Math.round(dropoffProbability * 7.2); // Extrapolated from average membership waste

  const textColorClass = archetype.color === "green" 
    ? "text-gym-green" 
    : archetype.color === "purple" 
      ? "text-anti-purple" 
      : archetype.color === "amber"
        ? "text-amber-500"
        : "text-alert";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.16),transparent_24%),#0b0f19] text-ink">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <div className="mb-6 flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-surface/80 px-6 py-4 text-sm text-ink-dim shadow-[0_20px_70px_-50px_rgba(0,0,0,0.8)] sm:px-10">
          <div className="text-lg font-semibold text-ink">GymOrNot<span className="text-gym-green">.</span>com</div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="cta-secondary px-4 py-2 text-sm">
              Home
            </Link>
            {unlocked && (
              <Link href="/dashboard" className="cta-primary px-4 py-2 text-sm">
                Dashboard
              </Link>
            )}
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
                <p className="eyebrow text-[0.65rem] text-ink-dim">Fetching fresh questions for your gym habits.</p>
              </div>
            ) : !activeQuestion ? (
              <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-[#0f1726]/80 px-8 py-12 text-center">
                <p className="text-base font-medium text-ink">Unable to load quiz questions.</p>
                <p className="text-sm text-ink-dim">Please refresh the page or try again later.</p>
              </div>
            ) : (
              <>
                {fetchError && (
                  <div className="mb-6 rounded-[1.5rem] border border-alert/20 bg-[#3b0e0e]/90 p-4 text-sm text-alert">
                    {fetchError}
                  </div>
                )}

                {phase === "quiz" && (
                  <div className="grid gap-6">
                    <div>
                      <p className="eyebrow">{activeQuestion.eyebrow}</p>
                      <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                        {activeQuestion.prompt}
                      </h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {activeQuestion.options.map((option, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleAnswer(option)}
                          className="group flex flex-col justify-between rounded-[1.35rem] border border-white/10 bg-[#111827]/90 px-5 py-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-gym-green/50 hover:bg-[#172130] hover:shadow-[0_0_0_1px_rgba(16,185,129,0.25)] focus:outline-none focus:ring-2 focus:ring-gym-green/40"
                        >
                          <span className="block font-medium leading-snug text-ink">
                            {option.label}
                          </span>
                          <span aria-hidden className="mt-4 block text-right text-sm font-mono text-gym-green opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            →
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
                    <div className={`grid gap-3 rounded-[1.75rem] bg-[#111827]/80 p-8 shadow-[0_30px_80px_-30px_rgba(16,185,129,0.35)] relative overflow-hidden`}>
                      {!unlocked && (
                        <div className="absolute inset-0 bg-[#0b0f19]/80 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 text-center">
                          <p className="text-xl font-semibold text-ink mb-2">Verdict Locked</p>
                          <p className="text-sm text-ink-dim max-w-xs">Enter your email below to unlock your honest diagnosis, financial impact analysis, and tailored action plan.</p>
                        </div>
                      )}
                      <span className="eyebrow">Diagnosis complete</span>
                      <h2 className={`text-4xl font-semibold ${textColorClass}`}>
                        {archetype.name}
                      </h2>
                      <p className="max-w-2xl text-base leading-8 text-ink-dim">
                        {archetype.roast}
                      </p>
                    </div>

                    {!unlocked ? (
                      <form
                        onSubmit={handleEmailSubmit}
                        className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-[#0f1726]/80 p-6 sm:p-8 relative z-20"
                      >
                        <div>
                          <label htmlFor="email" className="eyebrow text-[0.65rem]">
                            Unlock your official verdict
                          </label>
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
                          <button type="submit" className="cta-primary whitespace-nowrap px-6 py-4">
                            Reveal verdict
                          </button>
                        </div>
                        {emailError && <p className="text-sm text-alert">{emailError}</p>}
                        <p className="text-xs text-ink-dim">
                          No spam. Just one honest verdict and maybe a friendly nudge.
                        </p>
                      </form>
                    ) : (
                      <>
                        <div className="grid gap-6 sm:grid-cols-2">
                          {/* Financial Panel */}
                          <div className="rounded-[1.75rem] border border-white/10 bg-[#0f1726]/80 p-6">
                            <p className="eyebrow mb-2 text-alert">Financial Warning</p>
                            <p className="text-3xl font-semibold text-ink mb-1">{dropoffProbability}%</p>
                            <p className="text-sm text-ink-dim mb-4">Probability of quitting within 8 weeks</p>
                            <div className="rounded-xl bg-[#111827]/80 p-4 border border-white/5">
                              <p className="text-xs text-ink-dim mb-1">Projected wasted spend:</p>
                              <p className="text-xl font-medium text-alert">${projectedLoss}</p>
                            </div>
                          </div>

                          {/* Affiliate / CTA Panel */}
                          <div className="rounded-[1.75rem] border border-gym-green/30 bg-[#0f1726]/80 p-6 flex flex-col justify-between">
                            <div>
                              <p className="eyebrow mb-2 text-gym-green">The Solution</p>
                              <p className="text-sm text-ink mb-4">{archetype.cta.label}</p>
                            </div>
                            <a href={archetype.cta.href} className="cta-primary w-full text-center py-3">
                              View Recommendation
                            </a>
                          </div>
                        </div>

                        {/* Viral Share Card */}
                        <ShareCard archetypeId={archetype.id} headline={archetype.shareHeadline} />

                        {isRedirecting ? (
                          <div className="rounded-[1.75rem] bg-gym-green/10 p-6 text-center border border-gym-green/20">
                            <p className="text-base text-gym-green animate-pulse">
                              Redirecting to your full dashboard…
                            </p>
                          </div>
                        ) : (
                          <div className="text-center mt-4">
                            <Link href="/dashboard" className="cta-secondary inline-block px-8 py-3">
                              Continue to Full Dashboard
                            </Link>
                          </div>
                        )}
                      </>
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
