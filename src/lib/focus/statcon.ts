import type { Focus } from '../kit';

/** StatCon exam focus. Enumerations by id, terms by id, topics by chapter (`ch6`…`ch11`). */
export const FOCUS: Focus = {
	top: [
		{ q: 'A special law and a later general law conflict. The general law has a general repealing clause. Which prevails?', type: 'scenario', topic: 'Ch. VI and X · special vs. general; implied repeal', href: '/statcon/problems#t-ch6' },
		{ q: 'What are the kinds of ex post facto laws?', type: 'enumeration', topic: 'Ch. IX', href: '/statcon/enumerations#e-9.2' },
		{ q: 'The law says “shall,” and a deadline or a step was missed. Is the act void?', type: 'scenario', topic: 'Ch. VIII · mandatory or directory', href: '/statcon/problems#t-ch8' },
		{ q: 'Which statutes are strictly construed, and against whom? Which are liberally construed?', type: 'enumeration', topic: 'Ch. VII', href: '/statcon/enumerations#e-7.2' },
		{ q: 'What are the requisites of an implied repeal? What are its two categories?', type: 'enumeration', topic: 'Ch. X', href: '/statcon/enumerations#e-10.4' },
		{ q: 'A new law took effect while the case was pending, or after the act was done. Does it apply?', type: 'scenario', topic: 'Ch. IX · prospective or retroactive', href: '/statcon/problems#t-ch9' },
		{ q: 'Define ex post facto law and bill of attainder.', type: 'definition', topic: 'Ch. IX', href: '/statcon/terms' },
		{ q: 'An ordinance bans what a national law allows. Is the ordinance valid?', type: 'scenario', topic: 'Ch. VI · harmonize; ordinance vs. statute', href: '/statcon/p/sc-p18' },
		{ q: 'What are the three maxims of constitutional construction, in order?', type: 'enumeration', topic: 'Ch. XI', href: '/statcon/enumerations#e-11.1' },
		{ q: 'A constitutional provision has no implementing law. Can it be enforced?', type: 'scenario', topic: 'Ch. XI · self-executing provisions', href: '/statcon/p/sc-p16' },
		{ q: 'Distinguish express repeal from implied repeal. What happens when the repealing law is itself repealed?', type: 'distinction', topic: 'Ch. X', href: '/statcon/enumerations#e-10.9' },
		{ q: 'Two provisions of the same law conflict. What steps does the court take?', type: 'enumeration', topic: 'Ch. VI', href: '/statcon/enumerations#e-6.1' },
		{ q: 'State the facts, issue, ruling and doctrine of an assigned case.', type: 'case digest', topic: 'The five assigned cases', href: '/statcon/cases' },
		{ q: 'Define statutes in pari materia. Translate and explain a Latin maxim.', type: 'definition', topic: 'Ch. VI; maxims', href: '/statcon/terms' }
	],
	enums: {
		'6.1': 'Order matters here, and students who start with “last in position” lose points.',
		'6.4': 'The exceptions are how examiners twist a special-vs-general problem.',
		'7.2': 'The long list of strict construction; asked whole or one statute at a time.',
		'7.3': 'The partner of the strict list; examiners ask “in whose favor?”',
		'8.1': 'The consequences test is the method for every mandatory-or-directory problem.',
		'8.5': 'Election cases are the usual facts for mandatory vs. directory.',
		'9.1': 'The four limits decide every retroactivity problem.',
		'9.2': 'A classic enumeration in both Statutory Construction and Constitutional Law.',
		'9.3': 'Short list of elements; commonly paired with ex post facto.',
		'9.4': 'The habitual-criminal exception is the standard twist.',
		'10.3': 'The two categories frame every implied repeal answer.',
		'10.4': 'Four requisites, all required; a frequent enumeration.',
		'10.5': 'Contains the top trap: a general repealing clause is not an express repeal.',
		'10.9': 'Express vs. implied repealer is a neat three-line distinction.',
		'11.1': 'Verba legis, ratio legis, ut magis valeat: asked in order.',
		'11.5': 'Self-executing provisions are the most tested Chapter XI topic.'
	},
	terms: {
		'pari-materia': 'A core term of Chapter VI with three tests.',
		'special-law': 'Needed for the most common scenario: special vs. general law.',
		'strict-construction': 'Often asked as a pair with liberal construction.',
		'liberal-construction': 'Often asked as a pair with strict construction.',
		'mandatory-statute': 'Paired with directory statute in definition questions.',
		'directory-statute': 'Students wrongly write “optional”; examiners look for that.',
		'ex-post-facto': 'A classic definition, usually followed by its kinds.',
		'bill-of-attainder': 'Usually asked together with ex post facto law.',
		'vested-right': 'The key idea limiting retroactive laws.',
		'curative-statute': 'A common example of a law that is retroactive by nature.',
		'express-repeal': 'Paired with implied repeal.',
		'implied-repeal': 'The center of Chapter X.',
		'general-repealing-clause': 'The most common trap in Chapter X.',
		'self-executing': 'The most tested Chapter XI term.'
	},
	topics: {
		ch6: 'Special vs. general law and harmonizing statutes is the most common StatCon scenario.',
		ch10: 'Repeal problems (general repealing clause, repealed penal law) recur often.'
	}
};
