import raw from './data/crimpro.json';
import rawWhy from './data/crimpro-why.json';

/** A titled list inside a rule card (requisites, exceptions, exceptions to exceptions). */
export interface Titled {
	t: string;
	items: string[];
}

/** A titled table inside a rule card. The first cell of each row renders as a row header. */
export interface Table {
	t: string;
	head: string[];
	rows: string[][];
}

export interface Rule {
	id: string;
	name: string;
	hook: string;
	mem?: string[];
	req?: Titled;
	doc?: string[];
	doc2?: string[];
	exc?: Titled;
	exx?: Titled;
	cls?: Table;
	cls2?: Table;
	trap: string;
}

export interface Question {
	/** The one fact that changed from the previous question. Absent on the first question of a set. */
	tw?: string;
	q: string;
	o: string[];
	/** Index into `o` of the correct choice. */
	a: number;
	ex: string;
	/** Why each choice is wrong, by index into `o` (empty for the correct choice). */
	why: string[];
}

export interface TwistSet {
	id: string;
	title: string;
	rules: string[];
	base: string;
	qs: Question[];
}

export interface Flip {
	t: string;
	a: [string, string];
	b: [string, string];
	ref: string;
}

/** [number, what it is for, rule] */
export type NumberRow = [string, string, string];

const data = raw as unknown as { R: Rule[]; S: TwistSet[]; F: Flip[]; N: NumberRow[] };

// Attach the wrong-choice reasons. The file lists, per question, the reasons for the wrong choices in order.
const WHY = rawWhy as Record<string, string[][]>;
for (const s of data.S) {
	const rows = WHY[s.id];
	if (!rows || rows.length !== s.qs.length) throw new Error(`crimpro-why.json: set "${s.id}" needs ${s.qs.length} rows`);
	s.qs.forEach((q, k) => {
		if (rows[k].length !== q.o.length - 1) throw new Error(`crimpro-why.json: ${s.id}[${k}] needs ${q.o.length - 1} reasons`);
		const wrong = [...rows[k]];
		q.why = q.o.map((_, i) => (i === q.a ? '' : wrong.shift()!));
	});
}

export const RULES = data.R;
export const SETS = data.S;
export const FLIPS = data.F;
export const NUMBERS = data.N;

export const SET_BY_ID: Record<string, TwistSet> = Object.fromEntries(SETS.map((s) => [s.id, s]));
export const QUESTION_COUNT = SETS.reduce((n, s) => n + s.qs.length, 0);

export function setsForRule(id: string): TwistSet[] {
	return SETS.filter((s) => s.rules.includes(id));
}

/** A shuffled [0..n) used to order the choices, so the right answer is not always in the same slot. */
export function shuffled(n: number): number[] {
	const a = [...Array(n).keys()];
	for (let i = n - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

/** One question with its place in the set. `qid` is `<set id>-<index>`, stable as long as the data keeps its order. */
export interface QRef {
	qid: string;
	set: TwistSet;
	k: number;
	q: Question;
}

export const QUESTIONS: QRef[] = SETS.flatMap((set) => set.qs.map((q, k) => ({ qid: `${set.id}-${k}`, set, k, q })));
export const Q_BY_ID: Record<string, QRef> = Object.fromEntries(QUESTIONS.map((r) => [r.qid, r]));

/** Up to `n` items from `pool`, in random order. */
export function sample<T>(pool: T[], n: number): T[] {
	return shuffled(pool.length)
		.slice(0, n)
		.map((i) => pool[i]);
}
