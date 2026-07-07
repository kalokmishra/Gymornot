"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { computeArchetype } from "../../lib/quiz";

export default function GivingFreeMoneyPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [gymScore, setGymScore] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [boutiqueScore, setBoutiqueScore] = useState(0);
  const [couchScore, setCouchScore] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const storedEmail = window.localStorage.getItem("gymornot_email");
    const storedGym = window.localStorage.getItem("gymornot_gymScore");
    const storedHome = window.localStorage.getItem("gymornot_homeScore");
    const storedBoutique = window.localStorage.getItem("gymornot_boutiqueScore");
    const storedCouch = window.localStorage.getItem("gymornot_couchScore");

    setEmail(storedEmail);
    setGymScore(storedGym ? Number(storedGym) : 0);
    setHomeScore(storedHome ? Number(storedHome) : 0);
    setBoutiqueScore(storedBoutique ? Number(storedBoutique) : 0);
    setCouchScore(storedCouch ? Number(storedCouch) : 0);
  }, []);

  const totalScore = gymScore + homeScore + boutiqueScore + couchScore || 1;
  const hasVerdict = hydrated && totalScore > 1;

  const archetype = useMemo(() => {
    if (!hasVerdict) return null;
    return computeArchetype(gymScore, homeScore, boutiqueScore, couchScore);
  }, [hasVerdict, gymScore, homeScore, boutiqueScore, couchScore]);

  // Generate personalized audit roasts
  const auditRoast = useMemo(() => {
    if (!archetype) {
      return "You are the anonymous benefactor of commercial fitness. Your monthly membership charge is paid directly to landlords, marketing budgets, and executives. You get nothing in return but a monthly email receipt and a quiet sense of guilt.";
    }

    switch (archetype.id) {
      case "january-idealist":
        return "You are the cornerstone of commercial fitness economics. You pay $20-$100 every single month to buy the temporary illusion of self-improvement. Gyms literally build their entire business model assuming you will never show up and wear out the equipment. You are their most profitable sponsor.";
      case "closet-athlete":
        return "You pay for commercial gym memberships out of sheer guilt while doing pushups next to your bed. You are paying for eucalyptus towels you'll never touch and showers you'll never stand in. You are literally subsidizing the social gym-goers you are trying to avoid.";
      case "smoothie-socialite":
        return "You are subsidizing a juice bar and a premium locker room. You pay peak rates to attend one class a month and spend $16 on a post-workout recovery shake. Your membership fees are essentially a brand sponsorship.";
      case "gym-crusader":
        return "Even you, the dedicated lifter, are paying a premium to stand in line for the squat rack while commercial chains use your membership fee to build 10 new branches. You are funding your own competition.";
      default:
        return "You are the anonymous benefactor of commercial fitness. Your monthly fee is paid directly to landlords and marketing budgets.";
    }
  }, [archetype]);

  return (
    <main
      className="min-h-screen bg-void text-ink font-body selection:bg-brand-lime selection:text-void"
      style={{
        backgroundImage:
          "linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)",
        backgroundSize: "4rem 4rem",
      }}
    >
      {/* HEADER */}
      <header className="border-b border-hairline bg-void sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-display font-black text-2xl text-brand-lime tracking-tight hover:opacity-80 transition-opacity">
            GymOrNot<span className="text-brand-red">.</span>
          </Link>
          <Link href="/quiz" className="font-mono text-xs text-zinc-400 hover:text-brand-lime transition-colors tracking-wider">
            Retake Quiz →
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="border-2 border-zinc-800 bg-void rounded-none p-6 sm:p-10 space-y-8">
          
          {/* Certificate Header */}
          <div className="border-b border-zinc-800 pb-5">
            <p className="font-mono text-[10px] text-brand-red uppercase tracking-widest mb-2">
              // SPONSORSHIP STATUS //
            </p>
            <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter leading-none text-ink">
              CERTIFICATE OF SUBSIDIZATION
            </h1>
          </div>

          {/* Audit Details */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between border-b border-zinc-800 pb-3">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">SPONSOR IDENTIFICATION</span>
              <span className="font-mono text-xs text-ink font-bold">{email ?? "UNIDENTIFIED BENEFACTOR"}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b border-zinc-800 pb-3">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">CLASSIFICATION</span>
              <span className="font-mono text-xs text-brand-red font-bold uppercase">{archetype?.name ?? "PLATINUM PATRON"}</span>
            </div>
          </div>

          {/* Sardonical Critique */}
          <div className="bg-zinc-950 p-6 border border-zinc-800">
            <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-3">
              AUDIT FINDINGS & CRITIQUE:
            </p>
            <p className="font-mono text-sm text-zinc-400 leading-relaxed">
              {auditRoast}
            </p>
          </div>

          {/* Faux Ledger Invoice */}
          <div className="border-t border-b border-dashed border-zinc-700 bg-zinc-900">
            <div className="border-b border-dashed border-zinc-700 px-6 py-3">
              <p className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                BREAKDOWN OF ANNUAL DONATION DISBURSEMENT
              </p>
            </div>
            <div className="px-6 py-4 space-y-0 divide-y divide-zinc-800">
              {[
                { label: "Guilt Premium Tax", value: "100%" },
                { label: "Treadmill Depreciation Subsidy", value: "$44.50" },
                { label: "Unused Locker Space Rental", value: "$12.00" },
                { label: "Corporate Executive Bonus Fund", value: "$32.50" },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-baseline py-2.5">
                  <span className="font-mono text-sm text-zinc-400">{row.label}</span>
                  <span className="font-mono text-sm text-ink font-bold tabular-nums">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Escape Actions */}
          <div className="space-y-4 pt-4">
            <Link
              href="/dont-wanna-gym"
              className="block bg-brand-red hover:bg-red-700 text-white font-display font-black text-center text-sm uppercase w-full px-8 py-4 rounded-none transition-colors"
            >
              GENERATE MY CANCELLATION LETTER →
            </Link>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center pt-2">
              <Link
                href="/dont-wanna-gym"
                className="font-mono text-xs text-zinc-400 hover:text-brand-lime transition-colors underline underline-offset-4"
              >
                Alternative Fitness Options →
              </Link>
              
              <Link
                href={hasVerdict ? "/dashboard" : "/"}
                className="font-mono text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                No, keep taking my money. I like the guilt.
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
