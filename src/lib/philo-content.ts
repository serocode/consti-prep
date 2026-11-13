/**
 * Legal Philo content, taken from the finals reviewer (Lessons 10 to 13 and the four Philippine
 * jurisprudence handouts). Groups: 10–13 are the lessons, 14 is Philippine jurisprudence.
 * Strings may use **bold**; essay and thinker strings may also use *italics* (see `fmt`).
 */
import type { Digest } from './digest';
import type { Group, KitEnum, KitTerm, TopQuestion } from './kit';

export const GROUPS: Group[] = [
	{ id: 10, short: 'L10', title: 'Lesson 10 · Morals v. Force' },
	{ id: 11, short: 'L11', title: 'Lesson 11 · The Shift to the Social Sciences' },
	{ id: 12, short: 'L12', title: 'Lesson 12 · Historical School' },
	{ id: 13, short: 'L13', title: 'Lesson 13 · Sociological School' },
	{ id: 14, short: 'PH', title: 'Philippine jurisprudence' }
];

// ---------- enumerations ----------

export const ENUMS: KitEnum[] = [
	{
		id: '10.1',
		group: 10,
		kind: 'cls',
		t: 'Three attitudes to the relationship of law and morals',
		src: 'Lesson 10',
		mem: 'Same · Higher · Apart',
		it: [
			['Law is identical with morals', 'Hebrew and Calvinist theocracy; **Hobbes** (morality is obeying the sovereign); **Hegel** (no higher right than to obey the state).'],
			['Separate realms, moral law higher', 'Either the unjust law is nullified, or the citizen obeys and the matter is left between God and the ruler.'],
			['Legal positivism', 'Each is autonomous; neither settles validity outside its own sphere.']
		],
		trap: 'Hobbes and Hegel are on the “identical” side, not the positivist side.'
	},
	{
		id: '10.2',
		group: 10,
		kind: 'list',
		t: 'Why law and morals converge most in criminal law',
		src: 'Lesson 10',
		mem: 'Guilt · Mind · Measure',
		it: [
			['Guilt is tied to moral responsibility', ''],
			['Crimes require mens rea', 'A guilty mind.'],
			['Punishment is scaled to moral depravity', '']
		]
	},
	{
		id: '10.3',
		group: 10,
		kind: 'cls',
		t: 'Views on the relationship of force and law',
		src: 'Lesson 10',
		mem: 'Anti · Basis · Incidental · Irony',
		it: [
			['Force is the antithesis of law', '**St. Augustine**: without justice, a government is “a band of robbers.”'],
			['Force is the basis of law', '**Austin**: the command of a sovereign, habitually obeyed, backed by sanction.'],
			['Force is incidental', 'People consent, so force is rarely needed.'],
			['International law is the irony', 'It binds with no sovereign and no enforcer.']
		]
	},
	{
		id: '10.4',
		group: 10,
		kind: 'cls',
		t: 'Weber’s three types of authority',
		src: 'Lessons 10 and 13',
		mem: 'C-T-R: Charisma, Tradition, Rules',
		it: [
			['Charismatic', 'Obedience to the personal gifts of a leader.'],
			['Traditional', 'Obedience because it has always been so.'],
			['Rational-legal', 'Obedience to rules enacted by proper procedure. The modern form.']
		],
		trap: 'Weber explains obedience by **belief in legitimacy**, not fear of sanction (contrast Austin).'
	},
	{
		id: '10.5',
		group: 10,
		kind: 'list',
		t: 'Hart’s objections to Austin’s command theory',
		src: 'Lesson 10',
		mem: 'Sovereign · Powers · Gunman',
		it: [
			['No single sovereign', 'Modern states disperse power.'],
			['Many rules confer powers', 'Wills, marriage: they enable, they do not command.'],
			['Threats do not create obligations', 'Otherwise a statute would equal a gunman’s demand.']
		]
	},
	{
		id: '10.6',
		group: 10,
		kind: 'list',
		t: 'Critics of legal positivism',
		src: 'Lesson 10',
		it: [
			['H.L.A. Hart', 'Against Austin’s command theory: no single sovereign, power-conferring rules, the gunman.'],
			['Hans Kelsen', 'Against reliance on force: force is a sociological fact outside law. Validity comes from a higher norm, ending in the **Grundnorm**.'],
			['Holmes', 'Against separating law and morals: judges filling gaps (lacunae) draw on morals.'],
			['Nuremberg trials', '“Obeying the sovereign’s orders” rejected as a defense; led toward the UDHR.'],
			['Ronald Dworkin', 'Against Hart: law as integrity. Judges read past practice in its best moral light.']
		]
	},
	{
		id: '11.1',
		group: 11,
		kind: 'list',
		t: 'Forerunners of the shift to the social sciences',
		src: 'Lesson 11',
		mem: 'My Cat Runs Behind Hens',
		it: [
			['Montesquieu', 'The Spirit of Law: institutions must fit the society and geography; separation of powers.'],
			['Comte', 'Coined “sociology”; law of three stages.'],
			['Rousseau', 'The Social Contract: by obeying the general will, people obey themselves.'],
			['Burke', 'Constitutions grow from tradition, not rational design. For the American, against the French Revolution.'],
			['Hegel', 'The state is a real entity higher than its citizens, the embodiment of reason.']
		]
	},
	{
		id: '11.2',
		group: 11,
		kind: 'cls',
		order: true,
		t: 'Comte’s law of three stages',
		src: 'Lesson 11',
		mem: 'God → Ideas → Science',
		it: [
			['Theological', 'Events explained by God.'],
			['Metaphysical', 'Explained by abstract universal rights.'],
			['Positive (scientific)', 'Explained by observed facts.']
		],
		trap: 'Comte’s “positivism” is scientific method, not legal positivism.'
	},
	{
		id: '12.1',
		group: 12,
		kind: 'doc',
		t: 'Characteristics of law under the Historical School',
		src: 'Lesson 12',
		mem: 'National · Not universal · Stable · Custom · No code · Jurists',
		it: [
			['Specific to each nation', ''],
			['Not universal', ''],
			['Stable across generations', ''],
			['Custom is the most authentic law', ''],
			['Codification is frowned upon', ''],
			['Lawyers and judges carry and articulate the popular consciousness', '']
		]
	},
	{
		id: '12.2',
		group: 12,
		kind: 'list',
		t: 'Criticisms of the Historical School in the handout',
		src: 'Lesson 12',
		it: [
			['Conservatism', 'Tying law to the volksgeist limits its power to meet modern problems. Pound: “**juristic pessimism**.” It looks backward; the Functional School looks forward.'],
			['Holmes’s objection', '“Revolting” to have no better reason for a rule than that it was laid down in the time of Henry IV.'],
			['Who are the “folk”?', 'Few societies are homogeneous. The search for a national character slides into racial purification (Nazi Germany).']
		]
	},
	{
		id: '13.1',
		group: 13,
		kind: 'doc',
		t: 'Marx’s three ideas of law',
		src: 'Lesson 13',
		mem: 'Product · Tool · Wither',
		it: [
			['A product of economic forces', 'Law is superstructure on the economic base.'],
			['A tool of the ruling class', ''],
			['Destined to wither away', 'Under pure communism, law and state are no longer needed.']
		]
	},
	{
		id: '13.2',
		group: 13,
		kind: 'cls',
		t: 'Durkheim’s two types of solidarity and their law',
		src: 'Lesson 13',
		it: [
			['Mechanical solidarity → repressive law', 'Simple societies held together by sameness; penal law.'],
			['Organic solidarity → restitutive law', 'Complex societies held together by interdependence; civil law that restores.']
		]
	},
	{
		id: '13.3',
		group: 13,
		kind: 'mem',
		t: 'Pound’s eight jural postulates',
		src: 'Lesson 13',
		it: [
			['No intentional aggression', ''],
			['Control of what one has discovered, created or acquired', ''],
			['Good faith in dealings', ''],
			['Due care not to injure', ''],
			['Restraint of dangerous things', ''],
			['Burdens of social life borne by society', ''],
			['A standard human life assured', ''],
			['Enjoyment of beauty, nature and the arts', '']
		],
		intro: 'Jural postulates are a civilization’s reasonable expectations. They change as society changes.'
	},
	{
		id: '13.4',
		group: 13,
		kind: 'cls',
		t: 'Pound’s three ways courts resolve conflicts of interest',
		src: 'Lesson 13',
		mem: 'Past · Postulates · Instinct',
		it: [
			['Follow the patterns of the past', 'Risks tying the court to a bygone ideology.'],
			['Grasp the postulates of its own age', 'With help from jurists and sociologists.'],
			['Trust its own instinct', 'The commonest. Demands contact with the living law.']
		]
	},
	{
		id: '13.5',
		group: 13,
		kind: 'cls',
		t: 'Perspectives within the Sociological School (Pascual)',
		src: 'Lesson 13',
		it: [
			['Functional', 'Pound.'],
			['Legal Realist', 'Holmes.'],
			['Policy Science', '']
		],
		trap: 'The handout treats all three as Sociological.'
	},
	{
		id: '14.1',
		group: 14,
		kind: 'cls',
		t: 'Three classes of custom',
		src: 'Civil Code, Arts. 11 and 12',
		it: [
			['Contra legem', 'Against the written law. **Not recognized** (Art. 11).'],
			['Secundum legem', 'In line with the law and already embodied in it. Enforced as positive law; the court takes judicial notice of the statute.'],
			['Praeter legem', 'Beyond the law, where the law is silent. May be applied but **must be proved as a fact** (Art. 12).']
		]
	},
	{
		id: '14.2',
		group: 14,
		kind: 'req',
		t: 'When a custom may be applied under the Civil Code',
		src: 'Civil Code, Arts. 11 and 12',
		it: [
			['It is not contrary to law, public order or public policy', 'Art. 11.'],
			['It is proved as a fact under the rules of evidence', 'Art. 12.']
		],
		trap: 'This is the reverse of the Historical School: enacted law is superior to custom.'
	},
	{
		id: '14.3',
		group: 14,
		kind: 'req',
		t: 'The clear and present danger test',
		src: 'Gonzales v. Comelec; ABS-CBN v. Comelec',
		it: [
			['Clear', 'A causal connection between the speech and the evil.'],
			['Present', 'The danger is imminent, not merely a tendency.'],
			['Substantive evil', 'Grave enough to justify “a clamp over one’s mouth.”']
		],
		intro: 'From Holmes: “a question of proximity and degree.”',
		trap: 'Contrast the **dangerous tendency** doctrine, which needs only a tendency to cause the evil.'
	}
];

