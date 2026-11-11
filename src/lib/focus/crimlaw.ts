import type { TopQuestion } from '../kit';

/**
 * Crim Law I exam focus. Flags are keyed by the enumeration's title (ids are numbered at build time),
 * by term slug, and by topic id. Reasons are one line: why the item is likely to come out.
 */
export const LIKELY_ENUMS: Record<string, string> = {
	'Three kinds of principals': 'The classic Art. 17 enumeration. It opens most finals on persons liable.',
	'Requisites: principal by inducement': 'Tested through "paid to kill" and "leader gave the order" scenarios.',
	'Requisites: principal by indispensable cooperation': 'Paired with accomplice in distinction questions almost every year.',
	'Conspiracy: key rules': 'Conspiracy is the most tested concept in Book One. "Act of one is the act of all."',
	'Requisites: accomplice': 'You need these to answer any "principal or accomplice?" scenario.',
	'Indispensable cooperator vs. accomplice': 'A favorite distinction question; the doubt rule is the usual twist.',
	'Requisites: accessory': 'Accessory problems appear in both bar and school exams; start with these.',
	'Three acts of accessories': 'Short list, easy to ask as an enumeration with explanation.',
	'When harboring the principal is punished': 'The usual twist: a private person hides a friend who committed homicide.',
	'Accessories exempt from liability (relatives)': 'Art. 20 is a staple scenario: wife or brother hides the offender.',
	"Exception to the relatives' exemption": 'The twist to Art. 20: the relative who profits is not exempt.',
	'Retroactive effect of penal laws: requisites': 'Favorable-law questions recur whenever a penalty law is amended.',
	'Subsidiary imprisonment: rules': 'Number-heavy and easy to turn into a computation.',
	'Two kinds of complex crimes': 'Art. 48 is tested in almost every Book One exam.',
	'When Art. 48 does not apply': 'Examiners test the limits: separate acts, special complex crimes, light felonies.',
	'Penalty by stage and participation (degrees lower)': 'The table behind every "what penalty?" computation.',
	'Requisites: habitual delinquency': 'Asked alone or as a distinction with recidivism.',
	'Habitual delinquency vs. recidivism': 'A standard distinction question.',
	'Rules for divisible penalties (three periods)': 'Needed to pick the period; part of every ISLaw computation.',
	'Ordinary vs. privileged mitigating': 'Explains when the degree drops and when only the period moves.',
	'Successive service of sentences': 'The three-fold rule and the 40-year cap are quick computation items.',
	'Indeterminate Sentence Law: how to fix the terms': 'ISLaw computation is the single most common penalty question.',
	'ISLaw does not apply to': 'A long list that is often asked whole; also the twist in ISLaw problems.',
	'Disqualified from probation': 'Probation is tested often since RA 10707; the list sets the limits.',
	'Total extinction of criminal liability': 'A memorize-and-enumerate favorite: the seven modes.',
	'Pardon vs. amnesty': 'One of the most repeated distinction questions in Criminal Law.',
	'Prescription of crimes': 'Periods are asked directly and inside scenarios.',
	'Civil liability despite exemption from criminal liability': 'Tests whether you know exemption does not erase civil liability.',
	'Subsidiary liability of employers': 'Three requisites that fit neatly into a scenario with a twist.'
};

export const LIKELY_TERMS: Record<string, string> = {
	'principal-by-induction': 'Defined, then applied in inducement scenarios.',
	'principal-by-indispensable-cooperation': 'Its definition is the test used against "accomplice".',
	accomplice: 'Core term of Arts. 16–20.',
	accessory: 'Core term of Arts. 16–20.',
	conspiracy: 'The most tested definition in Book One.',
	'implied-conspiracy': 'Most conspiracy scenarios have no proof of an agreement.',
	'complex-crime': 'Art. 48 is tested in almost every exam.',
	'compound-crime': 'Asked with complex crime proper as a pair.',
	'special-complex-crime': 'Commonly confused with an Art. 48 complex crime.',
	'continued-crime': 'Often asked together with complex crime and continuing crime.',
	'error-in-personae': 'Paired with aberratio ictus in distinction questions.',
	'aberratio-ictus': 'Paired with error in personae in distinction questions.',
	'habitual-delinquent': 'Defined, then distinguished from a recidivist.',
	recidivist: 'Defined, then distinguished from a habitual delinquent.',
	'three-fold-rule': 'Short definition with numbers; easy to ask.',
	'indeterminate-sentence': 'The idea behind the most common computation.',
	probation: 'Tested often since RA 10707.',
	'reclusion-perpetua': 'Its distinction from life imprisonment is a classic.',
	'life-imprisonment': 'Its distinction from reclusion perpetua is a classic.',
	'subsidiary-imprisonment': 'Short definition; leads into a computation.',
	amnesty: 'Half of the pardon vs. amnesty distinction.',
	'absolute-pardon': 'Half of the pardon vs. amnesty distinction.',
	'prescription-of-crime': 'Always asked against prescription of penalty.',
	'prescription-of-penalty': 'Always asked against prescription of crime.'
};

