# GymOrNot Style Guide

This document defines the UI, code, and content conventions used in GymOrNot. Follow these standards to keep the app consistent and easy to maintain.

---

## Design Aesthetic

GymOrNot uses a **brutalist/editorial** visual identity — stark, high-contrast, and raw. The design deliberately rejects generic SaaS softness in favour of an industrial, "financial audit" feel that mirrors the brand's satirical tone.

Key aesthetic principles:
- **Sharp edges everywhere**: Use `rounded-none` by default. Never use `rounded-full` (pill shapes) for primary UI elements.
- **Borders over backgrounds**: Prefer `border border-zinc-800` or `border-2 border-zinc-800` over filled card backgrounds.
- **Monospace for data**: All labels, metadata, eyebrows, and ledger-style text use `font-mono`. Display headings use `font-display font-black`.
- **Typography does the hierarchy**: Use drastic scale contrasts (`text-8xl` vs `text-xs`) and weight contrasts (`font-black` vs `font-light`) instead of `uppercase` blankets.
- **`uppercase` is reserved** for: eyebrow labels, CTA button text, mono metadata lines. Do not apply it to long conversational copy.
- **Blueprint grid background** on analytical/diagnostic pages (quiz, community): `bg-[linear-gradient(to_right,#27272a_1px,transparent_1px)...] bg-[size:4rem_4rem]`.

---

## Code Style

### TypeScript
- Use explicit types for public functions and exported data.
- Prefer `type` or `interface` for shared models.
- Keep function names descriptive and consistent.
- Avoid `any` unless there is a strong justification.

### Components
- Keep components small and purposeful.
- Prefer a clear separation between layout, UI markup, and business logic.
- Use props to pass data down instead of relying on globals.
- Keep `app/` page files focused on the page-specific behaviour.

### Imports
- Import React and Next.js modules at the top of each file.
- Use absolute imports only when configured and obvious.
- Keep related imports grouped together.

---

## Tailwind / Styling

### Design Token Usage
Use the design tokens from `tailwind.config.ts` and `app/globals.css`:

| Token | Usage |
|---|---|
| `bg-void` / `#0A0A0A` | Page background |
| `bg-zinc-950` | Elevated dark surface (hero blocks, receipt panels) |
| `bg-zinc-900` | Dashed border document/receipt backgrounds |
| `border-hairline` / `border-zinc-800` | Standard borders |
| `text-ink` | Primary text |
| `text-zinc-400` / `text-zinc-500` | Secondary / mono label text |
| `text-zinc-600` / `text-zinc-700` | Dimmed metadata, footnotes |
| `text-brand-lime` | Primary accent (CTA, archetype names, streak values) |
| `text-brand-red` | Danger / financial damage / critical labels |
| `font-mono` | All data labels, eyebrows, ledger rows, terminal text |
| `font-display font-black` | All headings |

### Rounded Corners
- **`rounded-none`** — all interactive elements, cards, inputs, buttons, containers.
- **Never use `rounded-full`** for primary UI. It is only acceptable for the habit grid cells' dot decorators where explicitly required.
- **`rounded-2xl` / `rounded-3xl`** — deprecated in this codebase. Do not introduce.

### Button Patterns

**Primary CTA (sharp stamp):**
```jsx
<button className="bg-brand-lime text-void font-display font-black text-xs uppercase px-8 py-4 rounded-none hover:bg-white transition-colors">
  ACTION LABEL →
</button>
```

**Ghost / secondary (inline text link):**
```jsx
<a className="font-mono text-xs text-zinc-500 hover:text-ink underline-offset-4 hover:underline transition-colors">
  secondary action →
</a>
```

**Danger CTA:**
```jsx
<button className="bg-brand-red hover:bg-red-700 text-white font-display font-black text-sm uppercase px-8 py-4 rounded-none transition-colors">
  DANGER ACTION →
</button>
```

### Input Fields
```jsx
<input className="bg-void border border-zinc-700 w-full px-4 py-3 font-mono text-sm text-ink focus:outline-none focus:border-zinc-400 rounded-none placeholder:text-zinc-700" />
```

### Receipt / Ledger Rows
For any financial or data display, use:
```jsx
<div className="flex justify-between items-baseline py-2.5 border-b border-zinc-800">
  <span className="font-mono text-sm text-zinc-400">Label</span>
  <span className="font-mono text-sm font-bold text-ink tabular-nums">Value</span>
</div>
```

### Section Eyebrows
```jsx
<p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
  SECTION LABEL
</p>
```

