# GymOrNot API Reference

This document describes the API route used by GymOrNot, its contract, and how it integrates with the quiz flow.

## API route overview

GymOrNot exposes a single server-side API route for quiz data:

- `GET /api/quiz-data`

This route is implemented in `app/api/quiz-data/route.ts`.

## Purpose

The API route exists to support the quiz page with question content. It is designed to:
- use an external AI endpoint when configured
- return a structured question payload to the client
- provide fallback content when external generation is unavailable

## Request

The quiz page calls the route with a standard `GET` request.

Example:

```js
fetch('/api/quiz-data')
```

No request body or query parameters are currently required.

## Response

The route returns JSON in the following shape:

```json
{
  "questions": [
    {
      "id": "string",
      "question": "string",
      "options": [
        { "id": "string", "label": "string", "weight": number }
      ]
    }
  ]
}
```

Each question object includes:
- `id` — a unique question identifier
- `question` — the question text shown to the user
- `options` — an array of answer options

Each option includes:
- `id` — a unique option identifier
- `label` — the answer text
- `weight` — an impact value used for score calculation

## Env vars and AI integration

The route supports optional AI-backed generation through two environment variables:

- `GEN_AI_ENDPOINT`
- `GEN_AI_API_KEY`

If both variables are available, the route attempts to fetch questions from the external AI endpoint. If the request succeeds and returns valid data, that data is forwarded to the client.

If the external call fails, or if the environment variables are missing, the route uses fallback quiz content defined in `lib/quiz.ts`.

## Fallback behavior

Fallback behavior is intentionally built into the route so the app remains functional in all environments.

Fallback logic details:
- `lib/quiz.ts` defines `QuizQuestion` and `QuizOption` structures.
- It provides static question templates for the quiz.
- The route returns these questions when the AI integration is unavailable.

## Extending the API

To extend the API or add new behavior:
1. Update `app/api/quiz-data/route.ts`.
2. Add request validation if new query parameters or body data are needed.
3. Update the response shape and the client-side consumer in `app/quiz/page.tsx`.
4. Add a corresponding test entry if tests are introduced.

## Logging and error handling

The route handles failures by logging or returning fallback data rather than stopping the quiz flow.

In production deployments, use the hosting provider logs (for example, Vercel function logs) to inspect API failures.

## Future improvements

Possible API enhancements include:
- support for query parameters to customize quiz difficulty
- authenticated routes for premium experience tracking
- a persistent backend to store quiz results beyond `localStorage`
- structured telemetry for request success/failure metrics

## Summary

The `/api/quiz-data` route is the key server-side piece in the quiz flow. It supports AI-backed generation while providing safe fallback questions so the quiz experience remains consistent across local development and production.