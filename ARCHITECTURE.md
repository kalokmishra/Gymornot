# GymOrNot Architecture

This document explains how GymOrNot is structured, how data flows through the app, and how the main features are implemented.

## High-level architecture

GymOrNot is a lightweight Next.js 14 App Router application built with TypeScript and Tailwind CSS. It is optimized for a frontend-first experience with a small serverless route for quiz generation.

Key architecture elements:
- `app/` contains the page routes, the root layout, and the API route.
- `app/api/quiz-data/route.ts` is the server-side endpoint used by the quiz page.
- `lib/quiz.ts` provides quiz data types, fallback question generation, and helper logic.
- `staticData.ts` stores structured static content that is rendered by the UI.
- Browser `localStorage` persists quiz and dashboard state in the client.

## Page flow

### `/`

The landing page is the main marketing entry point. It introduces the product and links to the `quiz`, `dashboard`, and `community` pages.

### `/quiz`

The quiz page is the most dynamic part of the app:
1. The page renders client-side and begins in a loading state.
2. It requests `/api/quiz-data` to retrieve a question payload.
3. The server route attempts to fetch generated quiz content from the configured AI endpoint.
4. If the request fails or environment variables are missing, the route returns a static fallback defined in `lib/quiz.ts`.
5. The quiz page shows four questions, tracks user answers, calculates a risk score, and then displays a result.
6. On result submission, the page optionally stores the user email and quiz score in `localStorage`.

### `/dashboard`

The dashboard reads persisted values from browser storage and displays:
- the current user streak
- the last check-in date
- the calculated risk score
- any available user email or result status

This page is designed to work without a backend database by relying on local persistence.

### `/community`

The community page provides links to contributor docs, issue templates, and onboarding resources. It is primarily static content meant to help new collaborators understand the repo.

## Server-side route

### `app/api/quiz-data/route.ts`

This route is a serverless endpoint that supports the quiz page. It is responsible for:
- checking whether `GEN_AI_ENDPOINT` and `GEN_AI_API_KEY` are configured
- requesting AI-generated quiz questions when possible
- falling back to the built-in quiz content in `lib/quiz.ts` when necessary
- returning a JSON payload with the quiz question metadata

This approach allows the app to support richer question generation while maintaining graceful fallback behavior.

## Data model and fallback logic

### `lib/quiz.ts`

This module defines:
- `QuizQuestion` and `QuizOption` types
- a question builder function for fallback content
- a set of static fallback quiz templates

The fallback logic exists so the app remains functional even if the AI integration is not available.

## Styling and theming

The app uses Tailwind CSS for styling. Custom theme values are defined in `tailwind.config.ts`, including colors, spacing, and typography. The pages use utility classes and consistent design tokens to maintain a coherent visual language.

## Deployment and runtime

GymOrNot is deployed on Vercel through the GitHub Actions workflow `.github/workflows/vercel-deploy.yml`. The app is hosted as a serverless Next.js deployment with support for the API route and static pages.

## Summary

GymOrNot is intentionally simple and robust:
- a modern frontend experience using Next.js App Router
- a serverless AI-backed quiz route with fallback behavior
- static content in `staticData.ts`
- client persistence via `localStorage`
- automated deployment to Vercel

The architecture supports both development and production use cases while keeping the codebase easy to understand and maintain.