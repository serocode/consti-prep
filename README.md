# ALAC · Consti I practice

Practice Consti I finals problems in the ALAC format (Answer, Legal Basis, Application, Conclusion), then check yourself against the reference answer and the bar's 0–5 rubric.

- 112 problems: 28 case drills + 84 twin problems (same rule / twist), from the Consti I Recall Kit.
- Guided mode (four boxes with sentence starters) or full-answer mode.
- Self-check: your answer and the reference side by side, a five-item checklist that sets the rubric score, and a manual override.
- Try again: rebuild from memory with your last attempt and the fixes visible, then see attempt-vs-attempt changes.
- Progress, drafts and theme are saved in `localStorage` (key `alac-consti:v1`). Export/import a JSON backup from the home page to move between devices.

## Stack

SvelteKit 2 · Svelte 5 (runes) · TypeScript · `@sveltejs/adapter-vercel`. Every route is prerendered (`ssr = false`, `prerender = true`), so Vercel serves static files only.

## Run locally

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm check        # type check
pnpm build && pnpm preview
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project**, import the repo. The framework is detected as SvelteKit; keep the defaults (install `pnpm install`, build `pnpm build`).
3. Deploy. Or from the CLI: `pnpm dlx vercel` then `pnpm dlx vercel --prod`.

## Project map

```
src/lib/data/consti.json      cases, twin problems, reference ALAC answers
src/lib/problems.ts           builds the 112 problems and their ids (/p/marcos-t1)
src/lib/rubric.ts             rubric bands, checklist, checklist → score
src/lib/store.svelte.ts       persisted state (localStorage), queries, backup
src/lib/components/           Practice, AlacEditor, SelfCheck, ScoreScale, Reference, AnswerView
src/routes/+page.svelte       home: progress, filters, problem list, backup
src/routes/p/[pid]/           one problem
```

## Rubric → checklist

| Checklist | Score |
|---|---|
| Blank answer | 0 |
| Wrong conclusion, weak reasoning | 1 |
| Wrong conclusion, sound reasoning | 2 |
| Right conclusion, basis wrong/missing or mixed with a wrong basis | 3 |
| Right conclusion and basis, not polished | 4 |
| Right conclusion and basis, polished | 5 |

To add another subject, add its data file and point `problems.ts` at it.
