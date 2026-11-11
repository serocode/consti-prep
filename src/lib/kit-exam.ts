import { cardKey, index, type Kit } from './kit';
import { sample } from './crimpro';
import { logKitExam, type KitExam, type KitItem } from './store.svelte';

/** Points per answer: one per enumeration item, 2 per definition (got / partly / missed), 5 per ALAC problem (the rubric). */
export const TERM_POINTS = 2;
export const PROB_POINTS = 5;

export const itemKey = (it: KitItem) => `${it.kind}:${it.id}`;
/** Where each enumeration item's tick is stored in `marks`. */
export const tickKey = (it: KitItem, i: number) => `${itemKey(it)}#${i}`;

// Lookups per kit, built once.
const cache = new WeakMap<Kit, { enums: Record<string, Kit['enums'][number]>; terms: Record<string, Kit['terms'][number]>; probs: Record<string, Kit['problems'][number]> }>();
function lookup(kit: Kit) {
	let c = cache.get(kit);
	if (!c) cache.set(kit, (c = { enums: index(kit.enums, 'id'), terms: index(kit.terms, 'id'), probs: index(kit.problems, 'pid') }));
	return c;
}
export const enumOf = (kit: Kit, it: KitItem) => lookup(kit).enums[it.id];
export const termOf = (kit: Kit, it: KitItem) => lookup(kit).terms[it.id];
export const probOf = (kit: Kit, it: KitItem) => lookup(kit).probs[it.id];

export function maxPoints(kit: Kit, it: KitItem): number {
	if (it.kind === 'enum') return enumOf(kit, it).it.length;
	return it.kind === 'term' ? TERM_POINTS : PROB_POINTS;
}

export function pointsFor(kit: Kit, x: KitExam, it: KitItem): number | null {
	if (it.kind === 'enum') {
		let n = 0;
		for (let i = 0; i < enumOf(kit, it).it.length; i++) n += x.marks[tickKey(it, i)] ?? 0;
		return n;
	}
	return x.marks[itemKey(it)] ?? null;
}

export interface ExamOpts {
	enums: number;
	terms: number;
	probs: number;
	groups: number[];
}

export function poolSizes(kit: Kit, groups: number[]) {
	const inG = (g: number) => groups.includes(g);
	return {
		enums: kit.enums.filter((e) => inG(e.group)).length,
		terms: kit.terms.filter((t) => inG(t.group)).length,
		probs: kit.problems.filter((p) => inG(p.group)).length
	};
}

export function startExam(kit: Kit, o: ExamOpts) {
	const inG = (g: number) => o.groups.includes(g);
	const byGroup = <T extends { group: number }>(xs: T[]) => [...xs].sort((a, b) => a.group - b.group);
	const items: KitItem[] = [
		...byGroup(sample(kit.enums.filter((e) => inG(e.group)), o.enums)).map((e) => ({ kind: 'enum' as const, id: e.id })),
		...byGroup(sample(kit.terms.filter((t) => inG(t.group)), o.terms)).map((t) => ({ kind: 'term' as const, id: t.id })),
		...byGroup(sample(kit.problems.filter((p) => inG(p.group)), o.probs)).map((p) => ({ kind: 'prob' as const, id: p.pid }))
	];
	const scope =
		o.groups.length === kit.groups.length ? kit.scope : kit.groups.filter((g) => o.groups.includes(g.id)).map((g) => g.short).join(', ');
	kit.state().exam = { label: `Mock exam · ${scope}`, items, answers: {}, marks: {}, started: Date.now(), finished: null, graded: false };
}

/** Whether the student wrote anything for this item. */
export function answered(x: KitExam, it: KitItem): boolean {
	const k = itemKey(it);
	if (it.kind !== 'prob') return !!x.answers[k]?.trim();
	return ['a', 'l', 'p', 'c'].some((s) => x.answers[`${k}:${s}`]?.trim());
}

export function submitExam(kit: Kit) {
	const x = kit.state().exam;
	if (x && !x.finished) x.finished = Date.now();
}

/** Terms and problems need an explicit mark; enumeration ticks default to "not had". */
export function unmarked(x: KitExam): number {
	return x.items.filter((it) => it.kind !== 'enum' && x.marks[itemKey(it)] == null).length;
}

export function totals(kit: Kit, x: KitExam) {
	const part = { enum: { got: 0, max: 0 }, term: { got: 0, max: 0 }, prob: { got: 0, max: 0 } };
	for (const it of x.items) {
		part[it.kind].got += pointsFor(kit, x, it) ?? 0;
		part[it.kind].max += maxPoints(kit, it);
	}
	return { part, score: part.enum.got + part.term.got + part.prob.got, total: part.enum.max + part.term.max + part.prob.max };
}

/** Saves the result and feeds the marks back into the flashcard ratings. */
export function finishGrading(kit: Kit) {
	const st = kit.state();
	const x = st.exam;
	if (!x || !x.finished || x.graded) return;
	for (const it of x.items) {
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
