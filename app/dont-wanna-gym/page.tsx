"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ResignationGenerator from "./components/ResignationGenerator";
import AlternativeMatrix from "./components/AlternativeMatrix";
import CalendarSignup from "./components/CalendarSignup";
import Header from "../../components/Header";

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
      <Header
        contextLink={hasVerdict ? "/dashboard" : "/quiz"}
        contextLabel={hasVerdict ? "← Back to Audit" : "Take the Quiz →"}
      />

      <div className="mx-auto max-w-6xl px-6 py-12 space-y-12">
        {/* INTRO HERO */}
        <section className="border-2 border-zinc-800 bg-zinc-950 p-8 sm:p-12 relative overflow-hidden rounded-none">
          {/* Corner decoration */}
          <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-zinc-700 bg-void text-brand-red flex items-center justify-center font-display font-black text-2xl pointer-events-none">
            !
          </div>

          <div className="max-w-2xl relative z-10 space-y-6">
            <p className="font-mono text-[10px] text-brand-red uppercase tracking-widest">
              // TERMINATION PROTOCOL //
            </p>
            <h1 className="font-display font-black text-4xl sm:text-7xl tracking-tighter leading-none text-ink">
              Break the cycle.<br />
              <span className="text-brand-lime">Reclaim your cash.</span>
            </h1>
            <p className="font-mono text-sm text-zinc-500 leading-relaxed max-w-xl">
              Tools for the disillusioned gym subscriber. Resignation generator, alternative movement matrix, and a free printable tracker designed to support low-stress fitness habits.
            </p>
            {hasVerdict && (
              <Link
                href="/dashboard"
                className="inline-block font-display font-black text-xs uppercase bg-brand-lime text-void px-6 py-3 rounded-none hover:bg-white transition-colors"
              >
                ← Back to Dashboard
              </Link>
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
