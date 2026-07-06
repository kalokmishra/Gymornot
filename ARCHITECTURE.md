# GymOrNot Architecture

This document explains how GymOrNot is structured, how data flows through the app, and how the main features are implemented.

## High-level architecture

GymOrNot is a lightweight Next.js 14 App Router application built with TypeScript and Tailwind CSS. It is optimized for a frontend-first experience with a serverless route for quiz generation and scoring.

Key architecture elements:
- `app/` contains the page routes, the root layout, and the API routes.
- `app/api/quiz-data/route.ts` contains the server-side endpoints for fetching and scoring the quiz.
- `lib/quiz.ts` provides quiz data types, fallback question templates, the 4-axis `computeArchetype` logic, and helpers.
- Browser `localStorage` persists the user's email, scores across the 4 axes, streaks, and check-in date.

---

## Page flow

### `/` (Home)
The landing page introduces the product, framing it as an honest fitness decision assistant, and links to the `quiz` and `dashboard` pages.

### `/quiz`
The quiz page drives the diagnostic flow:
1. Requests `/api/quiz-data` to retrieve a 4-question pool with 4-axis scoring options.
2. The user answers the questions. Each answer maps to scores for `gymScore`, `homeScore`, `boutiqueScore`, and `couchScore`.
3. Once the 4 questions are answered, a loading screen runs calculations.
4. On the results screen:
   - The user sees their dominant **Archetype** (January Idealist, Closet Athlete, Gym Crusader, Smoothie Socialite) and a ruthless **roast paragraph**.
   - A **Gym Donation Index** panel shows their dropoff probability and projected 12-month wasted spend. This panel is blurred until the user submits their email.
   - Once email submission is complete, the results unblur, saving user details to `localStorage` and revealing archetype-specific affiliate/lead-gen CTAs and the **ShareCard** to challenge friends.

### `/dashboard`
The dashboard reads stored values from `localStorage` and displays:
- The user's diagnosed archetype name and full roast text.
- The **Donation Index** with their projected wasted capital.
- Active check-in streak and total saved capital.
- Persistent archetype-specific action plan CTA.
- A daily check-in button to build consistency.
- A persistent **ShareCard** to share their results.

### `/dont-wanna-gym`
The anti-gym destination site serving organic SEO traffic and quiz funnel drop-offs:
- Uses the `AlternativeMatrix` component to map the user's specific barrier ("no time", "gym anxiety", "hate sweating") to actionable, low-friction habits.
- Recommends zero-fluff gear combinations referencing `staticData.ts` items.
- Features the `CalendarSignup` component to capture emails and distribute the "Bare Minimum Calendar" printable PDF.

---

## Server-side route

### `app/api/quiz-data/route.ts`
- **GET**: Serves questions from `lib/questions.json` (or AI if configured) and shuffles options. Falls back to templates in `lib/quiz.ts` if needed.
- **POST**: Validates answers, tallies scores across all 4 axes, and returns the dominant archetype, dropoff probability, and selected options.

---

## Styling and theming

The app uses Tailwind CSS. Custom design tokens, colors (like `gym-green`, `anti-purple`, and Tailwind `amber-500` representing different archetypes), and fonts are managed in `tailwind.config.ts`.