# GymOrNot.com

GymOrNot is a playful digital self-assessment built to help visitors decide whether a traditional gym membership is the right choice or whether they should focus on home-based discipline instead. It combines a marketing-friendly landing experience with a risk diagnostic quiz, an in-browser habit dashboard, and a modern deployment workflow.

The app is built with:
- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- A lightweight serverless quiz generation and evaluation API route

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

The quiz generation and evaluation flow is:
1. Client-side code in `app/quiz/page.tsx` requests `GET /api/quiz-data` to get questions.
2. `app/api/quiz-data/route.ts` attempts to fetch generated quiz content from the configured `GEN_AI_ENDPOINT`.
3. If the AI route is unavailable or not configured, the route returns a fallback quiz built from `lib/quiz.ts` populated with blueprint-aligned roast questions in `lib/questions.json`.
4. As the user answers questions, scores are calculated across 4 axes: `gymScore`, `homeScore`, `boutiqueScore`, and `couchScore`.
5. The results screen computes their dominant **Archetype** (January Idealist, Closet Athlete, Gym Crusader, Smoothie Socialite) and calculates a **Gym Donation Index** (dropoff probability and projected 12-month wasted spend).
6. Once the email is submitted, results unblur and user scores are stored in `localStorage` for dashboard persistence.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Landing page with brand positioning, navigation, and calls to action |
| `/quiz` | 4-question gym discipline diagnostic with Archetype roasts, Gym Donation Index, email wall, and viral sharing |
| `/dashboard` | In-browser habit tracker displaying user's archetype roast, active streak, capital saved, donation index, and persistent CTA |
| `/community` | Contributor and community onboarding page with links to docs and issue guidance |

## Architecture and notes

- `app/` contains the App Router pages, layout, components, and the serverless route used by the quiz.
- `app/api/quiz-data/route.ts` contains the server-side routes (GET to fetch questions, POST to evaluate and score).
- `lib/quiz.ts` holds the fallback questions, the 4-axis archetype evaluation engine (`computeArchetype`), and quiz types.
- `lib/questions.json` contains the database of wince-inducing roast questions.
- `public/` stores static archetype badges.
- `localStorage` is used to persist the quiz email, streak, last check-in date, and the 4-axis scores.
- Styling and theme tokens are managed in `tailwind.config.ts`.
- No database is required for the current experience; the app is intentionally lightweight and client-first.
