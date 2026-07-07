"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { computeArchetype } from "../../lib/quiz";
import ShareCard from "../quiz/components/ShareCard";
import Header from "../../components/Header";
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
    const date = today;
    window.localStorage.setItem("gymornot_streak", String(updatedStreak));
    window.localStorage.setItem("gymornot_last_checkin", date);
    setStreak(updatedStreak);
    setLastCheckin(date);
  };

  // Build 28-day habit grid from streak
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
    <main className="min-h-screen bg-void text-ink font-body selection:bg-brand-lime selection:text-void">

      {/* HEADER */}
      <Header contextLink="/quiz" contextLabel="Retake Quiz →" />

      {/* HERO SCORE — Full bleed */}
      <div className="bg-zinc-950 border-b border-zinc-800 px-6 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          {isUnlocked && archetype ? (
            <>
              <p className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase mb-3">
                DIAGNOSIS CONFIRMED:
              </p>
              <h1 className="font-display font-black text-4xl md:text-6xl text-ink uppercase leading-none mb-3">
                {archetype.name}
              </h1>
              <p className="font-body text-base text-zinc-500 max-w-xl mb-10">
                {archetype.roast}
              </p>

              <p className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase mb-2">
                ANNUAL FINANCIAL DAMAGE ASSESSMENT:
              </p>
              <div className="font-display font-black text-6xl md:text-8xl text-brand-red tracking-tighter leading-none">
                $1,068
              </div>
              <p className="font-mono text-xs text-zinc-600 mt-3 tracking-widest">
                [SUNK_COST_FALLACY_INDEX: {dropoffProbability}%]
              </p>
            </>
          ) : (
            <div className="border border-dashed border-zinc-700 p-10 text-center">
              <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">
                // ACCESS DENIED //
              </p>
              <h1 className="font-display font-black text-3xl text-ink mb-3">
                You haven't been indicted yet.
              </h1>
              <p className="font-mono text-sm text-zinc-500 mb-8">
                Complete the quiz to receive your financial guilt assessment.
              </p>
              <Link
                href="/quiz"
                className="inline-block font-display font-black text-xs uppercase bg-brand-lime text-void px-6 py-3 rounded-none hover:bg-white transition-colors"
              >
                Take the Quiz Now
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* MAIN DOCUMENT COLUMN */}
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-0">

        {isUnlocked && archetype ? (
          <>
            {/* FINANCIAL AUDIT RECEIPT */}
            <div className="border-t border-b border-dashed border-zinc-700 bg-zinc-900">
              {/* Receipt header */}
              <div className="border-b border-dashed border-zinc-700 px-6 py-3">
                <p className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                  OFFICIAL FINANCIAL AUDIT — GYMORNOT SYSTEMS // REF: {email?.split("@")[0]?.toUpperCase() ?? "MEMBER"}
                </p>
              </div>

              {/* Line items */}
              <div className="px-6 py-4 space-y-0 divide-y divide-zinc-800">
                {[
                  { label: "Membership Fee (Monthly)", value: "$89.00" },
                  { label: "Actual Visits Last Month", value: "2" },
                  { label: "Cost Per Actual Sweat", value: "$44.50" },
                  { label: "Gym Greed Donation Tax", value: "100%" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-baseline py-2.5">
                    <span className="font-mono text-sm text-zinc-400">{row.label}</span>
                    <span className="font-mono text-sm text-ink font-bold tabular-nums">{row.value}</span>
                  </div>
                ))}

                {/* Spacer */}
                <div className="py-1" />

                {[
                  { label: "Current Escape Streak", value: `${streak} day${streak === 1 ? "" : "s"}` },
                  { label: "Capital Recovered (Est.)", value: `$${capitalSaved}` },
                  { label: "Last Honest Movement", value: formatDate(lastCheckin) },
                  { label: "Dropoff Probability", value: `${dropoffProbability}%` },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-baseline py-2.5">
                    <span className="font-mono text-sm text-zinc-400">{row.label}</span>
                    <span className={`font-mono text-sm font-bold tabular-nums ${i === 0 ? "text-brand-lime" : i === 3 && dropoffProbability > 50 ? "text-brand-red" : "text-ink"}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Receipt footer total */}
              <div className="border-t border-dashed border-zinc-700 px-6 py-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-sm text-zinc-400 font-bold uppercase tracking-wider">TOTAL ANNUAL DAMAGE</span>
                  <span className="font-mono text-xl text-brand-red font-black tabular-nums">$1,068</span>
                </div>
              </div>

              {/* Receipt footnotes */}
              <div className="border-t border-dashed border-zinc-700 px-6 py-3 space-y-1">
                <p className="font-mono text-[10px] text-zinc-600">* Streaks are stored locally in your browser.</p>
                <p className="font-mono text-[10px] text-zinc-600">* Retake quiz anytime to update your risk profile.</p>
              </div>
            </div>

            {/* DAILY CHECK-IN TERMINAL ROW */}
            <div className="border-b border-zinc-800 bg-zinc-950 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
                  DAILY MOVEMENT LOG:
                </p>
                <p className="font-mono text-xs text-zinc-600">
                  Tap after any walk, workout, or movement. Keeps your streak alive.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCheckin}
                disabled={checkedInToday}
                className={`font-display font-black text-xs uppercase px-5 py-2.5 rounded-none transition-colors whitespace-nowrap shrink-0 ${
                  checkedInToday
                    ? "border border-zinc-700 text-zinc-500 font-mono cursor-not-allowed"
                    : "bg-brand-lime text-void hover:bg-white"
                }`}
              >
                {checkedInToday ? "LOGGED ✓" : "LOG TODAY"}
              </button>
            </div>

            {/* RECOMMENDED PROTOCOL — Archetype CTA */}
            <div className="border-b border-zinc-800 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                RECOMMENDED PROTOCOL: <span className="text-zinc-400">{archetype.cta.label}</span>
              </p>
              <a
                href={archetype.cta.href}
                className="font-mono text-xs text-brand-lime hover:text-ink underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
              >
                Take Action →
              </a>
            </div>

            {/* CHRONIC INACTIVITY MONITOR — 28-day habit grid */}
            <div className="border-b border-zinc-800 bg-void px-6 py-8">
              <div className="border-b border-zinc-800 pb-3 mb-5">
                <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                  CHRONIC INACTIVITY MONITOR // LAST 28 DAYS
                </p>
              </div>
              <div className="grid grid-cols-7 gap-1.5 w-max">
                {habitGrid.map((cell, i) => (
                  <div
                    key={i}
                    title={`Day ${i + 1}: ${cell}`}
                    className={`w-6 h-6 rounded-none ${
                      cell === "active"
                        ? "bg-brand-lime"
                        : cell === "missed"
                        ? "bg-zinc-800"
                        : "bg-zinc-950"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-5 mt-4">
                <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-600 uppercase">
                  <span className="w-3 h-3 bg-brand-lime inline-block" /> Active
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-600 uppercase">
                  <span className="w-3 h-3 bg-zinc-800 inline-block" /> Missed
                </div>
              </div>
            </div>

            {/* SHARE CARD */}
            <div className="border-b border-zinc-800 px-6 py-8">
              <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-6">
                BROADCAST YOUR SENTENCE:
              </p>
              <ShareCard archetypeId={archetype.id} headline={archetype.shareHeadline} />
            </div>

            {/* ESCAPE HATCH ULTIMATUM */}
            <div className="border-2 border-red-900 bg-red-950/20 px-6 py-8 md:p-10 mt-8">
              <p className="font-mono text-[10px] text-red-700 uppercase tracking-widest mb-4">
                // TERMINATION PROTOCOL AVAILABLE //
              </p>
              <h2 className="font-display font-black text-2xl md:text-4xl text-ink uppercase leading-tight mb-6">
                Ready to Stop Donating to Corporate Gyms?
              </h2>
              <p className="font-mono text-sm text-zinc-500 mb-8 max-w-md">
                Generate your official cancellation letter. Exit the trap permanently. No negotiation required.
              </p>
              <div className="flex flex-col items-center md:items-start gap-4">
                <Link
                  href="/dont-wanna-gym"
                  className="bg-brand-red hover:bg-red-700 text-white font-display font-black text-sm uppercase w-full md:w-auto px-8 py-4 rounded-none text-center transition-colors"
                >
                  ESCAPE THE TRAP →
                </Link>
                <Link
                  href="/giving-free-money"
                  className="font-mono text-xs text-zinc-600 hover:text-zinc-400 underline underline-offset-4 transition-colors text-center"
                >
                  No thanks, I prefer giving corporate gym chains free money.
                </Link>
              </div>
            </div>

          </>
        ) : (
          /* Locked state — already handled in the hero section above */
          <div className="py-8 text-center">
            <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
              Complete the quiz above to unlock your full audit.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
