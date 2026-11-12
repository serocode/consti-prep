import raw from './data/pfr.json';
import rawTerms from './data/pfr-terms.json';
import rawWhy from './data/pfr-why.json';
import { index, navFor, type Focus, type Group, type Kind, type Kit, type KitChain, type KitEnum, type KitMcq, type KitProblem, type KitTerm, type KitTopic, type QType } from './kit';
import type { AlacProblem } from './problems';
import { store } from './store.svelte';

interface RawEnum {
	g: number;
	art: string;
	k: Kind;
	t: string;
	hot?: string;
	items: { h: string; d: string }[];
}
interface RawMcq {
	g: number;
	hot?: number;
	q: string;
	o: string[];
	a: number;
	x: string;
}
interface RawTopic {
	id: string;
	g: number;
	title: string;
	art: string;
	rule: string;
	p: { t: 'same' | 'twist'; label: string; facts: string; q: string; hint: string; alac: string[]; key: string }[];
}
interface RawCase {
	g: number;
	n: string;
	c: string;
	hot?: number;
	f: string;
	iss: string;
	r: string;
	d: string;
}
export interface Distinction {
	t: string;
	hot?: number;
	head: string[];
	rows: string[][];
}
export interface PastItem {
	s: 'I' | 'II' | 'III' | 'IV' | 'V';
	q: string;
	o: string[];
	key: string;
	/** "ok": the key matches the codal; "doubt": the codal points elsewhere. */
	v: 'ok' | 'doubt';
	best: string;
	x: string;
}

const data = raw as unknown as {
	E: RawEnum[];
	T: Distinction[];
	C: RawCase[];
	M: RawMcq[];
	P: RawTopic[];
	XP: PastItem[];
	G: Record<string, string>;
	FOCUS: [string, string, string, string | number][];
	SPOT: [string, string][];
};

// ---------- parts ----------

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
const ARTS: Record<number, string> = {
	1: 'Arts. 74–87',
	2: 'Arts. 88–104',
	3: 'Arts. 105–133',
	4: 'Arts. 134–148',
	5: 'Arts. 149–162',
	6: 'Arts. 163–182',
	7: 'RA 11642',
	8: 'Arts. 194–208',
	9: 'Arts. 209–233',
	10: 'Arts. 234–257; Civil Code'
};
const GROUPS: Group[] = Object.entries(data.G).map(([id, label]) => ({
	id: Number(id),
	short: label,
	title: `${ROMAN[Number(id)]} · ${label} · ${ARTS[Number(id)]}`
}));
export const GROUP_LABEL: Record<number, string> = Object.fromEntries(GROUPS.map((g) => [g.id, g.short]));

// ---------- enumerations ----------

const counters: Record<number, number> = {};
const ENUMS: KitEnum[] = data.E.map((e) => {
	counters[e.g] = (counters[e.g] ?? 0) + 1;
	// Lists typed as "1. …", "2. …" are ordered; the app numbers them itself.
	const ordered = e.items.every((x) => /^\d+\.\s/.test(x.h));
	return {
		id: `${e.g}.${counters[e.g]}`,
		group: e.g,
		kind: e.k,
		t: e.t,
		src: e.art,
		order: ordered || undefined,
		it: e.items.map((x) => [ordered ? x.h.replace(/^\d+\.\s/, '') : x.h, x.d] as [string, string])
	};
});
const LIKELY_ENUMS: Record<string, string> = Object.fromEntries(
	data.E.map((e, i) => [ENUMS[i].id, e.hot]).filter((x): x is [string, string] => !!x[1])
);

// ---------- definitions ----------

const TERMS: KitTerm[] = (rawTerms as (Omit<KitTerm, 'group'> & { g: number })[]).map(({ g, ...t }) => ({ ...t, group: g }));
const LIKELY_TERMS: Record<string, string> = {
	acp: 'The default regime; almost every property question starts here.',
	cpg: 'Asked against ACP: what stays exclusive is the usual trap.',
	'marriage-settlement': 'Form, timing and registration are frequent traps.',
	dpn: 'Donation status questions appear every exam.',
	art147: 'Art. 147 vs. Art. 148 is a staple distinction.',
	art148: 'Art. 147 vs. Art. 148 is a staple distinction.',
	'family-home': 'Family home exemptions are almost always asked.',
	'fh-beneficiary': 'The “minor beneficiary” trap turns on this definition.',
	legitimation: 'Its requisites, including the minority exception, are asked often.',
	impugn: 'Who may impugn and when is tested every year.',
	'support-arrears': 'Contrasted with future support, which cannot be waived.',
	'substitute-authority': 'Asked against special parental authority.',
	'special-authority': 'Asked against substitute parental authority.',
	'presumptive-death': 'Remarriage after absence is a classic scenario.'
};

