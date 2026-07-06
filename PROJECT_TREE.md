# GymOrNot Project Tree

A one-page reference for the repository structure and the most important files.

## Root
- `.env.local` — local environment variables for development (not committed)
- `.gitignore` — ignored files and folders
- `.next/` — generated Next.js build output
- `.vercel/` — Vercel deployment metadata and project configuration
- `.github/` — GitHub automation, workflows, and contribution settings
- `CODE_OF_CONDUCT.md` — project code of conduct
- `CONTRIBUTING.md` — contributor workflow and guidelines
- `GymOrNot_poster.pdf` — promotional poster asset
- `INTERN_KB.md` — intern knowledge base and onboarding documentation
- `LICENSE` — project license
- `README.md` — main project overview, setup, and deployment docs
- `PROJECT_TREE.md` — this repository structure summary
- `next-env.d.ts` — Next.js environment type definitions
- `next.config.mjs` — Next.js configuration
- `package-lock.json` — locked package dependency tree
- `package.json` — npm package metadata and scripts
- `postcss.config.mjs` — PostCSS configuration for Tailwind
- `public/` — directory containing public assets including archetype badges:
  - `closet_athlete_badge.png`
  - `gym_crusader_badge.png`
  - `january_idealist_badge.png`
  - `smoothie_socialite_badge.png`
- `scripts/` — utility scripts
- `staticData.ts` — static app content and structured data
- `tailwind.config.ts` — theme colors, fonts, and Tailwind config
- `tsconfig.json` — TypeScript compiler settings

## App Source (`app/`)
- `app/globals.css` — global CSS and base styles
- `app/layout.tsx` — root app layout, fonts, and metadata
- `app/page.tsx` — landing/home page experience
- `app/community/page.tsx` — contributor and community resources page
- `app/dashboard/page.tsx` — habit dashboard and streak tracker page
- `app/dont-wanna-gym/page.tsx` — landing page for anti-gym SEO content
- `app/dont-wanna-gym/components/AlternativeMatrix.tsx` — interactive alternative matrix component
- `app/dont-wanna-gym/components/CalendarSignup.tsx` — anti-gym bare minimum calendar signup component
- `app/quiz/page.tsx` — quiz flow, question handling, results, and email gate
- `app/quiz/components/ShareCard.tsx` — reusable social share and roast component
- `app/api/quiz-data/route.ts` — serverless route for quiz GET/POST endpoints

## Static Data + Theme
- `staticData.ts` — static content models and hardcoded app data
- `tailwind.config.ts` — theme colors, fonts, and Tailwind config
- `postcss.config.mjs` — PostCSS configuration
- `next.config.mjs` — Next.js configuration
- `tsconfig.json` — TypeScript configuration

## Libraries
- `lib/quiz.ts` — quiz data types, archetype evaluation engine, and fallback templates
- `lib/questions.json` — canonical roast question database

## Scripts
- `scripts/generate_poster.py` — poster generation script

## GitHub / CI
- `.github/workflows/ci.yml` — CI checks for lint/build/tests
- `.github/workflows/vercel-deploy.yml` — automated Vercel deployment pipeline

## Generated / Dependency Directories
- `node_modules/` — installed dependencies
- `.next/` — Next.js build artifacts
- `.vercel/` — Vercel deployment metadata

## Notes
- The app is built using Next.js 14 App Router, TypeScript, and Tailwind CSS.
- Browser `localStorage` is used to persist the user's email, streak tracker, and 4-axis scores.
