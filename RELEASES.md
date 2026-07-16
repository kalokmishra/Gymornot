# GymOrNot Release Guide

This document explains the release process for GymOrNot, including versioning, release notes, and release asset handling.

## Release History

### v0.5.2 — Expanded 200-Question Multi-Theme Quiz Bank (2026-07-16)

Expanded the quiz question bank from a small pool to 200 unique questions grouped across 50 distinct satirical themes.

**Features**
- **Flattened Quiz Bank Integration** (`lib/questions.json`): Implemented a parser to flatten `gymornot_quiz_bank.json`'s thematic subsets into the standard flat array format.
- **Dynamic Replayability**: The quiz API endpoint now dynamically picks 4 random questions from a pool of 200 questions on every attempt and shuffles their options, ensuring a unique diagnostic experience on subsequent retakes.

---

### v0.5.0 — Satirical Content Expansion & Email Capture Webhook (2026-07-09)

Expanded satirical humor depth site-wide, added preset resignation templates, new diagnostic question, and a serverless email capture webhook action.

**Features**
- **Terminal loading roasts** (`app/quiz/page.tsx`): Replaced generic calculation log lines with 5 specific passive-aggressive roasts (last gym visit date, 0% treadmill activity, 98.4% resolution fossilization, protein powder division-by-zero error, executive bonus funding confirmation).
- **Expanded faux ledger** (`app/giving-free-money/page.tsx`): Replaced the 4 generic expense rows with 4 new itemized satirical charges — The Locker Room Surcharge ($45.00), Water Fountain Idle Tax ($28.50), The Smoothie Socialite Premium ($65.00), and The Ghost Member Convenience Fee ($120.00). Each row includes a sub-note explanation.
- **Resignation template presets** (`ResignationGenerator.tsx`): Added a "Template Preset" dropdown with 3 comedic letter templates — The Philosophical Departure, The Asset Liquidation, and The Legally Binding Sloth. Selecting a preset overrides the letter body in the preview pane live; switching back to the reason dropdown clears it.
- **New diagnostic question** (`lib/questions.json`): Added `q_humor_1` — "THE SACRIFICE" — asking about the user's current relationship with their gym card. All 4 scoring axes populated on every option.
- **`captureEmail` Server Action** (`app/actions/captureEmail.ts`): New `"use server"` action that POSTs captured emails as `{ email, source, captured_at }` JSON to `EMAIL_CAPTURE_WEBHOOK_URL`. Silently no-ops if the env var is unset. Wired non-blocking into `/quiz` email submit and `/dont-wanna-gym` calendar signup.
- **`.env.example`**: Added `EMAIL_CAPTURE_WEBHOOK_URL` with usage documentation.

---

### v0.4.0 — User Authentication & Account-Based Experience (2026-07-07)

Introduced a hybrid authentication system (Google OAuth & local Email+PIN logins) to allow personalized accounts and automatic email gate bypasses.

**Features**
- **Authentication system**: Integrated NextAuth Google Provider (replacing legacy GitHub configuration) alongside a client-side Email + 4-digit PIN credentials registry.
- **Global Header**: Styled side-by-side context links and subtle auth actions dynamically across all pages (`/`, `/quiz`, `/dashboard`, `/dont-wanna-gym`, `/giving-free-money`, `/community`).
- **AuthModal popup**: Added a centered brutalist modal for sign in, sign up, and Google verification triggers directly on-page.
- **PIN Recovery flow**: Built a secure, Google-verified PIN reset flow, routing matches back to local credential editing.
- **Bypassed email collection**: Bypasses the quiz results email wall and the calendar PDF download inputs automatically for logged-in users.

**Documentation**
- `STYLEGUIDE.md` updated with Header auth layout specs and AuthModal styling rules.
- `ARCHITECTURE.md` updated with custom Auth context provider, Google OAuth, and PIN reset recovery flow architecture.

---

### v0.3.0 — Brutalist/Editorial Full-Site Redesign (2026-07-07)

A complete visual overhaul of the presentation layer across all user-facing pages. No business logic, API routes, or quiz scoring was changed.

**Features**
- New brutalist/editorial design system: `rounded-none` everywhere, monospace data labels, receipt/ledger-style layouts, terminal loading states
- Homepage (`/`): Reframed bento grid as credible industry data averages instead of fake user personalization, terminal counter bar, asymmetric bento layout with receipt-styled `$44.50` card, exit interview testimonials, sharp CTA hierarchy
- Quiz (`/quiz`): Blueprint grid background, phase tracker + cosmetic guilt meter, full-width stacked answer rows with selection flash, terminal evaluation log replacing spinner, clear seen popup flags on mount to support retakes, extended redirect delay to let the fade animation complete
- Dashboard (`/dashboard`): Hero `$1,068` score in massive red type, dashed-border financial audit receipt, 28-day sharp-square habit grid, escape hatch warning module linking to the new audit page
- Escape page (`/dont-wanna-gym`): All three sub-components (AlternativeMatrix, ResignationGenerator, CalendarSignup) redesigned with flat borders, ledger rows, and receipt-style forms
- Audit page (`/giving-free-money`): Added a new route rendering a certified brutalist audit, personalized roasts by archetype, and ledger breakdown for corporate gym sponsors
- Community (`/community`): Completely rewritten with blueprint grid background, interlocking border tile grid, dashed-border PR checklist receipt
- Header standardised across all pages: logo + single contextual `font-mono` text link only — no pill nav

**Documentation**
- `STYLEGUIDE.md` completely rewritten to document the brutalist design system, token reference, per-page structure rules, and content tone
- `ARCHITECTURE.md` updated with design token reference, design rules, and 28-day habit grid derivation notes

---

## Release Strategy

GymOrNot uses a simple release process for milestone updates. The current repository maintains a draft release for the next major update.

### Release stages
- `Draft` — work-in-progress release notes and planned changes.
- `Published` — stable release available to users.

## Creating a release

1. Ensure the content and code are ready on `main`.
2. Create a draft release in GitHub with a descriptive title.
3. Add a summary of the changes, grouped by feature, fix, and docs.
4. Optionally attach release assets like `GymOrNot_poster.pdf`.

## Release notes content

Include the following in release notes:
- What changed and why
- New features or enhancements
- Bug fixes
- Documentation updates
- Deployment or infra changes

Example structure:

- `Features`
- `Fixes`
- `Improvements`
- `Documentation`
- `Deployment`

## Versioning

GymOrNot does not enforce strict semantic versioning in code, but release titles should be consistent and meaningful.

Recommended format:
- `v0.1.0`
- `v0.2.0`

Use the release title to summarize the main value of the release.

## Release assets

If you attach assets, keep them relevant to the release.
Examples:
- promotional PDFs
- design mockups
- downloadable posters

In this repository, `GymOrNot_poster.pdf` is a reusable release asset.

## Post-release steps

- Confirm the release is published in GitHub.
- Verify the live site after deployment, if applicable.
- Update any documentation references to the released version.

## Emergency release

If a hotfix is required:
1. Create a focused PR directly against `main`.
2. Merge after verification.
3. Publish a patch release with a clear description.

## Release communication

- Announce releases through project channels if available.
- Mention key changes for contributors and stakeholders.

## Summary

The release process should be straightforward and transparent:
- use draft releases for planning
- write clear release notes
- attach relevant assets when appropriate
- verify the deployed app after publishing

Keeping release documentation up to date helps contributors understand what changed and why.