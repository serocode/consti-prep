import { md } from '$lib/text';
import { store } from '$lib/store.svelte';
import type { Kit } from '$lib/kit';
import { CASES, ENUMS, GROUPS, LIKELY_ENUMS, LIKELY_TERMS, TERMS, TOP } from '$lib/philo-content';

/**
 * Legal Philo finals kit. The professor's last exam asked four kinds of question:
 * define, differentiate, critique, and opinion. Each model answer is short on purpose:
 * one paragraph that shows the thinking moves, not everything the reading says.
 * Write **bold** and *italics* in the strings.
 */

export type PhiloType = 'define' | 'differentiate' | 'critique' | 'opinion';

export interface PhiloKind {
	id: PhiloType;
	name: string;
	/** What the professor is really testing. */
	tests: string;
	/** The answer formula, in order. */
	formula: string[];
	/** The first line to type when you go blank. */
	first: string;
	/** The usual way students lose marks. */
	trap: string;
}

export interface PhiloQ {
	id: string;
	q: string;
	/** Ranked in the exam focus. */
	star?: boolean;
	/** Model answer, one or two short paragraphs. */
	a: string[];
}

/** Five habits of philosophical thinking. Every question type uses them. */
export const moves: [string, string][] = [
	['Find the assumption.', 'Every theory rests on a premise. Austin assumes that being threatened is the same as being obliged. Name the premise and you can test it.'],
	['Draw the distinction.', 'Law v. morals, *is* v. *ought*, valid v. just, force v. legitimacy, *de facto* v. *de jure*. Most exam answers turn on one clean distinction.'],
	['Test it with a hard case.', 'A gunman, a band of robbers, a permanent occupation, Nuremberg. If a theory gives the wrong answer in a hard case, you have found its weak point.'],
	['Be fair before you attack.', 'State the view as its defender would, and admit what it gets right. Criticism of a weak version of a view earns little.'],
	['Commit, and give a reason.', 'End with your own position and why. "It depends" scores only if you say on what.']
];

export const kinds: PhiloKind[] = [
	{
		id: 'define',
		name: 'Define',
		tests: 'Do you know exactly what the idea means, and what it does not mean?',
		formula: ['What kind of thing it is, and what sets it apart', 'Who holds it, with their own term', 'What follows from it', 'How it differs from its closest look-alike', 'One example, Philippine if you can'],
		first: '“[Term] is the [theory / test / concept] that …”',
		trap: 'Listing facts about the thinker instead of defining the idea.'
	},
	{
		id: 'differentiate',
		name: 'Differentiate',
		tests: 'Can you see two answers to the same question, and the exact point where they part?',
		formula: ['Common ground first: the question both answer', 'Two or three differences, each on the same axis (source, method, direction, role of the judge)', 'One example that shows the difference', 'A one-line bottom line'],
		first: '“Both [X] and [Y] … They differ in …”',
		trap: 'Writing two separate descriptions and never putting them side by side.'
	},
	{
		id: 'critique',
		name: 'Critique',
		tests: 'Can you think against the reading, fairly?',
		formula: ['State the view fairly, in one sentence', 'Concede its strength', 'Press the weakness, naming the critic', 'Add your own deeper point or hard case', 'Answer the best reply', 'Verdict'],
		first: '“[X] holds that … Its strength is … But …”',
		trap: 'Summarizing the reading, or attacking without conceding anything.'
	},
	{
		id: 'opinion',
		name: 'Opinion',
		tests: 'Do you have a position, and can you defend it with the course?',
		formula: ['Your answer in the first sentence', 'Two reasons, each tied to a named thinker or case', 'The strongest objection, and why you still hold your view', 'What it means here, in the Philippines or for you'],
		first: '“In my view, … because …”',
		trap: 'Sitting on the fence, or giving a personal feeling with no thinker or case behind it.'
	}
];

