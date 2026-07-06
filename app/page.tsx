import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.16),transparent_24%),#0b0f19] text-ink">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-8 sm:px-10 lg:px-12 lg:py-10">
        <section className="panel-card grid gap-8 rounded-[2rem] p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-8">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-gym-green/20 bg-gym-green/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-gym-green">
              New • honest fitness decisions
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl">
              Honest gym choices start with a quick diagnosis and a streak that actually means something.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-ink-dim sm:text-lg">
              Take the quiz to discover whether your membership is an investment or a donation, then keep yourself accountable with a clear daily habit tracker.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/quiz" className="cta-primary w-full sm:w-auto">
                Start the quiz
              </Link>
              <Link href="/dashboard" className="cta-secondary w-full sm:w-auto">
                View dashboard
              </Link>
              <Link href="/dont-wanna-gym" className="cta-secondary w-full sm:w-auto text-gym-green/90 border-gym-green/30 hover:border-gym-green/60">
                I Don't Wanna Gym
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="soft-card rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-ink-dim">Fast start</p>
                <p className="mt-2 text-sm font-semibold text-ink">4 questions</p>
              </div>
              <div className="soft-card rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-ink-dim">Clear verdict</p>
                <p className="mt-2 text-sm font-semibold text-ink">No fluff</p>
              </div>
              <div className="soft-card rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-ink-dim">Momentum</p>
                <p className="mt-2 text-sm font-semibold text-ink">Daily streaks</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-[1.75rem] border border-white/10 bg-[#111827]/80 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
            <div className="soft-card rounded-[1.5rem] p-6">
              <p className="eyebrow">What you get</p>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-ink-dim">
                <li>
                  <span className="font-semibold text-ink">A fast diagnostic</span> that labels your membership risk with a real verdict.
                </li>
                <li>
                  <span className="font-semibold text-ink">A habit-first dashboard</span> to track streaks and keep you honest every day.
                </li>
                <li>
                  <span className="font-semibold text-ink">A sleek, mobile-friendly flow</span> with no login required.
                </li>
              </ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="soft-card rounded-3xl p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-ink-dim">Instant feedback</p>
                <p className="mt-3 font-semibold text-ink">Know where you stand fast</p>
              </div>
              <div className="soft-card rounded-3xl p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-ink-dim">Stay accountable</p>
                <p className="mt-3 font-semibold text-ink">Track consistency, not perfection</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <article className="panel-card rounded-[2rem] p-8">
            <p className="eyebrow">Why it works</p>
            <h2 className="mt-5 text-3xl font-semibold text-ink sm:text-4xl">Designed to keep you honest without making you feel judged.</h2>
            <p className="mt-4 text-base leading-8 text-ink-dim">
              The experience is meant to guide you straight into action: understand your risk, then use the dashboard to make one small commitment every day.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="soft-card rounded-3xl p-5">
                <p className="font-semibold text-ink">No fluff</p>
                <p className="mt-2 text-sm text-ink-dim">A focused experience with a clear path from start to finish.</p>
              </div>
              <div className="soft-card rounded-3xl p-5">
                <p className="font-semibold text-ink">No login</p>
                <p className="mt-2 text-sm text-ink-dim">Everything feels instant and lightweight on any device.</p>
              </div>
            </div>
          </article>

          <aside className="panel-card rounded-[2rem] p-8">
            <p className="eyebrow">Quick overview</p>
            <div className="mt-6 space-y-6 text-sm leading-7 text-ink-dim">
              <div>
                <p className="font-semibold text-ink">Start the quiz</p>
                <p className="mt-2">Answer four quick scenarios and get a clear verdict about your gym membership.</p>
              </div>
              <div>
                <p className="font-semibold text-ink">Unlock your verdict</p>
                <p className="mt-2">The result is sharp and useful rather than flattering for the sake of it.</p>
              </div>
              <div>
                <p className="font-semibold text-ink">Track your consistency</p>
                <p className="mt-2">The dashboard turns a daily win into visible momentum.</p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
