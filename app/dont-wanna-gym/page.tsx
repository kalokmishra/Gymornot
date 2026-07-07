"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ResignationGenerator from "./components/ResignationGenerator";
import AlternativeMatrix from "./components/AlternativeMatrix";
import CalendarSignup from "./components/CalendarSignup";

export default function AntiGymPage() {
  const [hasVerdict, setHasVerdict] = useState(false);

  useEffect(() => {
    const email = window.localStorage.getItem("gymornot_email");
    const score = window.localStorage.getItem("gymornot_gymScore");
    if (email && score) {
      setHasVerdict(true);
    }
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
              className="font-display font-bold text-xs tracking-wider uppercase bg-brand-lime text-void border border-brand-lime px-4 py-2 rounded-full transition-all"
            >
              Escape
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12 space-y-12">
        {/* Intro Hero banner */}
        <section className="border border-hairline bg-surface p-8 sm:p-12 rounded-3xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-6">
            <span className="font-display text-xs font-bold text-brand-lime tracking-widest uppercase bg-brand-lime/10 px-3 py-1 rounded-full">
              The Escape Hatch
            </span>
            <h1 className="font-display font-black text-4xl sm:text-7xl uppercase tracking-tighter leading-none text-ink">
              Break the cycle. Reclaim your cash.
            </h1>
            <p className="text-base text-ink-dim leading-relaxed">
              We provide tools for the disillusioned gym subscriber. Below you'll find our resignation generator, alternative movement matrix, and a free printable tracker designed to support low-stress fitness habits that actually work.
            </p>
            {hasVerdict && (
              <div>
                <Link
                  href="/dashboard"
                  className="inline-block font-display font-black text-xs uppercase bg-brand-lime text-void px-6 py-3 rounded-full hover:bg-ink hover:text-void transition-all"
                >
                  ← Back to Dashboard
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Alternatives Matrix */}
        <AlternativeMatrix />

        {/* Resignation Generator */}
        <ResignationGenerator />

        {/* Printable Tracker Signup */}
        <CalendarSignup />
      </div>
    </main>
  );
}
