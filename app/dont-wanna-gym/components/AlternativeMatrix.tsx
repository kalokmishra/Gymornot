"use client";

import React, { useState } from "react";
import { GEAR_ITEMS, GearItem } from "../../../staticData";

interface AlternativeOption {
  id: string;
  barrier: string;
  recommendation: string;
  blueprint: string[];
  gearIds: string[];
  ctaLabel: string;
}

const MATRIX_OPTIONS: AlternativeOption[] = [
  {
    id: "no-time",
    barrier: "I have zero time.",
    recommendation: "Micro-Dosing Fitness",
    blueprint: [
      "Set a timer for 4 minutes next to the coffee maker while it brews.",
      "Perform a 4-minute Tabata round (20s squat/pushups, 10s rest).",
      "Do this twice a day. Total commitment: 8 minutes. Zero schedule overhead."
    ],
    gearIds: ["gear-002", "gear-009"], // Resistance Band, Kettlebell
    ctaLabel: "Get the Micro-Dose Toolkit"
  },
  {
    id: "gym-anxiety",
    barrier: "Gyms give me massive anxiety.",
    recommendation: "The Dark Room Routine",
    blueprint: [
      "Dim the lights in your bedroom or living room to eliminate self-consciousness.",
      "Put on a cozy, low-stress playlist or mobility walkthrough.",
      "Focus purely on bodyweight calisthenics, stretching, and mobility on a premium mat."
    ],
    gearIds: ["gear-005", "gear-008"], // Yoga Mat, Suspension Trainer
    ctaLabel: "Unlock the Anxiety-Free Routine"
  },
  {
    id: "hate-sweating",
    barrier: "I hate sweating and gasping for air.",
    recommendation: "Zone 2 NEAT Maxing",
    blueprint: [
      "Focus on low-intensity steady-state (LISS) movement.",
      "Walk slowly on a walking pad during work calls, gaming, or podcast listening.",
      "No sweat, no change of clothes needed. Maximize Non-Exercise Activity Thermogenesis (NEAT)."
    ],
    gearIds: ["gear-001", "gear-010"], // Walking Pad, Mini Stepper
    ctaLabel: "Unlock the LISS Blueprint"
  }
];

export default function AlternativeMatrix() {
  const [selectedId, setSelectedId] = useState<string>("no-time");

  const currentOption = MATRIX_OPTIONS.find((opt) => opt.id === selectedId) || MATRIX_OPTIONS[0];
  const recommendedGear = GEAR_ITEMS.filter((item) => currentOption.gearIds.includes(item.id));

  return (
    <div className="panel-card rounded-[2rem] p-6 sm:p-8 border border-white/10 bg-[#0f1726]/60 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.5)]">
      <h2 className="text-2xl font-bold tracking-tight text-ink">
        The Anti-Gym Alternative Matrix
      </h2>
      <p className="mt-2 text-sm text-ink-dim">
        Select your absolute biggest barrier to entering a traditional gym, and let's find your zero-friction solution.
      </p>

      {/* Barrier Selectors */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {MATRIX_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelectedId(opt.id)}
            className={`w-full text-left rounded-2xl border p-4 transition-all duration-300 ${
              selectedId === opt.id
                ? "border-gym-green bg-gym-green/10 text-ink shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                : "border-white/5 bg-white/5 text-ink-dim hover:border-white/20 hover:bg-white/10"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.2em] font-semibold opacity-70">The Barrier</p>
            <p className="mt-2 font-medium text-sm sm:text-base">"{opt.barrier}"</p>
          </button>
        ))}
      </div>

      {/* Recommendation Display */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] border-t border-white/5 pt-6">
        <div>
          <div className="inline-flex items-center rounded-full bg-gym-green/10 border border-gym-green/20 px-3 py-1 text-xs font-semibold text-gym-green uppercase tracking-wider">
            Alternative Recommended
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-ink">{currentOption.recommendation}</h3>
          
          <ul className="mt-5 space-y-4">
            {currentOption.blueprint.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gym-green">
                  {idx + 1}
                </span>
                <span className="text-sm leading-6 text-ink-dim">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Curation Display */}
        <div className="rounded-2xl border border-white/5 bg-[#111827]/50 p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-ink-dim">
              Curated Setup (Buy Only What You Need)
            </p>
            <div className="mt-4 space-y-4">
              {recommendedGear.map((gear) => (
                <div key={gear.id} className="rounded-xl border border-white/5 bg-white/5 p-4 flex gap-4 items-center">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-ink">{gear.title}</h4>
                    <p className="mt-1 text-xs text-ink-dim line-clamp-2">{gear.description}</p>
                    <p className="mt-2 text-xs font-semibold text-gym-green">Est: ${gear.priceEst}</p>
                  </div>
                  <a
                    href={gear.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-secondary text-xs px-3 py-2 whitespace-nowrap self-center"
                  >
                    View Gear
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-white/5 pt-4 text-center">
            <p className="text-[0.7rem] text-ink-dim/60 italic">
              90% of home fitness gear is plastic trash. We only recommend these items to cover 80% of movements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
