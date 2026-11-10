import raw from './data/consti.json';

export type PartNo = 1 | 2 | 3 | 4;
export type ProblemType = 'drill' | 'same' | 'twist';

export interface CaseData {
	id: string;
	part: PartNo;
	n: number;
	name: string;
	cite: string;
	hook: string;
	rule: string;
	mem: string[];
	doc: string[];
	drill: string;
	alac: string[];
	key: string;
}

interface Twin {
	c: string;
	t: 'same' | 'twist';
	label: string;
	facts: string;
	q: string;
	hint: string;
	alac: string[];
	key: string;
}

export interface Problem {
	pid: string;
	no: number;
	c: CaseData;
	type: ProblemType;
	label: string;
	facts: string;
	q: string;
	hint: string;
	alac: string[];
	key: string;
}

const data = raw as unknown as { PARTS: Record<string, string>; D: CaseData[]; TW: Twin[] };

export const PARTS: Record<PartNo, string> = {
	1: data.PARTS['1'],
	2: data.PARTS['2'],
	3: data.PARTS['3'],
	4: data.PARTS['4']
};
export const PART_SHORT: Record<PartNo, string> = {
	1: 'I · President',
	2: 'II · Budget',
	3: 'III · Judiciary',
	4: 'IV · Commissions'
};
export const TYPE_LABEL: Record<ProblemType, string> = { drill: 'Case drill', same: 'Same rule', twist: 'Twist' };
export const TYPE_TAG: Record<ProblemType, string> = { drill: 'tag', same: 'tag tag-en', twist: 'tag tag-accent' };

export const CASES = data.D;

function build(): Problem[] {
	const out: Problem[] = [];
	for (const c of data.D) {
		out.push({
			pid: `${c.id}-drill`,
			no: 0,
			c,
			type: 'drill',
			label: 'Case drill',
			facts: c.drill,
			q: '',
			hint: `Memory hook: ${c.hook}`,
			alac: c.alac,
			key: c.key
		});
		let i = 0;
		for (const t of data.TW) {
			if (t.c !== c.id) continue;
			i++;
			out.push({ pid: `${c.id}-t${i}`, no: 0, c, type: t.t, label: t.label, facts: t.facts, q: t.q, hint: t.hint, alac: t.alac, key: t.key });
		}
	}
	out.forEach((p, i) => (p.no = i + 1));
	return out;
}

export const PROBLEMS: Problem[] = build();
export const BY_PID: Record<string, Problem> = Object.fromEntries(PROBLEMS.map((p) => [p.pid, p]));
