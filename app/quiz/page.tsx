"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QuizQuestion, buildQuizQuestions, computeArchetype } from "../../lib/quiz";
import ShareCard from "./components/ShareCard";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import { useAuth } from "../../components/AuthProvider";
import { captureEmail } from "../actions/captureEmail";

const LOADING_LINES = [
  "[INFO] Locating active gym membership... Found 1 (Last active: January 3rd, 2025)",
  "[DEBUG] Scanning for signs of life on the treadmill... 0% activity detected.",
  "[WARN] Workout resolutions fossilization level: 98.4%.",
  "[CALC] Multiplying protein powder purchases by actual sweat produced... Error: Division by zero.",
  "[SUCCESS] Projected 12-month corporate gym executive bonus fully funded by your guilt.",
];

// Cosmetic guilt meter — purely for tension, no effect on scoring
const GUILT_PER_STEP = 267;

export default function QuizPage() {
  const router = useRouter();
  const { user } = useAuth();
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

  // Sync auth state
  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
      setUnlocked(true);
    }
  }, [user]);

  useEffect(() => {
    const savedEmail = window.localStorage.getItem("gymornot_email");
    if (savedEmail && !user?.email) {
      setEmail(savedEmail);
      setUnlocked(true);
    }
  }, [user]);

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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!validEmail) {
      setEmailError("Enter a real email — no fake ones, this isn't a gym contract.");
      return;
    }
    setEmailError("");
    // Fire webhook via Server Action (non-blocking — never delays the user)
    captureEmail(trimmed).catch(() => {});
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
      className="min-h-screen bg-void text-ink font-body selection:bg-volt selection:text-void"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(208,255,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(208,255,0,0.03) 1px, transparent 1px)",
        backgroundSize: "4rem 4rem",
      }}
    >
      {/* HEADER */}
      <Header contextLink="/" contextLabel="Exit Audit →" />

      {/* Spacer for fixed header */}
      <div className="h-[57px]" />

      <div className="mx-auto max-w-3xl px-5 py-10">

        {/* ── KINETIC PROGRESS BAR ─────────────────────────────────────── */}
        {phase === "quiz" && questions.length > 0 && (
          <div className="mb-8">
            {/* Header row */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
                [DIAGNOSTIC_SEQUENCE_{String(stepIndex + 1).padStart(2, "0")}]
              </span>
              <span className="font-mono text-[9px] text-zinc-500 font-bold">
                {stepIndex + 1} / {questions.length}
              </span>
            </div>

            {/* Progress track */}
            <div className="kinetic-progress-track">
              <div
                className="kinetic-progress-fill"
                style={{ width: `${((stepIndex) / questions.length) * 100}%` }}
              />
            </div>

            {/* Guilt meter */}
            <div className="flex items-center gap-3 mt-3">
              <span className="font-mono text-[9px] text-zinc-700 uppercase tracking-widest">
                EST. ANNUAL WASTE:
              </span>
              <span className="font-mono text-xs font-bold" style={{ color: "var(--solar-red)" }}>
                ${guiltMeterValue.toLocaleString()}
              </span>
              <span className="w-1.5 h-2.5 inline-block animate-pulse" style={{ background: "var(--solar-red)" }} />
            </div>
          </div>
        )}

        {/* ── FETCH ERROR BANNER ───────────────────────────────────────── */}
        {fetchError && (
          <div
            className="mb-6 p-4 font-mono text-xs font-bold uppercase tracking-wider"
            style={{ border: "1px solid rgba(255,77,0,0.3)", background: "rgba(255,77,0,0.05)", color: "var(--solar-red)" }}
          >
            {fetchError}
          </div>
        )}

        {/* ── INITIAL LOADING — Terminal boot ─────────────────────────── */}
        {isLoadingQuestions && (
          <div
            className="p-8 space-y-2"
            style={{ border: "1px solid rgba(208,255,0,0.08)", background: "#050500" }}
          >
            <p className="font-mono text-[9px] text-zinc-700 uppercase tracking-widest mb-4">
              // INITIALIZING KINETIC AUDIT ENGINE //
            </p>
            <p className="font-mono text-xs text-zinc-600">&gt; LOADING GYMORNOT DIAGNOSTIC v2.0...</p>
            <p className="font-mono text-xs text-zinc-600">&gt; FETCHING THEMATIC QUESTION SET...</p>
            <p className="font-mono text-xs animate-pulse" style={{ color: "var(--volt)" }}>&gt; ESTABLISHING GUILT BASELINE... █</p>
          </div>
        )}

        {/* ── NO QUESTIONS ERROR ───────────────────────────────────────── */}
        {!isLoadingQuestions && !activeQuestion && phase === "quiz" && (
          <div
            className="p-8 text-center"
            style={{ border: "1px solid rgba(255,77,0,0.2)", background: "#0a0000" }}
          >
            <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: "var(--solar-red)" }}>// ERROR //</p>
            <p className="font-mono text-sm text-zinc-500">Unable to load diagnostic questions. Please refresh.</p>
          </div>
        )}

        {/* ── QUIZ PHASE ───────────────────────────────────────────────── */}
        {!isLoadingQuestions && activeQuestion && phase === "quiz" && (
          <div
            className="animate-slide-up"
            style={{ border: "1px solid rgba(208,255,0,0.1)", background: "#020200" }}
          >
            {/* Question header */}
            <div
              className="px-6 sm:px-8 pt-8 pb-6 border-b"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <p className="font-mono text-[9px] uppercase tracking-widest mb-3" style={{ color: "var(--solar-red)" }}>
                {activeQuestion.eyebrow}
              </p>
              <h2 className="font-display font-black text-2xl md:text-3xl tracking-tight text-white leading-snug uppercase">
                {activeQuestion.prompt}
              </h2>
            </div>

            {/* Answer options — ignite on hover/select */}
            <div className="flex flex-col">
              {activeQuestion.options.map((option, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAnswer(option, i)}
                  disabled={selectedOptionIndex !== null}
                  className={`option-card ${selectedOptionIndex === i ? "selected" : ""}`}
                  style={{
                    ...(selectedOptionIndex === i
                      ? { background: "var(--volt)", color: "#000", borderBottomColor: "var(--volt)" }
                      : {}),
                  }}
                >
                  <span className="font-mono text-[10px] text-zinc-700 mr-3 tracking-widest">
                    [{String.fromCharCode(65 + i)}]
                  </span>
                  <span className="font-body text-sm leading-relaxed">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── LOADING PHASE — Terminal evaluation ─────────────────────── */}
        {phase === "loading" && (
          <div
            className="p-10 space-y-3"
            style={{ border: "1px solid rgba(208,255,0,0.1)", background: "#020200" }}
          >
            <p
              className="font-mono text-[9px] uppercase tracking-widest mb-6 pb-4 border-b"
              style={{ color: "var(--zinc-600)", borderColor: "rgba(255,255,255,0.06)" }}
            >
              // RUNNING KINETIC ANALYSIS //
            </p>
            {LOADING_LINES.map((line, i) => (
              <p
                key={i}
                className={`font-mono text-xs transition-colors duration-300 ${
                  i < loadingLine
                    ? "text-zinc-800"
                    : i === loadingLine
                    ? "text-zinc-300"
                    : "text-zinc-900"
                }`}
              >
                &gt; {line}
                {i === loadingLine && (
                  <span className="animate-pulse" style={{ color: "var(--volt)" }}> █</span>
                )}
              </p>
            ))}
          </div>
        )}

        {/* ── RESULT PHASE ─────────────────────────────────────────────── */}
        {phase === "result" && (
          <div className="space-y-0">

            {/* Verdict block */}
            <div
              className="p-8 relative overflow-hidden"
              style={{ border: "1px solid rgba(208,255,0,0.15)", background: "#020200" }}
            >
              {!unlocked && (
                <div
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center"
                  style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(8px)" }}
                >
                  <p className="font-mono text-[9px] text-zinc-700 uppercase tracking-widest mb-4">
                    // ACCESS REQUIRED //
                  </p>
                  <p className="font-display font-black text-2xl text-ink uppercase mb-2">
                    Verdict Locked
                  </p>
                  <p className="font-mono text-sm text-zinc-600 max-w-sm leading-relaxed">
                    Enter your email below to unlock your honest diagnosis, financial impact analysis, and tailored action plan.
                  </p>
                </div>
              )}
              <p className="font-mono text-[9px] text-zinc-700 uppercase tracking-widest mb-3">
                DIAGNOSIS COMPLETE:
              </p>
              <h2
                className="font-display font-black uppercase tracking-tight leading-none mb-4"
                style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", color: "var(--volt)" }}
              >
                {archetype.name}
              </h2>
              <p className="font-mono text-sm text-zinc-500 leading-relaxed max-w-2xl">
                {archetype.roast}
              </p>
            </div>

            {/* Email gate */}
            {!unlocked ? (
              <form
                onSubmit={handleEmailSubmit}
                className="relative z-20 p-6"
                style={{
                  borderTop: "1px dashed rgba(255,255,255,0.1)",
                  borderBottom: "1px dashed rgba(255,255,255,0.1)",
                  background: "#080800",
                }}
              >
                <label htmlFor="email" className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest block mb-4">
                  UNLOCK OFFICIAL VERDICT // SUBMIT IDENTIFICATION
                </label>
                <div
                  className="flex flex-col sm:flex-row overflow-hidden"
                  style={{ border: "1px solid rgba(208,255,0,0.2)" }}
                >
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="YOU@EMAIL.COM"
                    required
                    className="flex-1 bg-transparent px-5 py-4 font-mono text-sm text-ink outline-none placeholder:text-zinc-800"
                    style={{ background: "transparent" }}
                  />
                  <button
                    type="submit"
                    className="font-display font-black text-xs tracking-wider uppercase px-8 py-4 whitespace-nowrap rounded-none active:scale-95 transition-all"
                    style={{ background: "var(--volt)", color: "#000" }}
                  >
                    REVEAL VERDICT
                  </button>
                </div>
                {emailError && (
                  <p className="font-mono text-xs mt-3" style={{ color: "var(--solar-red)" }}>{emailError}</p>
                )}
                <p className="font-mono text-[9px] text-zinc-800 mt-3">
                  * No spam. One honest verdict and maybe a friendly nudge.
                </p>
              </form>
            ) : (
              <>
                {/* Financial audit rows */}
                <div style={{ borderTop: "1px dashed rgba(255,255,255,0.08)", borderBottom: "1px dashed rgba(255,255,255,0.08)", background: "#060600" }}>
                  <div className="px-6 py-3" style={{ borderBottom: "1px dashed rgba(255,255,255,0.08)" }}>
                    <p className="font-mono text-[9px] text-zinc-600 tracking-widest uppercase">
                      FINANCIAL DAMAGE REPORT // GYMORNOT SYSTEMS
                    </p>
                  </div>
                  <div className="px-6 py-4 divide-y" style={{ divideColor: "rgba(255,255,255,0.06)" }}>
                    <div className="flex justify-between items-baseline py-2.5">
                      <span className="font-mono text-sm text-zinc-500">Dropoff Probability</span>
                      <span className="font-mono text-sm font-bold tabular-nums" style={{ color: "var(--solar-red)" }}>{dropoffProbability}%</span>
                    </div>
                    <div className="flex justify-between items-baseline py-2.5">
                      <span className="font-mono text-sm text-zinc-500">Projected Annual Waste</span>
                      <span className="font-mono text-sm font-bold tabular-nums" style={{ color: "var(--solar-red)" }}>${projectedLoss}</span>
                    </div>
                  </div>
                </div>

                {/* Recommended protocol */}
                <div
                  className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#000" }}
                >
                  <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
                    RECOMMENDED PROTOCOL: <span className="text-zinc-400">{archetype.cta.label}</span>
                  </p>
                  <a
                    href={archetype.cta.href}
                    className="font-mono text-xs underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
                    style={{ color: "var(--volt)" }}
                  >
                    View Recommendation →
                  </a>
                </div>

                {/* Share Card */}
                <div className="px-6 py-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#000" }}>
                  <p className="font-mono text-[9px] text-zinc-700 uppercase tracking-widest mb-6">
                    BROADCAST YOUR SENTENCE:
                  </p>
                  <ShareCard archetypeId={archetype.id} headline={archetype.shareHeadline} />
                </div>

                {/* Dashboard redirect */}
                {isRedirecting ? (
                  <div className="p-4" style={{ border: "1px solid rgba(208,255,0,0.1)", background: "#020200" }}>
                    <p className="font-mono text-xs animate-pulse" style={{ color: "var(--volt)" }}>
                      &gt; REDIRECTING TO FULL AUDIT DASHBOARD...
                    </p>
                  </div>
                ) : (
                  <div className="pt-6 text-center">
                    <Link
                      href="/dashboard"
                      className="inline-block font-display font-black text-sm tracking-wider uppercase px-8 py-4 rounded-none hover:bg-white active:scale-95 transition-all soft-depth"
                      style={{ background: "var(--volt)", color: "#000" }}
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

      {/* Mobile spacer + bottom nav */}
      <div className="h-[60px] md:hidden" />
      <BottomNavbar />
    </main>
  );
}
