import { cardKey, index, type Kit, type KitMcq } from './kit';
import { canShuffle } from './mcq';
import { sample } from './crimpro';
import { logKitExam, type KitExam, type KitItem } from './store.svelte';

/**
 * Points per answer: one per enumeration item, 2 per definition (got / partly / missed), 1 per MCQ (checked
 * automatically), 5 per ALAC problem (the rubric).
 */
export const TERM_POINTS = 2;
export const PROB_POINTS = 5;

export const itemKey = (it: KitItem) => `${it.kind}:${it.id}`;
/** Where each enumeration item's tick is stored in `marks`. */
export const tickKey = (it: KitItem, i: number) => `${itemKey(it)}#${i}`;

// Lookups per kit, built once.
type Lookup = {
	enums: Record<string, Kit['enums'][number]>;
	terms: Record<string, Kit['terms'][number]>;
	probs: Record<string, Kit['problems'][number]>;
	mcqs: Record<string, KitMcq>;
};
const cache = new WeakMap<Kit, Lookup>();
function lookup(kit: Kit) {
	let c = cache.get(kit);
	if (!c)
		cache.set(kit, (c = { enums: index(kit.enums, 'id'), terms: index(kit.terms, 'id'), probs: index(kit.problems, 'pid'), mcqs: index(kit.mcqs ?? [], 'id') }));
	return c;
}
export const enumOf = (kit: Kit, it: KitItem) => lookup(kit).enums[it.id];
export const termOf = (kit: Kit, it: KitItem) => lookup(kit).terms[it.id];
export const probOf = (kit: Kit, it: KitItem) => lookup(kit).probs[it.id];
export const mcqOf = (kit: Kit, it: KitItem) => lookup(kit).mcqs[it.id];
/**
 * The display order of an exam MCQ's choices: shuffled (so the answer is not always in the same slot) but fixed
 * for this exam, so the paper and the grading screen agree. Seeded by the exam's start time and the question id.
 */
