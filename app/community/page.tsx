import Link from "next/link";

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.06),transparent_24%),#0b0f19] text-ink">
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-12 sm:px-10">
        <div className="panel-card rounded-[2rem] p-8">
          <p className="eyebrow">Community</p>
          <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">Community & contributing</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-ink-dim">
            Thank you for your interest in contributing to GymOrNot. These links make it easy to get started, share feedback, or open a pull request.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/CONTRIBUTING.md" className="soft-card rounded-[1.35rem] p-5 transition hover:border-gym-green/40 hover:bg-[#162033]">
            <p className="font-semibold text-ink">Contributing guide</p>
            <p className="mt-2 text-sm text-ink-dim">Read the workflow and contribution expectations before submitting changes.</p>
          </Link>
          <Link href="/CODE_OF_CONDUCT.md" className="soft-card rounded-[1.35rem] p-5 transition hover:border-gym-green/40 hover:bg-[#162033]">
            <p className="font-semibold text-ink">Code of conduct</p>
            <p className="mt-2 text-sm text-ink-dim">A quick reminder of the standards we want to uphold in the project.</p>
          </Link>
          <a href="https://github.com/kalokmishra/Gymornot/issues/new/choose" className="soft-card rounded-[1.35rem] p-5 transition hover:border-gym-green/40 hover:bg-[#162033]">
            <p className="font-semibold text-ink">Open an issue</p>
            <p className="mt-2 text-sm text-ink-dim">Share bugs, ideas, or improvements so the project can keep moving forward.</p>
          </a>
          <a href="https://github.com/kalokmishra/Gymornot/pulls" className="soft-card rounded-[1.35rem] p-5 transition hover:border-gym-green/40 hover:bg-[#162033]">
            <p className="font-semibold text-ink">View pull requests</p>
            <p className="mt-2 text-sm text-ink-dim">Browse active work and see how changes are being shaped.</p>
          </a>
        </div>

        <section className="panel-card rounded-[2rem] p-8">
          <h2 className="text-lg font-semibold text-ink">Quick checklist for PRs</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-ink-dim">
            <li>Describe the change and why it matters.</li>
            <li>Run the app locally and verify behavior.</li>
            <li>Keep changes small and focused.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
