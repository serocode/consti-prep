export interface Section {
	k: 'a' | 'l' | 'p' | 'c';
	L: string;
	title: string;
	prompt: string;
	placeholder: string;
	starters: string[];
	rows: number;
	app?: boolean;
}

export const SECTIONS: Section[] = [
	{ k: 'a', L: 'A', title: 'Answer', prompt: 'What is your direct answer?', placeholder: 'Yes or No. State your position clearly…', starters: ['Yes.', 'No.', 'Valid.', 'Invalid.'], rows: 2 },
	{ k: 'l', L: 'L', title: 'Legal Basis', prompt: 'What provision or doctrine supports your answer?', placeholder: 'The Constitution provides that…', starters: ['The Constitution provides that ', 'Jurisprudence provides that '], rows: 4 },
	{ k: 'p', L: 'A', title: 'Application', prompt: 'How does the rule apply to these facts?', placeholder: 'Here, …', starters: ['Here, ', 'This means ', 'because '], rows: 7, app: true },
	{ k: 'c', L: 'C', title: 'Conclusion', prompt: 'What is your final conclusion?', placeholder: 'Therefore, …', starters: ['Therefore, '], rows: 2 }
];

export function words(s: string | undefined): number {
	const t = (s ?? '').trim();
	return t ? t.split(/\s+/).length : 0;
}
