# GymOrNot New Contributor Guide

Welcome! This guide helps new contributors get started with GymOrNot and understand the most important files and workflows.

## Quick start

1. Fork the repository on GitHub.
2. Clone your fork locally:

```bash
git clone https://github.com/<your-username>/Gymornot.git
cd Gymornot
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in the browser:

```text
http://localhost:3000
```

## What to explore first

- `app/page.tsx` — home page content and navigation.
- `app/quiz/page.tsx` — quiz flow and question handling.
- `app/dashboard/page.tsx` — dashboard state and streak display.
- `app/community/page.tsx` — contributor resources.
- `app/api/quiz-data/route.ts` — server-side quiz generation route.
- `lib/quiz.ts` — fallback quiz data and question builder.
- `staticData.ts` — static content used across the app.

## Useful documentation

- `README.md` — main project overview and setup.
- `CONTRIBUTING.md` — how to contribute, use branches, and open PRs.
- `INTERN_KB.md` — in-depth repo information for team members.
- `PROJECT_TREE.md` — repo structure summary.
- `ARCHITECTURE.md` — architecture and data flow details.
- `DEPLOYMENT.md` — deployment process and Vercel details.

## Best first tasks

- Fix a small typo or content improvement in the landing page.
- Improve the quiz copy or fallback question wording.
- Update the dashboard layout with clearer spacing.
- Add a small doc improvement to one of the markdown files.

## Contribution workflow

### Create a branch

Use a branch name that describes the work:
- `feature/quiz-copy-update`
- `fix/dashboard-loading-state`
- `docs/expand-testing-guide`

### Make changes

- Keep changes small and focused.
- Update docs if behavior or structure changes.
- Follow the existing component and styling patterns.

### Open a PR

- Push your branch to your fork.
- Open a pull request against `main`.
- Include:
  - What changed
  - Why it changed
  - How to test it
  - Screenshots if UI changed

### Review and merge

- Respond to feedback on your PR.
- Make small iterative updates if needed.
- Once approved, merge after CI passes.

## Local testing

Before opening a PR, run:

```bash
npm run dev
npm run lint
```

If you add tests, also run:

```bash
npm test --if-present
```

## Helpful tips

- Use browser dev tools to inspect page structure.
- Search the repo for existing patterns before writing new code.
- Ask a maintainer if you are unsure about a change.

## Where to find help

- `README.md` for setup and usage.
- `CONTRIBUTING.md` for contribution process.
- `INTERN_KB.md` for team-oriented guidance.
- `app/api/quiz-data/route.ts` for quiz generation specifics.

## Admin console & questionnaire workflow

The project includes a small admin console and import workflow used to manage the questionnaire dataset:

- Admin UI: visit `/admin` to preview CSV/Google Sheet imports and perform imports (GitHub sign-in or password fallback may be enabled).
- Canonical question file: `lib/questions.json` — imports write this file server-side so the app serves a stable question dataset.
- Audit log: imports are appended to `logs/upload-audit.jsonl` for an append-only trace of who imported what and when.
- Scripts: see `scripts/import_from_google_sheet.mjs`, `scripts/sync_sheet.mjs`, and `scripts/sanity_check.mjs` for manual import, scheduled sync, and quick verification.

Interns should always use the Admin UI **Preview** feature first, validate questions and IDs, then import. If you want the import recorded in Git history, create a branch and commit `lib/questions.json` as described in `docs/INTERN_QUESTIONNAIRE_WORKFLOW.md`.

Admin environment variables (local or production): `GITHUB_ID`, `GITHUB_SECRET`, `NEXTAUTH_SECRET`, `ADMIN_USERS`, `SHEET_ID`, `SHEET_GID`.

## Summary

As a new contributor, focus on small, meaningful improvements.
GymOrNot is designed to be easy to understand, so use the docs and existing code as your guide.
If you make a change, document it, test it locally, and then open a clean PR.