// ---------- MCQs and linked chains ----------

const WHY = rawWhy as string[][];
if (WHY.length !== data.M.length) throw new Error(`pfr-why.json needs ${data.M.length} rows, has ${WHY.length}`);
const MCQS: KitMcq[] = data.M.map((m, i) => {
	const reasons = WHY[i];
	if (reasons.length !== m.o.length - 1) throw new Error(`pfr-why.json row ${i} needs ${m.o.length - 1} reasons`);
	const wrong = [...reasons];
	return {
		id: `m${i + 1}`,
		group: m.g,
		q: m.q,
		o: m.o,
		a: m.a,
		ex: m.x,
		why: m.o.map((_, j) => (j === m.a ? '' : wrong.shift()!)),
		star: !!m.hot
	};
});

/** Questions that share facts, in order. Each later step names the one fact that changed. */
const CHAINS: KitChain[] = [
	{ id: 'settlement', title: 'The marriage settlement', steps: [{ id: 'm1' }, { id: 'm2', ctx: true, tw: 'They did sign a settlement for CPG, but one day after the wedding.' }, { id: 'm3', tw: 'A valid written settlement was signed before the wedding, but never registered. A creditor sues.' }] },
	{ id: 'dpn', title: 'Donations by reason of marriage', steps: [{ id: 'm5' }, { id: 'm6', tw: 'The donation is now between the future spouses, in the settlement, under CPG.' }, { id: 'm8', tw: 'The gift is now made after the wedding.' }, { id: 'm10', tw: 'The marriage was annulled, and the donee was the innocent spouse.' }] },
	{ id: 'hector', title: 'Pre-marriage property under ACP', steps: [{ id: 'm13' }, { id: 'm14', ctx: true, tw: 'Hector’s children from the first relationship are illegitimate, not legitimate.' }] },
	{ id: 'exclusive-money', title: 'Bought with exclusive money: ACP vs. CPG', steps: [{ id: 'm15' }, { id: 'm25', tw: 'Change the regime to CPG: the wife sells her pre-marriage lot and buys a car.' }] },
	{ id: 'liza', title: 'A spouse died; no liquidation', steps: [{ id: 'm23' }, { id: 'm24', ctx: true, tw: 'Before remarrying, Liza sold a community lot in 2024, still without liquidating.' }] },
	{ id: 'cohabit', title: 'Living together without marriage', steps: [{ id: 'm39' }, { id: 'm40', ctx: true, tw: 'Jose is married to another woman.' }, { id: 'm41', tw: 'Two women live together; one proves she paid 40% of the price.' }, { id: 'm42', tw: 'Back to Jose and Maria under Art. 147: one wants to sell his share while they still live together.' }] },
	{ id: 'earnest', title: 'Suits between family members', steps: [{ id: 'm44' }, { id: 'm45', ctx: true, tw: 'Liza also sues her brother’s wife as co-defendant.' }, { id: 'm46', tw: 'Which kind of suit between family members needs no earnest efforts at all?' }] },
	{ id: 'ana', title: 'Baby Ana’s legitimacy', steps: [{ id: 'm54' }, { id: 'm55', ctx: true, tw: 'Now: who may challenge that status?' }, { id: 'm56', ctx: true, tw: 'Dino lives in Manila; Ana was born and registered in Cebu.' }] },
	{ id: 'legitimation', title: 'Legitimation', steps: [{ id: 'm63' }, { id: 'm64', tw: 'The father was married to someone else when the child was conceived.' }, { id: 'm65', tw: 'The child is legitimated. From when does it take effect?' }] },
	{ id: 'support', title: 'Support', steps: [{ id: 'm75' }, { id: 'm76', tw: 'A different child needed support since January, demanded it in April, and sued in June.' }, { id: 'm77', tw: 'The parents sign away the child’s future support for a lump sum.' }, { id: 'm78', tw: 'What kind of support may be compromised?' }] },
	{ id: 'missing', title: 'A missing spouse', steps: [{ id: 'm97' }, { id: 'm98', tw: 'The husband was aboard a vessel lost at sea, and the wife wants to remarry.' }, { id: 'm99', tw: 'The wife asked only a few relatives before filing.' }] }
];

