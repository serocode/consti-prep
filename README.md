# 1Law-C · Finals practice

Six subjects in one app:

- **Consti I** (`/`): practice finals problems in the ALAC format (Answer, Legal Basis, Application, Conclusion), then check yourself against the reference answer and the bar's 0–5 rubric.
- **Crim Law I** (`/crimlaw`): finals kit for RPC Book One, Arts. 16–113, in the professor's format: enumerations with a brief explanation of each item, definitions of terms, and ALAC scenario problems, plus a written mock exam and a numbers self-test.
- **PFR** (`/pfr`, hidden): not in the header until unlocked by typing `family` outside a text box or tapping the logo three times quickly (remembered per device in `alac-consti:pfr`; repeat to hide; direct links always work). A finals kit for the Family Code, Art. 74 to Other Provisions: tricky MCQs (every wrong choice explained, linked chains), ALAC problems, enumerations, definitions, case digests, distinctions, a past exam with checked keys, and an MCQ + ALAC mock exam.
- **Legal Philo** (`/philo`, hidden): not in the header until unlocked by typing `philo` outside a text box or tapping the logo four times quickly (remembered per device in `alac-consti:philo`; repeat to hide; direct links always work). A finals kit for Legal Philosophy Lessons 10 to 13 and the Philippine jurisprudence handouts, built for the professor's four question types (define, differentiate, critique, opinion): essay practice with short model answers and a formula self-check, definitions, enumerations, thinkers, case digests, differentiate tables and pairings, critiques, flashcards, and a four-essay mock exam.
- **StatCon** (`/statcon`): finals kit for Agpalo Chapters VI–XI in the professor's format: enumerations with a brief explanation of each item, definitions of terms, and scenario problems answered in ALAC, plus a written mock exam.
- **Crim Pro** (`/crimpro`): the Twist Kit for Rules 110–127. Twist-drill MCQ sets where each question changes one fact, color-coded rule cards, "one fact flips it" pairs, a numbers self-test, and a reason for every wrong choice.

## What every subject has

The content follows one study spec, in this order: **★ Exam focus → enumerations → definitions → case digests → numbers → scenarios / MCQs**.

