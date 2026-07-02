# GymOrNot Intern Knowledge Base

This document is a section-by-section reference for interns managing GymOrNot. It covers the app structure, local setup, common issues, workflows, and how to make safe fixes.

---

## 1. Project Overview

GymOrNot is a small Next.js 14 App Router site built with TypeScript and Tailwind CSS.

Key facts:
- No backend server is used for app data.
- No database; most app state is stored in browser `localStorage`.
- Static content is stored in the repository under `staticData.ts`.
- The app is primarily a marketing/diagnostic frontend with a quiz flow and dashboard.

Main routes:
- `/` - landing page
- `/quiz` - 4-question risk diagnostic
- `/dashboard` - daily streak tracker and status page
- `/community` - contributor/community links

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

4. Run the build and lint checks before pushing changes:

```bash
npm run build
npm run lint
```

---

## 3. Codebase Structure

Top-level files and folders:

- `app/` - main App Router pages and layout
- `app/page.tsx` - home page
- `app/quiz/page.tsx` - quiz experience
- `app/dashboard/page.tsx` - dashboard and streak tracker
- `app/community/page.tsx` - contributor/community page
- `staticData.ts` - static structured data for gear and gym listings
- `tailwind.config.ts` - theme tokens, colors, fonts, and custom utilities
- `README.md` / `CONTRIBUTING.md` - docs for contributors and setup
- `.github/workflows/ci.yml` - CI checks on PRs and pushes
- `.github/workflows/welcome-first-timer.yml` - auto-comment for new contributors

Additional notes:
- `app/layout.tsx` imports fonts and defines the base HTML layout.
- The app uses custom Tailwind classes and brand colors defined in `tailwind.config.ts`.

---

## 4. What Each Page Does

`/` (Home)
- Landing experience with main marketing content.
- Links to quiz and dashboard.
- Highlights core product value and how the platform works.

`/quiz`
- Four-question risk diagnostic flow.
- Local component state controls quiz steps and scoring.
- The final result is gated behind an email field.
- Stores score and email in `localStorage` after submission.

`/dashboard`
- Shows the user streak tracker and habits dashboard.
- Reads `localStorage` values: `gymornot_email`, `gymornot_risk_score`, `gymornot_streak`, and `gymornot_last_checkin`.
- Allows daily check-in and streak updates.
- If no quiz data exists, it prompts the user to take the quiz first.

`/community`
- Static guidance page linking to `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, GitHub issue templates, and PRs.

---

## 5. Static Data and Content

`staticData.ts` contains the app’s data models and hardcoded content.

Important sections:
- `GEAR_ITEMS` - home training gear items and affiliate links.
- `GYM_ITEMS` - gym contract examples and warning details.

If content needs updating or adding, do it here rather than in page markup. This keeps the UI and data separate.

---

## 6. Common Intern Tasks

### Fixing layout or styling issues
- Inspect the page in browser developer tools.
- Change Tailwind classes in the affected component.
- Check `tailwind.config.ts` for custom tokens if colors or fonts need adjustment.

### Updating quiz behavior
- Review `app/quiz/page.tsx`.
- Question data is inside `QUESTIONS`.
- Score logic and result selection happen in the component.
- QA: complete every answer path and verify the final screen appears.

### Fixing dashboard `localStorage` behavior
- `app/dashboard/page.tsx` reads values from browser storage on mount.
- Check if `useEffect` and state values are set correctly.
- Keep `localStorage` keys consistent with quiz persistence.

### Adding or editing routes
- New pages should be added under `app/` as `page.tsx` files or nested route folders.
- For a new route, use a folder name matching the route path.
- Keep the route’s component simple and declarative.

---

## 7. Issue Triage and Prioritization

When an issue arises:

1. Reproduce the problem locally using `npm run dev`.
2. Identify whether it is:
   - a UI bug
   - a behavior/logic bug
   - a content/data issue
   - a build/lint failure
3. Check the browser console for runtime errors.
4. If it is data or content, inspect `staticData.ts`.
5. If it is page-specific, inspect the relevant file under `app/`.

For each fix:
- Keep changes small and focused.
- Add a short description of what was fixed and why.
- Confirm the site still builds cleanly.

---

## 8. Repo Workflow for Interns

Branching:
- Create branches like `fix/description` or `feature/description`.
- Keep changes scoped and easy to review.

Pull requests:
- Open PRs against `main`.
- Include motivation and testing steps in the PR description.
- Reference related issue numbers if available.

Checks before merging:
- `npm ci`
- `npm run build`
- `npm run lint`
- Confirm the app still runs locally

---

## 9. CI and Quality Checks

The GitHub Actions pipeline in `.github/workflows/ci.yml` runs on pushes and PRs.

It performs:
- `npm ci`
- `npm run lint`
- `npm run build --if-present`
- `npm test --if-present`

If CI fails, fix the reported issue before requesting review.

---

## 10. Useful Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm test --if-present
```

If you add tests, document how to run them in the PR and confirm they pass.

---

## 11. Support and Escalation

If interns are stuck:
- Look at `README.md` and `CONTRIBUTING.md` first.
- Check open issues and PRs for similar fixes.
- Ask a maintainer or reviewer for guidance.
- For security or production-critical problems, escalate immediately rather than guessing.

---

## 12. Do’s and Don’ts

Do:
- Keep fixes small and well-tested.
- Use the existing app style and naming patterns.
- Document changes clearly in PRs.
- Validate that the UI is still responsive.

Don’t:
- Add a backend or database unless explicitly requested.
- Change `localStorage` keys without updating both quiz and dashboard behavior.
- Ship broken or half-complete user flows.
- Ignore lint or build issues.
