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
