import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-void">
      {/* Top identity bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <span className="font-display text-lg font-bold tracking-tight text-ink">
          GymOrNot<span className="text-gym-green">.</span>com
        </span>
        <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-ink-dim md:block">
          diagnostic v1.0 — no login required
        </span>
      </div>

      {/* Split fork */}
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* LEFT: Gym Purist */}
        <Link
          href="/gym-trap"
          className="group relative flex min-h-[50vh] flex-1 flex-col justify-end overflow-hidden bg-gradient-to-br from-surface to-void px-8 py-16 transition-colors duration-500 hover:bg-gym-green/[0.06] md:min-h-screen md:px-14"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 94% 46%, 100% 54%, 92% 100%, 0 100%)",
          }}
        >
          <span className="absolute top-24 left-8 font-mono text-xs uppercase tracking-[0.25em] text-gym-green/70 md:left-14">
            Route A
          </span>
          <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_70%,rgba(16,185,129,0.15),transparent_60%)]" />
          </div>
          <h2 className="font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            I'm getting a
            <br />
            <span className="text-gym-green">gym membership.</span>
          </h2>
          <p className="mt-5 max-w-md font-body text-base text-ink-dim">
            Bold. Statistically, you have until roughly January 19th before the
            treadmill becomes a coat rack. See exactly what you're signing —
            notice periods, hidden renewals, all of it.
          </p>
          <span className="mt-8 inline-flex w-fit items-center gap-2 border border-gym-green/40 px-5 py-2.5 font-mono text-sm text-gym-green transition-colors group-hover:border-gym-green group-hover:bg-gym-green/10">
            Read the contract fine print →
          </span>
        </Link>

        {/* RIGHT: Anti-Gym Realist */}
        <Link
          href="/dont-wanna-gym"
          className="group relative flex min-h-[50vh] flex-1 flex-col justify-end overflow-hidden bg-gradient-to-bl from-surface to-void px-8 py-16 transition-colors duration-500 hover:bg-anti-purple/[0.07] md:min-h-screen md:px-14"
          style={{
            clipPath:
              "polygon(8% 0, 100% 0, 100% 100%, 0 100%, 6% 54%, 0 46%)",
          }}
        >
          <span className="absolute top-24 right-8 font-mono text-xs uppercase tracking-[0.25em] text-anti-purple/70 md:right-14">
            Route B
          </span>
          <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="h-full w-full bg-[radial-gradient(circle_at_70%_70%,rgba(139,92,246,0.16),transparent_60%)]" />
          </div>
          <h2 className="font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            I already know
            <br />
            <span className="text-anti-purple">I won't go.</span>
          </h2>
          <p className="mt-5 max-w-md font-body text-base text-ink-dim">
            Also bold — and honestly the more profitable admission. Here's
            the minimalist home equipment that actually fits your real life,
            filtered by the square footage you actually have.
          </p>
          <span className="mt-8 inline-flex w-fit items-center gap-2 border border-anti-purple/40 px-5 py-2.5 font-mono text-sm text-anti-purple transition-colors group-hover:border-anti-purple group-hover:bg-anti-purple/10">
            Browse the home setup →
          </span>
        </Link>
      </div>

      {/* Central floating diagnostic button */}
      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
        <Link
          href="/quiz"
          className="pointer-events-auto group relative flex h-32 w-32 flex-col items-center justify-center rounded-full border-2 border-hairline bg-void shadow-[0_0_0_8px_#0B0F19] transition-transform duration-300 hover:scale-105 sm:h-40 sm:w-40"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-gym-green to-anti-purple opacity-20 blur-md transition-opacity duration-300 group-hover:opacity-40" />
          <span className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim sm:text-xs">
            Not sure?
          </span>
          <span className="relative mt-1 text-center font-display text-sm font-bold leading-tight text-ink sm:text-base">
            Run the
            <br />
            Diagnostic
          </span>
          <span className="relative mt-1 h-1.5 w-1.5 animate-pulse-glow rounded-full bg-gym-green" />
        </Link>
      </div>

      {/* Footer readout */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center gap-2 px-6 text-center">
        <div className="readout-rule max-w-xs" />
        <p className="font-mono text-[11px] text-ink-dim">
          Two doors. One of them is honest.
        </p>
      </div>
    </main>
  );
}
