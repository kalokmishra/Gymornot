# GymOrNot Roadmap

This document captures the planned improvements, feature ideas, and future priorities for GymOrNot.

## Current state

GymOrNot is a small Next.js App Router site with:
- a landing page
- a four-question quiz flow
- a dashboard for streak tracking
- a community page
- an AI-backed quiz generation route with fallback logic

## Short-term priorities

1. Improve quiz content quality
   - refine fallback questions in `lib/quiz.ts`
   - make generated quiz prompts more targeted
   - add additional result archetypes and outcome copy

2. Add better error handling
   - surface API fallback status clearly to users
   - verify the quiz route gracefully handles network and validation errors

3. Add automated tests
   - unit tests for `lib/quiz.ts`
   - component tests for quiz and dashboard pages
   - CI integration for test execution

4. Improve documentation
   - expand developer docs
   - add onboarding guides for new contributors
   - document deployment and environment setup

## Medium-term priorities

1. Add persistent backend support
   - store quiz results in a database
   - enable authenticated user sessions
   - support result history and analytics

2. Add user personalization
   - adapt quiz questions by user profile
   - support saved preferences and repeat assessments

3. Expand dashboard features
   - add habit reminders and goal tracking
   - provide trend charts or progress summaries
   - support multiple streak categories

4. Improve accessibility
   - run an accessibility audit
   - ensure keyboard navigability
   - add ARIA attributes and semantic markup where needed

## Long-term priorities

1. Add multi-page onboarding
   - give users a clearer path from quiz to action
   - add guided next steps based on their result

2. Add marketing and conversion tracking
   - integrate analytics for quiz completion and dashboard engagement
   - add UTM support for campaign tracking

3. Build community features
   - create a discussion or feedback section
   - add contributor showcase or team attribution

## Nice-to-have ideas

- multi-language support
- dark mode option
- AI-powered explanation copy for quiz results
- printable PDF summary of the quiz result
- integrations with fitness or habit tracking tools

## Maintenance tasks

- keep dependencies up to date
- periodically verify Vercel deployment configuration
- update documentation whenever architecture or workflow changes

## How to use this roadmap

This roadmap is intended to help contributors understand the current priorities and the next planned improvements. Use it to:
- choose a feature or bugfix to work on
- align PRs with the project direction
- identify useful documentation and testing work

If you add a new feature or start a new initiative, update this roadmap to keep priorities clear.