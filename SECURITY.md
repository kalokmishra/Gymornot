# GymOrNot Security Guide

This document describes security best practices for the GymOrNot repository and deployment.

## Local secret handling

- Never commit `.env.local` or any file containing secret values.
- Add `.env.local` to `.gitignore` if it is not already ignored.
- Store API keys and endpoint URLs only in local environment variables or secret managers.

## Environment variables

GymOrNot currently uses environment variables for optional AI integration.
- `GEN_AI_ENDPOINT`
- `GEN_AI_API_KEY`

Do not store these values in source control.

## GitHub secrets

For production deployment, use GitHub repository secrets instead of committing values.
The required Vercel-related secrets are:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Vercel deployment security

- Restrict Vercel project access to trusted maintainers.
- Keep deployment environment variables private and only set them in Vercel project settings.
- Use the smallest privilege token possible if Vercel supports scoped tokens.

## Dependency hygiene

- Regularly update dependencies and monitor for known vulnerabilities.
- Review `package.json` and `package-lock.json` before large dependency upgrades.
- Run audits if a vulnerability scanner is available:

```bash
npm audit
```

## Code review and PR security

- Review all pull requests for obvious security risks.
- Check for accidental secret exposure in code or markdown.
- Validate new routes and external integrations before merging.

## API and external requests

- The quiz route may call an external AI endpoint when configured.
- Confirm the endpoint is trusted and uses HTTPS.
- If untrusted content is returned, sanitize or validate it before rendering.

## Incident reporting

- If a secret is accidentally committed, rotate it immediately.
- If a production issue arises, notify maintainers and fix the secret or configuration promptly.
- Use private channels for security-sensitive communication.

## Security best practices

- Use HTTPS for all external endpoint calls.
- Avoid storing sensitive data in browser storage if possible.
- For the current app, only use `localStorage` for non-sensitive quiz state.

## Summary

GymOrNot is a small app, but security practices still matter:
- keep secrets out of source control
- use GitHub secrets and Vercel environment variables
- review external API usage carefully
- rotate secrets immediately on accidental exposure

Following these guidelines helps keep the project safe during development and deployment.