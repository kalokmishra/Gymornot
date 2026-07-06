"use client";

import Link from "next/link";
import AlternativeMatrix from "./components/AlternativeMatrix";
import CalendarSignup from "./components/CalendarSignup";

export default function DontWannaGymPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.16),transparent_24%),#0b0f19] text-ink">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        
        {/* Navigation Header */}
        <div className="mb-8 flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-surface/80 px-6 py-4 text-sm text-ink-dim shadow-[0_20px_70px_-50px_rgba(0,0,0,0.8)] sm:px-10">
          <div className="text-lg font-semibold text-ink">GymOrNot<span className="text-gym-green">.</span>com</div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="cta-secondary px-4 py-2 text-sm">
              Home
            </Link>
            <Link href="/quiz" className="cta-primary px-4 py-2 text-sm">
              Take the Quiz
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <header className="panel-card rounded-[2rem] p-8 sm:p-12 text-center border border-white/10 bg-[#0d1527]/80">
          <div className="inline-flex items-center rounded-full border border-gym-green/20 bg-gym-green/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-gym-green">
            Welcome to the No-Judgment Zone
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl max-w-4xl mx-auto leading-tight">
            I Don't Wanna Gym.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-8 text-ink-dim">
            Good. Gyms are loud, crowded, expensive corporate traps designed to make you feel guilty for not visiting. You don't need them to build a healthy life.
          </p>
        </header>

        {/* Alternative Matrix */}
        <section className="mt-8">
          <AlternativeMatrix />
        </section>

        {/* Pillar 2: Zero-Fluff Gear Curation */}
        <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <article className="panel-card rounded-[2rem] p-8 border border-white/10 bg-[#0f1726]/60 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gym-green">
                Pillar 2: Gear Philosophy
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink">
                The "Buy Only Two Things" Rule
              </h2>
              <p className="mt-4 text-sm leading-7 text-ink-dim">
                Traditional fitness media tries to sell you $2,000 stationary bikes, massive squat racks, and endless tubs of synthetic powder. 
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-dim">
                The truth? 90% of home gym gear is plastic landfill material. You can replicate 80% of gym movements and build a lifetime of fitness with only two premium, compact items:
              </p>

              <ul className="mt-6 space-y-4 text-sm text-ink-dim">
                <li className="flex gap-2">
                  <span className="text-gym-green">✓</span>
                  <strong>A Premium Fabric Resistance Band Set</strong> (for zero-impact, highly dynamic resistance training).
                </li>
                <li className="flex gap-2">
                  <span className="text-gym-green">✓</span>
                  <strong>An Under-Desk Walking Pad</strong> (to get your steps in without facing the weather or bad gym lighting).
                </li>
              </ul>
            </div>
            
            <div className="mt-8 border-t border-white/5 pt-6 flex justify-between items-center">
              <div>
                <p className="text-xs text-ink-dim">Estimated Total Investment</p>
                <p className="text-2xl font-bold text-gym-green">$221 total</p>
              </div>
              <p className="text-xs text-ink-dim/60 italic max-w-xs text-right">
                Less than 3 months of standard gym membership fees.
              </p>
            </div>
          </article>

          {/* Pillar 3: Email Hook Calendar */}
          <CalendarSignup />
        </section>

        {/* SEO Copy Cluster / Informational Content */}
        <section className="mt-8 panel-card rounded-[2rem] p-8 border border-white/10 bg-[#0f1726]/40">
          <h2 className="text-2xl font-bold text-ink">Why Avoiding the Gym is Actually Smart</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-sm leading-7 text-ink-dim">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-semibold text-ink">Zero Commute Overhead</h3>
              <p className="mt-2">The biggest friction to working out isn't the workout—it's pack-driving-changing-parking. Home fitness starts instantly.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-semibold text-ink">No Social Performance</h3>
              <p className="mt-2">No grunting strangers, no waiting for equipment, and no awkward mirror eye-contact. Move at your own speed in privacy.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-semibold text-ink">Consistency over Equipment</h3>
              <p className="mt-2">A daily 15-minute walk and simple bodyweight set beat a $150/month gym membership you only visit twice a year.</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
