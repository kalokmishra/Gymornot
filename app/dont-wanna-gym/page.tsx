"use client";

import Link from "next/link";
import AlternativeMatrix from "./components/AlternativeMatrix";
import CalendarSignup from "./components/CalendarSignup";
import ResignationGenerator from "./components/ResignationGenerator";

export default function DontWannaGymPage() {
  return (
    <main className="min-h-screen bg-[#111] text-white font-mono" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-12 space-y-12">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between border-4 border-white bg-black px-6 py-4 shadow-[8px_8px_0px_#fff] sm:px-10">
          <div className="text-xl font-black uppercase tracking-tighter">GymOrNot<span className="bg-gym-green text-black px-1">.</span>com</div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="border-4 border-white bg-[#222] px-4 py-2 text-sm font-bold uppercase shadow-[4px_4px_0px_#fff] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_#fff] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all text-white">
              Home
            </Link>
            <Link href="/quiz" className="border-4 border-white bg-anti-purple-glow text-black px-4 py-2 text-sm font-bold uppercase shadow-[4px_4px_0px_#fff] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_#fff] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">
              Take the Quiz
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <header className="text-center space-y-6 pt-8 pb-4">
          <div className="inline-block border-4 border-white px-4 py-2 bg-yellow-400 text-black font-black text-sm uppercase shadow-[4px_4px_0px_#fff] transform -rotate-2">
            VOL. 1 / NO JUDGMENT
          </div>
          <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-tight mt-6">
            The Anti-Gym <br className="hidden sm:block" />
            <span className="bg-white text-black px-4 py-1 inline-block mt-2">Manifesto.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl font-bold max-w-2xl mx-auto text-gray-300">
            You are officially unsubscribed from <span className="line-through decoration-red-500 decoration-4 text-white">gym guilt</span> corporate fitness.
          </p>
        </header>

        {/* Resignation Generator (New Viral Hook) */}
        <ResignationGenerator />

        {/* Alternative Matrix */}
        <section className="mt-12">
          <AlternativeMatrix />
        </section>

        {/* Pillar 2: Zero-Fluff Gear Curation */}
        <section className="mt-12 grid gap-8 lg:grid-cols-2">
          <article className="bg-black border-4 border-white shadow-[8px_8px_0px_#fff] p-8 flex flex-col justify-between transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_#fff]">
            <div>
              <span className="text-xs uppercase font-black bg-white text-black px-2 py-1">
                Pillar 2: Gear Philosophy
              </span>
              <h2 className="mt-6 text-3xl font-black uppercase text-white">
                The "Buy Only Two Things" Rule
              </h2>
              <p className="mt-4 text-sm font-bold leading-7 text-gray-300">
                Traditional fitness media tries to sell you $2,000 stationary bikes, massive squat racks, and endless tubs of synthetic powder. 
              </p>
              <p className="mt-3 text-sm font-bold leading-7 text-gray-300">
                The truth? 90% of home gym gear is plastic landfill material. You can replicate 80% of gym movements and build a lifetime of fitness with only two premium, compact items:
              </p>

              <ul className="mt-6 space-y-4 text-sm font-bold text-white border-4 border-white border-dashed p-4 bg-[#222]">
                <li className="flex gap-3 items-start">
                  <span className="bg-gym-green text-black border-2 border-white px-2 inline-block">✓</span>
                  <span><strong>A Premium Fabric Resistance Band Set</strong> (for zero-impact, highly dynamic resistance training).</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="bg-gym-green text-black border-2 border-white px-2 inline-block">✓</span>
                  <span><strong>An Under-Desk Walking Pad</strong> (to get your steps in without facing the weather or bad lighting).</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 border-t-4 border-white pt-6 flex justify-between items-end">
              <div>
                <p className="text-xs font-bold uppercase text-gray-400">Total Investment</p>
                <p className="text-3xl font-black bg-yellow-400 text-black inline-block px-2 border-2 border-white mt-1">$221</p>
              </div>
              <p className="text-xs font-bold max-w-[120px] text-right italic text-gray-400">
                Less than 3 months of standard gym fees.
              </p>
            </div>
          </article>

          {/* Pillar 3: Email Hook Calendar */}
          <CalendarSignup />
        </section>

        {/* SEO Copy Cluster / Informational Content */}
        <section className="mt-12 bg-black border-4 border-white shadow-[8px_8px_0px_#fff] p-8 mb-12">
          <h2 className="text-3xl font-black uppercase text-white">Why Avoiding the Gym is Actually Smart</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 border-4 border-white bg-[#222] shadow-[4px_4px_0px_#fff]">
              <h3 className="font-black uppercase text-lg border-b-2 border-white pb-2 text-white">Zero Commute Overhead</h3>
              <p className="mt-4 text-sm font-bold text-gray-300">The biggest friction to working out isn't the workout—it's pack-driving-changing-parking. Home fitness starts instantly.</p>
            </div>
            <div className="p-6 border-4 border-white bg-[#222] shadow-[4px_4px_0px_#fff]">
              <h3 className="font-black uppercase text-lg border-b-2 border-white pb-2 text-white">No Social Performance</h3>
              <p className="mt-4 text-sm font-bold text-gray-300">No grunting strangers, no waiting for equipment, and no awkward mirror eye-contact. Move at your own speed in privacy.</p>
            </div>
            <div className="p-6 border-4 border-white bg-[#222] shadow-[4px_4px_0px_#fff]">
              <h3 className="font-black uppercase text-lg border-b-2 border-white pb-2 text-white">Consistency Over Equipment</h3>
              <p className="mt-4 text-sm font-bold text-gray-300">A daily 15-minute walk and simple bodyweight set beat a $150/month gym membership you only visit twice a year.</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