### Header (all pages)
Flat, no blur:
```jsx
<header className="border-b border-hairline bg-void sticky top-0 z-50 px-6 py-4">
  <div className="max-w-6xl mx-auto flex justify-between items-center">
    <Link href="/" className="font-display font-black text-2xl text-brand-lime tracking-tight">
      GymOrNot<span className="text-brand-red">.</span>
    </Link>
    <Link href="..." className="font-mono text-xs text-zinc-400 hover:text-brand-lime transition-colors tracking-wider">
      Contextual link →
    </Link>
  </div>
</header>
```
- **No pill nav buttons on any page.** Each page shows a single contextual right-aligned mono text link only.

### CSS Structure
- Global styles belong in `app/globals.css`.
- Page-specific styles should remain in component markup.
- Avoid adding one-off custom CSS unless the desired effect cannot be achieved with Tailwind.

---

## Content Style

### Voice and Tone
- Satirical, raw, and brutally honest — like a financial audit or court filing against the user's gym habits.
- Keep copy short, direct, and a little ruthless.
- Maintain the brand's editorial personality: cold data labels, sardonic secondary copy, no corporate warmth.

### Grammar and Punctuation
- **Eyebrows and button labels:** `ALL CAPS MONO` (e.g., `ANNUAL FINANCIAL DAMAGE ASSESSMENT:`)
- **Headlines:** Mixed case or full caps depending on impact (e.g., `YOU DON'T GO.`)
- **Body / roast copy:** Sentence case, conversational, never uppercase.
- **Sarcastic secondary links:** All lowercase (e.g., `"no thanks, I prefer giving corporate gym chains free money."`)

### Accessibility
- Provide meaningful `aria-label` values for interactive controls where needed.
- Use semantic HTML elements (`button`, `main`, `section`, `header`).
- Ensure sufficient text contrast — `text-zinc-400` on `bg-void` is the minimum permitted.

---

## Page Structure Guidelines

### `/` (Homepage)
- Terminal counter bar directly below header (flat `border-b`, not a pill).
- Hero: massive display heading, sharp primary CTA stamp, plain mono ghost link below.
- Bento grid: 4 cards with varied padding, `rounded-none`, dashed receipt border on the `$44.50` card.
- Testimonials: "Exit Interview File" style with `border-t/b border-dashed` header strips.

### `/quiz`
- Blueprint grid background on `<main>`.
- Phase tracker and guilt meter in mono, above the question container.
- Question container: `border-2 border-zinc-800 rounded-none`.
- Answer options: full-width stacked rows, `border-b border-zinc-800`, `translate-x-1` hover.
- Loading states: terminal log text, no spinners.
- Result: dashed-border receipt layout for financial rows.

### `/dashboard`
- Hero score in full-bleed `bg-zinc-950` section — `$1,068` in massive `text-brand-red`.
- Receipt: `border-t border-b border-dashed border-zinc-700 bg-zinc-900` — `justify-between` ledger rows.
- 28-day habit grid: `grid-cols-7` of sharp squares, lime = active.
- Escape hatch: `border-2 border-red-900 bg-red-950/20` warning module at the bottom.

### `/dont-wanna-gym`
- `border-2 border-zinc-800 bg-zinc-950` hero.
- `AlternativeMatrix`: flat full-width barrier selectors (like quiz answer rows), numbered blueprint steps as ledger rows.
- `ResignationGenerator`: two-column flat layout; generated letter in `bg-zinc-900 border-dashed`.
- `CalendarSignup`: fused input+button row (no gap), `border border-zinc-700`.

### `/community`
- Blueprint grid background.
- Interlocking `border-l/r/t/b` link grid (no individual card borders).
- PR checklist as a dashed-border receipt.

---

## Component Naming

- Use descriptive file names for pages and components.
- Prefer names that reflect the component role:
  - `QuizPage`, `DashboardPage`, `CommunityPage`
  - `AlternativeMatrix`, `ResignationGenerator`, `CalendarSignup`, `ShareCard`

---

## Documentation Conventions

- Keep README and markdown docs up to date with the current app state.
- Use clear headings and short paragraphs.
- Prefer bullet lists for steps and feature summaries.
- Link to relevant files and routes whenever it helps the reader.

---

## Summary

GymOrNot's style is brutal, editorial, and consistent:
- `rounded-none` everywhere — no pills, no soft cards
- `font-mono` for all data/metadata, `font-display font-black` for headings
- `border-zinc-800` borders and `bg-zinc-900/zinc-950` surfaces for document-style containers
- Stacked full-width rows instead of grid tiles for interactive choices
- Terminal-style loading states, receipt-style financial layouts, ledger-style data rows
- A single contextual mono text link in the header — no pill nav on any page

Follow these rules when contributing so the project stays coherent and easy to extend.