// ---------- definitions ----------

export const TERMS: KitTerm[] = [
	{ id: 'natural-law', group: 10, t: 'Natural law', d: 'The theory that a law is valid because it conforms to a higher rule, such as morals or a natural order.', src: 'Lesson 10', x: 'Legal positivism asks where a rule came from, not whether it is just.' },
	{ id: 'legal-positivism', group: 10, t: 'Legal positivism', d: 'The theory that a rule is law because a recognized authority laid it down, not because it is morally right. Law and morals are autonomous.', src: 'Lesson 10; Austin, Kelsen, Hart', x: 'Comte’s positivism is a scientific method in sociology, not a theory of legal validity.' },
	{ id: 'command-theory', group: 10, t: 'Command theory', d: 'Austin’s view that law is the command of a sovereign, habitually obeyed and backed by a sanction.', src: 'Lesson 10; Austin', x: 'Hart: a command backed by a threat is what a gunman gives; it obliges, but it creates no obligation.' },
	{ id: 'legitimacy', group: 10, t: 'Legitimacy', d: 'The belief that whoever commands has the right to command. It is why we obey Congress and not a bank robber, though both take our money.', src: 'Lesson 10; Weber', x: 'Force gets compliance; legitimacy gets obedience.' },
	{ id: 'de-facto-jure', group: 10, t: 'De facto v. de jure government', d: 'A de facto government holds actual control by force; a de jure government holds the lawful right to govern. In the Japanese occupation the occupier was de facto, the government-in-exile de jure.', src: 'Lesson 10' },
	{ id: 'social-contract', group: 10, t: 'Social contract', d: 'The idea that people consented to surrender part of their freedom to a sovereign, which removes the moral stigma of force.', src: 'Lessons 10 and 11; Socrates, Hobbes, Rousseau', x: 'Burke rejects it: societies grow; they are not designed by agreement.' },
	{ id: 'grundnorm', group: 10, t: 'Grundnorm (basic norm)', d: 'Kelsen’s presupposed norm that the first historical constitution ought to be obeyed. Every norm in the system is valid because a higher norm authorizes it, ending here.', src: 'Lesson 10; Kelsen', x: 'It is neither enacted nor proved, only assumed.' },
	{ id: 'pure-theory', group: 10, t: 'Pure theory of law', d: 'Kelsen’s theory that studies law as a system of norms only, excluding force (a sociological fact) and morals.', src: 'Lesson 10; Kelsen' },
	{ id: 'integrity', group: 10, t: 'Law as integrity', d: 'Dworkin’s view that judges interpret past legal practice in its best moral light, so moral judgment is part of finding what the law is.', src: 'Lesson 10; Dworkin', x: 'Holmes says judges legislate in the gaps; Dworkin says they interpret, not invent.' },
	{ id: 'mens-rea', group: 10, t: 'Mens rea', d: 'A guilty mind. Its requirement for crimes is one reason law and morals converge most in criminal law.', src: 'Lesson 10' },
	{ id: 'sociology', group: 11, t: 'Sociology', d: 'The scientific study of society, a term coined by Comte. It treats society itself as the object of study, using scientific method instead of philosophical speculation.', src: 'Lesson 11; Comte' },
	{ id: 'general-will', group: 11, t: 'General will', d: 'Rousseau’s idea that by submitting to the general will people obey themselves, because they are collectively the authors of the law.', src: 'Lesson 11; Rousseau', x: 'The volksgeist is inherited and never chosen; the general will is formed by agreement.' },
	{ id: 'spirit-of-law', group: 11, t: 'The Spirit of Law', d: 'Montesquieu’s work holding that political institutions must reflect the social and geographic character of a community, and that social phenomena are interrelated.', src: 'Lesson 11; Montesquieu' },
	{ id: 'dialectic', group: 11, t: 'Dialectical idealism', d: 'Hegel’s view that history moves through the conflict of ideas toward reason, which is embodied in the state.', src: 'Lesson 11; Hegel', x: 'Marx’s dialectical materialism: material production, not ideas, drives history.' },
	{ id: 'volksgeist', group: 12, t: 'Volksgeist', d: 'The spirit or common consciousness of a people, from which law springs as language and custom do. Law is found, not made.', src: 'Lesson 12; Savigny', x: 'Ehrlich’s living law is plural and present; the volksgeist is one national spirit inherited from history.' },
	{ id: 'historical-school', group: 12, t: 'Historical School', d: 'The school that finds the source of law in a people’s history and custom, and distrusts codes imposed by reason. Founded in Germany by Hugo, consolidated by Savigny; in England, Maine.', src: 'Lesson 12' },
	{ id: 'status-contract', group: 12, t: 'From status to contract', d: 'Maine’s thesis that law and society move from relations fixed by birth and family to relations chosen by agreement.', src: 'Lesson 12; Maine, Ancient Law (1861)', x: 'Modern labor and consumer law bring status back: Floresca protects workers as workers.' },
	{ id: 'juristic-pessimism', group: 12, t: 'Juristic pessimism', d: 'Pound’s charge against the Historical School: tying law to the volksgeist leaves it powerless to meet modern problems.', src: 'Lesson 12; Pound' },
	{ id: 'law-society', group: 13, t: 'Law and Society movement', d: 'Friedman’s approach that looks outside the legal system, treats law’s autonomy as an empirical question, and studies the impact of laws once in force. “Law is too important to be left to lawyers.”', src: 'Lesson 13; Friedman' },
	{ id: 'base-superstructure', group: 13, t: 'Base and superstructure', d: 'Marx’s view that the economic base (mode of production) shapes the superstructure, which includes law, the state and ideas.', src: 'Lesson 13; Marx' },
	{ id: 'iron-cage', group: 13, t: 'Rationalization and the iron cage', d: 'Weber’s idea that modern authority becomes rule-bound and bureaucratic, freeing people from irrational tradition but trapping them as cogs in a machine.', src: 'Lesson 13; Weber' },
	{ id: 'social-facts', group: 13, t: 'Social facts', d: 'Durkheim’s term for ways of acting and thinking that exist outside individuals and constrain them. Society is an entity of its own.', src: 'Lesson 13; Durkheim' },
	{ id: 'living-law', group: 13, t: 'Living law', d: 'Ehrlich’s term for the rules people actually follow in their associations, as against positive law enacted by the State. The center of gravity of legal development lies in society itself.', src: 'Lesson 13; Ehrlich' },
	{ id: 'jurisprudence-interests', group: 13, t: 'Jurisprudence of interests', d: 'Jhering’s view that society is a mass of competing interests that cannot all be satisfied, and law is the impartial mediator among them.', src: 'Lesson 13; Jhering, The Struggle for Law' },
	{ id: 'social-engineering', group: 13, t: 'Social engineering', d: 'Pound’s view that the lawmaker and the judge use law as a tool to order society, weighing competing individual and social interests.', src: 'Lesson 13; Pound', x: 'Pound is prescriptive (what courts should do); Holmes is descriptive (what courts do).' },
	{ id: 'jural-postulates', group: 13, t: 'Jural postulates', d: 'Pound’s term for the reasonable expectations of a civilization at a given time and place. They change as society changes.', src: 'Lesson 13; Pound', x: 'Unlike the volksgeist, they are tools for reform, not limits on it.' },
	{ id: 'legal-realism', group: 13, t: 'Legal realism', d: 'The view that law is what courts do in fact. Holmes: “the prophecies of what the courts will do in fact, and nothing more pretentious.”', src: 'Lesson 13; Holmes' },
	{ id: 'interstitial', group: 14, t: 'Interstitial legislation', d: 'Lawmaking by judges inside the gaps of existing law. Holmes: judges “do and must legislate, but they can do so only interstitially,” confined from molar to molecular motions.', src: 'Floresca v. Philex Mining', x: 'Rodriguez v. Tan: importing a whole doctrine with no statute is “to legislate by judicial ruling.”' },
	{ id: 'cpd', group: 14, t: 'Clear and present danger', d: 'Holmes’s test: speech may be restricted only if it creates a clear (causally linked) and present (imminent) danger of a substantive evil. “A question of proximity and degree.”', src: 'Gonzales v. Comelec; ABS-CBN v. Comelec', x: 'The dangerous tendency doctrine needs only a tendency to cause the evil.' },
	{ id: 'balancing', group: 14, t: 'Balancing of interests', d: 'The test that weighs a constitutional right against the public interest served by restricting it. A “fundamental postulate of constitutional law.”', src: 'Lantion; Soriano; Akbayan', x: 'Clear and present danger asks only how near and grave the harm is.' },
	{ id: 'preferred-freedoms', group: 14, t: 'Primacy of human rights', d: 'The doctrine that freedoms of expression, assembly and petition hold a preferred position over property rights: property may be restricted on a rational basis, these freedoms only on clear and present danger.', src: 'PBMEO v. Philippine Blooming Mills (1973)', x: 'Balancing weighs case by case; this ranks the rights before the weighing begins.' }
];

