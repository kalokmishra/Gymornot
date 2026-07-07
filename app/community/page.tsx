"use client";

import Link from "next/link";
import Header from "../../components/Header";

export default function CommunityPage() {
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
      <Header contextLink="/quiz" contextLabel="Take the Quiz →" />

      <div className="mx-auto max-w-4xl px-6 py-12 space-y-0">

        {/* Hero */}
        <div className="border-2 border-zinc-800 bg-zinc-950 p-8 rounded-none">
          <p className="font-mono text-[10px] text-brand-lime uppercase tracking-widest mb-3">
            // OPEN SOURCE //
          </p>
          <h1 className="font-display font-black text-4xl sm:text-5xl uppercase text-ink tracking-tight leading-none mb-4">
            Community & Contributing
          </h1>
          <p className="font-mono text-sm text-zinc-500 max-w-2xl leading-relaxed">
            Thank you for your interest in contributing to GymOrNot. These links make it easy to get started, share feedback, or open a pull request.
          </p>
        </div>

        {/* Quick links grid */}
        <div className="grid sm:grid-cols-2 border-l border-b border-zinc-800">
          {[
            {
              href: "/CONTRIBUTING.md",
              title: "Contributing Guide",
              description: "Read the workflow and contribution expectations before submitting changes.",
              external: false,
            },
            {
              href: "/CODE_OF_CONDUCT.md",
              title: "Code of Conduct",
              description: "A quick reminder of the standards we want to uphold in the project.",
              external: false,
            },
            {
              href: "https://github.com/kalokmishra/Gymornot/issues/new/choose",
              title: "Open an Issue",
              description: "Share bugs, ideas, or improvements so the project can keep moving forward.",
              external: true,
            },
            {
              href: "https://github.com/kalokmishra/Gymornot/pulls",
              title: "View Pull Requests",
              description: "Browse active work and see how changes are being shaped.",
              external: true,
            },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="border-t border-r border-zinc-800 p-6 bg-void hover:bg-zinc-900 hover:border-zinc-600 transition-all duration-150 group rounded-none"
            >
              <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-2">
                {item.external ? "EXTERNAL →" : "DOCS"}
              </p>
              <p className="font-display font-black text-sm uppercase text-ink group-hover:text-brand-lime transition-colors mb-2">
                {item.title}
              </p>
              <p className="font-mono text-xs text-zinc-500 leading-relaxed">
                {item.description}
              </p>
            </Link>
          ))}
        </div>

        {/* PR Checklist */}
        <div className="border-t border-b border-dashed border-zinc-700 bg-zinc-900 rounded-none">
          <div className="border-b border-dashed border-zinc-700 px-6 sm:px-8 py-4">
            <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              PR SUBMISSION CHECKLIST
            </p>
          </div>
          <div className="px-6 sm:px-8 divide-y divide-zinc-800">
            {[
              "Describe the change and why it matters.",
              "Run the app locally and verify behavior.",
              "Keep changes small and focused.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 py-4">
                <span className="font-mono text-[10px] text-zinc-600 shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-sm text-zinc-400">{item}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-dashed border-zinc-700 px-6 sm:px-8 py-4">
            <a
              href="/docs/INTERN_QUESTIONNAIRE_WORKFLOW.md"
              className="font-mono text-xs text-brand-lime hover:text-ink underline-offset-4 hover:underline transition-colors"
            >
              Open full workflow doc →
            </a>
            <span className="font-mono text-xs text-zinc-700 mx-3">·</span>
            <Link
              href="/admin/audit"
              className="font-mono text-xs text-zinc-500 hover:text-ink underline-offset-4 hover:underline transition-colors"
            >
              View recent uploads →
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
