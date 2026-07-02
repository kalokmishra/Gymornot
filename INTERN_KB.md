# GymOrNot Intern Knowledge Base

This document is a section-by-section reference for interns managing GymOrNot. It covers the app structure, local setup, current features, workflows, and safe fix guidance.

---

## 1. Project Overview

GymOrNot is a small Next.js 14 App Router site built with TypeScript and Tailwind CSS.

Key facts:
- The app is mostly frontend-focused, with a single serverless API route for quiz generation.
- No database; app state is stored in browser `localStorage`.
- Static content is stored in `staticData.ts`.
- The quiz questions are generated via `app/api/quiz-data/route.ts` when configured, with a fallback defined in `lib/quiz.ts`.

Main routes:
- `/` - landing page
- `/quiz` - AI-backed quiz experience
- `/dashboard` - streak and habit dashboard
- `/community` - contributor/community resources

---

## 2. Local Setup

Steps to start working locally:

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/kalokmishra/Gymornot.git
cd Gymornot
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in the browser:

```text
http://localhost:3000
```

4. To test the AI-backed quiz route locally, add `.env.local`:

```env
GEN_AI_ENDPOINT=https://your-gen-ai-endpoint.example.com
GEN_AI_API_KEY=your_api_key_here
```

5. Run build and lint checks before pushing changes:

```bash
npm run build
npm run lint
```

---

## 3. Codebase Structure

Top-level files and folders:

- `app/` - App Router pages, layout, and server routes
- `app/page.tsx` - home page
- `app/quiz/page.tsx` - quiz experience
- `app/dashboard/page.tsx` - dashboard page
- `app/community/page.tsx` - contributor/community page
- `app/api/quiz-data/route.ts` - serverless route for quiz generation
- `lib/quiz.ts` - fallback quiz templates and helper logic
- `staticData.ts` - static app data and content
- `tailwind.config.ts` - theme tokens, colors, fonts, and Tailwind config
- `README.md` / `CONTRIBUTING.md` - contributor and setup documentation
- `.github/workflows/ci.yml` - CI lint/build checks
- `.github/workflows/vercel-deploy.yml` - automated Vercel deploy pipeline
- `.vercel/` - Vercel metadata for the linked project

Additional notes:
- `app/layout.tsx` imports fonts and defines the base HTML layout.
- The quiz route now has an API-backed option plus a static fallback.

---

## 4. What Each Page Does

`/` (Home)
- Landing page with the main site entry and navigation.
- Links to the quiz, dashboard, and community page.

`/quiz`
- Quiz experience with dynamic question generation.
- Uses `app/api/quiz-data/route.ts` to request AI-generated questions.
- Falls back to `lib/quiz.ts` if the API call fails or is not configured.
- Stores the result in `localStorage` on email submission.

`/dashboard`
- Displays the user streak tracker and habit status.
- Reads `localStorage` values like `gymornot_email`, `gymornot_risk_score`, `gymornot_streak`, and `gymornot_last_checkin`.

`/community`
- Contributor and community resources.
- Links to contributing docs, issue templates, and support guidance.

---

## 5. Static Data and Content

`staticData.ts` contains the repository’s static data models and hardcoded content.

Important sections:
- `GEAR_ITEMS` - home training gear and affiliate-style content.
- `GYM_ITEMS` - gym contract examples and cautionary details.

For content updates, change `staticData.ts` rather than individual page markup.

---

## 6. Common Intern Tasks

### Fixing layout or styling issues
- Use browser dev tools to identify the component and Tailwind classes.
- Update the page component under `app/`.
- Check `tailwind.config.ts` for palette tokens and utilities.

### Updating quiz behavior
- Review `app/quiz/page.tsx` and `app/api/quiz-data/route.ts`.
- Add or adjust fallback question content in `lib/quiz.ts`.
- Verify both the AI path and fallback path work locally.

### Updating the dashboard
- `app/dashboard/page.tsx` reads persistent state from `localStorage`.
- Keep storage keys consistent with the quiz page.
- Confirm streak state updates correctly after interactions.

### Adding a new route or page
- Add a new folder under `app/` with `page.tsx`.
- Use the route folder name to match the path.
- Keep new routes minimal and consistent with the existing style.

---

## 7. Issue Triage and Prioritization

When an issue arises:
1. Reproduce locally with `npm run dev`.
2. Categorize it as UI, logic, data, or build/lint.
3. Check the browser console for runtime errors.
4. Inspect the relevant page or static data source.
5. Fix, test, and ensure the app still builds.

---

## 8. Workflow for Interns

Branching:
- Use `feature/short-description` or `fix/short-description`.
- Keep each branch focused on one change.

Pull requests:
- Target `main`.
- Include motivation and testing notes.
- Reference issue numbers when relevant.

Pre-merge checks:
- `npm ci`
- `npm run build`
- `npm run lint`
- Confirm the site runs locally.

---

## 9. CI and Deployment

The repo uses GitHub Actions for CI.
- `.github/workflows/ci.yml` runs lint and build checks.
- `.github/workflows/vercel-deploy.yml` deploys the app to Vercel on `main`.

If CI or deploy fails, fix the reported issue before requesting a review.

---

## 10. Useful Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm test --if-present
```

If you add tests, include run instructions in the PR.

---

## 11. Support

If you get stuck:
- Read `README.md` and `CONTRIBUTING.md`.
- Search open issues and PRs.
- Ask a maintainer or reviewer for help.
- For production-critical issues, escalate immediately.
