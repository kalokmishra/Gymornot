
Thank you for wanting to contribute to GymOrNot! We welcome bug reports, feature requests, documentation fixes, and code changes.

Getting started
- Fork the repository and create a feature branch from `main`.
- Clone your fork and install dependencies:

```bash
git clone https://github.com/<your-username>/Gymornot.git
cd Gymornot
npm install
```

- Run the development server:

```bash
npm run dev
# open http://localhost:3000
```

Branching & pull requests
- Create clear, focused branches: `feature/short-description` or `fix/short-description`.
- Push your branch to your fork and open a PR against `main` in this repository.
- In the PR description include: motivation, screenshots (if UI), and testing steps.

Code style & linting
- This project uses TypeScript, Tailwind CSS and Next.js. Follow the existing code patterns.
- Run the linter and fix issues before opening a PR:

```bash
npm run lint
```

Formatting
- We use Prettier-compatible formatting via the project's editor settings. Run a quick format if you change many files.

Testing
- There are no automated tests yet. If you add tests, include instructions in the PR and make sure they run locally.

PR checklist
- [ ] Title and description explain the change
- [ ] I ran `npm run dev` and verified the change locally
- [ ] I ran `npm run lint` and fixed issues
- [ ] The PR is scoped and small where possible

Commit messages
- Use clear, imperative commit messages. Conventional Commits (`feat:`, `fix:`, `docs:`) are encouraged.

Reporting issues
- Use the issue templates when opening bug reports or feature requests. Provide reproduction steps and expected behaviour.

Security
- For security issues, do not open a public issue. Contact the maintainer directly at the repository or use a private disclosure channel.

Maintainers
- The project maintainer is listed in `.github/CODEOWNERS`. If you need help, open an issue or mention the maintainers on your PR.

Thanks — we look forward to your contributions!

## CI & automated checks
- GitHub Actions runs lint, build, and tests (if present) on pushes and pull requests via `.github/workflows/ci.yml`.
- Fix lint and build issues reported by CI before requesting review.

## Vercel deployment
- Automatic Vercel deploys are configured in `.github/workflows/vercel-deploy.yml`.
- This workflow requires the repository secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`.

## Welcome & community automation
- First-time contributors receive a friendly checklist comment posted by `.github/workflows/welcome-first-timer.yml` when they open a new issue or PR.

## Release process
- We maintain a draft release for milestone updates (currently `v0.1.0`). To propose a release, open a PR describing the changes you want included.
- Release assets (e.g., `GymOrNot_poster.pdf`) are attached to releases by maintainers via the GitHub Releases UI.

## Local build & test commands
```bash
# install
npm install

# dev server
npm run dev

# build locally
npm run build

# lint
npm run lint

# run tests (if added)
npm test --if-present
```
