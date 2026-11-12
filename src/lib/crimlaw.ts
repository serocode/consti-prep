import raw from './data/crimlaw.json';
import { LIKELY_ENUMS, LIKELY_TERMS, LIKELY_TOPICS, TOP } from './focus/crimlaw';
import { index, navFor, type Group, type Kind, type Kit, type KitEnum, type KitProblem, type KitTerm, type KitTopic } from './kit';
import type { AlacProblem } from './problems';
import { store } from './store.svelte';

interface RawEnum {
	g: number;
	art: string;
	k: Kind;
	t: string;
	intro?: string;
	items: { h: string; d: string }[];
}
interface RawTerm {
	g: number;
	t: string;
	a: string;
	d: string;
}
interface RawTopic {
	id: string;
	g: number;
	title: string;
	art: string;
	rule: string;
	p: { t: 'same' | 'twist'; label: string; facts: string; q: string; hint: string; alac: string[]; key: string }[];
}

const data = raw as unknown as { E: RawEnum[]; DF: RawTerm[]; P: RawTopic[]; SPOT: [string, string][] };

/** Everything is filed under the seven parts of Book One covered (Arts. 16–113). */
const GROUPS: Group[] = [
	{ id: 1, short: 'Persons liable', title: 'I · Persons criminally liable · Arts. 16–20' },
	{ id: 2, short: 'Penalties', title: 'II · Penalties in general · Arts. 21–26' },
	{ id: 3, short: 'Duration & effects', title: 'III · Duration and effects of penalties · Arts. 27–45' },
	{ id: 4, short: 'Application', title: 'IV · Application of penalties · Arts. 46–77, ISLaw, probation' },
	{ id: 5, short: 'Execution', title: 'V · Execution and service · Arts. 78–88' },
	{ id: 6, short: 'Extinction', title: 'VI · Extinction of criminal liability · Arts. 89–99' },
	{ id: 7, short: 'Civil liability', title: 'VII · Civil liability · Arts. 100–113' }
];
const GROUP_BY_ID = Object.fromEntries(GROUPS.map((g) => [g.id, g]));

/** Part of Book One an article falls in. */
function partOfArticle(n: number): number {
	if (n <= 20) return 1;
	if (n <= 26) return 2;
	if (n <= 45) return 3;
	if (n <= 77) return 4;
	if (n <= 88) return 5;
	if (n <= 99) return 6;
	return 7;
}
const firstArticle = (s: string) => {
	const m = /^Arts?\.\s*(\d+)/.exec(s);
	return m ? Number(m[1]) : null;
};

// ---------- enumerations ----------

