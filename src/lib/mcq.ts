/** A multiple-choice question as shown everywhere in the app (Crim Pro twists, PFR drills, mock exams). */
export interface Mcq {
	q: string;
	o: string[];
	/** Index into `o` of the correct choice. */
	a: number;
	/** Explanation shown after answering. */
	ex: string;
	/** Why each choice is wrong, by index into `o` (empty for the correct choice). */
	why: string[];
}

/**
 * Whether a question's choices may be shuffled. Not when a choice points at other choices by letter or position
 * ("Both B and C are correct", "None of the choices"), because moving the choices would break it.
 */
export function canShuffle(q: Pick<Mcq, 'o'>): boolean {
	return !q.o.some((o) => /\b(none|all) of the (choices|above)\b|\bboth [A-G] and [A-G]\b/i.test(o));
}
