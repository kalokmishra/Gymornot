"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Archetype = {
  name: string;
  color: "green" | "purple" | "alert";
  description: string;
};

function getArchetype(score: number): Archetype {
  if (score <= 4) {
    return {
      name: "The Actual Athlete",
      color: "green",
      description: "Your habits are aligned with action. Keep building the momentum.",
    };
  }
  if (score <= 8) {
    return {
      name: "The January Idealist",
      color: "alert",
      description: "You have good intent and need low friction habits to stay consistent.",
    };
  }
  return {
    name: "The Corporate Donor",
    color: "purple",
    description: "Your membership is buying you comfort more than actual workouts. Time to course correct.",
  };
}

function formatDate(value: string | null) {
  if (!value) return "Never";
  const date = new Date(value);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function DashboardPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [lastCheckin, setLastCheckin] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const yesterday = useMemo(() => new Date(Date.now() - 86400000).toISOString().slice(0, 10), []);

  useEffect(() => {
    setHydrated(true);
    const storedEmail = window.localStorage.getItem("gymornot_email");
    const storedScore = window.localStorage.getItem("gymornot_risk_score");
    const storedStreak = window.localStorage.getItem("gymornot_streak");
    const storedLast = window.localStorage.getItem("gymornot_last_checkin");

    setEmail(storedEmail);
    setScore(storedScore ? Number(storedScore) : null);
    setStreak(storedStreak ? Number(storedStreak) : 0);
    setLastCheckin(storedLast || null);
  }, []);

  const archetype = useMemo(() => (score !== null ? getArchetype(score) : null), [score]);
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

  const isUnlocked = hydrated && email && score !== null;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.16),transparent_24%),#0b0f19] text-ink">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <div className="mb-6 flex items-center justify-between rounded-3xl border border-white/10 bg-surface px-6 py-4 text-sm text-ink-dim shadow-[0_20px_70px_-50px_rgba(0,0,0,0.8)] sm:px-10">
          <div className="font-display text-lg font-bold text-ink">GymOrNot<span className="text-gym-green">.</span>com</div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-full border border-white/10 bg-[#0d1527] px-4 py-2 text-sm font-semibold text-ink transition hover:border-gym-green/40 hover:bg-white/5">
              Home
            </Link>
            <Link href="/quiz" className="rounded-full bg-gym-green px-4 py-2 text-sm font-semibold text-void transition hover:bg-gym-green/90">
              Take quiz
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-surface p-8 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.75)]">
            <div className="rounded-[1.75rem] bg-[#111827]/80 p-8">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-gym-green/80">The 1% Club</p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Track the habit, not the membership.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-ink-dim">
                Check in once per day and keep your streak going. This page turns your quiz verdict into an actionable habit dashboard.
              </p>
            </div>

            {isUnlocked ? (
              <div className="mt-8 grid gap-6">
                <section className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-[#0b1320] p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-ink-dim">Risk archetype</p>
                      <p className={`mt-3 text-2xl font-semibold ${
                        archetype?.color === "green"
                          ? "text-gym-green"
                          : archetype?.color === "purple"
                          ? "text-anti-purple"
                          : "text-alert"
                      }`}
                      >
                        {archetype?.name}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-white/5 px-4 py-3 text-sm text-ink-dim">
                      {score} / 12
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-ink-dim">{archetype?.description}</p>
                </section>

                <section className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] border border-white/10 bg-[#111827]/80 p-6">
                    <p className="text-xs uppercase tracking-[0.28em] text-ink-dim">Current streak</p>
                    <p className="mt-3 text-3xl font-semibold text-ink">{streak} day{streak === 1 ? "" : "s"}</p>
                    <p className="mt-3 text-sm text-ink-dim">Last check-in: {formatDate(lastCheckin)}</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-white/10 bg-[#111827]/80 p-6">
                    <p className="text-xs uppercase tracking-[0.28em] text-ink-dim">Capital saved</p>
                    <p className="mt-3 text-3xl font-semibold text-gym-green">${capitalSaved}</p>
                    <p className="mt-3 text-sm text-ink-dim">Estimated money kept from wasted recurring fees.</p>
                  </div>
                </section>

                <section className="rounded-[1.75rem] border border-white/10 bg-[#0f1726]/80 p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-ink">Daily check-in</p>
                      <p className="mt-1 text-sm text-ink-dim">Tap the button after you do a workout, a walk, or any healthy movement today.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCheckin}
                      disabled={checkedInToday}
                      className="rounded-2xl bg-gradient-to-r from-gym-green to-anti-purple px-6 py-3 text-sm font-semibold text-void transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {checkedInToday ? "Checked in today" : "Log today"}
                    </button>
                  </div>
                </section>
              </div>
            ) : (
              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-[#0f1726]/80 p-8 text-center">
                <p className="text-xl font-semibold text-ink">You haven’t unlocked the dashboard yet.</p>
                <p className="mt-3 text-sm text-ink-dim">
                  Finish the quiz first to get your verdict and start tracking streaks.
                </p>
                <Link
                  href="/quiz"
                  className="mt-6 inline-flex rounded-full bg-gym-green px-6 py-3 text-sm font-semibold text-void transition hover:bg-gym-green/90"
                >
                  Take the quiz now
                </Link>
              </div>
            )}
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-surface p-8">
            <div className="rounded-[1.75rem] bg-[#111827]/80 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-gym-green/80">Dashboard notes</p>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-ink-dim">
                <li>Streaks are stored locally in your browser.</li>
                <li>Checking in today refreshes your momentum score.</li>
                <li>You can retake the quiz anytime to update your risk profile.</li>
              </ul>
            </div>
            <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-[#0d1527]/80 p-6 text-sm text-ink-dim">
              <p className="font-semibold text-ink">Tip</p>
              <p className="mt-2">Consistency matters more than intensity. A daily walk, stretching session, or quick bodyweight set counts here.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
