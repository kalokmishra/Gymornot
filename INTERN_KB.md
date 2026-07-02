# GymOrNot Intern Knowledge Base

This document is a detailed reference for interns working on GymOrNot. It explains the app structure, local setup, current features, workflows, and how to make safe, maintainable changes.

---

## 1. Project Overview

GymOrNot is a compact Next.js 14 App Router website built with TypeScript and Tailwind CSS.

Key facts:
- The site is intentionally lightweight and primarily frontend-focused.
- There is one serverless API route for quiz generation, but no database or backend persistence.
- Application state is stored in browser `localStorage` so user progress remains after page reloads.
- Static marketing and content data lives in `staticData.ts`.
- The quiz path supports AI-generated question content via `app/api/quiz-data/route.ts`, with a fallback from `lib/quiz.ts`.

Main routes:
- `/` - marketing-focused landing page and navigation hub
- `/quiz` - four-question gym discipline diagnostic experience
- `/dashboard` - daily habit streak tracker and status page
- `/community` - contributor onboarding and community resource page

---

## 2. Local Setup

Steps to begin working locally:

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

4. If you want to test the quiz generation route with AI-backed content locally, add a `.env.local` file:

```env
GEN_AI_ENDPOINT=https://your-gen-ai-endpoint.example.com
GEN_AI_API_KEY=your_api_key_here
```

5. Run build and lint checks before pushing changes:

```bash
npm run build
npm run lint
```

If you add tests, also run:

```bash
npm test --if-present
```

---

## 3. Codebase Structure

Top-level files and folders:

- `app/` - App Router pages, layout, shared styles, and server routes
- `app/page.tsx` - home page and landing experience
- `app/quiz/page.tsx` - quiz flow, answer state, and result screen
- `app/dashboard/page.tsx` - habit dashboard and streak display
- `app/community/page.tsx` - community and contributor resource page
- `app/api/quiz-data/route.ts` - serverless quiz generation API route
- `lib/quiz.ts` - quiz data types, fallback questions, and question builder logic
- `staticData.ts` - static content, gear items, and gym contract data
- `tailwind.config.ts` - theme colors, fonts, custom utilities, and design tokens
- `README.md` / `CONTRIBUTING.md` - project documentation and contribution guidance
- `.github/workflows/ci.yml` - lint/build checks for PRs and pushes
- `.github/workflows/vercel-deploy.yml` - automated deployment to Vercel
- `.vercel/` - Vercel metadata for the connected project

Additional notes:
- `app/layout.tsx` defines the root HTML structure, font loading, and global metadata.
- `app/globals.css` defines global styling and base layout rules.
- The quiz feature intentionally has a fallback path so it remains usable even without external AI services.

---

## 4. What Each Page Does

`/` (Home)
- Presents the brand, value proposition, and navigation into the app.
- Serves as the main entry point for visitors.
- Includes a quick path to the quiz and dashboard.

`/quiz`
- Runs the four-question diagnostic flow.
- Uses client-side state to track answers, progress, and score.
- Requests question content from `app/api/quiz-data/route.ts`.
- If the API route cannot return generated content, it falls back to `lib/quiz.ts`.
- After the user answers questions, the result is displayed once email submission is complete.
- Result state is persisted in `localStorage` for later dashboard use.

`/dashboard`
- Reads stored state from `localStorage`.
- Displays the user’s streak, execution status, and contextual habit insights.
- Encourages repeat visits by showing progress data.

`/community`
- Provides contributor resources and links to documentation.
- Serves as a lightweight onboarding page for new contributors.

---

## 5. Static Data and Content

`staticData.ts` contains the app’s static content and structured data.

Important sections:
- `GEAR_ITEMS` — home training gear collections, description copy, and affiliate-style links.
- `GYM_ITEMS` — gym contract examples, billing warnings, and cautionary details.

If you need to update text, lists, or content displayed in the UI, update `staticData.ts` rather than changing individual page markup. That keeps content and presentation separate.

---

## 6. Quiz Generation and Fallback

The quiz uses a hybrid data model:
- `app/api/quiz-data/route.ts` is the serverless route that tries to request AI-generated questions from an external endpoint.
- `lib/quiz.ts` defines `QuizQuestion`, `QuizOption`, and a fallback set of questions to keep the app working when AI is unavailable.
- This hybrid model makes the site resilient and easy to use in local development and production.

If you update quiz generation behavior, check both the API route and fallback implementation.

---

## 7. Common Intern Tasks

### Fixing layout or styling issues
- Open the affected page in a browser and inspect it with developer tools.
- Change Tailwind classes in the relevant `app/` component.
- If you need new design tokens, add them to `tailwind.config.ts` and use them consistently.
- Verify the page still renders correctly at multiple screen sizes.

### Updating quiz behavior
- Review `app/quiz/page.tsx` to understand state, answer handling, and result logic.
- Review `app/api/quiz-data/route.ts` to confirm the request flow and fallback behavior.
- Update fallback quiz content in `lib/quiz.ts` if you want to change the default questions.
- Test both the AI-backed route and the fallback route locally.

### Updating the dashboard
- Inspect `app/dashboard/page.tsx` and confirm it reads the same `localStorage` keys used by the quiz.
- Ensure `gymornot_email`, `gymornot_risk_score`, `gymornot_streak`, and `gymornot_last_checkin` are handled consistently.
- If you change the storage schema, update both quiz and dashboard pages.

### Adding a new route or page
- Add a folder under `app/` with a `page.tsx` file.
- Name the folder to match the route path.
- Keep the new page focused, with clear UI and explicit state handling.
- Add any necessary content to `README.md` and `PROJECT_TREE.md`.

---

## 8. Issue Triage and Prioritization

When an issue is reported:
1. Reproduce it locally using `npm run dev`.
2. Determine whether it is a UI issue, logic bug, data/content issue, or a build/lint failure.
3. Use the browser console to capture runtime errors.
4. Inspect the relevant file(s) in `app/`, `lib/`, or `staticData.ts`.
5. Fix the issue, then verify with `npm run build` and `npm run lint`.

Prefer small, focused changes. If an issue touches multiple areas, split it into smaller follow-up tasks when possible.

---

## 9. Workflow for Interns

Branching:
- Use descriptive branch names like `feature/quiz-copy-update` or `fix/dashboard-localstorage-bug`.
- Keep each branch limited to one purpose.

Pull requests:
- Open PRs against `main`.
- Include a clear summary of what changed and why.
- Add testing steps and any relevant screenshots.

Pre-merge checks:
- `npm ci`
- `npm run build`
- `npm run lint`
- Confirm the app runs locally and that the changed pages behave as expected.

---

## 10. CI and Deployment

The repository uses GitHub Actions for automated validation.
- `.github/workflows/ci.yml` runs dependency install, lint, and build checks on pushes and PRs.
- `.github/workflows/vercel-deploy.yml` deploys the app to Vercel on successful pushes to `main`.

If CI fails, review the reported errors, fix the code, and push an update.

---

## 11. Useful Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm test --if-present
```

If you add tests, document how to run them in your PR.

---

## 12. Support

If you get stuck:
- Read `README.md` and `CONTRIBUTING.md` first.
- Search existing issues and open PRs for similar changes.
- Ask a maintainer or reviewer for help.
- For production-impacting issues, escalate immediately rather than guessing.
