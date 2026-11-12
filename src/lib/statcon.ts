import raw from './data/statcon.json';
import { FOCUS } from './focus/statcon';
import rawTerms from './data/statcon-terms.json';
import { index, navFor, type Group, type Kind, type Kit, type KitEnum, type KitProblem, type KitTerm, type KitTopic } from './kit';
import type { AlacProblem } from './problems';
import { store } from './store.svelte';

export type Chapter = 6 | 7 | 8 | 9 | 10 | 11;
export const CHAPTERS: Chapter[] = [6, 7, 8, 9, 10, 11];
export const ROMAN: Record<Chapter, string> = { 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI' };

export interface Case {
	id: string;
	name: string;
	cite: string;
	ch: string;
	doc: string;
	facts: string;
	issue: string;
	ruling: string;
	trap: string;
}

/** [rule, in short, limit] */
export type RuleRow = [string, string, string];

interface RawEnum {
	id: string;
	ch: Chapter;
	kind: 'req' | 'exc' | 'cls' | 'doc' | 'num';
	order?: boolean;
	t: string;
	src: string;
	mem: string;
	it: [string, string][];
	trap: string;
}

interface RawProblem {
	id: string;
	ch: Chapter;
	t: string;
	drill: string;
	alac: string[];
	key: string;
}

const data = raw as unknown as {
	CH: Record<string, string>;
	E: RawEnum[];
	RULES: Record<string, RuleRow[]>;
	TRAPS: Record<string, string[]>;
	CASES: Case[];
	MAX: [string, string, string][];
	PROBS: RawProblem[];
};

export const CH_TITLE = data.CH as Record<Chapter, string>;
/** "Statute Read as a Whole…" without the "Ch. VI · " prefix. */
export const chName = (c: Chapter) => CH_TITLE[c].replace(/^Ch\. [IVX]+ · /, '');
export const CASES = data.CASES;
export const RULES = data.RULES as unknown as Record<Chapter, RuleRow[]>;
export const TRAPS = data.TRAPS as unknown as Record<Chapter, string[]>;

const GROUPS: Group[] = CHAPTERS.map((c) => ({ id: c, short: `Ch. ${ROMAN[c]}`, title: CH_TITLE[c] }));
const FROM_ROMAN = Object.fromEntries(CHAPTERS.map((c) => [ROMAN[c], c]));

const ENUMS: KitEnum[] = data.E.map((e) => ({
	id: e.id,
	group: e.ch,
	kind: (e.kind === 'num' ? 'mem' : e.kind) as Kind,
	t: e.t,
	src: e.src,
	it: e.it,
	mem: e.mem,
	order: e.order,
	trap: e.trap
}));

const TERMS: KitTerm[] = (rawTerms as (Omit<KitTerm, 'group'> & { ch: Chapter })[]).map(({ ch, ...t }) => ({ ...t, group: ch }));

// Maxims are tagged "VI" or "VI–VII".
const MAXIMS = data.MAX.map(([m, mean, chs]) => ({ m, mean, label: `Ch. ${chs}`, groups: chs.split('–').map((r) => FROM_ROMAN[r]) }));

// ---------- ALAC problems, run on the shared practice screen ----------

const BOXES: AlacProblem['boxes'] = {
	a: { starters: ['Yes. ', 'No. ', 'The act is valid.', 'The act is invalid.'], placeholder: 'Yes / No / Valid / Invalid…' },
	l: {
		starters: ['Jurisprudence provides that ', 'The law provides that ', 'As a rule, ', 'However, the exception is when '],
		placeholder: 'Jurisprudence provides that… The exception is when…'
	},
	p: { starters: ['Here, ', 'In this case, ', 'Since ', 'This means ', 'because '] },
	c: { starters: ['Therefore, ', 'Hence, '] }
};

const TOPIC: Record<Chapter, KitTopic> = Object.fromEntries(
	CHAPTERS.map((c) => [c, { id: `ch${c}`, title: CH_TITLE[c], cite: 'Agpalo, Statutory Construction', group: c }])
) as Record<Chapter, KitTopic>;

/** The chapter's rules, limits and traps, shown as the "Rule and provisions" panel of a problem. */
function chapterRef(ch: Chapter) {
	return {
		name: CH_TITLE[ch],
		cite: 'Agpalo, Statutory Construction',
		rule: 'The rules of this chapter, each with its limit. The last items are the wrong answers examiners expect.',
		mem: RULES[ch].map(([r, s, l]) => `${r}. ${s} Limit: ${l}`),
		doc: TRAPS[ch].map((t) => `**Trap:** ${t}`)
	};
}

// Grouped by chapter so the list and Prev/Next follow the syllabus.
const PROBLEMS: KitProblem[] = [...data.PROBS]
	.sort((a, b) => a.ch - b.ch)
	.map((p, i) => ({
		subject: 'statcon',
		group: p.ch,
		topic: TOPIC[p.ch],
		pid: `sc-${p.id}`,
		no: i + 1,
		label: p.t,
		facts: p.drill,
		q: '',
		hint: `This is a Chapter ${ROMAN[p.ch]} problem: ${chName(p.ch)}. Name that chapter's rule, then its exception.`,
		alac: p.alac,
		key: p.key,
		c: chapterRef(p.ch),
		href: `/statcon/p/sc-${p.id}`,
		tags: [
			{ label: `Ch. ${ROMAN[p.ch]}`, cls: 'tag tag-line' },
			{ label: 'ALAC scenario', cls: 'tag tag-accent' }
		],
		home: { href: '/statcon/problems', label: 'All StatCon problems' },
		boxes: BOXES,
		nav: () => navFor(STATCON, `sc-${p.id}`)
	}));

export const STATCON: Kit = {
	id: 'statcon',
	name: 'StatCon',
	title: 'StatCon Finals Kit',
	eyebrow: 'Agpalo Chapters VI–XI · five assigned cases',
	scope: 'Chapters VI–XI',
	base: '/statcon',
	groupNoun: 'chapter',
	groups: GROUPS,
	enums: ENUMS,
	terms: TERMS,
	problems: PROBLEMS,
	maxims: MAXIMS,
	cases: CASES,
	examParts: ['enum', 'term', 'prob'],
	focus: FOCUS,
	state: () => store.statcon
};

export const PROBLEM_BY_PID = index(PROBLEMS, 'pid');