export function mcqOrder(kit: Kit, x: KitExam, it: KitItem): number[] {
	const q = mcqOf(kit, it);
	const n = q.o.length;
	if (!canShuffle(q)) return [...Array(n).keys()];
	let h = x.started % 2147483647;
	for (const ch of it.id) h = (h * 31 + ch.charCodeAt(0)) % 2147483647;
	const a = [...Array(n).keys()];
	for (let i = n - 1; i > 0; i--) {
		h = (h * 48271) % 2147483647;
		const j = h % (i + 1);
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
/** The choice picked on an exam MCQ, or null. */
export function mcqPick(x: KitExam, it: KitItem): number | null {
	const v = x.answers[itemKey(it)];
	return v === undefined || v === '' ? null : Number(v);
}

export function maxPoints(kit: Kit, it: KitItem): number {
	if (it.kind === 'enum') return enumOf(kit, it).it.length;
	if (it.kind === 'mcq') return 1;
	return it.kind === 'term' ? TERM_POINTS : PROB_POINTS;
}

export function pointsFor(kit: Kit, x: KitExam, it: KitItem): number | null {
	if (it.kind === 'enum') {
		let n = 0;
		for (let i = 0; i < enumOf(kit, it).it.length; i++) n += x.marks[tickKey(it, i)] ?? 0;
		return n;
	}
	if (it.kind === 'mcq') return mcqPick(x, it) === mcqOf(kit, it).a ? 1 : 0;
	return x.marks[itemKey(it)] ?? null;
}

export interface ExamOpts {
	enums: number;
	terms: number;
	mcqs: number;
	probs: number;
	groups: number[];
}

export function poolSizes(kit: Kit, groups: number[]) {
	const inG = (g: number) => groups.includes(g);
	return {
		enums: kit.enums.filter((e) => inG(e.group)).length,
		terms: kit.terms.filter((t) => inG(t.group)).length,
		mcqs: (kit.mcqs ?? []).filter((m) => inG(m.group)).length,
		probs: kit.problems.filter((p) => inG(p.group)).length
	};
}

export function startExam(kit: Kit, o: ExamOpts) {
	const inG = (g: number) => o.groups.includes(g);
	const byGroup = <T extends { group: number }>(xs: T[]) => [...xs].sort((a, b) => a.group - b.group);
	const pick: Record<KitItem['kind'], () => KitItem[]> = {
		enum: () => byGroup(sample(kit.enums.filter((e) => inG(e.group)), o.enums)).map((e) => ({ kind: 'enum', id: e.id })),
		term: () => byGroup(sample(kit.terms.filter((t) => inG(t.group)), o.terms)).map((t) => ({ kind: 'term', id: t.id })),
		// MCQs stay shuffled: on the exam you do not get them grouped by topic.
		mcq: () => sample((kit.mcqs ?? []).filter((m) => inG(m.group)), o.mcqs).map((m) => ({ kind: 'mcq', id: m.id })),
		prob: () => byGroup(sample(kit.problems.filter((p) => inG(p.group)), o.probs)).map((p) => ({ kind: 'prob', id: p.pid }))
	};
	const items: KitItem[] = kit.examParts.flatMap((part) => pick[part]());
	const scope =
		o.groups.length === kit.groups.length ? kit.scope : kit.groups.filter((g) => o.groups.includes(g.id)).map((g) => g.short).join(', ');
	kit.state().exam = { label: `Mock exam · ${scope}`, items, answers: {}, marks: {}, started: Date.now(), finished: null, graded: false };
}

/** Whether the student wrote anything for this item. */
export function answered(x: KitExam, it: KitItem): boolean {
	const k = itemKey(it);
	if (it.kind === 'mcq') return mcqPick(x, it) !== null;
	if (it.kind !== 'prob') return !!x.answers[k]?.trim();
	return ['a', 'l', 'p', 'c'].some((s) => x.answers[`${k}:${s}`]?.trim());
}

export function submitExam(kit: Kit) {
	const x = kit.state().exam;
	if (x && !x.finished) x.finished = Date.now();
}

/** Terms and problems need an explicit mark; enumeration ticks default to "not had"; MCQs grade themselves. */
export function unmarked(x: KitExam): number {
	return x.items.filter((it) => (it.kind === 'term' || it.kind === 'prob') && x.marks[itemKey(it)] == null).length;
}

export function totals(kit: Kit, x: KitExam) {
	const part = { enum: { got: 0, max: 0 }, term: { got: 0, max: 0 }, mcq: { got: 0, max: 0 }, prob: { got: 0, max: 0 } };
	for (const it of x.items) {
		part[it.kind].got += pointsFor(kit, x, it) ?? 0;
		part[it.kind].max += maxPoints(kit, it);
	}
	const all = Object.values(part);
	return { part, score: all.reduce((n, p) => n + p.got, 0), total: all.reduce((n, p) => n + p.max, 0) };
}

/** Saves the result and feeds the marks back into the flashcard ratings. */
export function finishGrading(kit: Kit) {
	const st = kit.state();
	const x = st.exam;
	if (!x || !x.finished || x.graded) return;
	for (const it of x.items) {
		if (it.kind === 'mcq') {
			// Feed the drill: answered exam MCQs count as attempts, so misses show under "Missed".
			const p = mcqPick(x, it);
			if (p !== null) st.mcq[it.id] = p;
			continue;
		}
		if (it.kind === 'prob') continue;
		const ratio = (pointsFor(kit, x, it) ?? 0) / maxPoints(kit, it);
		st.ratings[it.kind === 'enum' ? cardKey.enum(it.id) : cardKey.term(it.id)] = ratio === 1 ? 'got' : ratio >= 0.5 ? 'shaky' : 'blank';
	}
	const t = totals(kit, x);
	logKitExam(st, { at: x.finished, label: x.label, score: t.score, total: t.total, secs: Math.round((x.finished - x.started) / 1000) });
	x.graded = true;
}

export function endExam(kit: Kit) {
	kit.state().exam = null;
}

/** How each exam part is titled and introduced. Parts are numbered I, II, III… in the order the kit lists them. */
export const PART_META: Record<KitItem['kind'], { title: string; intro: string; setup: string; opts: number[]; dflt: number }> = {
	enum: { title: 'Enumeration', intro: 'Enumerate, and briefly explain each item.', setup: 'List the items and explain each in one line.', opts: [0, 2, 3, 4, 5], dflt: 3 },
	term: { title: 'Definition of terms', intro: 'Define each term.', setup: 'Define each term in a sentence or two.', opts: [0, 3, 5, 8, 10], dflt: 5 },
	mcq: { title: 'Multiple choice', intro: 'Choose the best answer.', setup: 'Checked automatically; each wrong choice is explained after you submit.', opts: [0, 10, 20, 30, 40], dflt: 20 },
	prob: { title: 'Problems', intro: 'Answer each problem in ALAC: Answer, Legal Basis, Application, Conclusion.', setup: 'Answer each scenario in ALAC, then mark it on the 0–5 rubric.', opts: [0, 1, 2, 3, 4], dflt: 2 }
};
const ROMAN = ['I', 'II', 'III', 'IV', 'V'];
/** The parts present in this exam, in the kit's order, with their numbers. */
export function examParts(kit: Kit, x: KitExam) {
	return kit.examParts
		.filter((p) => x.items.some((it) => it.kind === p))
		.map((p, i) => ({ kind: p, label: `${ROMAN[i]}. ${PART_META[p].title}`, items: x.items.filter((it) => it.kind === p) }));
}
