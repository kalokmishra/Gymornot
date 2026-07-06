# GymOrNot.com

GymOrNot is a playful digital self-assessment built to help visitors decide whether a traditional gym membership is the right choice or whether they should focus on home-based discipline instead. It combines a marketing-friendly landing experience with a risk diagnostic quiz, an in-browser habit dashboard, and a modern deployment workflow.

The app is built with:
- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- A lightweight serverless quiz generation route

## Setup

Recommended Node.js version: 18 or later.

Install dependencies and start the local development server:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Live demo: https://gymornot-five.vercel.app

## How the quiz works

The `/quiz` page is designed to provide a short, opinionated diagnostic. It loads quiz questions from a server-side route and then lets users answer four questions before showing a result.

The quiz generation flow is:
1. Client-side code in `app/quiz/page.tsx` requests `/api/quiz-data`.
2. `app/api/quiz-data/route.ts` attempts to fetch AI-generated quiz content from the configured `GEN_AI_ENDPOINT`.
3. If the AI route is unavailable or not configured, the route returns a safe fallback quiz built from `lib/quiz.ts`.
4. The user answers the questions, submits an email, and their result is saved to `localStorage`.

This design keeps the quiz experience functional in all environments while supporting richer AI-backed questions when the deployment is configured.

Admin console, imports and audit logs
-----------------------------------
- The repository includes a lightweight admin console at `/admin` that lets authorized maintainers preview and import question sets from CSV/Google Sheets.
- Canonical question storage: `lib/questions.json` — imports write this file (server-side) so the app serves a stable dataset.
- Uploads and imports are audited to `logs/upload-audit.jsonl` to keep a simple, append-only trace of who imported what and when.
- Utility scripts live in `scripts/`: `import_from_google_sheet.mjs`, `sync_sheet.mjs`, and `sanity_check.mjs` for manual imports, periodic syncs, and quick verification respectively.

## Local environment variables

To enable AI-backed quiz generation locally, create a `.env.local` file with:

```env
GEN_AI_ENDPOINT=https://your-gen-ai-endpoint.example.com
GEN_AI_API_KEY=your_api_key_here
```

If these variables are not available, the application will continue to work using a built-in fallback question set inside `lib/quiz.ts`.

Admin & auth environment variables
---------------------------------
To enable the admin GitHub sign-in (NextAuth) and secure admin flows, set these environment variables in local or production environments:

- `GITHUB_ID` and `GITHUB_SECRET` — GitHub OAuth app credentials used by NextAuth.
- `NEXTAUTH_SECRET` — secret used by NextAuth for signing/encryption.
- `ADMIN_USERS` — comma-separated list of admin user emails (e.g. `alice@example.com,bob@example.com`).
- Optional for sheet sync: `SHEET_ID` and `SHEET_GID` (used by `scripts/sync_sheet.mjs`).

## Vercel deployment

The repository includes an automated Vercel deployment workflow at `.github/workflows/vercel-deploy.yml`.

Required GitHub secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

After configuring the secrets, pushes to `main` trigger a deployment to the connected Vercel project.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vercel](https://img.shields.io/badge/deploy-vercel-black)
![CI](https://github.com/kalokmishra/Gymornot/actions/workflows/ci.yml/badge.svg)

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Landing page with brand positioning, navigation, and calls to action |
| `/quiz` | 4-question gym discipline diagnostic with AI-backed question generation and fallback support |
| `/dashboard` | In-browser habit tracker showing streaks and progress based on stored quiz state |
| `/community` | Contributor and community onboarding page with links to docs and issue guidance |

## Architecture and notes

- `app/` contains the App Router pages, layout, and the serverless route used by the quiz.
- `app/api/quiz-data/route.ts` is the server-side route responsible for quiz generation.
- `lib/quiz.ts` holds the fallback quiz question builder and quiz model types.
- `staticData.ts` contains static structured data for gym contracts, home gear, and content displayed in the app.
- `localStorage` is used to persist the quiz email, risk score, streak, and last check-in.
- Styling and theme tokens are managed in `tailwind.config.ts`.
- No database is required for the current experience; the app is intentionally lightweight and client-first.

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

Quick links: [Community page](/community) · [Contributing](CONTRIBUTING.md) · [Code of Conduct](CODE_OF_CONDUCT.md)

## What’s new

- CI checks run on GitHub Actions via `.github/workflows/ci.yml`.
- Vercel deployment is automated through `.github/workflows/vercel-deploy.yml`.
- The quiz now supports AI-backed question generation with a static fallback so the app stays reliable.

## Current status

- Latest fixes on `main` are deployed and verified.
- Admin auth imports, session typing, and quiz import routes were corrected.
- Live deployment: `https://gymornot-five.vercel.app`

## Handoff for the next assistant

See [docs/ASSISTANT_HANDOFF.md](docs/ASSISTANT_HANDOFF.md) for a concise handoff, recent fix summary, and next actions.

## Contributing quick start
1. Read [CONTRIBUTING.md](CONTRIBUTING.md) for workflow and local setup.
2. Start the app locally with `npm run dev`.
3. Submit PRs against `main`; CI will validate lint and build checks.
