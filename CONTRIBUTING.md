
Thank you for wanting to contribute to GymOrNot! We welcome bug reports, feature requests, documentation improvements, and code changes.

## Getting started
- Fork the repository and create a branch from `main`.
- Clone your fork and install dependencies:

```bash
git clone https://github.com/<your-username>/Gymornot.git
cd Gymornot
npm install
```

- Run the local development server:

```bash
npm run dev
# open http://localhost:3000
```

## Branching & pull requests
- Use clear branch names like `feature/quiz-copy-update` or `fix/dashboard-state-bug`.
- Push your branch to your fork and open a pull request against `main`.
- In the PR description, include:
  - What changed
  - Why you changed it
  - How to test it
  - Screenshots for UI changes

## Code style & linting
- The project uses TypeScript, Tailwind CSS, and Next.js.
- Follow the existing code patterns and file organization.
- Run the linter before opening a PR:

```bash
npm run lint
```

- Address any reported issues and ensure your changes are clear and maintainable.

## Formatting
- Use the project’s Prettier-compatible formatting settings.
- If you update multiple files, run formatting or use your editor’s auto-format feature.

## Testing
- There are no automated tests yet.
- If you add tests, include instructions for running them in the PR description.

## PR checklist
- [ ] The title and description clearly explain the change
- [ ] I ran `npm run dev` and verified the change locally
- [ ] I ran `npm run lint` and fixed issues
- [ ] The PR is scoped and small where possible
- [ ] Documentation was updated if behavior or structure changed

## Commit messages
- Use clear, imperative commit messages.
- Conventional commit prefixes are encouraged, for example:
  - `feat: add AI quiz generation route`
  - `fix: correct dashboard localStorage logic`
  - `docs: expand README with deployment details`

## Reporting issues
- Use the issue templates for bug reports and feature requests.
- Provide reproduction steps, expected behavior, and actual behavior.

## Security
- Do not open a public issue for security vulnerabilities.
- Contact the maintainer directly or use a private disclosure channel.

## Maintainers
- Maintainers are listed in `.github/CODEOWNERS`.
- If you need help, open an issue or mention maintainers on your PR.

## CI & automated checks
- GitHub Actions runs lint and build checks on pushes and pull requests via `.github/workflows/ci.yml`.
- Fix any CI failures before requesting review.

## Vercel deployment
- Automatic Vercel deploys are configured in `.github/workflows/vercel-deploy.yml`.
- This workflow requires GitHub secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`.
- Successful pushes to `main` deploy to the connected Vercel project.

## Welcome & community automation
- First-time contributors receive a friendly checklist comment from `.github/workflows/welcome-first-timer.yml` when opening a new issue or PR.

## Release process
- We maintain a draft release for milestone updates (currently `v0.1.0`).
- To propose a release, open a PR describing the changes and why they matter.
- Release assets such as `GymOrNot_poster.pdf` are attached by maintainers through GitHub Releases.

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

Thanks — we look forward to your contributions!
