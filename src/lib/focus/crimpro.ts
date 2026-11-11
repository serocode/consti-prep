import type { TopQuestion } from '../kit';

/** Crim Pro exam focus: twist sets and rules flagged "★ Likely", and the ranked likely MCQ topics. */
export const LIKELY_SETS: Record<string, string> = {
	bail: 'Bail is the most tested rule: right vs. discretion, and the mandatory hearing.',
	jeopardy: 'Double jeopardy and dismissals on the accused’s motion are classic trick questions.',
	arrest: 'Warrantless arrest and the search that follows appear in almost every exam.',
	pi: 'The 4-2-1 threshold, inquest, and waiver are easy to turn into linked MCQs.',
	quash: 'Which grounds survive a plea is a favorite one-fact twist.',
	trial: 'Demurrer with or without leave is asked nearly every year.',
	amend: 'Before plea vs. after plea changes the answer, which suits linked questions.'
};

export const LIKELY_RULES: Record<string, string> = {
	'110': 'Who files, amendment, and venue are basic and often tested.',
	'113': 'The three kinds of warrantless arrest.',
	'114': 'The most tested rule in Criminal Procedure.',
	'117': 'Motion to quash, double jeopardy, and provisional dismissal.',
	'119': 'Demurrer to evidence and discharge of a state witness.',
	'126': 'Requisites of a search warrant and the warrantless searches.'
};

export const TOP: TopQuestion[] = [
	{ q: 'Is bail a matter of right or of discretion at this stage? Is a hearing needed?', type: 'MCQ', topic: 'Rule 114', href: '/crimpro/drill/bail' },
	{ q: 'The case was dismissed on the accused’s own motion. May it be refiled?', type: 'MCQ', topic: 'Rule 117 · double jeopardy', href: '/crimpro/drill/jeopardy' },
	{ q: 'The demurrer was denied. May the accused still present evidence?', type: 'MCQ', topic: 'Rule 119 · demurrer', href: '/crimpro/drill/trial' },
	{ q: 'Was the warrantless arrest valid: in the act, hot pursuit, or neither?', type: 'MCQ', topic: 'Rule 113', href: '/crimpro/drill/arrest' },
	{ q: 'May the information still be amended? Does it matter that the accused has pleaded?', type: 'MCQ', topic: 'Rules 110, 120 · amendment and variance', href: '/crimpro/drill/amend' },
	{ q: 'The accused moved to quash only after plea. Is the ground waived?', type: 'MCQ', topic: 'Rule 117 · motion to quash', href: '/crimpro/drill/quash' },
	{ q: 'Is a preliminary investigation required? Was the right waived?', type: 'MCQ', topic: 'Rule 112', href: '/crimpro/drill/pi' },
	{ q: 'Is the search warrant valid, and was it properly served? What may be seized?', type: 'MCQ', topic: 'Rule 126', href: '/crimpro/drill/search2' },
	{ q: 'The prosecution revives a provisionally dismissed case. Is it too late?', type: 'MCQ', topic: 'Rule 117 · 1 year or 2 years', href: '/crimpro/drill/jeopardy' },
	{ q: 'May the civil case proceed while the criminal case is pending? Is there a prejudicial question?', type: 'MCQ', topic: 'Rule 111', href: '/crimpro/drill/civil' },
	{ q: 'Who may file the complaint for a private crime?', type: 'MCQ', topic: 'Rule 110', href: '/crimpro/drill/private' },
	{ q: 'What is the mode of appeal, and how many days are left to appeal?', type: 'MCQ', topic: 'Rule 122', href: '/crimpro/drill/appeal2' },
	{ q: 'May this accused be discharged as a state witness?', type: 'MCQ', topic: 'Rule 119', href: '/crimpro/drill/trial' },
	{ q: 'The accused offers to plead guilty to a lesser offense. Whose consent is needed?', type: 'MCQ', topic: 'Rule 116', href: '/crimpro/drill/plea2' },
	{ q: 'The accused was absent at promulgation. What remedies are left?', type: 'MCQ', topic: 'Rule 120', href: '/crimpro/drill/judgment' }
];
