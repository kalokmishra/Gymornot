# GymOrNot.com

A humorous, brutally honest diagnostic that tells you whether you have the
discipline for a commercial gym membership — or whether you're a monthly
donor to a corporate gym chain. Built with Next.js 14 (App Router),
TypeScript, and Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Live demo: https://gymornot-five.vercel.app

### Vercel deployment

This repo now includes an automated Vercel deployment workflow at `.github/workflows/vercel-deploy.yml`.

To enable it, add these repository secrets in GitHub:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Once secrets are configured, pushes to `main` will deploy the app automatically.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vercel](https://img.shields.io/badge/deploy-vercel-black)
![CI](https://github.com/kalokmishra/Gymornot/actions/workflows/ci.yml/badge.svg)

## Pages

| Route | Purpose |
| --- | --- |
| `/` | The landing fork — split-screen choice between the two routes, plus a floating button into the quiz |
| `/quiz` | The 4-question risk diagnostic, with a loading sequence and an email-gated archetype result |
| `/gym-trap` | The gym contract registry — notice periods, billing methods, and the catch clauses |
| `/dont-wanna-gym` | The home-equipment sanctuary — filterable by footprint and motivation level |
| `/dashboard` | The 1% Club — daily execution streak tracker and Capital Saved Index |

## Notes

- All data lives in `src/data/staticData.ts` — no backend, no database, no
  fetches. Swap the `affiliateUrl` fields for real affiliate links when
  ready.
- The quiz and dashboard use `localStorage` in the browser to persist the
  captured email, risk score, execution streak, and last-execution date.
  There is no server-side persistence — clearing site data resets progress.
- Colors and type are defined as design tokens in `tailwind.config.ts`
  (`gym-green`, `anti-purple`, `void`, `surface`, `alert`, `ink`) so the
  palette stays consistent across pages.

## Contributing

Thanks for your interest in contributing! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to report issues, propose changes, and submit pull requests.

If you're new, a great first step is: fork the repo, run the app locally, and open a small PR with an improvement to the README or a UI tweak.

Quick links: [Community page](/community) · [Contributing](CONTRIBUTING.md) · [Code of Conduct](CODE_OF_CONDUCT.md)

What's new
- CI & checks: GitHub Actions now runs linting, builds, and tests (if present) on pushes and pull requests via `.github/workflows/ci.yml`.
- Welcome workflow: first-time contributors receive a friendly checklist comment on new issues/PRs (`.github/workflows/welcome-first-timer.yml`).
- Community page: an in-app `Community` page helps contributors find docs and open issues quickly (`/community`).
- Draft release: a draft release `v0.1.0` is available. See the Releases tab for details.
- Poster: a printable poster `GymOrNot_poster.pdf` is included in the repo for promotional use.

Contributing quick start
1. Read [CONTRIBUTING.md](CONTRIBUTING.md) for workflow and local setup.
2. Visit the in-app [Community page](/community) for links to templates and issue creation.
3. Open issues or PRs; CI will run automatically to validate lint/build steps.