// ---------- case digests ----------

export const CASES: Digest[] = [
	{
		id: 'floresca',
		name: 'Floresca v. Philex Mining Corp.',
		cite: 'G.R. No. L-30642, April 30, 1985',
		facts: 'Miners died in a cave-in at Philex’s mine. Their heirs sued the company in court for damages under the Civil Code, alleging its negligence. Philex argued that the heirs’ only remedy was workmen’s compensation.',
		issue: 'May the heirs sue for damages under the Civil Code, or are they limited to workmen’s compensation?',
		ruling: 'They may choose either remedy, but generally not both. The Court admitted it was filling a gap the law left open, to protect “the lowly workers.”',
		doctrine: 'Judges “**do and must legislate, but they can do so only interstitially**,” confined “from molar to molecular motions” (Holmes). The written word is no longer the “sovereign talisman” (Cardozo).',
		link: 'Judges make law in the gaps; anti-formalism; social engineering in action.',
		star: 'The clearest Philippine statement of judicial lawmaking. Pair it with Rodriguez v. Tan.',
		trap: 'Not a licence to legislate freely: “interstitially” is the limit.'
	},
	{
		id: 'rodriguez',
		name: 'Rodriguez v. Tan',
		cite: '91 Phil. 724 (1952)',
		facts: 'After winning an election protest for a Senate seat, Rodriguez sued Tan to recover the salary Tan had received while sitting in the seat. He relied on an American common-law rule that lets the rightful officer recover it.',
		issue: 'May the Court adopt the common-law rule though no Philippine statute provides for it?',
		ruling: 'No. Adopting a common-law doctrine with no statutory basis would be “**to legislate by judicial ruling**,” which is beyond the Court’s province.',
		doctrine: 'Courts may not import a whole doctrine that has no statute to attach to. Lawmaking belongs to the legislature.',
		link: 'The positivist counterweight to Floresca.',
		trap: 'Reconcile with Floresca through “interstitially”: filling a gap inside a statute is not importing a doctrine with no statute.'
	},
	{
		id: 'alzua',
		name: 'Alzua v. Johnson',
		cite: '21 Phil. 308 (1912)',
		facts: 'A suit for damages was brought against a Justice of the Supreme Court for acts done in deciding a case. The question turned on a rule that came from American common law.',
		issue: 'Do common-law rules apply in the Philippines?',
		ruling: 'The common law is not in force here, yet many of its rules came in with American-era laws and institutions and are needed to “breathe the breath of life” into them. They apply only if founded on sound principles, suited to local conditions, and not in conflict with existing law.',
		doctrine: 'A transplanted law carries its history with it; imported rules apply only if suited to **local conditions**.',
		link: 'Savigny (law carries its history), Montesquieu (fit the local society), Holmes in Gompers.'
	},
	{
		id: 'villaflor',
		name: 'Villaflor v. Summers',
		cite: '41 Phil. 62 (1920)',
		facts: 'A woman accused of adultery was ordered by the trial court to submit to a physical examination to determine whether she was pregnant. She refused, invoking the right against self-incrimination, and was held in contempt.',
		issue: 'Does a compelled physical examination violate the right against self-incrimination?',
		ruling: 'No. The right bars compelled testimony, not the use of the body as evidence, so an examination without force or torture is allowed.',
		doctrine: 'The privilege protects against testimonial compulsion, not the exhibition of the body. The Court relied on Holmes in Holt v. United States and called him “**the always forward looking jurist**.”',
		link: 'Holmes’s practical, experience-based reading of a right over an “extravagant extension” of its text.'
	},
	{
		id: 'gonzales',
		name: 'Gonzales v. Comelec',
		cite: 'G.R. No. L-27833, April 18, 1969',
		facts: 'Petitioners challenged a law limiting the period of election campaigning and partisan political activity as a violation of free speech, press, assembly and association.',
		issue: 'What test governs restrictions on these freedoms?',
		ruling: 'The Court explained Holmes’s clear and present danger test and contrasted it with the dangerous tendency doctrine. The law was sustained.',
		doctrine: 'Clear and present danger is “**a question of proximity and degree**.” The danger must be clear (causally linked) and present (imminent).',
		link: 'Rights are limited by real-world consequences, judged case by case.'
	},
	{
		id: 'abs-cbn',
		name: 'ABS-CBN v. Comelec',
		cite: 'G.R. No. 133486, January 28, 2000',
		facts: 'Comelec stopped ABS-CBN from conducting exit polls during the 1998 elections, saying they could confuse voters and undermine the official count.',
		issue: 'Is the ban a valid restraint on free speech and the press?',
		ruling: 'No. The feared harm was speculative. The Court struck the ban down.',
		doctrine: 'The Court “**adheres to**” clear and present danger; the evil must be substantive enough to justify “a clamp over one’s mouth.”',
		link: 'Shows Holmes is settled Philippine doctrine.'
	},
	{
		id: 'pbmeo',
		name: 'PBMEO v. Philippine Blooming Mills',
		cite: 'G.R. No. L-31195, June 5, 1973',
		facts: 'Workers joined a mass demonstration at Malacañang against alleged abuses of the Pasig police. The company warned that first-shift workers who joined would be dismissed under the no-strike clause of the CBA. The union officers were dismissed, and their motion for reconsideration was filed two days late.',
		issue: 'Do the employer’s contract and property rights, and a procedural deadline, prevail over the workers’ freedoms of expression, assembly and petition?',
		ruling: 'No. The demonstration was not a strike against the employer but a petition to government for redress. The dismissals were set aside and the officers reinstated with back pay.',
		doctrine: '**Primacy of human rights over property rights.** Property may be restricted on a rational basis; the preferred freedoms only on clear and present danger. Human rights are imprescriptible, so a procedural rule cannot defeat them.',
		link: 'A hierarchy of rights as the counterpoint to open-ended balancing.',
		star: 'The best case to set against balancing in a differentiate or critique answer.',
		trap: 'Not in the handouts: confirm the details against the full text.'
	},
	{
		id: 'lantion',
		name: 'Secretary of Justice v. Lantion',
		cite: 'G.R. No. 139465, January 18, 2000',
		facts: 'The United States asked for the extradition of a Filipino under the RP-US treaty. During the Department of Justice’s evaluation of the request, he asked for copies of the documents and a chance to answer them, and was refused.',
		issue: 'Does due process entitle him to notice and hearing at the evaluation stage?',
		ruling: 'The January 2000 decision said yes, weighing his due process right against the State’s treaty commitment and deference to the Executive in foreign affairs. On reconsideration in October 2000, the Court reversed and denied the right at that stage.',
		doctrine: 'Balancing of interests is a “**fundamental postulate of constitutional law**.”',
		link: 'Pound and Jhering: the court weighs individual against social interests.',
		star: 'The handout’s lead case for balancing.',
		trap: 'Cite it for the balancing method, not for the final result: the ruling was reversed on reconsideration.'
	},
	{
		id: 'soriano',
		name: 'Soriano v. Laguardia',
		cite: 'G.R. No. 164785, April 29, 2009',
		facts: 'On his television program Ang Dating Daan, Soriano used indecent language against a minister of another religious group. The MTRCB suspended him from the program for three months.',
		issue: 'Does the suspension violate his freedom of speech?',
		ruling: 'No. The State’s interest in the welfare of the youth, who could watch the program, outweighed his free speech claim. The Court chose balancing as “the more appropriate test.”',
		doctrine: '“**Constitutional freedoms are not absolute.**” Speech may yield to a weightier public interest.',
		link: 'Balancing of interests applied to speech.',
		star: 'The easiest example of weighing a right against a social interest.'
	},
	{
		id: 'akbayan',
		name: 'Akbayan v. Aquino',
		cite: 'G.R. No. 170516, July 16, 2008',
		facts: 'Petitioners asked for the documents of the Japan-Philippines Economic Partnership Agreement negotiations, including the offers exchanged. The government withheld them, invoking executive privilege.',
		issue: 'Does the right to information prevail over the privilege for diplomatic negotiations?',
		ruling: 'No. The negotiation documents were privileged, and petitioners failed to show a sufficient need to override it.',
		doctrine: 'The right to information yields to executive privilege over treaty negotiations unless a “**sufficient showing of need**” tips the balance.',
		link: 'Balancing, even where the word is not used.'
	}
];

