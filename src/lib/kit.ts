/**
 * A "finals kit" is a subject studied for a written exam: enumerations with a brief
 * explanation of each item, definitions of terms, and scenario problems answered in ALAC.
 * StatCon and Crim Law I are both kits; they share every screen and differ only in their data.
 */
import type { AlacProblem } from './problems';
import type { Mcq } from './mcq';
import type { KitState } from './store.svelte';

/** Enumeration kind → color code, matching the rule cards in the other subjects. */
export type Kind = 'req' | 'exc' | 'exx' | 'cls' | 'doc' | 'mem' | 'list';
export const KIND: Record<Kind, { label: string; tag: string; blk: string }> = {
	req: { label: 'Requisites / tests', tag: 'tag-en', blk: 'k-req' },
	exc: { label: 'Exceptions / limits', tag: 'tag-ok', blk: 'k-exc' },
	exx: { label: 'Exception to exception', tag: 'tag-warn', blk: 'k-exx' },
	cls: { label: 'Kinds / classification', tag: 'tag-teal', blk: 'k-cls' },
	doc: { label: 'Rules / doctrine', tag: 'tag-purple', blk: 'k-doc' },
	mem: { label: 'Memorize', tag: 'tag-bad', blk: 'k-mem' },
	list: { label: 'Enumeration', tag: 'tag-line', blk: 'plain' }
};

/** A chapter (StatCon) or part of the Code (Crim Law) that every item is filed under. */
export interface Group {
	id: number;
	/** "Ch. VI", "I" */
	short: string;
	/** Full heading. */
	title: string;
}

export interface KitEnum {
	id: string;
	group: number;
	kind: Kind;
	t: string;
	/** Source line: article, chapter, case. */
	src: string;
	/** [item, one-line explanation]; the explanation may be empty and may use **bold**. */
	it: [string, string][];
	/** Memory aid. */
	mem?: string;
	/** One-line lead-in shown above the items. */
	intro?: string;
	/** The items must be recited in order. */
	order?: boolean;
	trap?: string;
}

export interface KitTerm {
	id: string;
	group: number;
	t: string;
	d: string;
	src: string;
	/** "Don't confuse with" note. */
	x?: string;
}

export interface KitMaxim {
	m: string;
	mean: string;
	groups: number[];
	label: string;
}

export interface KitCase {
	id: string;
	name: string;
	doc: string;
	ch: string;
}

/** The rule area a problem belongs to (a StatCon chapter, a Crim Law topic). */
export interface KitTopic {
	id: string;
	title: string;
	cite: string;
	group: number;
}

export interface KitProblem extends AlacProblem {
	group: number;
	topic: KitTopic;
}

export type QType = 'scenario' | 'enumeration' | 'definition' | 'computation' | 'distinction' | 'MCQ' | 'case digest' | 'sequence';

/** One entry in a subject's ranked list of likely exam questions. */
export interface TopQuestion {
	q: string;
	type: QType;
	topic: string;
	/** Where to practice it. */
	href?: string;
}

/**
 * Exam focus: what is most likely to come out. `enums`, `terms` and `topics` map an id to the one-line
 * reason it is flagged "★ Likely". About a quarter to a third of the content is flagged.
 */
export interface Focus {
	top: TopQuestion[];
	enums?: Record<string, string>;
	terms?: Record<string, string>;
	topics?: Record<string, string>;
}

/** A multiple-choice question in a kit's MCQ drill. */
export interface KitMcq extends Mcq {
	id: string;
	group: number;
	/** Flagged ★ Likely. */
	star?: boolean;
}

/**
 * Linked MCQs: questions that share facts, in order. Each later step names the one fact that changed,
 * which is what can flip the answer.
 */
export interface KitChain {
	id: string;
	title: string;
	/** `ctx`: the question does not stand alone ("Same facts, but…"), so the topic drill shows the earlier steps. */
	steps: { id: string; tw?: string; ctx?: boolean }[];
}

export type ExamPart = 'enum' | 'term' | 'mcq' | 'prob';

export interface Kit {
	id: 'statcon' | 'crimlaw' | 'pfr';
	/** Short name for headings and titles. */
	name: string;
	title: string;
	eyebrow: string;
	/** "Chapters VI–XI", "Arts. 16–113" */
	scope: string;
	base: string;
	/** "chapter", "part" */
	groupNoun: string;
	groups: Group[];
	enums: KitEnum[];
	terms: KitTerm[];
	problems: KitProblem[];
	maxims?: KitMaxim[];
	cases?: KitCase[];
	mcqs?: KitMcq[];
	chains?: KitChain[];
	/** Parts of the written mock exam, in order. */
	examParts: ExamPart[];
	focus: Focus;
	/** This kit's slice of the persisted store. */
	state: () => KitState;
}

/** Rating keys shared by every tab that rates a card (Enumerations, Definitions, Flashcards, Mock exam). */
export const cardKey = {
	enum: (id: string) => `e${id}`,
	term: (id: string) => `t:${id}`,
	maxim: (m: string) => `m${m}`,
	case: (id: string) => `c${id}`
};

const plain = (s: string) => s.replace(/\*\*(.+?)\*\*/g, '$1');

/** The model answer for an enumeration: the count, then one line per item. */
export function modelEnumeration(e: KitEnum): string {
	const items = e.it
		.map(([a, b], i) => {
			const why = plain(b);
			return `(${i + 1}) ${plain(a)}${why ? ` — ${why.charAt(0).toLowerCase()}${why.slice(1)}` : ''}`;
		})
		.join(' ');
	return `There are ${e.it.length}${e.order ? ', in this order' : ''}: ${items}`;
}

export const index = <T, K extends keyof T>(xs: T[], k: K) => Object.fromEntries(xs.map((x) => [x[k], x])) as Record<string, T>;

/** Problems that pass the kit's group filter, or all of them if `p` is outside it (used for Prev/Next). */
export function navFor(kit: Kit, pid: string): AlacProblem[] {
	const g = kit.state().ch;
	const list = g === 'all' ? kit.problems : kit.problems.filter((x) => String(x.group) === g);
	return list.some((x) => x.pid === pid) ? list : kit.problems;
}
