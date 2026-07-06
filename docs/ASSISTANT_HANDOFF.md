# Coding Assistant Handoff

## Current status

- Branch: `main`
- Build status: `npm run build` passes successfully with zero compilation or type check errors.
- Deployment: Live on Vercel.

## What was fixed / Refactored (Blueprint Alignment)

We have successfully refactored the GymOrNot quiz application to align with the viral blueprint specifications:

1. **4-Axis Scoring Model**: Replaced the linear single-score calculation with a 4-axis model tracking:
   - `gymScore` (Gym Crusader)
   - `homeScore` (Closet Athlete)
   - `boutiqueScore` (Smoothie Socialite)
   - `couchScore` (January Idealist)
2. **Roast Questions Copy**: Replaced all generic questions in `lib/questions.json` with 10 blueprint-aligned, painfully detailed roast questions.
3. **Archetype Diagnosis Engine**: Implemented the `computeArchetype` evaluation helper in `lib/quiz.ts` returning customized roasts, share headlines, color states, and actions.
4. **Gym Donation Index (Financial projection)**: Added the avoidant score dropoff probability and 12-month projected wasted spend calculation. This is blurred on the results page until the user submits their email, and persistently shown on the dashboard.
5. **Archetype Affiliate CTAs**: Integrated specific action items (Kettlebell, adjustable dumbbells, ClassPass, Local Gyms) using placeholder redirect hashes.
6. **Viral Share Card**: Built `ShareCard.tsx` enabling users to copy their diagnosis text or tweet their personalized headline. Public badges have been saved to `/public`.

## Key files to review

- `lib/questions.json` — updated roast questions
- `lib/quiz.ts` — contains archetype scoring logic and types
- `app/api/quiz-data/route.ts` — updated GET and POST route handlers
- `app/quiz/page.tsx` — updated quiz results, financial panel, and email gate
- `app/dashboard/page.tsx` — updated streak dashboard, donation index, and persistent CTA
- `app/quiz/components/ShareCard.tsx` — reusable viral sharing component
- `public/` — badge assets

## Next steps for the incoming assistant

1. Run the app locally:
   ```bash
   npm run dev
   ```
2. Take the quiz to verify that different archetypes are reachable:
   - Choose all lazy answers -> *The January Idealist*
   - Choose home-workout / anxious answers -> *The Closet Athlete*
   - Choose all committed / lifting answers -> *The Gym Crusader*
   - Choose status / luxury answers -> *The Smoothie Socialite*
3. Replace the placeholder CTA links in `lib/quiz.ts` with real affiliate tracking links once ready.
