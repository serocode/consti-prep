/** One case in digest form: Facts, Issue, Ruling, and the Doctrine of the case. Shared by every subject. */
export interface Digest {
	id: string;
	name: string;
	cite: string;
	/** Part or chapter, for the filter. */
	group?: number;
	facts: string;
	issue: string;
	ruling: string;
	doctrine: string;
	/** ★ Likely reason. */
	star?: string;
	/** Extra points (may use **bold**). */
	points?: string[];
	/** The rule of the subject the case illustrates. */
	link?: string;
	trap?: string;
	practice?: { href: string; label: string };
	hook?: string;
}
