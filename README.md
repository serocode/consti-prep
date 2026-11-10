# ALAC · Finals practice

Two subjects in one app:

- **Consti I** (`/`): practice finals problems in the ALAC format (Answer, Legal Basis, Application, Conclusion), then check yourself against the reference answer and the bar's 0–5 rubric.
- **Crim Pro** (`/crimpro`): the Twist Kit for Rules 110–127. Twist-drill MCQ sets where each question changes one fact, color-coded rule cards, "one fact flips it" pairs, a numbers self-test, and an MCQ reset checklist.

## Consti I

- 112 problems: 28 case drills + 84 twin problems (same rule / twist), from the Consti I Recall Kit.
- Guided mode (four boxes with sentence starters) or full-answer mode.
- Self-check: your answer and the reference side by side, a five-item checklist that sets the rubric score, and a manual override.
- Try again: rebuild from memory with your last attempt and the fixes visible, then see attempt-vs-attempt changes.
- Progress, drafts and theme are saved in `localStorage` (key `alac-consti:v1`). Export/import a JSON backup from the home page to move between devices.

## Crim Pro

- 23 twist sets (148 questions), 18 rule cards, 21 flip pairs, 38 numbers.
- Choices are shuffled per question. The best score per set is saved in the same store (`crimpro.best`), so it is included in the backup export.
- `/crimpro/rules#r114` opens a rule card directly (used by the drill summary's "Review Rule" links).
- Every answer is logged per question (`crimpro.q`, keyed `<set id>-<index>`): the drills tab shows questions answered, right-on-latest-try, misses, weakest topics and a Continue button.
- **Mock exam** (`/crimpro/exam`): random questions across all sets (or only misses, unseen, or one rule), 10/20/40/all, optional timer that auto-submits. Exam mode reveals answers at the end and allows changing answers; practice mode reveals after each. Results show a by-topic breakdown, a review list, and "Practice the ones I missed". The running session is stored (`crimpro.session`), so a reload resumes it; submitted exams go to `crimpro.exams`.
- Keys: A–D / 1–4 to answer, Enter or → for the next question, ← → to move in an exam.

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
src/lib/data/crimpro.json     Crim Pro rules (R), twist sets (S), flips (F), numbers (N)
src/lib/problems.ts           builds the 112 problems and their ids (/p/marcos-t1)
src/lib/crimpro.ts            Crim Pro types and lookups
src/lib/crimpro-exam.ts       Crim Pro question pools, exam/practice sessions, progress
src/lib/rubric.ts             rubric bands, checklist, checklist → score
src/lib/store.svelte.ts       persisted state (localStorage), queries, backup
src/lib/text.ts               md() / esc() for **bold** notes
src/lib/components/           Practice, AlacEditor, SelfCheck, ScoreScale, Reference, AnswerView
src/lib/components/crimpro/   QuestionCard, TwistDrill, ExamSetup, ExamRun, ExamResults, RuleBody
src/routes/+page.svelte       Consti home: progress, filters, problem list, backup
src/routes/p/[pid]/           one Consti problem
src/routes/crimpro/           Crim Pro tabs: drills (+ drill/[set]), exam, rules, flips, numbers, reset
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