/** Tensions between the cases, for differentiate and critique answers. */
export const TENSIONS: [string, string][] = [
	['Floresca v. Rodriguez v. Tan', 'One says judges must legislate in the gaps; the other says judicial legislation is beyond the Court. Reconcile them through Holmes’s word *interstitially*: filling a gap inside a statute differs from importing a doctrine with no statute.'],
	['Two speech tests', 'Gonzales and ABS-CBN apply clear and present danger; Soriano prefers balancing. Both reject absolutes and look to consequences. They differ in how much weight speech starts with.'],
	['Balance or hierarchy', 'Lantion and Soriano weigh interests case by case; Philippine Blooming Mills ranks human rights above property rights before the weighing begins.'],
	['Custom in theory and in the Code', 'Savigny treats custom as the most authentic law; the Civil Code treats it as a fact to be proved. Does a country of many peoples with a colonial legal inheritance have a single volksgeist?']
];

// ---------- thinkers ----------

export interface Thinker {
	id: string;
	name: string;
	group: number;
	/** Key terms, shown as tags. */
	terms: string[];
	idea: string;
	/** One phrase to remember them by. */
	remember: string;
	/** Other lessons they reappear in. */
	also?: string;
}

/** What each lesson says, in one line, and the points to carry into the exam. */
export const LESSONS: Record<number, { thesis: string; points: string[] }> = {
	10: {
		thesis: 'Natural law says a law is valid because it conforms to a higher rule such as morals; legal positivism says force is the basic element behind law.',
		points: [
			'An unjust law may still carry a moral duty to obey: Socrates in the *Crito*.',
			'Law and morals overlap, like a Venn diagram. Morals only: consensual sex between unmarried adults. Law only: which side of the road to drive on.',
			'Why we obey is legitimacy: Congress and a bank robber both take your money, but only Congress has authority.',
			'Test case: under the Japanese occupation the occupier was *de facto* with force; the government-in-exile was *de jure* with legitimacy. If the occupation became permanent and people accepted it, would might become right?'
		]
	},
	11: {
		thesis: 'Natural law and positivism both start from the individual. From the 17th century, thinkers began to study society itself, using scientific method instead of speculation.',
		points: ['The move is from the individual to the collective: Rousseau’s general will, Hegel’s state, later Durkheim’s social facts and Marx’s classes.']
	},
	12: {
		thesis: 'Law springs from the volksgeist, the spirit of a people, the way language and custom do. It is found, not made.',
		points: ['The Historical School looks backward; the Functional (Sociological) School looks forward.', 'The Philippine Supreme Court hardly ever cites the Historical School or its jurists.']
	},
	13: {
		thesis: 'Law is a set of institutional practices that develops with a society’s culture, economy and politics: “law is the handmaiden of society.”',
		points: ['Friedman’s Law and Society movement looks outside the legal system and studies the impact of laws once in force.']
	},
	14: {
		thesis: 'Our legal system is officially positivist on custom, yet borrows common-law reasoning and decides hard constitutional cases the way Holmes and Pound described.',
		points: []
	}
};

