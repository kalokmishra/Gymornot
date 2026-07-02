# GymOrNot Project Tree

A one-page summary of the repository structure and key files.

## Root
- `.env.local`
- `.gitignore`
- `.next/` — generated Next.js build output
- `.vercel/` — Vercel deployment metadata
- `.github/` — GitHub automation and contribution configuration
- `CODE_OF_CONDUCT.md`
- `CONTRIBUTING.md`
- `GymOrNot_poster.pdf`
- `INTERN_KB.md`
- `LICENSE`
- `README.md`
- `next-env.d.ts`
- `next.config.mjs`
- `package-lock.json`
- `package.json`
- `postcss.config.mjs`
- `scripts/`
- `staticData.ts`
- `tailwind.config.ts`
- `tsconfig.json`

## App Source (`app/`)
- `app/globals.css` — global CSS styles
- `app/layout.tsx` — root app layout and fonts
- `app/page.tsx` — landing/home page
- `app/community/page.tsx` — community/contributor page
- `app/dashboard/page.tsx` — dashboard and streak tracker
- `app/quiz/page.tsx` — quiz flow and result experience
- `app/api/quiz-data/route.ts` — serverless route for AI quiz generation

## Static Data + Theme
- `staticData.ts` — static content models and hardcoded app data
- `tailwind.config.ts` — theme colors, fonts, and Tailwind config
- `postcss.config.mjs` — PostCSS configuration
- `next.config.mjs` — Next.js configuration
- `tsconfig.json` — TypeScript configuration

## Scripts
- `scripts/generate_poster.py` — poster generation script

## GitHub / CI
- `.github/CODEOWNERS`
- `.github/pull_request_template.md`
- `.github/ISSUE_TEMPLATE/`
- `.github/workflows/ci.yml` — CI checks for lint/build/tests
- `.github/workflows/vercel-deploy.yml` — automated Vercel deployment
- `.github/workflows/welcome-first-timer.yml` — contributor welcome automation

## Generated / Dependency Directories
- `node_modules/` — installed dependencies
- `.next/` — Next.js build artifacts
- `.vercel/` — Vercel deployment metadata

## Notes
- The app is built using Next.js 14 App Router, TypeScript, and Tailwind CSS.
- The site is primarily static with browser `localStorage` used for quiz/dashboard persistence.
- `INTERN_KB.md` is an intern-friendly knowledge base created for team onboarding.