export const questions: Record<PhiloType, PhiloQ[]> = {
	define: [
		{
			id: 'd-positivism',
			q: 'Define legal positivism.',
			a: [
				'Legal positivism is the theory that a rule is law because it was laid down by a recognized authority, not because it is morally right. Austin gives the classic form: law is the **command of a sovereign**, habitually obeyed and backed by a **sanction**. Kelsen and Hart change the source of validity (a chain of norms ending in the *Grundnorm*; a system of accepted rules) but keep the core thesis: what the law **is** and what it **ought** to be are separate questions. Unlike natural law, positivism can call an unjust law valid law. That is its clarity, and, after Nuremberg, its danger.'
			]
		},
		{
			id: 'd-volksgeist',
			star: true,
			q: 'Define the volksgeist.',
			a: [
				'The *volksgeist* is the spirit or common consciousness of a people, which the Historical School treats as the true source of law. For **Savigny**, law grows out of it the way language does: it is **found, not made**. Three things follow: law is national, not universal; custom is its most authentic form; and a code designed by reason is distrusted. Unlike Rousseau’s **general will**, which people form by agreement, the volksgeist is inherited and never chosen.'
			]
		},
		{
			id: 'd-social-engineering',
			star: true,
			q: 'Define Pound’s social engineering.',
			a: [
				'Social engineering is **Pound’s** view that law is a tool the lawmaker and the judge use to order society, as an engineer uses materials to build. Its method is the **weighing of interests**: the court identifies the individual and social interests in conflict, compares them, and accepts or rejects them so as to satisfy as many as it can with the least sacrifice. Its yardstick is the **jural postulates**, the reasonable expectations of a civilization at a given time, which change as society changes. Example: *Lantion* weighed an extraditee’s due process against the State’s treaty commitments.'
			]
		},
		{
			id: 'd-living-law',
			q: 'Define Ehrlich’s living law.',
			a: [
				'Living law is **Ehrlich’s** name for the rules people actually follow in their associations (family, business, community), as against **positive law**, the norms the State enacts. For Ehrlich, the center of gravity of legal development lies “not in legislation, nor in juristic science, nor in judicial decision, but in **society itself**.” Unlike the volksgeist, living law is plural and present: the practices of many groups today, not one spirit inherited from the past.'
			]
		},
		{
			id: 'd-realism',
			star: true,
			q: 'Define legal realism.',
			a: [
				'Legal realism is the view that law is what courts actually do, not what the rules say on paper. **Holmes**: “The prophecies of what the courts will do in fact, and nothing more pretentious, are what I mean by the law.” What shapes decisions is **experience, not logic**: the felt necessities of the time, moral and political theories, public policy, even the prejudices of judges. Unlike positivism, which asks where a rule came from, realism asks how judges behave.'
			]
		},
		{
			id: 'd-grundnorm',
			q: 'Define Kelsen’s Grundnorm.',
			a: [
				'The *Grundnorm* (basic norm) is **Kelsen’s** presupposed norm that the first historical constitution ought to be obeyed. In his **pure theory**, every norm is valid because a higher norm authorizes it; the chain must stop somewhere, and the Grundnorm is where it stops. It is neither enacted nor proved, only **assumed**, so that the whole system can be read as valid. It lets Kelsen explain validity without appealing to force or to morals.'
			]
		}
	],
	differentiate: [
		{
			id: 'f-law-morals',
			star: true,
			q: 'Differentiate law and morals.',
			a: [
				'Both are norms of conduct, and they overlap most in criminal law, where guilt needs a guilty mind (*mens rea*) and punishment is scaled to moral fault. They differ in **source**, **sanction** and **scope**. Law comes from a recognized authority and is enforced by the State; morals come from conscience, religion or community and are enforced by guilt or disapproval. Some conduct is immoral but legal (consensual sex between unmarried adults); some is illegal but morally neutral (which side of the road to drive on). Bottom line: a law can be valid and still unjust, and that is why we need both words.'
			]
		},
		{
			id: 'f-nl-positivism',
			q: 'Differentiate natural law and legal positivism.',
			a: [
				'Both answer the same question: what makes a rule law? **Natural law** looks at **content**: a rule is valid only if it conforms to a higher moral order, so an unjust law is not truly law. **Positivism** looks at **pedigree**: a rule is law if the proper authority enacted it (Austin, Kelsen, Hart), whatever its morality. Natural law lets you refuse an unjust law; positivism lets you identify the law before you argue about it. Nuremberg shows the clash: the tribunal rejected “I obeyed the sovereign’s orders,” a natural-law answer given inside a legal process.'
			]
		},
		{
			id: 'f-hist-soc',
			star: true,
			q: 'Differentiate the Historical School and the Sociological School.',
			a: [
				'Both deny that law is a set of abstract rules imposed from above; both root it in society. They differ in **direction**, **source** and **method**. The Historical School looks **backward**: law comes from the volksgeist, lives best in custom, and should not be rushed by legislation (Savigny). The Sociological School looks **forward**: law comes from present interests and is a tool for new problems (Pound’s social engineering). One studies history; the other uses social science. Pound’s charge sums it up: the Historical School breeds “**juristic pessimism**”; the Sociological School breeds reform.'
			]
		},
		{
			id: 'f-austin-hart',
			star: true,
			q: 'Differentiate Austin and Hart on what law is.',
			a: [
				'Both are positivists: law is separate from morals and is identified by its source. **Austin**: law is a **command** of a sovereign, backed by a sanction and habitually obeyed. **Hart** replies that this describes a gunman, not a legal system. Modern states have no single sovereign; many laws **confer powers** instead of imposing duties (making a will, marrying); and a threat can make you **obliged** but never gives you an **obligation**. For Hart, law is a system of **rules** that officials accept as standards. The difference is fear of a sanction v. acceptance of a rule.'
			]
		},
		{
			id: 'f-force-legitimacy',
			q: 'Differentiate force and legitimacy as the basis of obedience.',
			a: [
				'Both explain why people obey. **Force** is the power to compel; **legitimacy** is the belief that whoever commands has the right to command. A bank robber and Congress both take your money, but only Congress has authority. **Weber** shows that lasting rule rests on legitimacy (charismatic, traditional or rational-legal), not on force alone. During the Japanese occupation the occupier was the *de facto* government, with force; the Commonwealth government-in-exile was *de jure*, with legitimacy. Force gets compliance; legitimacy gets obedience.'
			]
		},
		{
			id: 'f-cpd-balancing',
			star: true,
			q: 'Differentiate the clear and present danger test and the balancing of interests test.',
			a: [
				'Both deny that rights are absolute and decide by consequences, not formulas. **Clear and present danger** (Holmes; *Gonzales*, *ABS-CBN*) asks one question: is the harm from the speech substantive and imminent, “a question of proximity and degree”? The bar is high, so speech usually wins. **Balancing** (Jhering, Pound; *Soriano*, *Lantion*) weighs the right against any important public interest, so the outcome depends on how the interests are framed. The first protects the right; the second protects flexibility.'
			]
		}
	],
	critique: [
		{
			id: 'c-austin',
			star: true,
			q: '“Law is the command of the sovereign backed by force.” Critique.',
			a: [
				'**Austin** holds that law is a sovereign’s command, habitually obeyed and enforced by a sanction. Its strength is realism: criminal law does work through threats, and without sanctions the recalcitrant ignore the law. But **Hart** shows three gaps: modern states have no single sovereign, many laws confer powers instead of commanding, and a threat cannot create a duty, or a gunman’s demand would be law. More fundamentally, force cannot tell Congress from **a band of robbers** (Augustine); only legitimacy can. A defender may reply that legitimacy itself grows out of force, as the permanent-occupation hypothetical suggests. Even so, force is necessary to **enforce** law but cannot explain why law **obliges**.'
			]
		},
		{
			id: 'c-historical',
			star: true,
			q: 'Critique the Historical School.',
			a: [
				'**Savigny** holds that law grows from the volksgeist and is found, not made. Its strength: law that ignores a people’s culture is not obeyed, which is why *Alzua* admits imported common-law rules only if suited to “local conditions.” But it is conservative: Pound calls it “**juristic pessimism**,” and **Holmes** finds it “revolting” to keep a rule only because it was laid down in the time of Henry IV. More fundamentally, **who is the folk?** The Philippines has many peoples and a Spanish and American legal inheritance; there is no single folk-soul to consult, so in practice jurists speak in the people’s name. Nazi Germany shows where the search for a pure national spirit leads. Verdict: a good caution for legislators, a dangerous rule of decision.'
			]
		},
		{
			id: 'c-balancing',
			star: true,
			q: 'Critique Pound’s balancing of interests.',
			a: [
				'**Pound** holds that courts should weigh competing individual and social interests and secure as many as possible. Its strength is honesty: it admits what judges do when rights collide and keeps law tied to social needs. Its weakness is that there is **no common scale**. How much youth welfare outweighs how much free speech (*Soriano*)? Pound admits that courts mostly decide by instinct, so whoever frames the interests decides the case, and any right can lose to an interest labeled “important.” A defender replies that every method needs judgment, and balancing at least does it in the open. Verdict: keep the method, but start with a presumption for fundamental rights, as *Philippine Blooming Mills* does, so the burden falls on whoever would restrict them.'
			]
		},
		{
			id: 'c-holmes',
			q: '“Law is the prophecy of what the courts will do.” Critique.',
			a: [
				'**Holmes** holds that law is the prediction of what courts will do in fact. Its strength: it is how a practicing lawyer thinks, and it exposes the myth that decisions follow from logic alone. But it fails **from the judge’s seat**: a judge cannot decide a case by predicting their own decision; they need a rule or principle to apply, which is the point Hart and Dworkin press. It also makes law whatever courts do, leaving no standpoint from which to call a decision wrong. Verdict: true of the lawyer’s job, false as a theory of what law is.'
			]
		},
		{
			id: 'c-separation',
			q: '“Law and morals must be kept separate.” Critique.',
			a: [
				'The positivist **separation thesis** holds that what the law is and what it ought to be are different questions. Its strength is clarity: you can know the law without first settling moral debates. But judges filling gaps draw on morals (**Holmes**), **Nuremberg** rejected “I obeyed orders” as a defense, and **Dworkin** argues that finding the law in a hard case already requires moral judgment. Yet separation has a hidden virtue: only because “law” and “just” are different questions can we call a valid law unjust and work to change it. Verdict: separate them to identify the law; join them to judge it.'
			]
		},
		{
			id: 'c-judges',
			star: true,
			q: '“Judges should never legislate.” Critique.',
			a: [
				'The claim rests on separation of powers, and *Rodriguez v. Tan* follows it: adopting a common-law doctrine with no statutory basis would be “**to legislate by judicial ruling**.” Its strength: unelected judges should not make policy. But gaps in the law are inevitable, and a judge who must decide has to fill them. *Floresca*, quoting Holmes, says judges “**do and must legislate, but they can do so only interstitially**.” Dworkin adds that judges do not invent; they interpret existing law in its best moral light. Verdict: the real question is not whether judges make law but how far, and Holmes’s limit, “from molar to molecular motions,” is the right one.'
			]
		}
	],
	opinion: [
		{
			id: 'o-basis',
			star: true,
			q: 'In your opinion, is force or morality the true basis of law?',
			a: [
				'In my view, neither alone: law rests on **legitimacy**, and legitimacy needs both. Force is necessary, because without sanctions the recalcitrant ignore the law; that is why lawyers speak of the “force and effect of law.” But force cannot explain obligation: a robber and Congress both take my money, yet only Congress has authority (**Augustine’s** band of robbers). Morality alone cannot run a society either, since people disagree about it. **Weber** gives the answer: we obey because we believe the authority is legitimate. The hard case is a permanent occupation that the people come to accept. It shows legitimacy can grow out of force, but only once people consent, which proves force was never enough.'
			]
		},
		{
			id: 'o-school',
			q: 'Which school should guide Philippine courts: the Historical or the Sociological? Explain your opinion.',
			a: [
				'I believe the **Sociological School** fits us better. First, we have no single volksgeist: our law is Spanish civil law layered with American common law over many peoples, and the Civil Code itself subordinates custom (**Arts. 11 and 12**). Second, our Supreme Court already reasons sociologically: it balances interests (*Lantion*, *Soriano*) and fills gaps interstitially (*Floresca*). The Historical School is right that law must fit its people, as *Alzua*’s “local conditions” shows, so I would keep it as a check on careless legal transplants. But a court’s task is to solve present problems, not to preserve the past.'
			]
		},
		{
			id: 'o-unjust',
			star: true,
			q: 'In your opinion, must we obey an unjust law?',
			a: [
				'Yes, up to a limit. **Socrates** in the *Crito* refused to escape an unjust sentence because he had accepted the benefits of Athenian law, an early social contract; a legal order cannot survive if each person obeys only the laws they like. But **Nuremberg** drew the limit: following orders is no defense to crimes against humanity, and Augustine warns that a state without justice is a band of robbers. My position: an unjust law still binds when the injustice is ordinary and the system offers lawful ways to change it, through courts, Congress and elections. It loses its claim when it commands grave wrong. Then refusing is right, done openly and accepting the consequences.'
			]
		},
		{
			id: 'o-weigh',
			star: true,
			q: 'Is it right for judges to weigh constitutional rights against public interests?',
			a: [
				'Yes, but with a thumb on the scale. Rights collide, and a judge who refuses to weigh them only hides the weighing; as **Holmes** said, “general propositions do not decide concrete cases.” Balancing keeps law in touch with society, as **Pound** wanted. But open balancing lets any right lose to an interest labeled important. So I side with *Philippine Blooming Mills*: human rights start heavier than property rights, and whoever would restrict them bears the burden. That gives citizens predictability without the rigidity of absolutes.'
			]
		},
		{
			id: 'o-student',
			star: true,
			q: 'How has legal philosophy changed the way you think as a law student?',
			a: [
				'Legal philosophy taught me to ask of every rule not only **what it says**, but **why it binds**, **where it came from**, and **whose interests it serves**. Reading *Floresca*, I now see Holmes behind it: judges legislate in the gaps. Reading *Soriano*, I see Pound: a right weighed against a social interest. Knowing the theory behind a ruling helps me predict how a court will treat the next case and build the argument it will accept. It also keeps me honest: the Venn diagram of law and morals and Nuremberg remind me that a valid law can still be unjust, and that a lawyer should be able to say so.'
			]
		}
	]
};