export const THINKERS: Thinker[] = [
	{ id: 'socrates', name: 'Socrates', group: 10, terms: ['*Crito*'], idea: 'Refused to escape an unjust death sentence, citing an early social contract: having accepted the benefits of the laws, he owed them obedience.', remember: 'Duty to obey even an unjust law' },
	{ id: 'augustine', name: 'St. Augustine', group: 10, terms: ['band of robbers'], idea: 'Force is the antithesis of law. Without justice, a government is no more than a band of robbers.', remember: 'Without justice, government is a band of robbers', also: 'Quoted twice in Lesson 10' },
	{ id: 'hobbes', name: 'Thomas Hobbes', group: 10, terms: ['social contract', 'sovereign'], idea: 'Life in the state of nature was “solitary, poor, nasty, brutish, and short,” so people surrendered their power to a sovereign. Morality is obeying the sovereign’s law.', remember: 'Social contract; morality is obeying the sovereign', also: 'Lesson 11' },
	{ id: 'austin', name: 'John Austin', group: 10, terms: ['command', 'sovereign', 'sanction'], idea: 'Law is the command of a sovereign, habitually obeyed, backed by a sanction. Force is the basis of law.', remember: 'Law is a command backed by sanction' },
	{ id: 'hart', name: 'H.L.A. Hart', group: 10, terms: ['rules', 'power-conferring rules', 'gunman'], idea: 'Positivist critic of Austin: no single sovereign, many rules confer powers, and a threat obliges without creating an obligation.', remember: 'Three objections to Austin; the gunman' },
	{ id: 'kelsen', name: 'Hans Kelsen', group: 10, terms: ['pure theory', '*Grundnorm*'], idea: 'Force is a sociological fact outside law. Each norm is valid under a higher norm, ending in a presupposed basic norm behind the first constitution.', remember: 'Pure theory; Grundnorm' },
	{ id: 'dworkin', name: 'Ronald Dworkin', group: 10, terms: ['law as integrity'], idea: 'Against Hart: judges interpret past practice in its best moral light, so moral judgment is part of finding the law.', remember: 'Law as integrity; constructive interpretation' },
	{ id: 'montesquieu', name: 'Montesquieu', group: 11, terms: ['*The Spirit of Law*', 'separation of powers'], idea: 'Political institutions must reflect the social and geographic character of the community; social phenomena are interrelated.', remember: 'Institutions fit their society; separation of powers' },
	{ id: 'comte', name: 'Auguste Comte', group: 11, terms: ['sociology', 'positivism', 'three stages'], idea: 'Coined “sociology.” Human thought passes through theological, metaphysical and positive (scientific) stages: the first theory of social evolution.', remember: 'Theological, metaphysical, positive' },
	{ id: 'rousseau', name: 'Jean-Jacques Rousseau', group: 11, terms: ['*The Social Contract*', 'general will'], idea: 'By submitting to the general will, people obey themselves, because they are collectively the authors of the law.', remember: 'General will' },
	{ id: 'burke', name: 'Edmund Burke', group: 11, terms: ['conservatism', 'tradition'], idea: 'Father of British conservatism. Constitutions should grow from tradition, not rational design: society is not a Lego set. Supported the American Revolution, opposed the French.', remember: 'Organic society; for the American, against the French Revolution' },
	{ id: 'hegel', name: 'G.W.F. Hegel', group: 11, terms: ['dialectical idealism', 'the state'], idea: 'The state is a real entity higher than its citizens and the embodiment of reason. The dialectic is progressive; the state doctrine is conservative. Freedom becomes freedom to obey.', remember: 'State as reason embodied', also: 'Lessons 10, 12; Marx inverts him in 13' },
	{ id: 'hugo', name: 'Gustav Hugo', group: 12, terms: ['German Historical School'], idea: 'Founded the German school by opposing uncritical codification and separating native German from Roman elements.', remember: 'Founder of the German Historical School' },
	{ id: 'savigny', name: 'Friedrich Carl von Savigny', group: 12, terms: ['volksgeist', '1814 pamphlet'], idea: 'In *Of the Vocation of Our Age for Legislation and Legal Science* (1814) he argued against a unified German code and natural law’s “infinite arrogance.” Law cannot be imposed on a people regardless of its history.', remember: 'Volksgeist; against codification; law is found, not made' },
	{ id: 'maine', name: 'Henry Maine', group: 12, terms: ['*Ancient Law*', 'status to contract'], idea: 'Founded the English school with *Ancient Law* (1861), influenced by Darwin. Law and society move “from status to contract.” Broke with analysing law without history.', remember: 'From status to contract' },
	{ id: 'friedman', name: 'Lawrence Friedman', group: 13, terms: ['Law and Society'], idea: 'Looks outside the legal system and treats law’s autonomy as an empirical question. “Law is too important to be left to lawyers.”', remember: 'Law and Society; law is not autonomous' },
	{ id: 'marx', name: 'Karl Marx', group: 13, terms: ['dialectical materialism', 'base and superstructure'], idea: 'Turns Hegel upside down. Law is a product of economic forces, a tool of the ruling class, and destined to wither away under pure communism.', remember: 'Base and superstructure; withering away' },
	{ id: 'weber', name: 'Max Weber', group: 13, terms: ['rationalization', 'bureaucracy', 'iron cage'], idea: 'Modern authority is rational-legal. Rationalization frees people from illogical tradition but makes them cogs in a machine.', remember: 'Charismatic, traditional, rational-legal; iron cage', also: 'Lesson 10' },
	{ id: 'durkheim', name: 'Émile Durkheim', group: 13, terms: ['social facts', 'solidarity'], idea: 'Society is an entity of its own. As it grows complex, law shifts from repressive (penal) to restitutive (civil). Law shows how a society is integrated.', remember: 'Social facts; repressive to restitutive' },
	{ id: 'ehrlich', name: 'Eugen Ehrlich', group: 13, terms: ['living law'], idea: 'The rules people actually follow matter more than State norms. The center of gravity of legal development lies in society itself.', remember: 'Living law; center of gravity in society' },
	{ id: 'jhering', name: 'Rudolf von Jhering', group: 13, terms: ['*The Struggle for Law*', 'interests'], idea: 'Law is an impartial mediator among competing interests that cannot all be satisfied. Lawyers must understand the social effects of rules.', remember: 'Law mediates competing interests' },
	{ id: 'pound', name: 'Roscoe Pound', group: 13, terms: ['social engineering', 'jural postulates'], idea: 'The lawmaker is a social engineer. Courts scrutinize and weigh competing interests, guided by jural postulates that change as society changes.', remember: 'Social engineering; jural postulates; “juristic pessimism”', also: 'Lesson 12; cited in Floresca' },
	{ id: 'holmes', name: 'Oliver Wendell Holmes Jr.', group: 13, terms: ['*The Common Law*', 'legal realism'], idea: '“The life of the law has not been logic: it has been experience.” Law is “the prophecies of what the courts will do in fact.” The common law is not “a brooding omnipresence in the sky.” “General propositions do not decide concrete cases.”', remember: 'Experience, not logic; interstitial legislation; clear and present danger', also: 'Lessons 10, 12 and the Holmes handout' },
	{ id: 'cardozo', name: 'Benjamin Cardozo', group: 13, terms: ['sovereign talisman'], idea: 'History built up the legal system, and law has outgrown formalism: the written word is no longer the “sovereign talisman.”', remember: '“Sovereign talisman”; history built the system', also: 'Lesson 12, Floresca, Gonzales' }
];

