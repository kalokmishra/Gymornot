# GymOrNot Release Guide

This document explains the release process for GymOrNot, including versioning, release notes, and release asset handling.

---

## Release History

### v0.3.0 — Brutalist/Editorial Full-Site Redesign (2026-07-07)

A complete visual overhaul of the presentation layer across all user-facing pages. No business logic, API routes, or quiz scoring was changed.

**Features**
- New brutalist/editorial design system: `rounded-none` everywhere, monospace data labels, receipt/ledger-style layouts, terminal loading states
- Homepage (`/`): Terminal counter bar, asymmetric bento grid with receipt-styled `$44.50` card, exit interview testimonials, sharp CTA hierarchy
- Quiz (`/quiz`): Blueprint grid background, phase tracker + cosmetic guilt meter, full-width stacked answer rows with selection flash, terminal evaluation log replacing spinner
- Dashboard (`/dashboard`): Hero `$1,068` score in massive red type, dashed-border financial audit receipt, 28-day sharp-square habit grid, escape hatch warning module
- Escape page (`/dont-wanna-gym`): All three sub-components (AlternativeMatrix, ResignationGenerator, CalendarSignup) redesigned with flat borders, ledger rows, and receipt-style forms
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