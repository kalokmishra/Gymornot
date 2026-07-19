"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { computeArchetype } from "../../lib/quiz";
import ShareCard from "../quiz/components/ShareCard";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import { useAuth } from "../../components/AuthProvider";

function formatDate(value: string | null) {
  if (!value) return "Never";
  const date = new Date(value);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState<string | null>(null);

  const [gymScore, setGymScore] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [boutiqueScore, setBoutiqueScore] = useState(0);
  const [couchScore, setCouchScore] = useState(0);

  const [streak, setStreak] = useState(0);
  const [lastCheckin, setLastCheckin] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const yesterday = useMemo(() => new Date(Date.now() - 86400000).toISOString().slice(0, 10), []);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    setHydrated(true);
    const storedEmail = window.localStorage.getItem("gymornot_email");
    const storedGym = window.localStorage.getItem("gymornot_gymScore");
    const storedHome = window.localStorage.getItem("gymornot_homeScore");
    const storedBoutique = window.localStorage.getItem("gymornot_boutiqueScore");
    const storedCouch = window.localStorage.getItem("gymornot_couchScore");
    const storedStreak = window.localStorage.getItem("gymornot_streak");
    const storedLastCheckin = window.localStorage.getItem("gymornot_last_checkin");

    if (storedEmail && !user?.email) {
      setEmail(storedEmail);
    }

    setGymScore(storedGym ? Number(storedGym) : 0);
    setHomeScore(storedHome ? Number(storedHome) : 0);
    setBoutiqueScore(storedBoutique ? Number(storedBoutique) : 0);
    setCouchScore(storedCouch ? Number(storedCouch) : 0);

    setStreak(storedStreak ? Number(storedStreak) : 0);
    setLastCheckin(storedLastCheckin || null);
  }, [user]);

  const totalScore = gymScore + homeScore + boutiqueScore + couchScore || 1;
  const isUnlocked = hydrated && email && totalScore > 1;

  const archetype = useMemo(() => {
    if (!isUnlocked) return null;
    return computeArchetype(gymScore, homeScore, boutiqueScore, couchScore);
  }, [isUnlocked, gymScore, homeScore, boutiqueScore, couchScore]);

  const dropoffProbability = Math.round((couchScore / totalScore) * 100);

  const checkedInToday = lastCheckin === today;
  const nextStreak = checkedInToday ? streak : lastCheckin === yesterday ? streak + 1 : 1;
  const capitalSaved = Math.max(0, nextStreak * 6 + 5);

  const handleCheckin = () => {
    if (checkedInToday) return;
    const updatedStreak = lastCheckin === yesterday ? streak + 1 : 1;
    window.localStorage.setItem("gymornot_streak", String(updatedStreak));
    window.localStorage.setItem("gymornot_last_checkin", today);
    setStreak(updatedStreak);
    setLastCheckin(today);
  };

  const habitGrid = useMemo(() => {
    const cells: ("active" | "missed" | "empty")[] = [];
    for (let i = 27; i >= 0; i--) {
      const cellDate = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      if (cellDate > today) {
        cells.push("empty");
      } else if (streak > 0 && i < streak) {
        cells.push("active");
      } else {
        cells.push("missed");
      }
    }
    return cells;
  }, [streak, today]);

  return (
    <main className="min-h-screen bg-void text-ink font-body selection:bg-volt selection:text-void">

      <Header contextLink="/quiz" contextLabel="Retake Audit →" />
      <div className="h-[57px]" />

      {/* ── HERO SCORE ─────────────────────────────────────────────────────── */}
      <div
        className="border-b px-6 py-14 md:py-20 relative overflow-hidden"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "#020200" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(255,77,0,0.05) 0%, rgba(208,255,0,0.02) 100%)" }}
        />
        <div className="kinetic-bar absolute top-0 left-0 right-0" />

        <div className="max-w-3xl mx-auto relative">
          {isUnlocked && archetype ? (
            <>
              <p className="font-mono text-[9px] text-zinc-700 tracking-widest uppercase mb-3">
                DIAGNOSIS CONFIRMED:
              </p>
              <h1
                className="font-display font-black uppercase leading-none mb-3"
                style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", color: "var(--ink)" }}
              >
                {archetype.name}
              </h1>
              <p className="font-body text-sm text-zinc-600 max-w-xl mb-10">
                {archetype.roast}
              </p>
              <p className="font-mono text-[9px] text-zinc-700 tracking-widest uppercase mb-2">
                ANNUAL FINANCIAL DAMAGE ASSESSMENT:
              </p>
              <div
                className="font-display font-black tracking-tighter leading-none"
                style={{ fontSize: "clamp(4rem, 14vw, 8rem)", color: "var(--solar-red)" }}
              >
                $1,068
              </div>
              <p className="font-mono text-[9px] text-zinc-700 mt-3 tracking-widest">
                [SUNK_COST_FALLACY_INDEX: {dropoffProbability}%]
              </p>
            </>
          ) : (
            <div
              className="p-10 text-center"
              style={{ border: "1px dashed rgba(255,255,255,0.1)" }}
            >
              <p className="font-mono text-[9px] text-zinc-700 uppercase tracking-widest mb-4">
                // ACCESS DENIED //
              </p>
              <h1 className="font-display font-black text-3xl text-ink mb-3 uppercase">
                You haven&apos;t been indicted yet.
              </h1>
              <p className="font-mono text-sm text-zinc-600 mb-8">
                Complete the audit to receive your financial guilt assessment.
              </p>
              <Link
                href="/quiz"
                className="inline-block font-display font-black text-xs uppercase px-6 py-3 rounded-none hover:bg-white active:scale-95 transition-all soft-depth"
                style={{ background: "var(--volt)", color: "#000" }}
              >
                TAKE THE AUDIT NOW
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ── MAIN CONTENT ───────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-5 py-10 space-y-0">
        {isUnlocked && archetype ? (
          <>
            {/* FINANCIAL AUDIT RECEIPT */}
            <div style={{ borderTop: "1px dashed rgba(255,255,255,0.1)", borderBottom: "1px dashed rgba(255,255,255,0.1)", background: "#060600" }}>
              <div className="px-6 py-3" style={{ borderBottom: "1px dashed rgba(255,255,255,0.1)" }}>
                <p className="font-mono text-[9px] text-zinc-600 tracking-widest uppercase">
                  OFFICIAL FINANCIAL AUDIT — GYMORNOT SYSTEMS // REF: {email?.split("@")[0]?.toUpperCase() ?? "MEMBER"}
                </p>
              </div>

              <div className="px-6 py-4">
                {[
                  { label: "Membership Fee (Monthly)", value: "$89.00", accent: false },
                  { label: "Actual Visits Last Month", value: "2", accent: false },
                  { label: "Cost Per Actual Sweat", value: "$44.50", accent: false },
                  { label: "Gym Greed Donation Tax", value: "100%", accent: false },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-baseline py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span className="font-mono text-sm text-zinc-500">{row.label}</span>
                    <span className="font-mono text-sm text-ink font-bold tabular-nums">{row.value}</span>
                  </div>
                ))}

                <div className="py-2" />

                {[
                  { label: "Current Escape Streak", value: `${streak} day${streak === 1 ? "" : "s"}`, color: "var(--volt)" },
                  { label: "Capital Recovered (Est.)", value: `$${capitalSaved}`, color: "var(--ink)" },
                  { label: "Last Honest Movement", value: formatDate(lastCheckin), color: "var(--ink)" },
                  { label: "Dropoff Probability", value: `${dropoffProbability}%`, color: dropoffProbability > 50 ? "var(--solar-red)" : "var(--ink)" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-baseline py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span className="font-mono text-sm text-zinc-500">{row.label}</span>
                    <span className="font-mono text-sm font-bold tabular-nums" style={{ color: row.color }}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4" style={{ borderTop: "1px dashed rgba(255,255,255,0.1)" }}>
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-sm text-zinc-500 font-bold uppercase tracking-wider">TOTAL ANNUAL DAMAGE</span>
                  <span className="font-mono text-xl font-black tabular-nums" style={{ color: "var(--solar-red)" }}>$1,068</span>
                </div>
              </div>

              <div className="px-6 py-3 space-y-1" style={{ borderTop: "1px dashed rgba(255,255,255,0.1)" }}>
                <p className="font-mono text-[9px] text-zinc-700">* Streaks are stored locally in your browser.</p>
                <p className="font-mono text-[9px] text-zinc-700">* Retake audit anytime to update your risk profile.</p>
              </div>
            </div>

            {/* DAILY CHECK-IN */}
            <div
              className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#030300" }}
            >
              <div>
                <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mb-1">DAILY MOVEMENT LOG:</p>
                <p className="font-mono text-xs text-zinc-700">Tap after any walk, workout, or movement. Keeps your streak alive.</p>
              </div>
              <button
                type="button"
                onClick={handleCheckin}
                disabled={checkedInToday}
                className={`font-display font-black text-xs uppercase px-5 py-2.5 rounded-none transition-all whitespace-nowrap shrink-0 ${checkedInToday ? "cursor-not-allowed" : "hover:bg-white active:scale-95 soft-depth"}`}
                style={checkedInToday
                  ? { border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.2)" }
                  : { background: "var(--volt)", color: "#000" }}
              >
                {checkedInToday ? "LOGGED ✓" : "LOG TODAY"}
              </button>
            </div>

            {/* RECOMMENDED PROTOCOL */}
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
                Take Action →
              </a>
            </div>

            {/* 28-DAY HABIT GRID */}
            <div
              className="px-6 py-8"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#000" }}
            >
              <div className="pb-3 mb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="font-mono text-[9px] text-zinc-700 uppercase tracking-widest">
                  CHRONIC INACTIVITY MONITOR // LAST 28 DAYS
                </p>
              </div>
              <div className="grid grid-cols-7 gap-1.5 w-max">
                {habitGrid.map((cell, i) => (
                  <div
                    key={i}
                    title={`Day ${i + 1}: ${cell}`}
                    className="w-6 h-6 rounded-none"
                    style={{
                      background: cell === "active" ? "var(--volt)" : cell === "missed" ? "#1a1a0a" : "#0a0a00",
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-5 mt-4">
                <div className="flex items-center gap-2 font-mono text-[9px] text-zinc-700 uppercase">
                  <span className="w-3 h-3 inline-block" style={{ background: "var(--volt)" }} /> Active
                </div>
                <div className="flex items-center gap-2 font-mono text-[9px] text-zinc-700 uppercase">
                  <span className="w-3 h-3 inline-block" style={{ background: "#1a1a0a" }} /> Missed
                </div>
              </div>
            </div>

            {/* SHARE CARD */}
            <div
              className="px-6 py-8"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#000" }}
            >
              <p className="font-mono text-[9px] text-zinc-700 uppercase tracking-widest mb-6">BROADCAST YOUR SENTENCE:</p>
              <ShareCard archetypeId={archetype.id} headline={archetype.shareHeadline} />
            </div>

            {/* ESCAPE HATCH */}
            <div
              className="px-6 py-8 md:p-10 mt-8"
              style={{ border: "1px solid rgba(255,77,0,0.25)", background: "rgba(255,77,0,0.04)" }}
            >
              <p className="font-mono text-[9px] uppercase tracking-widest mb-4" style={{ color: "rgba(255,77,0,0.6)" }}>
                // TERMINATION PROTOCOL AVAILABLE //
              </p>
              <h2 className="font-display font-black text-2xl md:text-4xl text-ink uppercase leading-tight mb-6">
                Ready to Stop Donating to Corporate Gyms?
              </h2>
              <p className="font-mono text-sm text-zinc-600 mb-8 max-w-md">
                Generate your official cancellation letter. Exit the trap permanently. No negotiation required.
              </p>
              <div className="flex flex-col items-start gap-4">
                <Link
                  href="/dont-wanna-gym"
                  className="font-display font-black text-sm uppercase w-full md:w-auto px-8 py-4 rounded-none text-center hover:opacity-90 active:scale-95 transition-all soft-depth"
                  style={{ background: "var(--solar-red)", color: "var(--ink)" }}
                >
                  ESCAPE THE TRAP →
                </Link>
                <Link
                  href="/giving-free-money"
                  className="font-mono text-xs text-zinc-700 hover:text-zinc-500 underline underline-offset-4 transition-colors"
                >
                  No thanks, I prefer giving corporate gym chains free money.
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <p className="font-mono text-[9px] text-zinc-700 uppercase tracking-widest">
              Complete the audit above to unlock your full report.
            </p>
          </div>
        )}
      </div>

      <div className="h-[60px] md:hidden" />
      <BottomNavbar />
    </main>
  );
}