/** md() plus *italics*, for case names and Latin terms. */
export function fmt(s: string): string {
	return md(s).replace(/\*(.+?)\*/g, '<em>$1</em>');
}

export const KIND_OF = Object.fromEntries(kinds.map((k) => [k.id, k])) as Record<PhiloType, PhiloKind>;
/** Every essay question with its type, in order: define, differentiate, critique, opinion. */
export const ESSAYS = kinds.flatMap((k) => questions[k.id].map((q) => ({ ...q, type: k.id })));
export type Essay = (typeof ESSAYS)[number];
export const ESSAY_BY_ID = Object.fromEntries(ESSAYS.map((q) => [q.id, q])) as Record<string, Essay>;
/** Rating key for an essay question (shared by Essay practice and the overview). */
export const essayKey = (id: string) => `q:${id}`;
/** Words in a text, for the model-answer length and your own draft. */
export const words = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

export const PHILO: Kit = {
	id: 'philo',
	name: 'Legal Philo',
	title: 'Legal Philo Finals Kit',
	eyebrow: 'Legal Philosophy · Lessons 10 to 13 and Philippine jurisprudence',
	scope: 'Lessons 10 to 13',
	base: '/philo',
	groupNoun: 'lesson',
	groups: GROUPS,
	enums: ENUMS,
	terms: TERMS,
	problems: [],
	cases: CASES.map((c) => ({ id: c.id, name: c.name, doc: c.doctrine, ch: c.link ?? '' })),
	examParts: [],
	focus: { top: TOP, enums: LIKELY_ENUMS, terms: LIKELY_TERMS },
	state: () => store.philo
};
