import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.16),transparent_24%),#0b0f19] text-ink">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10 sm:px-10 lg:px-12">
        <section className="grid gap-10 rounded-[2rem] border border-white/10 bg-surface-raised p-8 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.85)] backdrop-blur-sm lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-8">
          <div className="space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gym-green/80">GymOrNot.com</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-6xl">
              Honest gym decisions start with a quick diagnosis and a dashboard built around your streak.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-ink-dim sm:text-lg">
              Take the quiz to find out whether your membership is investment or donation, then keep accountability with a clean habit tracker that rewards consistency.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/quiz"
                className="inline-flex w-full items-center justify-center rounded-full bg-gym-green px-8 py-4 text-sm font-semibold text-void transition hover:bg-gym-green/90 sm:w-auto"
              >
                Start the quiz
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-ink transition hover:border-gym-green/40 sm:w-auto"
              >
                View dashboard
              </Link>
            </div>
          </div>

          <div className="space-y-4 rounded-[1.75rem] border border-white/10 bg-[#111827]/80 p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
            <div className="rounded-3xl bg-[#0b1320] p-6">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-gym-green/80">What you get</p>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-ink-dim">
                <li>
                  <span className="font-semibold text-ink">A fast, 4-question diagnostic</span> that labels your membership risk and gives you a real verdict.
                </li>
                <li>
                  <span className="font-semibold text-ink">A habit-focused dashboard</span> to track streaks and keep you honest every day.
                </li>
                <li>
                  <span className="font-semibold text-ink">A sleek mobile-first experience</span> with no backend or login required.
                </li>
              </ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-surface p-5">
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-ink-dim">Fast start</p>
                <p className="mt-3 font-semibold text-ink">Quiz in under a minute</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-surface p-5">
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-ink-dim">Momentum</p>
                <p className="mt-3 font-semibold text-ink">Track consistency, not perfection</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[2rem] border border-white/10 bg-surface p-8 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.75)]">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-gym-green/80">Why it works</p>
            <h2 className="mt-5 text-3xl font-semibold text-ink sm:text-4xl">Designed to keep you honest, not overwhelmed.</h2>
            <p className="mt-4 text-base leading-8 text-ink-dim">
              This landing page is built to guide people straight into action: quiz first to understand your risk, then use the dashboard to maintain momentum.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-[#111827]/80 p-5">
                <p className="font-semibold text-ink">No fluff</p>
                <p className="mt-2 text-sm text-ink-dim">A focused landing experience with clear pathing.</p>
              </div>
              <div className="rounded-3xl bg-[#111827]/80 p-5">
                <p className="font-semibold text-ink">No login</p>
                <p className="mt-2 text-sm text-ink-dim">Everything runs client-side and feels instantly available.</p>
              </div>
            </div>
          </article>

          <aside className="rounded-[2rem] border border-white/10 bg-[#111827]/80 p-8">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-gym-green/80">Quick overview</p>
            <div className="mt-6 space-y-6 text-sm leading-7 text-ink-dim">
              <div>
                <p className="font-semibold text-ink">Start the quiz</p>
                <p className="mt-2">Answer four quick scenarios that reveal whether your gym membership is built to stick.</p>
              </div>
              <div>
                <p className="font-semibold text-ink">Unlock your verdict</p>
                <p className="mt-2">The result is honest, sharp, and designed to be useful rather than flattering.</p>
              </div>
              <div>
                <p className="font-semibold text-ink">Track your consistency</p>
                <p className="mt-2">The dashboard turns a small daily win into visual momentum.</p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
