"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const AVG_MONTHLY_GYM_COST = 58; // derived baseline across GYM_ITEMS trueCost figures
const DAILY_RATE = AVG_MONTHLY_GYM_COST / 30;

function todayKey(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function daysBetween(a: string, b: string): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const dateA = new Date(a + "T00:00:00");
  const dateB = new Date(b + "T00:00:00");
  return Math.round((dateB.getTime() - dateA.getTime()) / msPerDay);
}

export default function DashboardPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [lastExecution, setLastExecution] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedEmail = window.localStorage.getItem("gymornot_email");
    const savedStreak = window.localStorage.getItem("gymornot_streak");
    const savedLast = window.localStorage.getItem("gymornot_last_execution");

    setEmail(savedEmail);
    setStreak(savedStreak ? parseInt(savedStreak, 10) : 0);
    setLastExecution(savedLast);
    setHydrated(true);
  }, []);

  const completedToday = lastExecution === todayKey();

  const handleExecute = () => {
    const today = todayKey();
    let nextStreak = 1;

    if (lastExecution) {
      const gap = daysBetween(lastExecution, today);
      if (gap === 0) {
        return; // already logged today
      } else if (gap === 1) {
        nextStreak = streak + 1;
      } else {
        nextStreak = 1; // streak broken, restart
      }
    }

    setStreak(nextStreak);
    setLastExecution(today);
    window.localStorage.setItem("gymornot_streak", String(nextStreak));
    window.localStorage.setItem("gymornot_last_execution", today);
  };

  const capitalSaved = (streak * DAILY_RATE).toFixed(2);

  if (!hydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-void">
        <p className="font-mono text-sm text-ink-dim">
          Loading dashboard<span className="cursor" />
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-void px-6 py-10 md:px-10 md:py-14">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-display text-sm font-bold text-ink">
            GymOrNot<span className="text-gym-green">.</span>com
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim">
            The 1% Club
          </span>
        </div>

        {!email ? (
          <div className="mt-16 border border-hairline bg-surface p-8 text-center">
            <p className="font-mono text-sm text-ink-dim">
              No diagnosis on file for this browser yet.
            </p>
            <Link
              href="/quiz"
              className="mt-5 inline-flex items-center justify-center border border-gym-green bg-gym-green/10 px-5 py-2.5 font-mono text-sm text-gym-green transition-colors hover:bg-gym-green hover:text-void"
            >
              Take the diagnostic →
            </Link>
          </div>
        ) : (
          <>
            <p className="mt-10 font-mono text-xs uppercase tracking-[0.25em] text-gym-green">
              Signed in as
            </p>
            <h1 className="mt-2 break-all font-display text-2xl font-bold text-ink sm:text-3xl">
              {email}
            </h1>

            <div className="readout-rule mt-8" />

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Streak module */}
              <div className="border border-hairline bg-surface p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
                  Active execution streak
                </p>
                <p className="mt-3 font-display text-6xl font-bold text-gym-green">
                  {streak}
                  <span className="ml-2 text-xl text-ink-dim">
                    day{streak === 1 ? "" : "s"}
                  </span>
                </p>
                <button
                  onClick={handleExecute}
                  disabled={completedToday}
                  className="mt-6 w-full border border-gym-green bg-gym-green/10 px-4 py-3 font-mono text-sm text-gym-green transition-colors hover:bg-gym-green hover:text-void disabled:cursor-not-allowed disabled:border-hairline disabled:bg-transparent disabled:text-ink-dim disabled:hover:bg-transparent disabled:hover:text-ink-dim"
                >
                  {completedToday
                    ? "Logged for today ✓"
                    : "Complete 5-Minute Execution"}
                </button>
                <p className="mt-3 font-mono text-[11px] text-ink-dim">
                  {completedToday
                    ? "Come back tomorrow to extend the streak."
                    : "One rep, one walk, one stretch. Five minutes minimum."}
                </p>
              </div>

              {/* Capital saved module */}
              <div className="border border-hairline bg-surface p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
                  Capital saved index
                </p>
                <p className="mt-3 font-display text-5xl font-bold text-anti-purple">
                  ${capitalSaved}
                </p>
                <p className="mt-3 font-body text-sm text-ink-dim">
                  Prorated against the ${AVG_MONTHLY_GYM_COST}/mo industry
                  average membership, at ${DAILY_RATE.toFixed(2)}/day, for{" "}
                  {streak} executed day{streak === 1 ? "" : "s"}.
                </p>
                <div className="mt-5 h-2 w-full overflow-hidden bg-void">
                  <div
                    className="h-full bg-gradient-to-r from-anti-purple to-gym-green transition-all duration-700"
                    style={{
                      width: `${Math.min((streak / 30) * 100, 100)}%`,
                    }}
                  />
                </div>
                <p className="mt-2 font-mono text-[11px] text-ink-dim">
                  {Math.min(streak, 30)}/30 days toward this month's index
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 border border-hairline bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
                  Need more gear?
                </p>
                <p className="mt-1 font-body text-sm text-ink">
                  The sanctuary is still open, streak or no streak.
                </p>
              </div>
              <Link
                href="/dont-wanna-gym"
                className="whitespace-nowrap border border-anti-purple bg-anti-purple/10 px-5 py-2.5 text-center font-mono text-sm text-anti-purple transition-colors hover:bg-anti-purple hover:text-void"
              >
                Browse home setup →
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
