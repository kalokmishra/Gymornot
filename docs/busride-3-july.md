BusRide — 3 July 2026
======================

Summary
-------
Log of development actions performed on 3 July 2026 (workspace: Gymornot).

Key outcomes
------------
- Implemented a versioned questionnaire repository (`lib/questions.json`) and made the app serve randomized questions/options.
- Added scoring endpoint and normalized scoring pipeline.
- Built a minimal admin flow: password login, NextAuth scaffold, CSV import, Google Sheets import, preview, audit logging, and sync scripts.
- Added developer utilities: importer, sync script, sanity-check script, and intern workflow + PR template.

Files added or changed (high level)
---------------------------------
- `lib/questions.json` — starter question set (seed data).
- `lib/quiz.ts` — fallback questions, shuffle helper (updated earlier to be used).
- `app/api/quiz-data/route.ts` — GET now serves randomized questions; POST scores answers.
- `scripts/import_from_google_sheet.mjs` — CSV importer from Google Sheets export URL.
- `scripts/sync_sheet.mjs` — periodic sync script for configured sheet id.
- `scripts/sanity_check.mjs` — local sanity check for randomization and scoring (executed).
- `middleware.ts` — protects `/admin` and `/api/admin` routes; supports NextAuth token check and legacy cookie fallback; allows login/logout API.
- `app/api/auth/[...nextauth]/route.ts` — NextAuth scaffold (GitHub provider placeholder).
- `app/api/admin/*` — admin APIs added:
  - `login/route.ts`, `logout/route.ts` — simple password login/logout (sets `admin_session` cookie).
  - `upload/route.ts` — CSV upload endpoint (parses and writes `lib/questions.json`) + audit entry.
  - `preview/route.ts` — parse-only preview endpoint for CSV.
  - `import-sheet/route.ts` — import from Google Sheets by `id`+`gid` (preview and confirm modes).
  - `sync/route.ts` — manual sync endpoint using `SHEET_ID`/`SHEET_GID` env vars.
  - `audit/route.ts` and `audit/raw/route.ts` — audit viewer and raw download.
- `app/admin/*` — admin UI pages:
  - `page.tsx` — admin console (preview/import/upload/sheet sync, checklist, audit link).
  - `login/page.tsx` — simple password login UI.
  - `auth-callback/page.tsx` — NextAuth callback helper.
  - `audit/page.tsx` — audit viewer page.
- `docs/INTERN_QUESTIONNAIRE_WORKFLOW.md` — intern-facing step-by-step workflow.
- `.github/PULL_REQUEST_TEMPLATE.md` — PR template for commits after imports.

Commands run / dev notes
------------------------
- Installed dependencies: `npm install` (added `next-auth`).
- Started dev server: `npm run dev`.
- Ran sanity check: `node scripts/sanity_check.mjs` (passed locally).
- Tested endpoints with `curl` and local browser:
  - `GET /api/quiz-data` (randomized questions)
  - `POST /api/quiz-data` (scoring)
  - Admin login flow (`POST /api/admin/login`) and admin pages.

Environment variables used / recommended
--------------------------------------
- `ADMIN_PASSWORD` — default `admin123` (used for password fallback). Change in production.
- `GITHUB_ID`, `GITHUB_SECRET` — for NextAuth GitHub provider.
- `NEXTAUTH_SECRET` — required for NextAuth token operations.
- `ADMIN_USERS` — comma-separated admin emails used by middleware to allow NextAuth users.
- `SHEET_ID`, `SHEET_GID` — optional env vars for periodic sync.

Notes, caveats & next steps
--------------------------
- The admin flow currently supports a legacy cookie-based login fallback and NextAuth. For production, set NextAuth envs and remove the cookie fallback.
- Audit file is newline-delimited JSON at `logs/upload-audit.jsonl` (created on first import/sync/upload).
- Recommended next work:
  1. Add unit & e2e tests for selection strategies and scoring.
  2. Harden authentication (NextAuth + RBAC) and remove cookie fallback.
  3. Add category-weighted scoring and tests.
  4. Add UI polish for admin flows and CSV validation feedback.

If anything here looks incorrect or you want additional detail (e.g., diffs or commit PR), say which area and I'll produce it.
