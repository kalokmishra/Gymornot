"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  GEAR_ITEMS,
  type EnergyLevel,
  type SpaceType,
} from "@/data/staticData";

const SPACE_LABELS: Record<SpaceType | "all", string> = {
  all: "Any footprint",
  "tiny-apartment": "Tiny apartment",
  bedroom: "Bedroom corner",
  house: "House / garage",
};

const ENERGY_LABELS: Record<EnergyLevel | "all", string> = {
  all: "Any motivation level",
  "barely-alive": "Barely alive",
  moderate: "Moderate",
  unhinged: "Unhinged (rare)",
};

export default function DontWannaGymPage() {
  const [spaceFilter, setSpaceFilter] = useState<SpaceType | "all">("all");
  const [energyFilter, setEnergyFilter] = useState<EnergyLevel | "all">("all");

  const filteredGear = useMemo(() => {
    return GEAR_ITEMS.filter((item) => {
      const spaceMatch = spaceFilter === "all" || item.spaceType === spaceFilter;
      const energyMatch =
        energyFilter === "all" || item.energyLevel === energyFilter;
      return spaceMatch && energyMatch;
    });
  }, [spaceFilter, energyFilter]);

  return (
    <main className="min-h-screen w-full bg-void px-6 py-10 md:px-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-display text-sm font-bold text-ink">
            GymOrNot<span className="text-anti-purple">.</span>com
          </Link>
          <Link
            href="/gym-trap"
            className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim hover:text-anti-purple"
          >
            See the gym trap instead →
          </Link>
        </div>

        <p className="mt-10 font-mono text-xs uppercase tracking-[0.25em] text-anti-purple">
          Route B — The Sanctuary
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
          Equipment sized to the life
          <br />
          you're <span className="text-anti-purple">actually</span> living.
        </h1>
        <p className="mt-4 max-w-xl font-body text-ink-dim">
          Filter by how much floor you have and how much of yourself you're
          willing to give it. Everything here fits in a closet, a corner, or
          under a bed.
        </p>

        {/* Filters */}
        <div className="mt-10 flex flex-col gap-4 border border-hairline bg-surface p-5 sm:flex-row sm:items-center">
          <div className="flex flex-1 flex-col gap-2">
            <label
              htmlFor="space-filter"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim"
            >
              Available footprint
            </label>
            <select
              id="space-filter"
              value={spaceFilter}
              onChange={(e) =>
                setSpaceFilter(e.target.value as SpaceType | "all")
              }
              className="border border-hairline bg-void px-4 py-2.5 font-body text-ink focus:border-anti-purple"
            >
              {(Object.keys(SPACE_LABELS) as (SpaceType | "all")[]).map(
                (key) => (
                  <option key={key} value={key}>
                    {SPACE_LABELS[key]}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label
              htmlFor="energy-filter"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim"
            >
              Intrinsic motivation index
            </label>
            <select
              id="energy-filter"
              value={energyFilter}
              onChange={(e) =>
                setEnergyFilter(e.target.value as EnergyLevel | "all")
              }
              className="border border-hairline bg-void px-4 py-2.5 font-body text-ink focus:border-anti-purple"
            >
              {(Object.keys(ENERGY_LABELS) as (EnergyLevel | "all")[]).map(
                (key) => (
                  <option key={key} value={key}>
                    {ENERGY_LABELS[key]}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex flex-col justify-end gap-2 pt-2 sm:pt-0">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
              Results
            </span>
            <span className="font-display text-2xl font-bold text-anti-purple">
              {filteredGear.length}
            </span>
          </div>
        </div>

        {/* Grid */}
        {filteredGear.length === 0 ? (
          <div className="mt-16 border border-dashed border-hairline p-10 text-center">
            <p className="font-mono text-sm text-ink-dim">
              Nothing matches that combination. Widen the footprint or lower
              the motivation index — no judgment, that's the whole point of
              this page.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGear.map((item) => (
              <div
                key={item.id}
                className="flex flex-col border border-hairline bg-surface p-6 transition-colors hover:border-anti-purple/60"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-anti-purple">
                    {item.category}
                  </span>
                  <span className="border border-gym-green/40 bg-gym-green/10 px-2 py-0.5 font-mono text-[11px] text-gym-green">
                    ${item.priceEst}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 font-body text-sm text-ink-dim">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="border border-hairline px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-dim">
                    {SPACE_LABELS[item.spaceType]}
                  </span>
                  <span className="border border-hairline px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-dim">
                    {ENERGY_LABELS[item.energyLevel]}
                  </span>
                </div>
                <a
                  href={item.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-5 inline-flex items-center justify-center border border-anti-purple bg-anti-purple/10 px-4 py-2.5 font-mono text-sm text-anti-purple transition-colors hover:bg-anti-purple hover:text-void"
                >
                  Get this instead →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
