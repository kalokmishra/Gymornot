# GymOrNot Deployment Guide

This document describes how to deploy GymOrNot, how the Vercel workflow works, and how to configure environment variables and repository secrets.

## Local deployment

To run locally:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Local environment variables

For local testing of the AI-powered quiz route, create a `.env.local` file at the project root:

```env
GEN_AI_ENDPOINT=https://your-gen-ai-endpoint.example.com
GEN_AI_API_KEY=your_api_key_here
```

If these variables are missing, the quiz API route will still work by returning a fallback quiz from `lib/quiz.ts`.

## Production deployment on Vercel

GymOrNot is configured to deploy automatically to Vercel using GitHub Actions.

### Required GitHub repository secrets

Set the following secrets in the GitHub repository settings:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### Deployment workflow

The workflow file is located at `.github/workflows/vercel-deploy.yml`.
It runs on pushes to `main` and deploys the latest commit to the connected Vercel project.

### Vercel project configuration

The linked Vercel project should be configured with:
- Framework preset: `Next.js`
- Root directory: project root
- Build command: `npm run build`
- Output directory: `.next`

If the AI quiz endpoint should be enabled in production, add the same environment variables to the Vercel project settings:
- `GEN_AI_ENDPOINT`
- `GEN_AI_API_KEY`

### Manual deploy using Vercel CLI

If you need to deploy manually, run:

```bash
npx vercel --prod
```

or, if the project is already linked:

```bash
npx vercel --prod --confirm
```

## Troubleshooting

### Build failures

- Run `npm run build` locally to reproduce the issue.
- Check `next.config.mjs` for any unsupported configuration values.
- Ensure all TypeScript errors are fixed.

### API route failures

- Confirm `GEN_AI_ENDPOINT` and `GEN_AI_API_KEY` are set if you want AI-generated quiz questions.
- If the API route cannot contact the external endpoint, it will fall back to `lib/quiz.ts` automatically.
- Inspect the Vercel function logs for runtime errors.

### Environment variable issues

- Never commit `.env.local` to the repository.
- Use GitHub secrets for production deployment.
- Use Vercel project environment variables for runtime values in production.

## Verification

After deployment, verify the app by visiting the live site and testing:
- the landing page
- the `/quiz` flow
- the `/dashboard` page
- the `/community` page

If the quiz fails to fetch generated questions, it should still render a fallback question set. This is the expected behavior when the AI route is unavailable.

## Summary

GymOrNot is designed to be easy to deploy and maintain:
- Local development with `npm run dev`
- Automatic Vercel deployment from `main`
- Environment variables for AI integration
- Safe fallback behavior when the external quiz endpoint is unavailable

Use this document whenever you need to onboard new deployers or troubleshoot release issues.

Admin & NextAuth environment variables
-------------------------------------
The project supports an admin console (NextAuth GitHub login) and server-side import/sync scripts. To enable and configure these features in local, CI, or Vercel environments, set the following environment variables.

Required for NextAuth (admin sign-in):

- `GITHUB_ID` — GitHub OAuth app client ID.
- `GITHUB_SECRET` — GitHub OAuth app client secret.
- `NEXTAUTH_SECRET` — secret used by NextAuth for signing and encryption.
- `ADMIN_USERS` — comma-separated list of admin email addresses allowed access (e.g. `alice@example.com,bob@example.com`).

Optional / script-related:

- `SHEET_ID` — Google Spreadsheet ID used by `scripts/sync_sheet.mjs` for automatic syncs.
- `SHEET_GID` — Google Sheet tab id (defaults to `0`).
- `VERCEL_TOKEN` — used for CLI deployments or CI-triggered deploys when the workflow needs to call Vercel directly.

Where to set these variables

- Local development: add them to `.env.local` (never commit this file).
- Vercel dashboard: Project Settings → Environment Variables — add each key for the appropriate environment (Preview/Production).
- GitHub Actions: add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` (already listed above) to the repository's Secrets; store `NEXTAUTH_SECRET` and any values required by CI as repository secrets as well.

Notes

- The admin console writes the canonical question file `lib/questions.json` during import operations; ensure your production runtime has appropriate file-writing permissions or perform imports via an authorized workflow that commits changes back to the repository.
- Audit entries for imports are appended to `logs/upload-audit.jsonl` (this file should be persisted or exported if you need long-term retention beyond a single deployment instance).