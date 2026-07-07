"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QuizQuestion, buildQuizQuestions, computeArchetype } from "../../lib/quiz";
import ShareCard from "./components/ShareCard";

const LOADING_LINES = [
  "CALCULATING TOTAL GYM DONATION...",
  "ANALYZING fitness_guilt.json...",
  "COMPILING SUNK_COST_FALLACY_INDEX...",
  "CROSS-REFERENCING COUCH_VECTOR_SCORES...",
  "PREPARING FINANCIAL VERDICT...",
];

// Cosmetic guilt meter — purely for tension, no effect on scoring
const GUILT_PER_STEP = 267;

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

  // Brief flash state for answer selection
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

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

  // Clear popup seen flags on mount so retakes always show the unlock animation
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("gymornot_seen_popup_january-idealist");
      sessionStorage.removeItem("gymornot_seen_popup_closet-athlete");
      sessionStorage.removeItem("gymornot_seen_popup_gym-crusader");
      sessionStorage.removeItem("gymornot_seen_popup_smoothie-socialite");
    }
  }, []);

  const activeQuestion = questions.length > 0 ? questions[stepIndex] : null;

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
        // Delay redirect to allow the 2.3s popup fade animation to complete
        setTimeout(() => router.push("/dashboard"), 2600);
      }
    }, 2900);
    return () => {
      clearInterval(lineTimer);
      clearTimeout(advanceTimer);
    };
  }, [phase, unlocked, email, gymScore, homeScore, boutiqueScore, couchScore, router]);

  const handleAnswer = (option: { gymScore: number; homeScore: number; boutiqueScore: number; couchScore: number }, index: number) => {
    // Brief visual flash before advancing
    setSelectedOptionIndex(index);
    setTimeout(() => {
      setSelectedOptionIndex(null);
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
    }, 150);
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
  const projectedLoss = Math.round(dropoffProbability * 7.2);

  // Cosmetic guilt meter value
  const guiltMeterValue = phase === "quiz" ? stepIndex * GUILT_PER_STEP : GUILT_PER_STEP * (questions.length || 4);

  return (
    <main
      className="min-h-screen bg-void text-ink font-body selection:bg-brand-lime selection:text-void"
      style={{
        backgroundImage:
          "linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)",
        backgroundSize: "4rem 4rem",
      }}
    >
      {/* HEADER */}
      <header className="border-b border-hairline bg-void sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-display font-black text-2xl text-brand-lime tracking-tight hover:opacity-80 transition-opacity">
            GymOrNot<span className="text-brand-red">.</span>
          </Link>
          <Link href="/" className="font-mono text-xs text-zinc-400 hover:text-brand-lime transition-colors tracking-wider">
            Exit Diagnostic →
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-12">

        {/* PHASE INDICATOR + GUILT METER */}
        {phase === "quiz" && questions.length > 0 && (
          <div className="mb-6 space-y-2 border-b border-zinc-800 pb-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                DIAGNOSTIC SYSTEM // GYMORNOT AUDIT ENGINE
              </span>
              <span className="font-mono text-sm text-zinc-400 font-bold">
                PHASE: {String(stepIndex + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                ESTIMATED ANNUAL WASTE:
              </span>
              <span className="font-mono text-sm font-bold text-brand-red">
                ${guiltMeterValue.toLocaleString()}
              </span>
              <span className="w-2 h-3 bg-brand-red animate-pulse inline-block" />
            </div>
          </div>
        )}

        {/* FETCH ERROR BANNER */}
        {fetchError && (
          <div className="mb-6 border border-brand-red/30 bg-brand-red/5 p-4 font-mono text-xs font-bold uppercase tracking-wider text-brand-red rounded-none">
            {fetchError}
          </div>
        )}

        {/* INITIAL LOADING — Terminal boot */}
        {isLoadingQuestions && (
          <div className="border border-zinc-800 bg-zinc-950 p-8 rounded-none space-y-2">
            <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-4">
              // INITIALIZING AUDIT ENGINE //
            </p>
            <p className="font-mono text-xs text-zinc-500">&gt; INITIALIZING GYMORNOT AUDIT ENGINE...</p>
            <p className="font-mono text-xs text-zinc-500">&gt; FETCHING DIAGNOSTIC QUESTIONS...</p>
            <p className="font-mono text-xs text-zinc-300 animate-pulse">&gt; ESTABLISHING GUILT BASELINE... ▌</p>
          </div>
        )}

        {/* NO QUESTIONS ERROR */}
        {!isLoadingQuestions && !activeQuestion && phase === "quiz" && (
          <div className="border border-zinc-800 bg-zinc-950 p-8 rounded-none text-center">
            <p className="font-mono text-xs text-brand-red uppercase tracking-widest mb-2">// ERROR //</p>
            <p className="font-mono text-sm text-zinc-400">Unable to load diagnostic questions. Please refresh.</p>
          </div>
        )}

        {/* QUIZ PHASE */}
        {!isLoadingQuestions && activeQuestion && phase === "quiz" && (
          <div className="border-2 border-zinc-800 bg-void rounded-none p-6 sm:p-10">
            {/* Question */}
            <div className="mb-8">
              <p className="font-mono text-[10px] text-brand-red uppercase tracking-widest mb-3">
                {activeQuestion.eyebrow}
              </p>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-zinc-50 leading-snug">
                {activeQuestion.prompt}
              </h2>
            </div>

            {/* Answer choices — full-width stacked rows */}
            <div className="flex flex-col border-t border-zinc-800">
              {activeQuestion.options.map((option, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAnswer(option, i)}
                  disabled={selectedOptionIndex !== null}
                  className={`w-full p-4 border-b border-zinc-800 text-left transition-all duration-150 rounded-none
                    ${selectedOptionIndex === i
                      ? "bg-white text-void font-bold"
                      : "bg-void text-zinc-400 font-mono text-sm hover:bg-zinc-900 hover:border-zinc-500 hover:translate-x-1 hover:text-zinc-50"
                    }`}
                >
                  <span className={`font-mono text-sm leading-relaxed ${selectedOptionIndex === i ? "font-bold text-void" : ""}`}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* LOADING PHASE — Terminal evaluation */}
        {phase === "loading" && (
          <div className="border-2 border-zinc-800 bg-zinc-950 rounded-none p-10 space-y-3">
            <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-6 border-b border-zinc-800 pb-4">
              // RUNNING ANALYSIS //
            </p>
            {LOADING_LINES.map((line, i) => (
              <p
                key={i}
                className={`font-mono text-xs transition-colors duration-300 ${
                  i < loadingLine
                    ? "text-zinc-700"
                    : i === loadingLine
                    ? "text-zinc-300"
                    : "text-zinc-800"
                }`}
              >
                &gt; {line}
                {i === loadingLine && <span className="animate-pulse"> ▌</span>}
              </p>
            ))}
          </div>
        )}

        {/* RESULT PHASE */}
        {phase === "result" && (
          <div className="space-y-0">

            {/* Verdict block */}
            <div className="border-2 border-zinc-800 bg-zinc-950 p-8 rounded-none relative overflow-hidden">
              {!unlocked && (
                <div className="absolute inset-0 bg-void/95 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 text-center">
                  <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-4">
                    // ACCESS REQUIRED //
                  </p>
                  <p className="font-display font-black text-2xl text-ink uppercase mb-2">
                    Verdict Locked
                  </p>
                  <p className="font-mono text-sm text-zinc-500 max-w-sm leading-relaxed">
                    Enter your email below to unlock your honest diagnosis, financial impact analysis, and tailored action plan.
                  </p>
                </div>
              )}
              <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-3">
                DIAGNOSIS COMPLETE:
              </p>
              <h2 className="font-display font-black text-4xl sm:text-6xl text-brand-lime uppercase tracking-tight leading-none mb-4">
                {archetype.name}
              </h2>
              <p className="font-mono text-sm text-zinc-400 leading-relaxed max-w-2xl">
                {archetype.roast}
              </p>
            </div>

            {/* Email gate */}
            {!unlocked ? (
              <form
                onSubmit={handleEmailSubmit}
                className="border-t border-b border-dashed border-zinc-700 bg-zinc-900 p-6 rounded-none relative z-20"
              >
                <label htmlFor="email" className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest block mb-4">
                  UNLOCK OFFICIAL VERDICT // SUBMIT IDENTIFICATION
                </label>
                <div className="flex flex-col sm:flex-row gap-0 border border-zinc-700 overflow-hidden bg-void">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="YOU@EMAIL.COM"
                    required
                    className="flex-1 bg-transparent px-5 py-4 font-mono text-sm text-ink outline-none focus:bg-zinc-950 placeholder:text-zinc-700"
                  />
                  <button
                    type="submit"
                    className="font-display font-black text-xs tracking-wider uppercase bg-brand-lime text-void px-8 py-4 hover:bg-white transition-colors whitespace-nowrap rounded-none"
                  >
                    REVEAL VERDICT
                  </button>
                </div>
                {emailError && (
                  <p className="font-mono text-xs text-brand-red mt-3">{emailError}</p>
                )}
                <p className="font-mono text-[10px] text-zinc-700 mt-3">
                  * No spam. One honest verdict and maybe a friendly nudge.
                </p>
              </form>
            ) : (
              <>
                {/* Financial audit rows */}
                <div className="border-t border-b border-dashed border-zinc-700 bg-zinc-900 rounded-none">
                  <div className="border-b border-dashed border-zinc-700 px-6 py-3">
                    <p className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                      FINANCIAL DAMAGE REPORT // GYMORNOT SYSTEMS
                    </p>
                  </div>
                  <div className="px-6 py-4 space-y-0 divide-y divide-zinc-800">
                    <div className="flex justify-between items-baseline py-2.5">
                      <span className="font-mono text-sm text-zinc-400">Dropoff Probability</span>
                      <span className="font-mono text-sm font-bold text-brand-red tabular-nums">{dropoffProbability}%</span>
                    </div>
                    <div className="flex justify-between items-baseline py-2.5">
                      <span className="font-mono text-sm text-zinc-400">Projected Annual Waste</span>
                      <span className="font-mono text-sm font-bold text-brand-red tabular-nums">${projectedLoss}</span>
                    </div>
                  </div>
                </div>

                {/* Recommended protocol row */}
                <div className="border-b border-zinc-800 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-void">
                  <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    RECOMMENDED PROTOCOL: <span className="text-zinc-400">{archetype.cta.label}</span>
                  </p>
                  <a
                    href={archetype.cta.href}
                    className="font-mono text-xs text-brand-lime hover:text-ink underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
                  >
                    View Recommendation →
                  </a>
                </div>

                {/* Share Card */}
                <div className="border-b border-zinc-800 px-6 py-8 bg-void">
                  <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-6">
                    BROADCAST YOUR SENTENCE:
                  </p>
                  <ShareCard archetypeId={archetype.id} headline={archetype.shareHeadline} />
                </div>

                {/* Dashboard redirect */}
                {isRedirecting ? (
                  <div className="border border-zinc-800 bg-zinc-950 p-4 rounded-none">
                    <p className="font-mono text-xs text-brand-lime animate-pulse">
                      &gt; REDIRECTING TO FULL AUDIT DASHBOARD...
                    </p>
                  </div>
                ) : (
                  <div className="pt-6 text-center">
                    <Link
                      href="/dashboard"
                      className="inline-block font-display font-black text-sm tracking-wider uppercase bg-brand-lime text-void px-8 py-4 rounded-none hover:bg-white transition-colors"
                    >
                      VIEW FULL DASHBOARD →
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
