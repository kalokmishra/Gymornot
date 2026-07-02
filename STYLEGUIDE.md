# GymOrNot Style Guide

This document defines the UI, code, and content conventions used in GymOrNot. Follow these standards to keep the app consistent and easy to maintain.

## Code style

### TypeScript
- Use explicit types for public functions and exported data.
- Prefer `type` or `interface` for shared models.
- Keep function names descriptive and consistent.
- Avoid `any` unless there is a strong justification.

### Components
- Keep components small and purposeful.
- Prefer a clear separation between layout, UI markup, and business logic.
- Use props to pass data down instead of relying on globals.
- Keep `app/` page files focused on the page-specific behavior.

### Imports
- Import React and Next.js modules at the top of each file.
- Use absolute imports only when configured and obvious.
- Keep related imports grouped together.

## Tailwind / styling

### Utility usage
- Use Tailwind utility classes directly in JSX for layout and spacing.
- Prefer existing design tokens from `tailwind.config.ts`.
- Avoid creating deeply nested class strings; split complex sections into smaller components.

### Theme tokens
- Use the theme color palette from `tailwind.config.ts`.
- Standard token names should be used across the app, for example:
  - `bg-gym-green`
  - `text-ink`
  - `border-surface`

### CSS structure
- Global styles belong in `app/globals.css`.
- Page-specific styles should generally remain in the component markup.
- Avoid adding one-off custom CSS unless the desired effect cannot be achieved with Tailwind.

## Content style

### Voice and tone
- Use conversational, direct language.
- Keep copy short, clear, and action-oriented.
- Maintain the playful, slightly irreverent brand tone used in the quiz and landing copy.

### Grammar and punctuation
- Use sentence case for headings and button labels.
- Keep UI labels concise and straightforward.
- Avoid jargon or unclear phrasing.

### Accessibility
- Provide meaningful `aria-label` values for interactive controls where needed.
- Use semantic HTML elements (`button`, `main`, `section`, `header`, `nav`).
- Ensure text contrast is sufficient for readability.

## Page structure guidelines

### `/quiz`
- Keep the flow linear and easy to follow.
- Show a clear question prompt, answer options, and progress feedback.
- Keep the result screen focused on the outcome and next action.

### `/dashboard`
- Display streak and status data clearly.
- Keep the layout clean and easy to scan.
- Use visual separation for different dashboard sections.

### `/community`
- Use headings to separate contributor resources, issue guidance, and helpful links.
- Keep the page focused on onboarding and support.

## Component naming

- Use descriptive file names for pages and components.
- Prefer names that reflect the component role, for example:
  - `QuizPage`
  - `DashboardPage`
  - `CommunityPage`

## Documentation conventions

- Keep README and markdown docs up to date with the current app state.
- Use clear headings and short paragraphs.
- Prefer bullet lists for steps and feature summaries.
- Link to relevant files and routes whenever it helps the reader.

## Summary

GymOrNot style is clean, practical, and consistent:
- small page-focused components
- Tailwind utility-first styling with theme tokens
- a conversational copy style
- strong emphasis on readability and maintainability

Follow these rules when contributing so the project stays coherent and easy to extend.