// ---------- differentiate ----------

export const SCHOOLS = ['Natural Law', 'Legal Positivism', 'Historical School', 'Sociological School'];
/** [axis, natural law, positivism, historical, sociological] */
export const SCHOOL_AXES: [string, string, string, string, string][] = [
	['Source of law', 'A higher moral or natural order', 'The sovereign’s command (Austin); a hierarchy of norms (Kelsen)', 'The volksgeist, shown in custom', 'Society: its economy, interests and actual practices'],
	['What makes a rule law', 'Conformity to morals', 'Enactment by proper authority, backed by sanction', 'Fit with the people’s historical consciousness', 'Its function and effect in society; what courts in fact do'],
	['Unit of analysis', 'The individual’s reason', 'The individual facing sanctions', 'A nation or people', 'Groups, classes, institutions'],
	['Method', 'Philosophical reasoning', 'Logical analysis of positive law', 'Historical research', 'Empirical social science'],
	['Time orientation', 'Timeless', 'Present (what is enacted now)', 'Backward-looking', 'Forward-looking'],
	['Role of judge or lawyer', 'Test law against justice', 'Apply the law as written', 'Discover and articulate the people’s law', 'Weigh interests; engineer social outcomes'],
	['Characteristic danger', 'Whose morals?', 'Nuremberg: unjust orders are still “law”', 'Stagnation; nationalism', 'Judicial discretion with no fixed scale']
];

/** [thinker, what moves, stages, attitude to the last stage] */
export const STAGES: [string, string, string, string][] = [
	['Comte', 'Human thought', 'Theological → metaphysical → positive', 'Optimistic: science solves social problems'],
	['Maine', 'Legal relations', 'Status → contract', 'Approving: individuals become autonomous agents'],
	['Durkheim', 'Social integration and type of law', 'Mechanical solidarity, repressive law → organic solidarity, restitutive law', 'Descriptive'],
	['Weber', 'Authority', 'Charismatic → traditional → rational-legal', 'Ambivalent: progress and the iron cage'],
	['Marx', 'Mode of production', 'Capitalism → socialism → pure communism', 'Law and state wither away']
];

export interface Pair {
	id: string;
	pair: string;
	common: string;
	diff: string;
	star?: boolean;
}

export const PAIRS: Pair[] = [
	{ id: 'hist-soc', pair: 'Historical v. Sociological School', common: 'Law is part of society, rooted in its culture, economy and values; not an abstract set of imposed rules.', diff: 'Historical justifies rules from the past; Sociological molds law for new problems.', star: true },
	{ id: 'bal-hier', pair: 'Balancing (Lantion, Soriano) v. hierarchy (Philippine Blooming Mills)', common: 'Both look at the real interests behind legal forms.', diff: 'Balancing weighs case by case on a level scale; the hierarchy gives human rights a preferred position over property rights from the start.', star: true },
	{ id: 'cpd-bal', pair: 'Clear and present danger v. balancing of interests', common: 'Rights are not absolute; context decides.', diff: 'Clear and present danger asks only how near and grave the harm is. Balancing weighs the right against any important public interest.', star: true },
	{ id: 'austin-hart-kelsen', pair: 'Austin v. Hart v. Kelsen', common: 'All positivists; all separate law from morals.', diff: 'Austin grounds law in force. Hart replaces commands with rules, including power-conferring ones. Kelsen grounds validity in a presupposed Basic Norm.', star: true },
	{ id: 'volk-living', pair: 'Savigny’s volksgeist v. Ehrlich’s living law', common: 'Real law lives among the people, not in State enactments.', diff: 'The volksgeist is one national spirit inherited from history; living law is the present practice of many social associations.', star: true },
	{ id: 'pound-holmes', pair: 'Pound v. Holmes', common: 'Law responds to social needs; judges do not just deduce.', diff: 'Pound is prescriptive (what courts should do). Holmes is descriptive and skeptical (what courts in fact do).' },
	{ id: 'holmes-dworkin', pair: 'Holmes v. Dworkin', common: 'Judges go beyond the text in hard cases.', diff: 'Holmes: they legislate in the gaps. Dworkin: they find the answer by interpreting existing law in its best moral light.' },
	{ id: 'volk-general', pair: 'Volksgeist v. Rousseau’s general will', common: 'Law expresses a collective will, not an individual’s.', diff: 'The general will is formed by agreement (contract); the volksgeist is inherited and never chosen.' },
	{ id: 'volk-postulates', pair: 'Volksgeist v. Pound’s jural postulates', common: 'Both look for a society’s underlying assumptions.', diff: 'Postulates belong to a time and place and change with society; they are tools for reform, not limits on it.' },
	{ id: 'savigny-bentham', pair: 'Savigny v. Bentham', common: 'Both reject natural law.', diff: 'Bentham: law can be rationally designed and codified for any nation. Savigny: law cannot be imposed regardless of a people’s history.' },
	{ id: 'burke-savigny', pair: 'Burke v. Savigny', common: 'Organic growth; distrust of abstract reason and sudden codes.', diff: 'Burke writes of politics and constitutions; Savigny builds a legal method carried out by jurists.' },
	{ id: 'hegel-marx', pair: 'Hegel v. Marx', common: 'History moves dialectically.', diff: 'Hegel: ideas drive history and the state is reason embodied. Marx: material production drives history and the state serves the ruling class.' },
	{ id: 'hobbes-rousseau', pair: 'Hobbes v. Rousseau', common: 'The social contract ends the state of nature.', diff: 'Hobbes: surrender to a sovereign whose command is moral. Rousseau: submit to the general will and so obey yourself.' },
	{ id: 'jhering-pound', pair: 'Jhering v. Pound', common: 'Law mediates competing interests.', diff: 'Jhering supplies the theory; Pound turns it into a programme for courts with classified interests and jural postulates.' },
	{ id: 'weber-austin', pair: 'Weber’s authority v. Austin’s sovereign', common: 'Both explain obedience.', diff: 'Austin: habit and fear of sanction. Weber: belief in legitimacy, which is why force alone is unstable.' }
];

