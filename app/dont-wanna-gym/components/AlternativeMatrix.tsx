"use client";

import React, { useState } from "react";
import { GEAR_ITEMS } from "../../../staticData";

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
    barrier: "Gyms give me anxiety.",
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
    barrier: "I hate sweating and crowds.",
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
    <div className="border border-hairline bg-surface p-6 sm:p-8 rounded-3xl">
      <h2 className="font-display font-black text-2xl uppercase text-ink">
        The Alternative Matrix
      </h2>
      <p className="mt-2 text-sm font-bold text-ink-dim border-b border-hairline pb-4 uppercase">
        Select your absolute biggest barrier to entering a traditional gym, and let's find your zero-friction solution.
      </p>

      {/* Barrier Selectors */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {MATRIX_OPTIONS.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setSelectedId(opt.id)}
              className={`w-full text-left border p-4 transition-all rounded-2xl ${
                isSelected
                  ? "border-brand-lime bg-brand-lime text-void"
                  : "border-hairline bg-surface-raised text-ink hover:border-ink-dim"
              }`}
            >
              <p className={`text-[10px] uppercase font-bold border inline-block px-1 mb-2 rounded-md ${isSelected ? 'border-void/20 bg-void text-brand-lime' : 'border-hairline bg-void text-ink-dim'}`}>Barrier</p>
              <p className="font-bold text-sm sm:text-base leading-snug">"{opt.barrier}"</p>
            </button>
          );
        })}
      </div>

      {/* Recommendation Display */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] border-t border-hairline pt-6">
        <div>
          <div className="inline-flex items-center bg-brand-red px-2 py-1 text-[10px] font-bold text-ink uppercase tracking-wider rounded-md">
            Recommended
          </div>
          <h3 className="mt-3 text-2xl sm:text-3xl font-display font-black uppercase text-ink leading-tight">{currentOption.recommendation}</h3>
          
          <ul className="mt-6 space-y-4">
            {currentOption.blueprint.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-surface-raised border border-hairline text-ink-dim text-xs font-bold rounded-full">
                  {idx + 1}
                </span>
                <span className="text-sm font-bold leading-relaxed text-ink-dim uppercase">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Curation Display */}
        <div className="border border-hairline bg-surface-raised p-6 flex flex-col justify-between rounded-2xl">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-lime mb-4">
              Curated Setup
            </p>
            <div className="space-y-4">
              {recommendedGear.map((gear) => (
                <div key={gear.id} className="border border-hairline bg-surface p-4 flex gap-4 items-center rounded-xl">
                  <div className="flex-1">
                    <h4 className="text-sm font-display font-black uppercase text-ink">{gear.title}</h4>
                    <p className="mt-1 text-xs text-ink-dim line-clamp-2">{gear.description}</p>
                    <p className="mt-2 text-[10px] font-bold bg-brand-lime text-void inline-block px-1 border border-brand-lime uppercase rounded-md">Est: ${gear.priceEst}</p>
                  </div>
                  <a
                    href={gear.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-brand-lime hover:bg-brand-lime/5 px-3 py-2 text-xs font-display font-black uppercase text-brand-lime whitespace-nowrap self-center rounded-full transition-all"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-hairline border-dashed pt-4 text-center">
            <p className="text-xs font-bold text-ink-dim italic">
              90% of home fitness gear is plastic trash. We only recommend these items to cover 80% of movements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
