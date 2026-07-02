import Link from "next/link";

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.06),transparent_24%),#0b0f19] text-ink">
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
        <h1 className="text-3xl font-semibold">Community & Contributing</h1>
        <p className="text-ink-dim">Thank you for your interest in contributing to GymOrNot. Below are quick links to help you get started.</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/CONTRIBUTING.md" className="rounded-lg border border-white/10 bg-surface p-4">Contributing guide</Link>
          <Link href="/CODE_OF_CONDUCT.md" className="rounded-lg border border-white/10 bg-surface p-4">Code of Conduct</Link>
          <a href="https://github.com/kalokmishra/Gymornot/issues/new/choose" className="rounded-lg border border-white/10 bg-surface p-4">Open an Issue</a>
          <a href="https://github.com/kalokmishra/Gymornot/pulls" className="rounded-lg border border-white/10 bg-surface p-4">View Pull Requests</a>
        </div>

        <section className="rounded-lg border border-white/6 bg-[#0b1320]/60 p-6">
          <h2 className="text-lg font-semibold">Quick checklist for PRs</h2>
          <ul className="mt-3 list-inside list-disc text-ink-dim">
            <li>Describe the change and why it matters.</li>
            <li>Run the app locally and verify behavior.</li>
            <li>Keep changes small and focused.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
