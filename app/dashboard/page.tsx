"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { computeArchetype } from "../../lib/quiz";
import ShareCard from "../quiz/components/ShareCard";

function formatDate(value: string | null) {
  if (!value) return "Never";
  const date = new Date(value);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function DashboardPage() {
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
    setHydrated(true);
    const storedEmail = window.localStorage.getItem("gymornot_email");
    const storedGym = window.localStorage.getItem("gymornot_gymScore");
    const storedHome = window.localStorage.getItem("gymornot_homeScore");
    const storedBoutique = window.localStorage.getItem("gymornot_boutiqueScore");
    const storedCouch = window.localStorage.getItem("gymornot_couchScore");
    const storedStreak = window.localStorage.getItem("gymornot_streak");
    const storedLast = window.localStorage.getItem("gymornot_last_checkin");

    setEmail(storedEmail);
    setGymScore(storedGym ? Number(storedGym) : 0);
    setHomeScore(storedHome ? Number(storedHome) : 0);
    setBoutiqueScore(storedBoutique ? Number(storedBoutique) : 0);
    setCouchScore(storedCouch ? Number(storedCouch) : 0);
    
    setStreak(storedStreak ? Number(storedStreak) : 0);
    setLastCheckin(storedLast || null);
  }, []);

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

  const textColorClass = archetype?.color === "green" 
    ? "text-brand-lime" 
    : archetype?.color === "purple" 
      ? "text-anti-purple-glow" 
      : archetype?.color === "amber"
        ? "text-amber-400"
        : "text-brand-red";

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
              className="font-display font-bold text-xs tracking-wider uppercase border border-hairline hover:bg-surface-raised px-4 py-2 text-ink-dim hover:text-ink rounded-full transition-all"
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

      <div className="mx-auto flex max-w-6xl flex-col px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="border border-hairline bg-surface p-8 rounded-3xl">
              <p className="font-display text-xs font-bold text-brand-lime tracking-widest uppercase">The 1% Club</p>
              <h1 className="mt-4 font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink leading-none">
                Track the habit, not the membership.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-ink-dim">
                Check in once per day and keep your streak going. This page turns your quiz verdict into an actionable habit dashboard.
              </p>
            </div>

            {isUnlocked && archetype ? (
              <div className="grid gap-6">
                <section className="grid gap-4 border border-hairline bg-surface-raised p-8 rounded-3xl">
                  <div>
                    <p className="font-display text-xs font-bold text-brand-red tracking-widest uppercase mb-1">Your Diagnosis</p>
                    <p className={`text-2xl sm:text-3xl font-display font-black uppercase ${textColorClass}`}>
                      {archetype.name}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-ink-dim">{archetype.roast}</p>
                </section>

                <section className="grid gap-6 sm:grid-cols-2">
                  <div className="border border-hairline bg-surface p-6 rounded-2xl">
                    <p className="font-display text-xs font-bold text-ink-dim uppercase tracking-wider">Current streak</p>
                    <p className="mt-3 font-display font-black text-4xl text-ink">{streak} day{streak === 1 ? "" : "s"}</p>
                    <p className="mt-3 text-xs font-bold text-ink-dim uppercase">Last check-in: {formatDate(lastCheckin)}</p>
                  </div>
                  <div className="border border-hairline bg-surface p-6 rounded-2xl relative overflow-hidden">
                    <p className="font-display text-xs font-bold text-ink-dim uppercase tracking-wider">Donation Index</p>
                    <p className="mt-3 font-display font-black text-4xl text-brand-lime">${capitalSaved}</p>
                    <p className="mt-3 text-xs text-ink-dim leading-relaxed">Money saved by actually building the habit instead of paying for ghost memberships.</p>
                    {dropoffProbability > 50 && (
                      <div className="absolute top-0 right-0 mt-6 mr-6 h-2 w-2 rounded-full bg-brand-red animate-pulse" />
                    )}
                  </div>
                </section>

                {/* Sticky CTA Panel */}
                <section className="border border-brand-lime bg-brand-lime/5 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                   <div className="flex-1">
                      <p className="font-display text-sm font-black text-ink uppercase">Action Plan: {archetype.cta.label}</p>
                      <p className="mt-1 text-xs font-bold text-ink-dim uppercase">Your tailored recommendation to beat the statistics.</p>
                   </div>
                   <a href={archetype.cta.href} className="font-display font-black text-xs uppercase bg-brand-lime text-void px-6 py-3 rounded-full hover:bg-ink transition-all whitespace-nowrap">
                     Take Action
                   </a>
                </section>

                {/* Daily Log */}
                <section className="border border-hairline bg-surface-raised p-6 rounded-2xl">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-display text-sm font-black text-ink uppercase">Daily check-in</p>
                      <p className="mt-1 text-xs text-ink-dim">Tap the button after you do a workout, a walk, or any healthy movement today.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCheckin}
                      disabled={checkedInToday}
                      className="font-display font-black text-xs uppercase bg-brand-lime text-void px-6 py-3 rounded-full disabled:opacity-30 disabled:hover:bg-brand-lime hover:bg-ink transition-all whitespace-nowrap"
                    >
                      {checkedInToday ? "Checked in today" : "Log today"}
                    </button>
                  </div>
                </section>
              </div>
            ) : (
              <div className="border border-hairline bg-surface p-8 rounded-3xl text-center">
                <p className="font-display font-black text-xl text-ink uppercase">You haven’t unlocked the dashboard yet.</p>
                <p className="mt-2 text-sm text-ink-dim">
                  Finish the quiz first to get your verdict and start tracking streaks.
                </p>
                <Link
                  href="/quiz"
                  className="mt-6 inline-block font-display font-black text-xs uppercase bg-brand-lime text-void px-6 py-3 rounded-full hover:bg-ink transition-all"
                >
                  Take the quiz now
                </Link>
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-6">
            <div className="border border-hairline bg-surface p-6 rounded-2xl">
              <p className="font-display text-xs font-bold text-brand-red tracking-widest uppercase mb-4">Dashboard notes</p>
              <ul className="space-y-4 text-xs font-bold text-ink-dim uppercase">
                <li className="flex gap-2 items-start">
                  <span className="text-brand-lime">•</span>
                  <span>Streaks are stored locally in your browser.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-brand-lime">•</span>
                  <span>Checking in today refreshes your momentum score.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-brand-lime">•</span>
                  <span>You can retake the quiz anytime to update your risk profile.</span>
                </li>
              </ul>
            </div>
            
            <div className="border border-hairline bg-surface p-6 rounded-2xl">
              <p className="font-display text-xs font-bold text-brand-lime tracking-widest uppercase mb-2">Tip</p>
              <p className="text-sm font-bold text-ink-dim uppercase">Consistency matters more than intensity. A daily walk, stretching session, or quick bodyweight set counts here.</p>
            </div>
            
            {/* Share Card shown if unlocked */}
            {isUnlocked && archetype && (
              <ShareCard archetypeId={archetype.id} headline={archetype.shareHeadline} />
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