// ---------- ALAC problems ----------

const BOXES: AlacProblem['boxes'] = {
	a: { starters: ['Yes. ', 'No. '], placeholder: 'Yes / No / the regime / the status…' },
	l: { starters: ['The law provides that ', 'Jurisprudence provides that '], placeholder: 'The law provides that…' },
	p: { starters: ['Here, ', 'This means ', 'because '] },
	c: { starters: ['Therefore, '] }
};
export const TOPICS: (KitTopic & { rule: string })[] = data.P.map((t) => ({ id: t.id, title: t.title, cite: t.art, rule: t.rule, group: t.g }));
const TOPIC_BY_ID = index(TOPICS, 'id');

// Two direct problems and one twist per topic, shuffled within the topic with the source kit's fixed seed.
function seeded() {
	let seed = 13;
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
		const pid = `pfr-${t.id}-${i + 1}`;
		return {
			subject: 'pfr' as const,
			group: t.g,
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
			href: `/pfr/p/${pid}`,
			tags: [
				{ label: `${ROMAN[t.g]} · ${GROUP_LABEL[t.g]}`, cls: 'tag tag-line' },
				{ label: 'ALAC scenario', cls: 'tag tag-accent' }
			],
			home: { href: '/pfr/problems', label: 'All PFR problems' },
			boxes: BOXES,
			nav: () => navFor(PFR, pid)
		};
	});
});
PROBLEMS.forEach((p, i) => (p.no = i + 1));

// ---------- case digests ----------

const slug = (s: string) =>
	s
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
export const DIGESTS = data.C.map((c) => ({
	id: slug(c.n),
	name: c.n,
	cite: c.c,
	group: c.g,
	facts: c.f,
	issue: c.iss,
	ruling: c.r,
	doctrine: c.d,
	star: c.hot ? 'Frequently asked in exams on this topic.' : undefined
}));

export const DISTINCTIONS = data.T;
export const PAST = data.XP;
export const SPOT = data.SPOT.map(([clue, id]) => ({ clue, topic: TOPIC_BY_ID[id] }));

// ---------- exam focus ----------

const TYPE: Record<string, QType> = { MCQ: 'MCQ', Scenario: 'scenario', Sequence: 'sequence', Distinction: 'distinction' };
const LIQUIDATION = ENUMS.find((e) => e.t === 'Steps in liquidating the ACP')!;
const FOCUS: Focus = {
	top: data.FOCUS.map(([type, q, where, arg]) => {
		const first = String(arg).split('|')[0];
		const topic =
			where === 'probs'
				? String(arg)
						.split('|')
						.map((id) => TOPIC_BY_ID[id].title)
						.join('; ')
				: where === 'mcq'
					? GROUP_LABEL[Number(arg)]
					: where === 'past'
						? 'Past exam, part V'
						: where === 'enum'
							? 'Liquidation · Arts. 102, 103, 129'
							: 'Distinctions';
		const href =
			where === 'probs'
				? `/pfr/problems#t-${first}`
				: where === 'mcq'
					? `/pfr/mcq#g-${arg}`
					: where === 'past'
						? `/pfr/past#s-${arg}`
						: where === 'enum'
							? `/pfr/enumerations#e-${LIQUIDATION.id}`
							: '/pfr/distinctions';
		return { q, type: TYPE[type] ?? 'MCQ', topic, href };
	}),
	enums: LIKELY_ENUMS,
	terms: LIKELY_TERMS,
	topics: Object.fromEntries(
		data.FOCUS.filter(([, , where]) => where === 'probs').flatMap(([, q, , arg]) => String(arg).split('|').map((id) => [id, `Ranked in the exam focus: ${q}`]))
	)
};

export const PFR: Kit = {
	id: 'pfr',
	name: 'PFR',
	title: 'PFR Finals Kit',
	eyebrow: 'Family Code, Art. 74 to Other Provisions',
	scope: 'Art. 74 to Other Provisions',
	base: '/pfr',
	groupNoun: 'part',
	groups: GROUPS,
	enums: ENUMS,
	terms: TERMS,
	problems: PROBLEMS,
	cases: DIGESTS.map((c) => ({ id: c.id, name: c.name, doc: c.doctrine, ch: GROUP_LABEL[c.group] })),
	mcqs: MCQS,
	chains: CHAINS,
	examParts: ['mcq', 'prob'],
	focus: FOCUS,
	state: () => store.pfr
};

export const PROBLEM_BY_PID = index(PROBLEMS, 'pid');