export const LIKELY_TOPICS: Record<string, string> = {
	conspiracy: 'The most tested concept in Book One.',
	cooperation: 'Principal vs. accomplice is a standard scenario.',
	accessory: 'Accessory acts and the harboring limits recur often.',
	complex: 'Art. 48: one act vs. separate acts.',
	isl: 'The most common penalty computation.',
	probation: 'Appeal vs. probation after RA 10707.',
	prescription: 'Count from discovery; watch for absence from the Philippines.'
};

type Top = Omit<TopQuestion, 'href'> & { topicId?: string; list?: string };

/** Ranked most-likely questions. `topicId` links to that topic's problems, `list` to an enumeration by title. */
export const TOP: Top[] = [
	{ q: 'Several persons took part in a crime. Classify each one: principal, accomplice, or accessory.', type: 'scenario', topic: 'Persons liable · Arts. 16–19', topicId: 'cooperation' },
	{ q: 'There is no proof of an agreement. Is the lookout or the bystander liable as a conspirator?', type: 'scenario', topic: 'Conspiracy · Art. 8', topicId: 'conspiracy' },
	{ q: 'Fix the minimum and maximum terms of the indeterminate sentence.', type: 'computation', topic: 'Indeterminate Sentence Law', topicId: 'isl' },
	{ q: 'Who are principals? Give the three kinds and the requisites of each.', type: 'enumeration', topic: 'Art. 17', list: 'Three kinds of principals' },
	{ q: 'One act killed several persons, or one crime was the means to commit another. How many crimes, and what penalty?', type: 'scenario', topic: 'Complex crimes · Art. 48', topicId: 'complex' },
	{ q: 'How is criminal liability totally extinguished?', type: 'enumeration', topic: 'Art. 89', list: 'Total extinction of criminal liability' },
	{ q: 'Distinguish pardon from amnesty.', type: 'distinction', topic: 'Art. 89', list: 'Pardon vs. amnesty' },
	{ q: 'The accused appealed, then applied for probation. May probation still be granted?', type: 'scenario', topic: 'Probation Law', topicId: 'probation' },
	{ q: 'Who are not covered by the Indeterminate Sentence Law? Who are disqualified from probation?', type: 'enumeration', topic: 'ISLaw and Probation Law', list: 'ISLaw does not apply to' },
	{ q: 'The complaint was filed years after the crime. Has the crime prescribed?', type: 'computation', topic: 'Prescription of crimes · Arts. 90–91', topicId: 'prescription' },
	{ q: 'Distinguish habitual delinquency from recidivism.', type: 'distinction', topic: 'Art. 62', list: 'Habitual delinquency vs. recidivism' },
	{ q: 'A relative hid the offender or kept the stolen goods. Is the relative liable as an accessory?', type: 'scenario', topic: 'Accessories · Arts. 19–20', topicId: 'relatives' },
	{ q: 'The convict has several sentences. How long will he actually serve?', type: 'computation', topic: 'Three-fold rule · Art. 70', topicId: 'threefold' },
	{ q: 'Define complex crime, special complex crime, and continued crime.', type: 'definition', topic: 'Art. 48' },
	{ q: 'The accused was acquitted, or died. Is there still civil liability?', type: 'scenario', topic: 'Civil liability · Arts. 89, 100', topicId: 'acquittal' }
];