- **★ Exam focus** (`/consti/focus`, `/crimlaw/focus`, `/crimpro/focus`, `/statcon/focus`): a ranked list of the 14–15 most likely questions, each labeled by type and topic and linked to practice, plus "★ Likely" flags with a one-line reason on about a quarter to a third of the content. The flags live in `src/lib/focus/*.ts`. Lists, definitions and flashcards have a "★ Likely only" filter.
- **Exam day** (`/exam-day`): one "If I go blank" routine for all subjects (with the first line for each answer format) and advice for typed exams in ExamSoft (Examplify). Subject guides keep only what is specific to them (chapter finder, penalty ladder, topic spotter).
- **Scope rules**: current law only (Crim Law's historical death-penalty lists are filtered out in `crimlaw.ts`); the Law part of every reference ALAC answer is written as "The Constitution provides…", "The law provides…" or "Jurisprudence provides…", with no section numbers or case names.

## Consti I

- **Case digests** (`/consti/cases`): Facts, Issue, Ruling and Doctrine for all 28 cases (`src/lib/data/consti-digests.json`; the doctrine is each case's `rule`). **Numbers** (`/consti/numbers`): every period, vote, age and count in the coverage.

- 112 problems: 28 case drills + 84 twin problems (same rule / twist), from the Consti I Recall Kit.
- Guided mode (four boxes with sentence starters) or full-answer mode.
- Self-check: your answer and the reference side by side, a five-item checklist that sets the rubric score, and a manual override.
- Try again: rebuild from memory with your last attempt and the fixes visible, then see attempt-vs-attempt changes.
- Progress, drafts and theme are saved in `localStorage` (key `alac-consti:v1`, kept from the app's old name so existing progress carries over). Export/import a JSON backup from the home page to move between devices.

## Finals kits (StatCon, Crim Law I)

Both subjects are built on one "finals kit" (`src/lib/kit.ts`): a subject supplies its groups (chapters or parts), enumerations, terms and ALAC problems, and every screen is shared (`src/lib/components/kit/`). Each kit keeps its own slice of the store (`store.statcon`, `store.crimlaw`: flashcard ratings, filters, the running mock exam, exam history). To add another subject in this format, build a `Kit` from its data and add thin route wrappers.

## PFR

- 78 enumerations, 40 definitions (`src/lib/data/pfr-terms.json`, AI-written), 44 case digests, 11 distinction tables, 102 MCQs, 75 ALAC problems (25 topics × 2 direct + 1 twist), 53 past-exam items (15 doubtful keys), and a numbers table.
- **MCQ drill** (`/pfr/mcq`): by topic (★ Likely / not answered / missed) or as 11 linked chains, where each step names the one fact that changed. Choices are shuffled (77 of the 102 answers are “B” in the source), except questions whose choices refer to other choices (“Both B and C”, “None of the choices”). Every wrong choice has a “Why not” (`src/lib/data/pfr-why.json`, one row per question, reasons for the wrong choices in order; checked at load).
- **Mock exam**: multiple choice (checked automatically, with a fixed per-exam shuffle) then ALAC problems (self-marked on the 0–5 rubric). Kits choose their exam parts with `examParts`.
- The source's “Article 36 / Article 147” Law part was rewritten without article numbers, per the ALAC rule.

## Crim Law I

- 91 enumerations, 76 terms, 63 ALAC problems (21 topics × 2 direct + 1 twist), filed under the seven parts of Arts. 16–113.
- The source kit used different part headings for enumerations, definitions and problems; everything is mapped onto the seven enumeration parts (by article number where there is one) so filters and the mock exam's part picker line up.
- Problems keep the source's seeded shuffle within each topic, so the twist is not always last; ids (`cl-accessory-3`) follow the original order. The practice screen shows the part, not the topic, so Random problem still trains spotting the issue.
- **Numbers**: penalty durations, fines (RA 10951), periods, degrees, prescription, GCTA and other figures, with a blur-and-tap self-test.
- **Answer guide**: the go-blank steps, the penalty computation ladder, answer templates, and a topic spotter that links to each topic's problems.

## StatCon

- 47 enumerations (211 items), 36 terms + 16 Latin maxims, 19 ALAC problems, 5 case digests, rules and traps per chapter.
- **Enumerations**: Recall mode (memory aid + empty numbered slots with Hint/Show) or Study mode (items, trap, model enumeration answer).
- **Definitions**: self-test that hides each definition, with a "don't confuse" note per term. The terms live in `src/lib/data/statcon-terms.json` (cited to the chapter, not a section number; verify against Agpalo).
- **ALAC problems** run on the same practice screen as Consti (`/statcon/p/sc-p1`): guided boxes with StatCon starters ("Jurisprudence provides that…"), the 0–5 rubric self-check, retries. Attempts share `attempts`/`drafts` in the store.
- **Mock exam**: Part I enumeration, Part II definitions, Part III ALAC problems, written; then self-marked against the model (ticks per enumeration item, got/partly/missed per term, 0–5 per problem). Marks feed the flashcard ratings. The exam is stored in `statcon.exam`, so a reload resumes it.
- **Flashcards**: enumerations, definitions, maxims and cases, weighted toward cards rated Blank/Shaky. Ratings (`statcon.ratings`) are shared with the Enumerations, Definitions and Cases tabs.

## Crim Pro

- 23 twist sets (148 questions), 18 rule cards, 21 flip pairs, 38 numbers.
- Choices are shuffled per question. The best score per set is saved in the same store (`crimpro.best`), so it is included in the backup export.
- Every wrong choice has a one-line "Why not" (`src/lib/data/crimpro-why.json`: per set, per question, the reasons for the wrong choices in order; checked against the questions at load).
- `/crimpro/rules#r114` opens a rule card directly (used by the drill summary's "Review Rule" links).
- Every answer is logged per question (`crimpro.q`, keyed `<set id>-<index>`): the drills tab shows questions answered, right-on-latest-try, misses, weakest topics and a Continue button.
- **Mock exam** (`/crimpro/exam`): random questions across all sets (or only misses, unseen, or one rule), 10/20/40/all, optional timer that auto-submits. Exam mode reveals answers at the end and allows changing answers; practice mode reveals after each. Results show a by-topic breakdown, a review list, and "Practice the ones I missed". The running session is stored (`crimpro.session`), so a reload resumes it; submitted exams go to `crimpro.exams`.
- Keys: A–D / 1–4 to answer, Enter or → for the next question, ← → to move in an exam.

## Stack

SvelteKit 2 · Svelte 5 (runes) · TypeScript · `@sveltejs/adapter-vercel`. Every route is prerendered (`ssr = false`, `prerender = true`), so Vercel serves static files only.

## Visitors

- **Footer counter** (`src/routes/api/visitors/+server.ts`, the app's only server code): counts each browser once (a flag in localStorage, no id or cookie sent) in an Upstash Redis key `visitors`. It needs `KV_REST_API_URL` and `KV_REST_API_TOKEN` (set by Vercel's Upstash integration) or `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`. Without them the API returns `null` and the counter stays hidden. Only same-origin POSTs count; this stops casual inflation, not a determined script.
- **Vercel Web Analytics** (`injectAnalytics` in `src/routes/+layout.svelte`): page views and visitors per page, visible in the Vercel dashboard once Analytics is enabled for the project.

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
src/lib/focus/                exam focus per subject: ranked likely questions and ★ Likely flags
src/lib/components/FocusView.svelte, NumberTable.svelte, CaseDigests.svelte, McqChoices.svelte, ConstiTabs.svelte   shared across subjects
src/routes/exam-day/          If I go blank + ExamSoft tips (all subjects)
src/routes/consti/            Consti exam focus, case digests, numbers
src/lib/kit.ts                finals-kit types (Kit, KitEnum, KitTerm, KitProblem, KitMcq, KitChain), color kinds, card keys
src/lib/mcq.ts                the Mcq type and the shuffle rule shared by Crim Pro and PFR
src/lib/digest.ts             the case-digest type shared by Consti, StatCon and PFR
src/lib/data/pfr*.json        PFR content, definitions, and wrong-choice reasons
src/lib/pfr.ts                the PFR kit (MCQs, chains, focus, digests, distinctions, past exam)
src/lib/kit-exam.ts           finals-kit written mock exam: build, mark, score
src/lib/data/statcon.json     StatCon enumerations, rules, traps, cases, maxims, ALAC problems
src/lib/data/statcon-terms.json  StatCon definitions of terms
src/lib/statcon.ts            the StatCon kit
src/lib/data/crimlaw.json     Crim Law I enumerations, definitions, ALAC problems, topic spotter
src/lib/crimlaw.ts            the Crim Law I kit
src/lib/rubric.ts             rubric bands, checklist, checklist → score
src/lib/store.svelte.ts       persisted state (localStorage), queries, backup
src/lib/text.ts               md() / esc() for **bold** notes
src/lib/components/           Practice, AlacEditor, SelfCheck, ScoreScale, Reference, AnswerView
src/lib/components/crimpro/   QuestionCard, TwistDrill, ExamSetup, ExamRun, ExamResults, RuleBody
src/lib/components/kit/       shared finals-kit screens: KitLayout, Overview, EnumerationsView, TermsView,
                              ProblemsView, ExamView (ExamSetup/Paper/Grade), DrillView, EnumBody, RateBar, GroupSeg
src/routes/+page.svelte       Consti home: progress, filters, problem list, backup
src/routes/p/[pid]/           one Consti problem
src/routes/crimpro/           Crim Pro tabs: focus, drills (+ drill/[set]), exam, rules, flips, numbers
src/routes/statcon/(kit)/     StatCon tabs (thin wrappers) + its own rules, cases, guide
src/routes/statcon/p/[pid]/   one StatCon ALAC problem (shared Practice screen)
src/routes/crimlaw/(kit)/     Crim Law tabs (thin wrappers) + its own numbers, guide
src/routes/crimlaw/p/[pid]/   one Crim Law ALAC problem (shared Practice screen)
src/routes/pfr/(kit)/         PFR tabs (thin wrappers) + its own distinctions, numbers, past exam, guide
src/routes/pfr/p/[pid]/       one PFR ALAC problem (shared Practice screen)
src/lib/philo.ts              the Legal Philo kit: question types, thinking moves, essay questions and model answers
src/lib/philo-content.ts      Legal Philo terms, enumerations, cases, thinkers, comparisons, critiques, focus
src/lib/components/philo/     ModelAnswer (model answer + formula self-check)
src/routes/philo/(kit)/       Legal Philo tabs: focus, essays, thinkers, compare, critiques, exam, guide + shared kit screens
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
