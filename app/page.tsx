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
    saving: "$1,068/yr",
    fileNum: "001",
    date: "2024-03-12",
  },
  {
    name: "Priya, 28",
    quote: "My gym charged me for 3 months after I 'cancelled'. GymOrNot helped me write the letter. They stopped.",
    saving: "$267",
    fileNum: "002",
    date: "2024-05-08",
  },
  {
    name: "Derek, 41",
    quote: "I was paying $120/month for a gym I visited 4 times in a year. That's $30 per visit. For a treadmill.",
    saving: "$1,440/yr",
    fileNum: "003",
    date: "2024-07-22",
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
      <header className="border-b border-hairline bg-void sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-display font-black text-2xl text-brand-lime tracking-tight hover:opacity-80 transition-opacity">
            GymOrNot<span className="text-brand-red">.</span>
          </Link>
          <Link
            href="/quiz"
            className="font-mono text-xs text-zinc-400 hover:text-brand-lime transition-colors tracking-wider"
          >
            Take the Quiz →
          </Link>
        </div>
      </header>

      {/* TERMINAL COUNTER BAR */}
      <div className="border-b border-zinc-800 bg-void px-6 py-2">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse shrink-0" />
          <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
            SYS // {counter.toLocaleString()} MEMBERSHIPS CANCELLED THIS MONTH
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="border-b border-hairline px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">

          {/* Headline */}
          <h1 className="font-display font-black text-5xl md:text-8xl tracking-tighter leading-[0.9] text-ink uppercase max-w-4xl">
            YOU DON'T GO.<br />
            <span className="text-brand-lime">YOU KNOW IT.</span><br />
            WE KNOW IT.
          </h1>

          <p className="font-body text-lg md:text-xl text-ink-dim max-w-lg leading-relaxed mt-8 mb-10">
            The average gym member wastes <strong className="text-ink">$1,068/year</strong> on fitness guilt. Find out your exact number — and what to do about it.
          </p>

          {/* CTA Buttons — Clear hierarchy */}
          <div className="flex flex-col items-start gap-4">
            <Link
              href="/quiz"
              className="font-display font-black text-sm tracking-wider uppercase bg-brand-lime text-void px-8 py-4 rounded-none hover:bg-white hover:text-void transition-colors"
            >
              DIAGNOSE MY GYM HABIT →
            </Link>
            <Link
              href="/dont-wanna-gym"
              className="font-mono text-xs text-zinc-500 hover:text-ink underline-offset-4 hover:underline transition-colors"
            >
              i already hate the gym →
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 mt-16 pt-10 border-t border-hairline">
            {WASTE_STATS.map((stat, i) => (
              <div key={i} className="md:border-r md:border-hairline last:border-none pr-4">
                <div className="font-display font-black text-3xl md:text-4xl text-brand-lime tracking-tight leading-none">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mt-3">
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
            <span className="font-mono text-xs text-brand-red tracking-widest uppercase">The Gym Trap</span>
            <div className="flex-1 h-[1px] bg-hairline" />
          </div>

          <h2 className="font-display font-black text-4xl md:text-7xl tracking-tighter leading-[0.95] mb-12 max-w-2xl">
            THE MATH DOESN'T LIE.<br />
            <span className="text-ink-dim font-light">You do.</span>
          </h2>

          {/* Asymmetric Bento Grid */}
          <div className="grid md:grid-cols-12 gap-4">

            {/* Card 1 — Receipt card */}
            <div className="md:col-span-7 bg-zinc-900 border border-dashed border-zinc-600 rounded-none p-10 flex flex-col justify-between">
              {/* Receipt header */}
              <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase border-b border-dashed border-zinc-700 pb-3 mb-6">
                TRANSACTION RECEIPT // GYM MEMBERSHIP
              </div>
              <div>
                <div className="font-display font-black text-6xl md:text-8xl text-brand-lime tracking-tight leading-none mb-1">
                  $44.50
                </div>
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-6">
                  per visit
                </div>
              </div>
              <p className="font-body text-base text-ink-dim leading-relaxed max-w-sm">
                You paid $89 last month. You went twice. That's $44.50 per visit. A taxi is cheaper. A therapist is more honest.
              </p>
              {/* Receipt footer */}
              <div className="font-mono text-[10px] text-zinc-600 border-t border-dashed border-zinc-700 pt-3 mt-6 tracking-widest uppercase">
                - - - - - - - - - - - - - - - - - - - - -<br />
                TOTAL WASTED THIS MONTH: $89.00
              </div>
            </div>

            {/* Card 2 — 3 weeks (compact) */}
            <div className="md:col-span-5 bg-brand-lime rounded-none p-6 flex flex-col justify-between text-void">
              <div>
                <div className="font-display font-black text-4xl md:text-6xl tracking-tight leading-none mb-1">
                  3 weeks
                </div>
                <div className="font-mono text-xs text-void/60 uppercase tracking-widest mb-6">
                  in your car
                </div>
              </div>
              <p className="font-body text-sm font-medium leading-relaxed">
                Your gym bag has been in your car for 3 weeks. It's basically a very expensive decoration.
              </p>
            </div>

            {/* Card 3 — 24/7 (more padding) */}
            <div className="md:col-span-5 bg-brand-red rounded-none p-10 flex flex-col justify-between text-ink">
              <div>
                <div className="font-display font-black text-4xl md:text-6xl tracking-tight leading-none mb-1">
                  24/7
                </div>
                <div className="font-mono text-xs text-ink/60 uppercase tracking-widest mb-6">
                  open. you are not.
                </div>
              </div>
              <p className="font-body text-sm leading-relaxed">
                The gym is open 24/7. You are not. The gym wins every single time.
              </p>
            </div>

            {/* Card 4 — January (mid padding) */}
            <div className="md:col-span-7 bg-surface border border-hairline rounded-none p-8 flex flex-col justify-between">
              <div className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase mb-4">
                RENEWAL DATE: JAN 01
              </div>
              <div>
                <div className="font-display font-black text-6xl md:text-8xl text-ink tracking-tight leading-none mb-1">
                  January
                </div>
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-6">
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

      {/* TESTIMONIALS — Exit Interview Files */}
      <section className="border-b border-hairline px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs text-brand-lime tracking-widest uppercase">Escapees</span>
            <div className="flex-1 h-[1px] bg-hairline" />
          </div>

          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tighter mb-12">
            PEOPLE WHO GOT OUT.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="border border-zinc-800 bg-void rounded-none flex flex-col">
                {/* File header strip */}
                <div className="border-b border-zinc-800 px-6 py-4 space-y-1">
                  <div className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase">
                    EXIT INTERVIEW // FILE #{t.fileNum}
                  </div>
                  <div className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase">
                    DATE FILED: {t.date}
                  </div>
                  <div className="font-mono text-[10px] tracking-widest uppercase">
                    <span className="text-zinc-600">AMOUNT RECOVERED: </span>
                    <span className="text-brand-lime">{t.saving}</span>
                  </div>
                  <div className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase">
                    STATUS: <span className="bg-brand-lime text-void px-1">CANCELLED</span>
                  </div>
                </div>

                {/* Quote body */}
                <div className="px-6 py-6 flex-1">
                  <p className="font-mono text-sm text-zinc-300 leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                {/* Subject footer */}
                <div className="border-t border-zinc-800 px-6 py-4">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    SUBJECT: {t.name}
                  </span>
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
            className="inline-block font-display font-black text-sm tracking-wider uppercase bg-brand-lime text-void px-10 py-6 rounded-none hover:bg-white hover:text-void transition-colors"
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
          <span className="font-mono text-xs text-zinc-600 text-center">
            Brutally honest since 2024. Not affiliated with any gym. Thank god.
          </span>
          <div className="flex gap-6">
            <Link href="/quiz" className="font-mono text-xs text-zinc-500 hover:text-ink transition-colors">
              Quiz
            </Link>
            <Link href="/dont-wanna-gym" className="font-mono text-xs text-zinc-500 hover:text-ink transition-colors">
              Escape
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
