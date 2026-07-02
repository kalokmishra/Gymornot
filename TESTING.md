# GymOrNot Testing Guide

This document describes the current testing approach for GymOrNot, recommended test strategies, and how to add tests to the project.

## Current status

GymOrNot does not currently include automated tests. This guide provides a path for adding tests in a maintainable way.

## Recommended test types

### Unit tests

Start by testing small units of logic:
- `lib/quiz.ts` fallback question builder
- score calculation and option weight handling
- any utility functions used by the quiz or dashboard

Suggested frameworks:
- Jest
- Vitest

### Component tests

Test the behavior of key page components, including:
- quiz loading and fallback behavior
- answer selection and score calculation in `app/quiz/page.tsx`
- dashboard state rendering based on `localStorage`
- main navigation and page rendering

Suggested frameworks:
- React Testing Library
- `@testing-library/react`

### Integration tests

Integration tests can verify page flow and user interactions:
- quiz question loading from `/api/quiz-data`
- email submission and result display
- dashboard persistence from `localStorage`

### End-to-end tests

If end-to-end testing is added later, consider:
- Cypress
- Playwright

These tests should cover the most important user journeys:
- taking the quiz
- saving the result
- viewing the dashboard

## Suggested test commands

If tests are added, the following npm scripts are recommended:

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest watch",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Adding tests step-by-step

1. Install the chosen testing dependencies:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

2. Add a `vitest.config.ts` or equivalent configuration file.
3. Add test files alongside the modules being tested, for example:
   - `lib/quiz.test.ts`
   - `app/quiz/page.test.tsx`
4. Run the tests and ensure they pass.

## Example test target areas

### `lib/quiz.ts`
- validate fallback quiz shape
- ensure question IDs are unique
- verify option scoring logic

### `app/quiz/page.tsx`
- assert the loading state when fetching questions
- verify fallback path works when the API route fails
- confirm answer selection updates state correctly

### `app/dashboard/page.tsx`
- simulate `localStorage` values and verify streak rendering
- ensure missing data shows the correct prompt or placeholder

## Test coverage goals

As test infrastructure is introduced, target the following coverage:
- 70% of utility logic
- 50% of page components initially
- incremental increases over time as features are added

## Documentation and CI

When tests are added, update `README.md` and `CONTRIBUTING.md` with the new test commands.

Also add the test command to the CI workflow in `.github/workflows/ci.yml` so tests run automatically on pushes and PRs.

## Summary

Testing should start small and focus on the most valuable logic paths:
- quiz fallback and scoring logic
- quiz flow behavior
- dashboard persistence

Adding tests will make future changes safer and easier to review.