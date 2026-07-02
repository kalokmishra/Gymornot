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
- `scripts/` — utility scripts
- `staticData.ts` — static app content and structured data
- `tailwind.config.ts` — Tailwind theme, colors, and utilities
- `tsconfig.json` — TypeScript compiler settings

## App Source (`app/`)
- `app/globals.css` — global CSS and base styles
- `app/layout.tsx` — root app layout, fonts, and metadata
- `app/page.tsx` — landing/home page experience
- `app/community/page.tsx` — contributor and community resources page
- `app/dashboard/page.tsx` — habit dashboard and streak tracker page
- `app/quiz/page.tsx` — quiz flow, question handling, and result display
- `app/api/quiz-data/route.ts` — serverless route for AI-backed quiz generation

## Static Data + Theme
- `staticData.ts` — static content models and hardcoded app data
- `tailwind.config.ts` — theme colors, fonts, and Tailwind config
- `postcss.config.mjs` — PostCSS configuration
- `next.config.mjs` — Next.js configuration
- `tsconfig.json` — TypeScript configuration

## Libraries
- `lib/quiz.ts` — quiz data types, fallback question builder, and helper logic

## Scripts
- `scripts/generate_poster.py` — poster generation script

## GitHub / CI
- `.github/CODEOWNERS` — designated code owners for review
- `.github/pull_request_template.md` — PR template for contributors
- `.github/ISSUE_TEMPLATE/` — issue templates for bug reports and feature requests
- `.github/workflows/ci.yml` — CI checks for lint/build/tests
- `.github/workflows/vercel-deploy.yml` — automated Vercel deployment pipeline
- `.github/workflows/welcome-first-timer.yml` — welcome automation for first-time contributors

## Generated / Dependency Directories
- `node_modules/` — installed dependencies
- `.next/` — Next.js build artifacts
- `.vercel/` — Vercel deployment metadata

## Notes
- The app is built using Next.js 14 App Router, TypeScript, and Tailwind CSS.
- `app/api/quiz-data/route.ts` provides AI-backed quiz generation, while `lib/quiz.ts` provides fallback questions.
- Browser `localStorage` is used for quiz state persistence and dashboard streak tracking.
- `INTERN_KB.md` is the intern knowledge base for onboarding and maintenance.