// Scope: current law only. Lists and items about the death penalty's old mechanics are left out
// (RA 9346 prohibits its imposition); the lists that state the current rule stay.
const CURRENT = data.E.filter((e) => !/\(historical/.test(e.t)).map((e) => ({
	...e,
	items: e.items.filter((x) => !/^Death \(if not executed/.test(x.h))
}));

const counters: Record<number, number> = {};
const ENUMS: KitEnum[] = CURRENT.map((e) => {
	counters[e.g] = (counters[e.g] ?? 0) + 1;
	// Lists typed as "1. …", "2. …" are ordered; the app numbers them itself.
	const ordered = e.items.every((x) => /^\d+\.\s/.test(x.h));
	return {
		id: `${e.g}.${counters[e.g]}`,
		group: e.g,
		kind: e.k,
		t: e.t,
		src: e.art,
		intro: e.intro,
		order: ordered || undefined,
		it: e.items.map((x) => [ordered ? x.h.replace(/^\d+\.\s/, '') : x.h, x.d] as [string, string])
	};
});

// ---------- definitions ----------

// The source files terms under six headings; map them onto the seven parts, by article when there is one.
const TERM_PART: Record<number, number> = { 1: 1, 2: 2, 3: 4, 4: 5, 5: 6, 6: 7 };
const slug = (s: string) =>
	s
		.toLowerCase()
		.replace(/\(.*?\)/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
const TERMS: KitTerm[] = data.DF.map((t) => {
	const art = firstArticle(t.a);
	return { id: slug(t.t), group: art ? partOfArticle(art) : TERM_PART[t.g], t: t.t, d: t.d, src: t.a };
});

// ---------- ALAC problems ----------

const TOPIC_PART: Record<string, number> = {
	induction: 1,
	cooperation: 1,
	conspiracy: 1,
	accessory: 1,
	relatives: 1,
	retro: 2,
	preventive: 3,
	subsidiary: 3,
	death: 6,
	prescription: 6,
	acquittal: 7,
	art101: 7,
	art103: 7
};
export const TOPICS: (KitTopic & { rule: string })[] = data.P.map((t) => ({ id: t.id, title: t.title, cite: t.art, rule: t.rule, group: TOPIC_PART[t.id] ?? 4 }));
const TOPIC_BY_ID = index(TOPICS, 'id');

const BOXES: AlacProblem['boxes'] = {
	a: { starters: ['Yes. ', 'No. '], placeholder: 'Yes / No / the liability or penalty…' },
	l: { starters: ['The law provides that ', 'Jurisprudence provides that '], placeholder: 'The law provides that…' },
	p: { starters: ['Here, ', 'This means ', 'because '] },
	c: { starters: ['Therefore, '] }
};

// Each topic has two direct problems and one twist. Shuffle within the topic (fixed seed, same as the
// source kit) so the twist is not always last; ids stay tied to the original order.
function seeded() {
	let seed = 11;
	return () => {
		seed = (seed * 9301 + 49297) % 233280;
		return seed / 233280;
	};
}
const rnd = seeded();
const PROBLEMS: KitProblem[] = data.P.flatMap((t) => {
	const order = t.p.map((_, i) => i);
	for (let i = order.length - 1; i > 0; i--) {
		const j = Math.floor(rnd() * (i + 1));
		[order[i], order[j]] = [order[j], order[i]];
	}
	const topic = TOPIC_BY_ID[t.id];
	return order.map((i) => {
		const p = t.p[i];
		const pid = `cl-${t.id}-${i + 1}`;
		return {
			subject: 'crimlaw' as const,
			group: topic.group,
			topic,
			pid,
			no: 0,
			label: p.label,
			facts: p.facts,
			q: p.q,
			hint: p.hint,
			alac: p.alac,
			key: p.key,
			c: { name: t.title, cite: t.art, rule: t.rule, mem: [], doc: [] },
			href: `/crimlaw/p/${pid}`,
			tags: [
				{ label: GROUP_BY_ID[topic.group].title.split(' · ').slice(0, 2).join(' · '), cls: 'tag tag-line' },
				{ label: 'ALAC scenario', cls: 'tag tag-accent' }
			],
			home: { href: '/crimlaw/problems', label: 'All Crim Law problems' },
			boxes: BOXES,
			nav: () => navFor(CRIMLAW, pid)
		};
	});
});
PROBLEMS.forEach((p, i) => (p.no = i + 1));

// ---------- exam focus ----------

const ENUM_ID = Object.fromEntries(ENUMS.map((e) => [e.t, e.id]));
function byTitle(m: Record<string, string>): Record<string, string> {
	return Object.fromEntries(
		Object.entries(m).map(([t, why]) => {
			if (!ENUM_ID[t]) throw new Error(`Exam focus: no Crim Law enumeration titled "${t}"`);
			return [ENUM_ID[t], why];
		})
	);
}
const FOCUS = {
	top: TOP.map(({ topicId, list, ...t }) => ({
		...t,
		href: topicId ? `/crimlaw/problems#t-${topicId}` : list ? `/crimlaw/enumerations#e-${ENUM_ID[list]}` : '/crimlaw/terms'
	})),
	enums: byTitle(LIKELY_ENUMS),
	terms: LIKELY_TERMS,
	topics: LIKELY_TOPICS
};

/** "If the facts say…" → topic, for the answer guide. */
export const SPOT = data.SPOT.map(([clue, id]) => ({ clue, topic: TOPIC_BY_ID[id] }));

export const CRIMLAW: Kit = {
	id: 'crimlaw',
	name: 'Crim Law I',
	title: 'Crim Law I Finals Kit',
	eyebrow: 'RPC Book One, Arts. 16–113 · Reyes notes',
	scope: 'Arts. 16–113',
	base: '/crimlaw',
	groupNoun: 'part',
	groups: GROUPS,
	enums: ENUMS,
	terms: TERMS,
	problems: PROBLEMS,
	examParts: ['enum', 'term', 'prob'],
	focus: FOCUS,
	state: () => store.crimlaw
};

export const PROBLEM_BY_PID = index(PROBLEMS, 'pid');
