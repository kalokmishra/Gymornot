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
    gearIds: ["gear-002", "gear-009"],
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
    gearIds: ["gear-005", "gear-008"],
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
    gearIds: ["gear-001", "gear-010"],
    ctaLabel: "Unlock the LISS Blueprint"
  }
];

export default function AlternativeMatrix() {
  const [selectedId, setSelectedId] = useState<string>("no-time");

  const currentOption = MATRIX_OPTIONS.find((opt) => opt.id === selectedId) || MATRIX_OPTIONS[0];
  const recommendedGear = GEAR_ITEMS.filter((item) => currentOption.gearIds.includes(item.id));

  return (
    <div className="border border-zinc-800 bg-void rounded-none">
      {/* Section header */}
      <div className="border-b border-zinc-800 px-6 sm:px-8 py-5">
        <p className="font-mono text-[10px] text-brand-red uppercase tracking-widest mb-2">
          ALTERNATIVE PROTOCOL MATRIX
        </p>
        <h2 className="font-display font-black text-2xl uppercase text-ink">
          The Alternative Matrix
        </h2>
        <p className="mt-2 font-mono text-xs text-zinc-500">
          Select your absolute biggest barrier to entering a traditional gym.
        </p>
      </div>

      {/* Barrier Selectors */}
      <div className="border-b border-zinc-800 flex flex-col sm:flex-row">
        {MATRIX_OPTIONS.map((opt, i) => {
          const isSelected = selectedId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setSelectedId(opt.id)}
              className={`flex-1 text-left p-5 border-b sm:border-b-0 sm:border-r border-zinc-800 last:border-0 transition-all duration-150 rounded-none ${
                isSelected
                  ? "bg-brand-lime text-void"
                  : "bg-void text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50"
              }`}
            >
              <p className={`font-mono text-[9px] uppercase tracking-widest mb-2 ${isSelected ? "text-void/60" : "text-zinc-600"}`}>
                BARRIER {String(i + 1).padStart(2, "0")}
              </p>
              <p className={`font-mono text-sm leading-snug font-bold ${isSelected ? "text-void" : ""}`}>
                "{opt.barrier}"
              </p>
            </button>
          );
        })}
      </div>

      {/* Recommendation */}
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        {/* Blueprint */}
        <div className="border-b lg:border-b-0 lg:border-r border-zinc-800 px-6 sm:px-8 py-8">
          <div className="inline-block bg-brand-red px-2 py-1 font-mono text-[9px] text-ink uppercase tracking-widest mb-4">
            RECOMMENDED PROTOCOL
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-ink leading-tight mb-6">
            {currentOption.recommendation}
          </h3>
          <div className="space-y-0 border-t border-zinc-800">
            {currentOption.blueprint.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 py-4 border-b border-zinc-800">
                <span className="font-mono text-[10px] text-zinc-600 tracking-widest shrink-0 mt-0.5">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-sm text-zinc-400 leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gear */}
        <div className="px-6 sm:px-8 py-8 flex flex-col justify-between">
          <div>
            <p className="font-mono text-[10px] text-brand-lime uppercase tracking-widest mb-6">
              CURATED SETUP
            </p>
            <div className="space-y-0 border-t border-zinc-800">
              {recommendedGear.map((gear) => (
                <div key={gear.id} className="border-b border-zinc-800 py-4 flex gap-4 items-start">
                  <div className="flex-1">
                    <h4 className="font-mono text-xs font-bold uppercase text-ink">{gear.title}</h4>
                    <p className="mt-1 font-mono text-[10px] text-zinc-600 leading-relaxed line-clamp-2">{gear.description}</p>
                    <p className="mt-2 font-mono text-[10px] text-brand-lime">EST: ${gear.priceEst}</p>
                  </div>
                  <a
                    href={gear.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-brand-lime hover:text-ink underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 self-center"
                  >
                    View →
                  </a>
                </div>
              ))}
            </div>
          </div>
          <p className="font-mono text-[10px] text-zinc-700 mt-6 leading-relaxed">
            * 90% of home fitness gear is plastic trash. We only recommend these to cover 80% of movements.
          </p>
        </div>
      </div>
    </div>
  );
}
