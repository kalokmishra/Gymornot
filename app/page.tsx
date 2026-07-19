"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import BottomNavbar from "../components/BottomNavbar";

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
    <main className="min-h-screen bg-void text-ink font-body selection:bg-volt selection:text-void">

      {/* HEADER */}
      <Header contextLink="/quiz" contextLabel="Take the Audit →" />

      {/* Spacer for fixed header */}
      <div className="h-[57px]" />

      {/* LIVE TICKER BAR */}
      <div
        className="border-b px-6 py-2"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(18,21,8,0.6)" }}
      >
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-solar-red animate-pulse shrink-0" />
          <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
            SYS // {counter.toLocaleString()} MEMBERSHIPS CANCELLED THIS MONTH
          </span>
        </div>
      </div>

      {/* ─── HERO SECTION ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b px-6 pt-16 pb-0 md:pt-24" style={{ borderColor: "rgba(255,255,255,0.06)" }}>

        {/* Kinetic background skew slab */}
        <div
          className="absolute -left-12 -right-12 bottom-0 h-[55%] pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,77,0,0.07) 0%, rgba(208,255,0,0.04) 100%)",
            transform: "skewY(-6deg)",
            transformOrigin: "bottom left",
          }}
        />

        <div className="max-w-6xl mx-auto relative">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] text-solar-red tracking-widest uppercase">
              Kinetic Audit System v2.0
            </span>
            <div className="w-8 h-[1px] bg-solar-red opacity-60" />
          </div>

          {/* Headline — massive condensed type */}
          <h1
            className="font-display font-black uppercase leading-[0.88] tracking-tight text-ink max-w-5xl"
            style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)" }}
          >
            YOU DON&apos;T GO.
            <br />
            <span style={{ color: "var(--volt)", fontStyle: "italic" }}>YOU KNOW IT.</span>
            <br />
            WE KNOW IT.
          </h1>

          <p className="font-body text-base md:text-lg text-ink-dim max-w-lg leading-relaxed mt-8 mb-10">
            The average gym member wastes{" "}
            <strong className="text-ink">$1,068/year</strong> on fitness guilt. Find out your
            exact number — and what to do about it.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-3 mb-16">
            <Link
              href="/quiz"
              className="font-display font-black text-sm tracking-wider uppercase bg-volt text-void px-8 py-4 rounded-none hover:bg-white active:scale-95 transition-all duration-150 soft-depth"
            >
              DIAGNOSE MY GYM HABIT →
            </Link>
            <Link
              href="/dont-wanna-gym"
              className="font-mono text-xs text-zinc-500 hover:text-volt underline-offset-4 hover:underline transition-colors self-center mt-1 sm:mt-0 sm:ml-4 uppercase tracking-widest"
            >
              i already hate the gym →
            </Link>
          </div>

          {/* Stats Row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 border-t pt-10 pb-16"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            {WASTE_STATS.map((stat, i) => (
              <div
                key={i}
                className="pr-4 pb-6 md:pb-0"
                style={{
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  paddingLeft: i > 0 ? "1rem" : "0",
                }}
              >
                <div
                  className="font-display font-black tracking-tight leading-none mb-2"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--volt)" }}
                >
                  {stat.value}
                </div>
                <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE GYM TRAP BENTO GRID ───────────────────────────────────────────── */}
      <section className="border-b px-6 py-16 md:py-24" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[10px] text-solar-red tracking-widest uppercase">Industry Data</span>
            <div className="flex-1 h-[1px]" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span className="font-mono text-[9px] text-zinc-700 uppercase tracking-widest">Source: IHRSA / Statista / RunRepeat</span>
          </div>

          <h2
            className="font-display font-black uppercase tracking-tight leading-[0.92] mb-12 max-w-2xl"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
          >
            THE INDUSTRY MATH.
            <br />
            <span className="text-ink-dim" style={{ fontWeight: 400 }}>It&apos;s worse than you think.</span>
          </h2>

          {/* Asymmetric Bento Grid */}
          <div className="grid md:grid-cols-12 gap-[2px] bg-zinc-900">

            {/* Card 1 — Receipt — dark */}
            <div
              className="md:col-span-7 p-10 flex flex-col justify-between"
              style={{ background: "#0a0a0a", border: "1px dashed rgba(255,255,255,0.1)" }}
            >
              <div className="font-mono text-[9px] text-zinc-600 tracking-widest uppercase border-b border-dashed border-zinc-800 pb-3 mb-6">
                SAMPLE RECEIPT // AVG. MEMBER // NOT YOUR ACCOUNT
              </div>
              <div>
                <div
                  className="font-display font-black tracking-tight leading-none mb-2"
                  style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "var(--volt)" }}
                >
                  $44.50
                </div>
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-6">
                  avg. cost per actual visit
                </div>
              </div>
              <p className="font-body text-sm text-ink-dim leading-relaxed max-w-sm">
                The average member pays $89/month and visits 2 times. That&apos;s $44.50 per visit.
                A taxi is cheaper. A therapist is more honest.
              </p>
              <div className="font-mono text-[9px] text-zinc-700 border-t border-dashed border-zinc-800 pt-3 mt-6 tracking-widest uppercase">
                - - - - - - - - - - - - - - - - - - - - -<br />
                AVG. MONTHLY SPEND WITH 2 VISITS: $89.00
              </div>
            </div>

            {/* Card 2 — Volt */}
            <div
              className="md:col-span-5 p-8 flex flex-col justify-between"
              style={{ background: "var(--volt)", color: "#000" }}
            >
              <div>
                <div
                  className="font-display font-black italic tracking-tight leading-none mb-2"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
                >
                  3 weeks
                </div>
                <div className="font-mono text-[10px] text-black/50 uppercase tracking-widest mb-6">
                  avg. bag sits unused
                </div>
              </div>
              <p className="font-body text-sm font-semibold leading-relaxed text-black/80">
                The average gym bag sits untouched in a car or hallway for weeks between visits. A very expensive decoration.
              </p>
            </div>

            {/* Card 3 — Solar Red */}
            <div
              className="md:col-span-5 p-10 flex flex-col justify-between"
              style={{ background: "var(--solar-red)", color: "var(--ink)" }}
            >
              <div>
                <div
                  className="font-display font-black italic tracking-tight leading-none mb-2"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
                >
                  24/7
                </div>
                <div className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-6">
                  open. members are not.
                </div>
              </div>
              <p className="font-body text-sm leading-relaxed text-white/80">
                The gym is open 24/7. 67% of members don&apos;t visit in any given week. The gym wins every single time.
              </p>
            </div>

            {/* Card 4 — Surface */}
            <div
              className="md:col-span-7 p-8 flex flex-col justify-between"
              style={{ background: "#0d0f08", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="font-mono text-[9px] text-zinc-600 tracking-widest uppercase mb-4">
                PEAK SIGN-UP MONTH // INDUSTRY DATA
              </div>
              <div>
                <div
                  className="font-display font-black tracking-tight leading-none mb-2"
                  style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "var(--ink)" }}
                >
                  January
                </div>
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-6">
                  dropout season begins
                </div>
              </div>
              <p className="font-body text-sm text-ink-dim leading-relaxed max-w-sm">
                80% of January sign-ups stop going by week 6. That&apos;s 2 months of fees for nothing —{" "}
                <span className="text-solar-red font-bold">$178 gone</span> before February ends.
              </p>
            </div>
          </div>

          {/* CTA below bento */}
          <div
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t pt-8"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <p className="font-mono text-[10px] text-zinc-500 max-w-sm">
              These are industry averages. Your actual number depends on your habits — take the 4-question diagnostic to find out.
            </p>
            <Link
              href="/quiz"
              className="font-display font-black text-xs uppercase bg-volt text-void px-6 py-3 rounded-none hover:bg-white active:scale-95 transition-all duration-150 whitespace-nowrap shrink-0 soft-depth"
            >
              FIND OUT MY NUMBER →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS — Exit Interview Files (Dossier Style) ───────────────── */}
      <section className="border-b px-6 py-16 md:py-24" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto">

          {/* Header row */}
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-[10px] text-volt tracking-widest uppercase">Escapees</span>
            <div className="flex-1 h-[1px]" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span className="badge-solar">CONFIDENTIAL</span>
          </div>

          <h2
            className="font-display font-black uppercase tracking-tight mb-12"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            PEOPLE WHO GOT OUT.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-zinc-900">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="flex flex-col group transition-all duration-200 hover:z-10"
                style={{ background: "#000", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Dossier header strip */}
                <div
                  className="px-6 py-4 space-y-1 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="font-mono text-[9px] text-zinc-600 tracking-widest uppercase">
                    EXIT INTERVIEW // FILE #{t.fileNum}
                  </div>
                  <div className="font-mono text-[9px] text-zinc-600 tracking-widest uppercase">
                    DATE FILED: {t.date}
                  </div>
                  <div className="font-mono text-[9px] tracking-widest uppercase">
                    <span className="text-zinc-600">AMOUNT RECOVERED: </span>
                    <span style={{ color: "var(--volt)" }}>{t.saving}</span>
                  </div>
                  <div className="font-mono text-[9px] text-zinc-600 tracking-widest uppercase flex items-center gap-2">
                    STATUS: <span className="badge-cancelled">CANCELLED</span>
                  </div>
                </div>

                {/* Volt accent bar on hover */}
                <div
                  className="h-[2px] w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: "var(--volt)" }}
                />

                {/* Quote body */}
                <div className="px-6 py-6 flex-1">
                  <p className="font-mono text-sm text-zinc-400 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Subject footer */}
                <div
                  className="border-t px-6 py-4"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                    SUBJECT: {t.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section className="px-6 py-24 md:py-36 relative overflow-hidden">

        {/* Kinetic skew background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,77,0,0.05) 0%, rgba(208,255,0,0.03) 100%)",
          }}
        />

        <div className="max-w-6xl mx-auto text-center relative">
          <div className="font-mono text-[10px] text-solar-red tracking-widest uppercase mb-6">
            // FINAL PROTOCOL //
          </div>
          <h2
            className="font-display font-black uppercase tracking-tight leading-[0.88] mb-8"
            style={{ fontSize: "clamp(3rem, 12vw, 8rem)", color: "var(--ink)" }}
          >
            FIND OUT YOUR
            <br />
            <span style={{ color: "var(--volt)", fontStyle: "italic" }}>GYM DONATION</span>
            <br />
            INDEX.
          </h2>
          <p className="font-body text-base md:text-lg text-ink-dim max-w-lg mx-auto mb-10 leading-relaxed">
            4 questions. 2 minutes. 1 brutal truth.
          </p>
          <Link
            href="/quiz"
            className="inline-block font-display font-black text-sm tracking-wider uppercase bg-volt text-void px-12 py-5 rounded-none hover:bg-white active:scale-95 transition-all duration-150 soft-depth"
          >
            TAKE THE AUDIT →
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer
        className="border-t px-6 py-8"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "#050500" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Link
            href="/"
            className="font-display font-black italic text-xl tracking-tight"
            style={{ color: "var(--volt)" }}
          >
            GYMORNOT
          </Link>
          <span className="font-mono text-[10px] text-zinc-700 text-center uppercase tracking-widest">
            Brutally honest since 2024. Not affiliated with any gym. Thank god.
          </span>
          <div className="flex gap-6">
            <Link href="/quiz" className="font-mono text-[10px] text-zinc-600 hover:text-volt transition-colors uppercase tracking-widest">
              Audit
            </Link>
            <Link href="/dont-wanna-gym" className="font-mono text-[10px] text-zinc-600 hover:text-volt transition-colors uppercase tracking-widest">
              Escape
            </Link>
          </div>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAV spacer */}
      <div className="h-[60px] md:hidden" />
      <BottomNavbar />

    </main>
  );
}
