"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const WASTE_STATS = [
  { label: "avg wasted per year", value: "$1,068" },
  { label: "memberships cancelled this month", value: "23,847" },
  { label: "gym visits per month (avg member)", value: "1.4" },
  { label: "of members go less than once/week", value: "67%" },
];

const TESTIMONIALS = [
  {
    name: "Marcus, 34",
    quote: "Cancelled after 2 years. Bought resistance bands for $23. Never looked back. I'm in better shape now.",
    saving: "Saved $1,068/yr",
  },
  {
    name: "Priya, 28",
    quote: "My gym charged me for 3 months after I 'cancelled'. GymOrNot helped me write the letter. They stopped.",
    saving: "Saved $267",
  },
  {
    name: "Derek, 41",
    quote: "I was paying $120/month for a gym I visited 4 times in a year. That's $30 per visit. For a treadmill.",
    saving: "Saved $1,440/yr",
  },
];

export default function HomePage() {
  const [counter, setCounter] = useState(23847);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
              className="font-display font-bold text-xs tracking-wider uppercase bg-brand-lime text-void border border-brand-lime px-4 py-2 rounded-full transition-all"
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

      {/* HERO SECTION */}
      <section className="border-b border-hairline px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Live Counter */}
          <div className="inline-flex items-center gap-2 border border-brand-red/35 bg-brand-red/5 px-4 py-2 rounded-full mb-10">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
            <span className="font-display text-xs font-bold text-brand-red tracking-widest uppercase">
              LIVE — {counter.toLocaleString()} memberships cancelled this month
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-5xl md:text-8xl tracking-tighter leading-[0.9] text-ink uppercase max-w-4xl">
            YOU DON'T GO.<br />
            <span className="text-brand-lime">YOU KNOW IT.</span><br />
            WE KNOW IT.
          </h1>

          <p className="font-body text-lg md:text-xl text-ink-dim max-w-lg leading-relaxed mt-8 mb-10">
            The average gym member wastes <strong className="text-ink">$1,068/year</strong> on fitness guilt. Find out your exact number — and what to do about it.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/quiz"
              className="font-display font-black text-sm tracking-wider uppercase bg-brand-lime text-void px-8 py-5 rounded-full hover:bg-ink hover:text-void transition-all"
            >
              DIAGNOSE MY GYM HABIT →
            </Link>
            <Link
              href="/dont-wanna-gym"
              className="font-display font-bold text-sm tracking-wider uppercase border border-hairline hover:border-ink px-8 py-5 rounded-full text-ink-dim hover:text-ink transition-all"
            >
              I Already Hate the Gym →
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 mt-16 pt-10 border-t border-hairline">
            {WASTE_STATS.map((stat, i) => (
              <div key={i} className="md:border-r md:border-hairline last:border-none pr-4">
                <div className="font-display font-black text-3xl md:text-4xl text-brand-lime tracking-tight leading-none">
                  {stat.value}
                </div>
                <div className="font-display text-[10px] md:text-xs font-bold text-ink-dim uppercase tracking-wider mt-3">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE GYM TRAP BENTO GRID */}
      <section className="border-b border-hairline px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-display text-xs font-bold text-brand-red tracking-widest uppercase">The Gym Trap</span>
            <div className="flex-1 h-[1px] bg-hairline" />
          </div>

          <h2 className="font-display font-black text-4xl md:text-7xl tracking-tighter leading-[0.95] mb-12 uppercase max-w-2xl">
            THE MATH DOESN'T LIE.<br />
            <span className="text-ink-dim">YOU DO.</span>
          </h2>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-12 gap-4">
            <div className="md:col-span-7 bg-surface border border-hairline rounded-3xl p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="font-display font-black text-6xl md:text-8xl text-brand-lime tracking-tight leading-none mb-1">
                  $44.50
                </div>
                <div className="font-display text-xs font-bold text-ink-dim uppercase tracking-widest mb-6">
                  per visit
                </div>
              </div>
              <p className="font-body text-base text-ink-dim leading-relaxed max-w-sm">
                You paid $89 last month. You went twice. That's $44.50 per visit. A taxi is cheaper. A therapist is more honest.
              </p>
            </div>

            <div className="md:col-span-5 bg-brand-lime rounded-3xl p-8 md:p-12 flex flex-col justify-between text-void">
              <div>
                <div className="font-display font-black text-4xl md:text-6xl tracking-tight leading-none mb-1">
                  3 weeks
                </div>
                <div className="font-display text-xs font-bold text-void/60 uppercase tracking-widest mb-6">
                  in your car
                </div>
              </div>
              <p className="font-body text-sm font-medium leading-relaxed">
                Your gym bag has been in your car for 3 weeks. It's basically a very expensive decoration.
              </p>
            </div>

            <div className="md:col-span-5 bg-brand-red rounded-3xl p-8 md:p-12 flex flex-col justify-between text-ink">
              <div>
                <div className="font-display font-black text-4xl md:text-6xl tracking-tight leading-none mb-1">
                  24/7
                </div>
                <div className="font-display text-xs font-bold text-ink/60 uppercase tracking-widest mb-6">
                  open. you are not.
                </div>
              </div>
              <p className="font-body text-sm leading-relaxed">
                The gym is open 24/7. You are not. The gym wins every single time.
              </p>
            </div>

            <div className="md:col-span-7 bg-surface border border-hairline rounded-3xl p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="font-display font-black text-6xl md:text-8xl text-ink tracking-tight leading-none mb-1">
                  January
                </div>
                <div className="font-display text-xs font-bold text-ink-dim uppercase tracking-widest mb-6">
                  you renewed
                </div>
              </div>
              <p className="font-body text-base text-ink-dim leading-relaxed max-w-sm">
                You renewed in January. It's March. Do the math. Actually, we did it for you: <span className="text-brand-red font-bold">$178 gone.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-b border-hairline px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-display text-xs font-bold text-brand-lime tracking-widest uppercase">Escapees</span>
            <div className="flex-1 h-[1px] bg-hairline" />
          </div>

          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tighter mb-12 uppercase">
            PEOPLE WHO GOT OUT.
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="border border-hairline p-8 bg-surface/50 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="font-display text-xs font-black text-brand-lime tracking-widest uppercase mb-6">
                    {t.saving}
                  </div>
                  <p className="font-body text-base text-ink/90 italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>
                <div className="font-display text-xs font-bold text-ink-dim">
                  — {t.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-display font-black text-5xl md:text-9xl tracking-tighter leading-[0.9] mb-8 uppercase">
            FIND OUT YOUR<br />
            <span className="text-brand-lime">GYM DONATION</span><br />
            INDEX.
          </h2>
          <p className="font-body text-lg md:text-xl text-ink-dim max-w-xl mx-auto mb-10 leading-relaxed">
            4 questions. 2 minutes. 1 brutal truth.
          </p>
          <Link
            href="/quiz"
            className="inline-block font-display font-black text-sm tracking-wider uppercase bg-brand-lime text-void px-10 py-6 rounded-full hover:bg-ink hover:text-void transition-all"
          >
            TAKE THE QUIZ →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-hairline px-6 py-8 bg-void">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="font-display font-black text-xl text-brand-lime tracking-tight">
            GymOrNot
          </Link>
          <span className="font-body text-xs text-ink-dim text-center">
            Brutally honest since 2024. Not affiliated with any gym. Thank god.
          </span>
          <div className="flex gap-4">
            <Link href="/quiz" className="font-body text-xs text-ink-dim hover:text-ink">
              Quiz
            </Link>
            <Link href="/dont-wanna-gym" className="font-body text-xs text-ink-dim hover:text-ink">
              Escape
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
