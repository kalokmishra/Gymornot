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

  return (
    <main className="min-h-screen bg-void text-ink font-body selection:bg-brand-lime selection:text-void">
      {/* HEADER */}
      <header className="border-b border-hairline bg-void/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-display font-black text-2xl text-brand-lime tracking-tight hover:opacity-80 transition-opacity">
            GymOrNot<span className="text-brand-red">.</span>
          </Link>
          <nav className="flex gap-2">
            <Link
              href="/"
              className="font-display font-bold text-xs tracking-wider uppercase border border-hairline hover:bg-surface-raised px-4 py-2 text-ink-dim hover:text-ink rounded-full transition-all"
            >
              Home
            </Link>
            <Link
              href="/quiz"
              className="font-display font-bold text-xs tracking-wider uppercase bg-brand-lime text-void border border-brand-lime px-4 py-2 rounded-full transition-all"
            >
              Quiz
            </Link>
            <Link
              href="/dont-wanna-gym"
              className="font-display font-bold text-xs tracking-wider uppercase border border-hairline hover:bg-surface-raised px-4 py-2 text-ink-dim hover:text-ink rounded-full transition-all"
            >
              Escape
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto flex max-w-4xl flex-col px-6 py-12">
        <div className="w-full">
          {/* Header tracker banner */}
          <div className="mb-4 flex items-center justify-between gap-4 border border-hairline bg-surface px-4 py-3 text-xs font-bold uppercase tracking-wider text-ink-dim rounded-2xl">
            <div>
              {phase === "quiz"
                ? `Question ${stepIndex + 1} of ${questions.length}`
                : phase === "loading"
                ? "Loading result"
                : "Final verdict"}
              {phase === "quiz" ? ` — ${progressPct}% complete` : " — Nearly there"}
            </div>
          </div>

          <div className="border border-hairline bg-surface rounded-3xl p-6 sm:p-8">
            {/* Progress bar */}
            <div className="mb-8 h-2 bg-hairline rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-lime transition-all duration-500 rounded-full"
                style={{ width: phase === "quiz" ? `${progressPct}%` : "100%" }}
              />
            </div>

            {isLoadingQuestions ? (
              <div className="py-12 text-center rounded-2xl bg-surface-raised border border-hairline">
                <div className="mx-auto flex h-14 w-14 items-center justify-center border border-hairline bg-void rounded-full">
                  <div className="h-6 w-6 animate-spin border-2 border-hairline border-t-brand-lime rounded-full" />
                </div>
                <p className="mt-6 font-display font-black text-xl text-ink uppercase">Loading quiz…</p>
                <p className="text-xs font-bold text-ink-dim uppercase mt-2">Fetching fresh questions for your gym habits.</p>
              </div>
            ) : !activeQuestion ? (
              <div className="py-12 text-center rounded-2xl bg-surface-raised border border-hairline">
                <p className="text-base font-bold text-brand-red uppercase">Unable to load quiz questions.</p>
                <p className="text-sm text-ink-dim mt-2">Please refresh the page or try again later.</p>
              </div>
            ) : (
              <>
                {fetchError && (
                  <div className="mb-6 border border-brand-red/30 bg-brand-red/5 p-4 text-sm font-bold uppercase tracking-wider text-brand-red rounded-xl">
                    {fetchError}
                  </div>
                )}

                {phase === "quiz" && (
                  <div className="grid gap-8">
                    <div>
                      <p className="font-display text-xs font-bold text-brand-red tracking-widest uppercase mb-2">
                        {activeQuestion.eyebrow}
                      </p>
                      <h2 className="font-display font-black text-3xl sm:text-5xl leading-none tracking-tight text-ink uppercase">
                        {activeQuestion.prompt}
                      </h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {activeQuestion.options.map((option, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleAnswer(option)}
                          className="group flex flex-col justify-between border border-hairline bg-surface-raised px-6 py-6 text-left rounded-2xl transition duration-200 hover:border-brand-lime hover:bg-void focus:outline-none"
                        >
                          <span className="block font-display font-black text-lg sm:text-xl text-ink group-hover:text-brand-lime transition-colors uppercase leading-snug">
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {phase === "loading" && (
                  <div className="py-12 text-center rounded-2xl bg-surface-raised border border-hairline">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center border border-hairline bg-void rounded-full">
                      <div className="h-6 w-6 animate-spin border-2 border-hairline border-t-brand-lime rounded-full" />
                    </div>
                    <p className="mt-6 font-display font-black text-xl text-ink uppercase">Crunching the numbers...</p>
                    <p className="font-display text-xs font-bold text-brand-red uppercase tracking-wider mt-2">{LOADING_LINES[loadingLine]}</p>
                  </div>
                )}

                {phase === "result" && (
                  <div className="grid gap-8">
                    {/* Verdict Card */}
                    <div className="grid gap-3 border border-hairline bg-surface p-8 rounded-2xl relative overflow-hidden">
                      {!unlocked && (
                        <div className="absolute inset-0 bg-void/95 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 text-center">
                          <p className="font-display font-black text-2xl text-ink uppercase mb-2">Verdict Locked</p>
                          <p className="font-body text-sm text-ink-dim max-w-sm leading-relaxed">
                            Enter your email below to unlock your honest diagnosis, financial impact analysis, and tailored action plan.
                          </p>
                        </div>
                      )}
                      <span className="font-display text-xs font-bold text-brand-red tracking-widest uppercase">Diagnosis complete</span>
                      <h2 className="font-display font-black text-4xl sm:text-6xl text-brand-lime uppercase tracking-tight">
                        {archetype.name}
                      </h2>
                      <p className="max-w-2xl text-base leading-relaxed text-ink-dim">
                        {archetype.roast}
                      </p>
                    </div>

                    {!unlocked ? (
                      <form
                        onSubmit={handleEmailSubmit}
                        className="grid gap-4 border border-hairline bg-surface-raised p-8 rounded-2xl relative z-20"
                      >
                        <div>
                          <label htmlFor="email" className="font-display text-xs font-bold text-ink-dim uppercase tracking-wider">
                            Unlock your official verdict
                          </label>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-0 border border-hairline rounded-xl overflow-hidden bg-void">
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="YOU@EMAIL.COM"
                            required
                            className="flex-1 bg-transparent px-5 py-4 text-sm font-bold text-ink outline-none focus:bg-surface"
                          />
                          <button type="submit" className="font-display font-black text-sm tracking-wider uppercase bg-brand-lime text-void px-8 py-4 hover:bg-ink hover:text-void transition-all whitespace-nowrap">
                            Reveal verdict
                          </button>
                        </div>
                        {emailError && <p className="text-sm font-bold text-brand-red">{emailError}</p>}
                        <p className="text-xs text-ink-dim italic">
                          No spam. Just one honest verdict and maybe a friendly nudge.
                        </p>
                      </form>
                    ) : (
                      <>
                        <div className="grid gap-6 sm:grid-cols-2">
                          {/* Financial Panel */}
                          <div className="border border-hairline bg-surface p-8 rounded-2xl">
                            <p className="font-display text-xs font-bold text-brand-red tracking-widest uppercase mb-4">Financial Warning</p>
                            <p className="font-display font-black text-5xl text-brand-red tracking-tight leading-none mb-2">{dropoffProbability}%</p>
                            <p className="text-sm font-bold text-ink-dim uppercase mb-6">Probability of quitting within 8 weeks</p>
                            <div className="border border-hairline bg-surface-raised p-4 rounded-xl">
                              <p className="text-xs font-bold text-ink-dim uppercase mb-1">Projected wasted spend:</p>
                              <p className="font-display font-black text-3xl text-brand-red">${projectedLoss}</p>
                            </div>
                          </div>

                          {/* Affiliate / CTA Panel */}
                          <div className="border border-hairline bg-surface p-8 rounded-2xl flex flex-col justify-between">
                            <div>
                              <p className="font-display text-xs font-bold text-brand-lime tracking-widest uppercase mb-4">The Solution</p>
                              <p className="text-base font-bold text-ink leading-snug mb-8">{archetype.cta.label}</p>
                            </div>
                            <a href={archetype.cta.href} className="text-center font-display font-black text-sm tracking-wider uppercase bg-brand-lime text-void py-4 rounded-full hover:bg-ink transition-all">
                              View Recommendation
                            </a>
                          </div>
                        </div>

                        {/* Viral Share Card */}
                        <ShareCard archetypeId={archetype.id} headline={archetype.shareHeadline} />

                        {isRedirecting ? (
                          <div className="border border-hairline bg-surface-raised p-6 text-center rounded-2xl">
                            <p className="text-sm text-brand-lime animate-pulse font-bold">
                              Redirecting to your full dashboard…
                            </p>
                          </div>
                        ) : (
                          <div className="text-center mt-6">
                            <Link href="/dashboard" className="inline-block font-display font-bold text-sm tracking-wider uppercase border border-hairline hover:border-ink px-8 py-4 rounded-full text-ink-dim hover:text-ink transition-all">
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