// ---------- critiques ----------

export interface Critique {
	id: string;
	idea: string;
	right: string;
	/** What the handout itself says against it. */
	weak: string;
	/** Reasoning you can develop as your own. */
	push: string;
	star?: boolean;
}

export const CRITIQUES: Critique[] = [
	{ id: 'separation', idea: 'Separation of law and morals (positivism)', right: 'Clarity: you can identify the law without first settling moral debates. The Venn diagram shows the two really do diverge.', weak: 'Does not account for how judges fill gaps (Holmes); Nuremberg rejected “I obeyed the sovereign”; Dworkin says moral judgment is part of finding the law.', push: 'Separation may be what *allows* moral criticism of law: you can only call a law unjust if “law” and “just” are different questions.', star: true },
	{ id: 'austin', idea: 'Austin’s command theory', right: 'Captures criminal law and the reality of sanctions.', weak: 'Hart’s three points: no single sovereign, power-conferring rules, the gunman problem. International law binds without a sovereign.', push: 'The 1987 Constitution disperses power and declares the people sovereign. Who then is Austin’s commander?', star: true },
	{ id: 'kelsen', idea: 'Kelsen’s Grundnorm', right: 'Explains validity without appeal to force or morals.', weak: 'The handout concedes the basic norm stands “even if supported by a sociological fact like force.”', push: 'A norm that is merely *presupposed* is neither enacted nor proved. Is the system really “pure”, or has force been renamed?' },
	{ id: 'force', idea: 'Force as the essence of law', right: 'Without sanctions the recalcitrant ignore the law; “force and effect of law.”', weak: 'Augustine’s band of robbers; bank robber v. Congress; the occupations as exceptional events.', push: 'Weber shows force is unstable without belief in legitimacy. Yet the permanent-occupation hypothetical suggests legitimacy can grow out of force.', star: true },
	{ id: 'contract', idea: 'Social contract', right: 'Softens coercion through consent.', weak: 'Versions can justify totalitarianism as easily as democracy.', push: 'No one alive signed it. Burke’s objection: societies are not designed by agreement; they grow.' },
	{ id: 'hegel', idea: 'Hegel’s state', right: 'Sees society as more than a sum of individuals.', weak: 'Freedom shrinks to the freedom to obey; no point in rebelling; fed nationalist totalitarianism.', push: 'If the state is reason embodied, there is no standpoint from which to call a state unjust. Compare Nuremberg.' },
	{ id: 'volksgeist', idea: 'Volksgeist (Savigny)', right: 'Law that ignores a people’s culture is not obeyed; explains why legal transplants struggle.', weak: 'Conservative (“juristic pessimism”); backward-looking; the “folk” cannot be defined; slides toward racial purification.', push: 'In practice jurists decide what the people’s spirit says, so an elite speaks in the people’s name. And where is the single folk-soul of a multi-ethnic, twice-colonized country?', star: true },
	{ id: 'maine', idea: 'Maine’s status to contract', right: 'Captures a real historical shift toward individual autonomy.', weak: 'Not criticized in the handout.', push: 'Modern labor and consumer law re-impose protections based on status (worker, tenant). Floresca protects workers *as* workers. The movement is not one-way.' },
	{ id: 'marx', idea: 'Marx on law', right: 'Exposes whose interests a law serves; explains why formal equality can hide exploitation.', weak: 'Not criticized in the handout.', push: 'Economic determinism cannot explain laws that restrain the powerful (labor standards, agrarian reform). Law and state did not wither away under actual communist governments.' },
	{ id: 'weber', idea: 'Weber’s rationalization', right: 'Explains impersonal, rule-bound modern authority.', weak: 'Weber’s own worry: the iron cage, people as cogs.', push: 'Rational-legal form does not guarantee just content. A bureaucracy can administer injustice efficiently.' },
	{ id: 'ehrlich', idea: 'Ehrlich’s living law', right: 'Explains the gap between law in the books and conduct in fact.', weak: 'Not criticized in the handout.', push: 'If whatever people do is law, how do we tell law from custom or morals? Some living practices are unjust. Arts. 11 and 12 show the State refusing to defer.' },
	{ id: 'pound', idea: 'Pound’s social engineering and balancing', right: 'Makes courts face the real interests at stake; rights are not absolutes in a vacuum.', weak: 'Pound admits the commonest mode is rough-and-ready instinct.', push: 'There is no common scale: how much youth welfare equals how much free speech (Soriano)? Whoever frames the interests decides the case. Philippine Blooming Mills answers with a preferred position for human rights.', star: true },
	{ id: 'holmes', idea: 'Holmes’s realism', right: 'Honest about judicial lawmaking; frees law from dead rules (“Henry IV”).', weak: 'Floresca’s own list of critics warns of “judicial tyranny.”', push: 'A judge cannot decide a case by predicting what they themselves will do. “Prophecy” describes the lawyer’s view, not the judge’s. Rodriguez v. Tan shows the Court also fears legislating.', star: true },
	{ id: 'burke', idea: 'Burke’s traditionalism', right: 'Humility about what reason alone can design.', weak: 'Appeals to property owners and stability; accepts class hierarchy as natural.', push: 'Tradition preserved injustices too. “Things have always been that way” is Weber’s traditional authority, not an argument.' }
];

// ---------- exam focus ----------

