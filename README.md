# GymOrNot.com

A humorous diagnostic that tells you whether a gym membership is discipline or a donation. Built with Next.js 14 App Router, TypeScript, and Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Live demo: https://gymornot-five.vercel.app

### Local environment variables

The quiz can use a server-side Generative AI route when configured. Create `.env.local` with:

```env
GEN_AI_ENDPOINT=https://your-gen-ai-endpoint.example.com
GEN_AI_API_KEY=your_api_key_here
```

If these are not set, the quiz will fall back to the static question set in `lib/quiz.ts`.

### Vercel deployment

This repository includes an automated Vercel deployment workflow at `.github/workflows/vercel-deploy.yml`.

Add these secrets in GitHub to enable deploys:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Once configured, pushes to `main` deploy automatically.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vercel](https://img.shields.io/badge/deploy-vercel-black)
![CI](https://github.com/kalokmishra/Gymornot/actions/workflows/ci.yml/badge.svg)

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Landing page and main marketing entrypoint |
| `/quiz` | Quiz experience with AI-backed question generation and a final result screen |
| `/dashboard` | Streak tracker and habit dashboard powered by browser `localStorage` |
| `/community` | Contributor/community links and onboarding guidance |

## Notes

- The app uses a small server-side API route at `app/api/quiz-data/route.ts` to generate quiz questions.
- The fallback question set lives in `lib/quiz.ts` and is returned when the AI route fails or is not configured.
- Most content is static and maintained in `staticData.ts`.
- Browser `localStorage` is used for persistence of quiz email, risk score, streak state, and last check-in.
- Tailwind theme tokens are defined in `tailwind.config.ts`.

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

Quick links: [Community page](/community) · [Contributing](CONTRIBUTING.md) · [Code of Conduct](CODE_OF_CONDUCT.md)

What's new
- CI checks run on GitHub Actions via `.github/workflows/ci.yml`.
- Vercel deployment is automated with `.github/workflows/vercel-deploy.yml`.
- The quiz now supports a Gen AI-backed question generator with fallback.

Contributing quick start
1. Read [CONTRIBUTING.md](CONTRIBUTING.md) for workflow and local setup.
2. Open the app locally with `npm run dev`.
3. Submit PRs against `main`; CI will validate lint and build.
