# GymOrNot Intern Knowledge Base

This document is a detailed reference for interns working on GymOrNot. It explains the app structure, local setup, current features, workflows, and how to make safe, maintainable changes.

---

## 1. Project Overview

GymOrNot is a compact Next.js 14 App Router website built with TypeScript and Tailwind CSS.

Key facts:
- The site is intentionally lightweight and primarily frontend-focused.
- API endpoints support fetching and scoring quiz data, but there is no database persistence.
- Application state (email, streak, check-in history, and 4-axis scores) is stored in browser `localStorage`.
- Static marketing and onboarding content lives in components; supplementary reference lists reside in `staticData.ts`.
- The quiz path supports AI-generated question content via `app/api/quiz-data/route.ts`, with fallback questions loaded from `lib/quiz.ts`.

Main routes:
- `/` - marketing-focused landing page and navigation hub
- `/quiz` - four-question gym discipline diagnostic experience with roast archetypes
- `/dashboard` - daily habit streak tracker showing roasts and saved capital
- `/dont-wanna-gym` - anti-gym SEO cluster, interactive alternative matrix, and email capture
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

4. Run build and lint checks before pushing changes:
```bash
npm run build
npm run lint
```

---

## 3. Codebase Structure

Top-level files and folders:

- `app/` - App Router pages, layouts, global styles, and server routes
- `app/page.tsx` - home page and landing experience
- `app/quiz/page.tsx` - quiz flow, multi-axis answer state, financial waste projection, and email wall
- `app/quiz/components/ShareCard.tsx` - reusable social share card component
- `app/dashboard/page.tsx` - habit dashboard, donation index, and streak display
- `app/dont-wanna-gym/page.tsx` - anti-gym SEO landing page with gear vetting
- `app/dont-wanna-gym/components/AlternativeMatrix.tsx` - interactive anti-gym barrier and blueprint selector
- `app/dont-wanna-gym/components/CalendarSignup.tsx` - bare-minimum calendar email capture component
- `app/community/page.tsx` - community and contributor resource page
- `app/api/quiz-data/route.ts` - serverless route with GET (fetch questions) and POST (scoring) endpoints
- `lib/quiz.ts` - types, computeArchetype logic, and fallback templates
- `lib/questions.json` - canonical roast questions database
- `public/` - contains badge PNGs for the four archetypes
- `tailwind.config.ts` - theme configuration

---

## 4. What Each Page Does

`/` (Home)
- Presents the brand, value proposition, and entry points into the app.

`/quiz`
- Runs the 4-question diagnostic flow.
- Tracks answer selections and tallies scores across `gymScore`, `homeScore`, `boutiqueScore`, and `couchScore`.
- Shows a loading screen, then a blurred results screen.
- Submission of email unblurs results, revealing their dominant Archetype Roast, Gym Donation Index, custom CTA, and social share buttons.
- State is persisted in `localStorage`.

`/dashboard`
- Reads state from `localStorage`.
- Displays the user’s streak, capital saved, and detailed archetype roast.
- Shows the Gym Donation Index (projected 12-month membership waste).
- Includes daily check-in button and a persistent share card.

`/dont-wanna-gym`
- SEO-focused anti-gym destination site.
- Contains the Alternative Matrix to map user barriers to low-friction routines.
- Promotes a "Buy Only Two Things" zero-fluff affiliate gear curation pulled from `staticData.ts`.
- Captures emails for the "Bare Minimum Calendar" PDF download.

`/community`
- Lightweight onboarding page for new contributors.

---

## 5. Quiz Generation and Scoring

The quiz uses a hybrid 4-axis model:
- `lib/quiz.ts` defines `computeArchetype()`. It calculates the dominant score from `gymScore`, `homeScore`, `boutiqueScore`, and `couchScore` to select the archetype (January Idealist, Closet Athlete, Gym Crusader, Smoothie Socialite).
- `/api/quiz-data` (GET) responds with questions from `lib/questions.json` or AI fallback.
- `/api/quiz-data` (POST) tallies submitted answers and returns the archetype payload and dropoff probability.

If you update quiz behavior or questions, make sure to support the 4-axis structure.

---

## 6. Common Intern Tasks

### Updating the dashboard
- Ensure `gymornot_email`, `gymornot_gymScore`, `gymornot_homeScore`, `gymornot_boutiqueScore`, `gymornot_couchScore`, `gymornot_streak`, and `gymornot_last_checkin` are handled consistently between the quiz and dashboard.
- If you change the storage schema, update both pages.

### Running build checks
- Before submitting PRs, run `npm run build` locally to make sure TypeScript types and routing configurations compile cleanly.