export const TOP: TopQuestion[] = [
	{ q: 'Define the balancing of interests. Differentiate it from Philippine Blooming Mills. Critique it, and give your opinion.', type: 'critique', topic: 'Lesson 13 · Pound, Jhering; Lantion, Soriano, PBMEO', href: '/philo/focus#model' },
	{ q: 'Differentiate the Historical School and the Sociological School.', type: 'distinction', topic: 'Lessons 12 and 13', href: '/philo/essays#q-f-hist-soc' },
	{ q: 'Is force or morality the true basis of law? Give your opinion.', type: 'opinion', topic: 'Lesson 10', href: '/philo/essays#q-o-basis' },
	{ q: '“Law is the command of the sovereign backed by force.” Critique.', type: 'critique', topic: 'Lesson 10 · Austin, Hart, Kelsen', href: '/philo/essays#q-c-austin' },
	{ q: 'How has legal philosophy changed the way you think as a law student?', type: 'opinion', topic: 'All lessons (asked in the midterm)', href: '/philo/essays#q-o-student' },
	{ q: 'Critique the Historical School. Is it relevant to the Philippines?', type: 'critique', topic: 'Lesson 12 · Savigny; Arts. 11–12', href: '/philo/essays#q-c-historical' },
	{ q: 'Define the volksgeist.', type: 'definition', topic: 'Lesson 12 · Savigny', href: '/philo/essays#q-d-volksgeist' },
	{ q: 'Define Pound’s social engineering.', type: 'definition', topic: 'Lesson 13 · Pound', href: '/philo/essays#q-d-social-engineering' },
	{ q: 'Differentiate law and morals.', type: 'distinction', topic: 'Lesson 10 · Venn diagram', href: '/philo/essays#q-f-law-morals' },
	{ q: '“Judges should never legislate.” Critique, using Philippine cases.', type: 'critique', topic: 'Floresca v. Rodriguez v. Tan', href: '/philo/essays#q-c-judges' },
	{ q: 'Differentiate the clear and present danger test and balancing of interests.', type: 'distinction', topic: 'Gonzales, ABS-CBN, Soriano', href: '/philo/essays#q-f-cpd-balancing' },
	{ q: 'In your opinion, must we obey an unjust law?', type: 'opinion', topic: 'Lesson 10 · Socrates, Nuremberg', href: '/philo/essays#q-o-unjust' },
	{ q: 'Define legal realism.', type: 'definition', topic: 'Lesson 13 · Holmes', href: '/philo/essays#q-d-realism' },
	{ q: 'Differentiate Austin and Hart on what law is.', type: 'distinction', topic: 'Lesson 10', href: '/philo/essays#q-f-austin-hart' }
];

export const LIKELY_ENUMS: Record<string, string> = {
	'10.1': 'The backbone of any law-and-morals answer.',
	'10.4': 'Appears in two lessons; explains why we obey.',
	'10.5': 'The standard critique of Austin.',
	'12.2': 'Ready-made critique of the Historical School.',
	'13.4': 'Pound’s own admission is the best critique of balancing.',
	'14.1': 'The handout’s only list on Philippine law.'
};

export const LIKELY_TERMS: Record<string, string> = {
	'legal-positivism': 'Every critique question starts here.',
	legitimacy: 'The answer to “force or morals?”.',
	volksgeist: 'The Historical School in one word.',
	'living-law': 'Often confused with the volksgeist.',
	'social-engineering': 'Lesson 13’s core idea.',
	'legal-realism': 'Holmes appears in four readings.',
	interstitial: 'The key word that reconciles Floresca and Rodriguez.',
	balancing: 'Most likely essay topic.',
	'preferred-freedoms': 'The counterpoint to balancing.',
	grundnorm: 'Easy definition marks.'
};

/** Nine ideas that surface in more than one reading. */
export const RECURRING: [string, string, string][] = [
	['Law is not autonomous; it grows out of society', 'Montesquieu, Burke, Savigny, Ehrlich (“center of gravity … in society itself”), Marx, Friedman, Pound, Holmes', 'The thesis of the whole finals coverage. Open any essay with it.'],
	['From the individual to the collective', 'Natural law and positivism are individualistic; Rousseau’s general will, Hegel’s state, Durkheim’s social facts, Marx’s classes', 'Explains *why* the shift to social science happened.'],
	['Experience and history over logic', 'Burke; Savigny (law is found, not made); Holmes (“experience”); Gompers (“not mathematical formulas”); Cardozo’s “sovereign talisman”', 'Use against formalism and codification by pure reason.'],
	['Society and law evolve in stages', 'Comte, Weber, Durkheim, Maine, Marx, Hegel’s dialectic', 'A ready-made differentiate question.'],
	['Why do we obey? Force, morals or legitimacy', 'Lesson 10; Weber’s three types of authority; Augustine’s band of robbers; bank robber v. Congress; de facto v. de jure', 'The bridge between midterm and finals topics.'],
	['Judges make law in the gaps', 'Holmes on lacunae and “prophecies”; Floresca (“only interstitially”); Pound’s three modes; Dworkin; contrast Rodriguez v. Tan', 'Best source of Philippine examples.'],
	['Law as the balancing of competing interests', 'Jhering, Pound, Lantion, Soriano, Akbayan', 'Shows sociological jurisprudence is living Philippine doctrine.'],
	['Backward-looking v. forward-looking law', 'Historical v. Functional School; Pound’s “juristic pessimism”; Holmes’s “Henry IV”; Villaflor’s “always forward looking” Holmes', 'The cleanest differentiate question.'],
	['The collective can turn dangerous', 'Hegel’s state; volksgeist and racial “purification”; Nuremberg; occupation as force without legitimacy', 'Your strongest critique material.']
];

/** What the course changes for a law student: [lesson, source, effect]. */
export const WHY_MATTERS: [string, string, string][] = [
	['Every decision rests on a theory of law', 'Floresca reasons like Holmes; Rodriguez v. Tan like a positivist; Lantion like Pound', 'You read cases for the *why*, and can predict a ruling when the text runs out.'],
	['Text is where legal reasoning starts, not where it ends', '“Sovereign talisman”; the penumbra; “general propositions do not decide concrete cases”', 'You argue purpose, policy and consequence, not only the codal.'],
	['Rights are weighed, not recited', 'Balancing; clear and present danger as “proximity and degree”', 'Constitutional law becomes arguments about weight.'],
	['A law can be valid and still unjust', 'The Venn diagram; Nuremberg; Augustine', 'You keep a moral standpoint from which to criticize the law.'],
	['Law comes from somewhere', 'Alzua; Arts. 11 and 12; Maine', 'You see why Philippine law mixes civil-law codes and common-law reasoning.'],
	['Law serves interests', 'Marx; Jhering and Pound', 'You ask who gains and who pays under a rule before defending it.'],
	['Collective ideals need limits', 'Hegel’s state; volksgeist and the Holocaust', 'Wariness when someone says “the nation” demands a result.']
];

export const FIVE: string[] = [
	'Natural law and positivism argue over morals and force; both start from the individual.',
	'The social sciences moved the question to society: law is a product and a tool of collective life.',
	'The Historical School finds law in a people’s past; the Sociological School shapes law for a society’s future.',
	'Holmes and Pound made judges visible as lawmakers who weigh interests, and Philippine cases follow them.',
	'Every school has a danger: morals without agreement, force without justice, tradition without progress, discretion without limits.'
];

export const CAREFUL: string[] = [
	'Lesson 10 credits Holmes with “problems of the penumbra.” That exact phrase is usually tied to Hart. Holmes does use “penumbra” in *Springer*, quoted in Floresca, so the idea is safely his too.',
	'The paragraph beginning “Hart was a follower of Hume’s distinction” goes on to describe Kelsen’s chain of norms. Treat the is/ought point and the Grundnorm as Kelsen’s argument.',
	'Hobbes’s well-known phrase is that life in the state of nature was “solitary, poor, nasty, brutish, and short.”'
];
