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
    <div className="bg-black border-4 border-white shadow-[8px_8px_0px_#fff] p-6 sm:p-8 font-mono">
      <h2 className="text-2xl font-black uppercase text-white">
        The Alternative Matrix
      </h2>
      <p className="mt-2 text-sm font-bold text-gray-300 border-b-4 border-white pb-4">
        Select your absolute biggest barrier to entering a traditional gym, and let's find your zero-friction solution.
      </p>

      {/* Barrier Selectors */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {MATRIX_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelectedId(opt.id)}
            className={`w-full text-left border-4 p-4 transition-transform active:translate-y-1 active:translate-x-1 hover:-translate-y-1 hover:-translate-x-1 ${
              selectedId === opt.id
                ? "border-white bg-gym-green text-black shadow-[4px_4px_0px_#fff] hover:shadow-[6px_6px_0px_#fff]"
                : "border-white bg-[#222] text-white shadow-[4px_4px_0px_#fff] hover:shadow-[6px_6px_0px_#fff]"
            }`}
          >
            <p className={`text-xs uppercase font-bold border-2 border-white inline-block px-1 ${selectedId === opt.id ? 'bg-black text-white' : 'bg-white text-black'}`}>Barrier</p>
            <p className="mt-2 font-bold text-sm sm:text-base">"{opt.barrier}"</p>
          </button>
        ))}
      </div>

      {/* Recommendation Display */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] border-t-4 border-white pt-6">
        <div>
          <div className="inline-flex items-center bg-yellow-400 border-2 border-white px-2 py-1 text-xs font-bold text-black uppercase">
            Recommended
          </div>
          <h3 className="mt-3 text-2xl font-black uppercase text-white">{currentOption.recommendation}</h3>
          
          <ul className="mt-5 space-y-4">
            {currentOption.blueprint.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-white text-black text-xs font-bold border-2 border-white rounded-full">
                  {idx + 1}
                </span>
                <span className="text-sm font-bold leading-6 text-gray-300">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Curation Display */}
        <div className="border-4 border-white bg-[#111] p-6 flex flex-col justify-between shadow-[4px_4px_0px_#fff]">
          <div>
            <p className="text-xs font-black uppercase bg-white text-black inline-block px-2 py-1 mb-4">
              Curated Setup
            </p>
            <div className="space-y-4">
              {recommendedGear.map((gear) => (
                <div key={gear.id} className="border-4 border-white bg-[#222] p-4 flex gap-4 items-center shadow-[4px_4px_0px_#fff]">
                  <div className="flex-1">
                    <h4 className="text-sm font-black uppercase text-white">{gear.title}</h4>
                    <p className="mt-1 text-xs font-medium text-gray-300 line-clamp-2">{gear.description}</p>
                    <p className="mt-2 text-xs font-bold bg-green-400 text-black inline-block px-1 border-2 border-white">Est: ${gear.priceEst}</p>
                  </div>
                  <a
                    href={gear.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-anti-purple-glow border-4 border-white px-3 py-2 text-xs font-bold uppercase text-black whitespace-nowrap self-center hover:bg-anti-purple active:translate-y-1 active:translate-x-1 transition-transform"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t-4 border-white border-dashed pt-4 text-center">
            <p className="text-xs font-bold text-gray-400 italic">
              90% of home fitness gear is plastic trash. We only recommend these items to cover 80% of movements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
