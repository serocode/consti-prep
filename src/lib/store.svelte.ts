import { browser } from '$app/environment';
import { PROBLEMS, type Problem } from './problems';
import type { Check } from './rubric';

/** Everything the app remembers lives in one localStorage key. */
const KEY = 'alac-consti:v1';

export type Mode = 'guided' | 'full';
export type Theme = 'system' | 'light' | 'dark';

export interface Draft {
	a: string;
	l: string;
	p: string;
	c: string;
	full: string;
}

export interface Answer extends Draft {
	mode: Mode;
}

export interface Attempt {
	at: number;
	secs: number;
	answer: Answer;
	check: Check;
	score: number;
	/** The student picked a different band than the checklist computed. */
	overridden?: boolean;
}

export interface Prefs {
	mode: Mode;
	theme: Theme;
	part: 'all' | '1' | '2' | '3' | '4';
	type: 'all' | 'drill' | 'same' | 'twist';
	status: 'all' | 'new' | 'weak';
}

/** How one Crim Pro question has gone so far. */
export interface QStat {
	/** Times answered. */
	n: number;
	/** Times answered correctly. */
	ok: number;
	/** Whether the latest answer was right. "Missed" means `last === false`. */
	last: boolean;
	at: number;
}

/** A mock exam or mixed practice run. Lives in the store so a refresh or app switch resumes it. */
export interface Session {
	kind: 'exam' | 'practice';
	label: string;
	qids: string[];
	/** Shuffled choice order per question. */
	orders: number[][];
	/** Chosen choice index per question (null = not answered). */
	picks: (number | null)[];
	i: number;
	started: number;
	/** Exam auto-submits at this time (ms). Null = untimed. */
	deadline: number | null;
	finished: number | null;
}

export interface ExamLog {
	at: number;
	label: string;
	total: number;
	score: number;
	secs: number;
	timed: boolean;
}

export interface CrimPro {
	/** Best score per twist set id. */
	best: Record<string, number>;
	/** Per-question history, keyed by qid (`<set id>-<index>`). */
	q: Record<string, QStat>;
	/** Submitted mock exams, oldest first. */
	exams: ExamLog[];
	session: Session | null;
}

export interface Saved {
	version: 1;
	attempts: Record<string, Attempt[]>;
	drafts: Record<string, Draft>;
	prefs: Prefs;
	crimpro: CrimPro;
}

export const emptyDraft = (): Draft => ({ a: '', l: '', p: '', c: '', full: '' });

const defaults = (): Saved => ({
	version: 1,
	attempts: {},
	drafts: {},
	prefs: { mode: 'guided', theme: 'system', part: 'all', type: 'all', status: 'all' },
	crimpro: { best: {}, q: {}, exams: [], session: null }
});

const obj = <T>(x: unknown): Record<string, T> => (x && typeof x === 'object' && !Array.isArray(x) ? (x as Record<string, T>) : {});

function loadCrimPro(c: Partial<CrimPro> | undefined): CrimPro {
	const s = c?.session;
	return {
		best: obj(c?.best),
		q: obj(c?.q),
		exams: Array.isArray(c?.exams) ? c.exams : [],
		session: s && Array.isArray(s.qids) && Array.isArray(s.picks) && Array.isArray(s.orders) ? s : null
	};
}

function load(): Saved {
	const d = defaults();
	if (!browser) return d;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return d;
		const s = JSON.parse(raw) as Partial<Saved>;
		return {
			version: 1,
			attempts: s.attempts && typeof s.attempts === 'object' ? s.attempts : {},
			drafts: s.drafts && typeof s.drafts === 'object' ? s.drafts : {},
			prefs: { ...d.prefs, ...(s.prefs ?? {}) },
			crimpro: loadCrimPro(s.crimpro)
		};
	} catch {
		return d;
	}
}

export const store: Saved = $state(load());

let saveTimer: ReturnType<typeof setTimeout> | undefined;
let storageOk = $state(true);
export const storageStatus = {
	get ok() {
		return storageOk;
	}
};

let pendingJson: string | null = null;
function flush() {
	clearTimeout(saveTimer);
	if (pendingJson === null) return;
	try {
		localStorage.setItem(KEY, pendingJson);
		storageOk = true;
	} catch {
		storageOk = false;
	}
	pendingJson = null;
}

/** Writes immediately (used right after an attempt is saved). */
function saveNow() {
	if (!browser) return;
	pendingJson = JSON.stringify(store);
	flush();
}

if (browser) {
	// Never lose the last keystrokes when the tab closes or the phone switches apps.
	addEventListener('pagehide', flush);
	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'hidden') flush();
	});
	$effect.root(() => {
		$effect(() => {
			pendingJson = JSON.stringify(store);
			clearTimeout(saveTimer);
			saveTimer = setTimeout(flush, 250);
		});
		$effect(() => {
			const t = store.prefs.theme;
			if (t === 'system') document.documentElement.removeAttribute('data-theme');
			else document.documentElement.setAttribute('data-theme', t);
		});
	});
}

// ---------- queries ----------

export function attemptsFor(pid: string): Attempt[] {
	return store.attempts[pid] ?? [];
}

export function bestScore(pid: string): number {
	let b = -1;
	for (const a of attemptsFor(pid)) if (a.score > b) b = a.score;
	return b;
}

export function lastAttempt(pid: string): Attempt | undefined {
	const a = attemptsFor(pid);
	return a[a.length - 1];
}

export function filteredProblems(): Problem[] {
	const { part, type, status } = store.prefs;
	return PROBLEMS.filter((p) => {
		if (part !== 'all' && String(p.c.part) !== part) return false;
		if (type !== 'all' && p.type !== type) return false;
		const b = bestScore(p.pid);
		if (status === 'new' && b >= 0) return false;
		if (status === 'weak' && !(b >= 0 && b < 4)) return false;
		return true;
	});
}

/** The list a problem page navigates within: the current filter, or everything if the problem is outside it. */
export function navList(pid: string): Problem[] {
	const list = filteredProblems();
	return list.some((p) => p.pid === pid) ? list : PROBLEMS;
}

// ---------- mutations ----------

export function draftFor(pid: string): Draft {
	if (!store.drafts[pid]) store.drafts[pid] = emptyDraft();
	return store.drafts[pid];
}

export function recordAttempt(pid: string, attempt: Attempt) {
	// Assign first, then push through the store: `(x ??= []).push()` would push into the raw, unproxied array.
	if (!store.attempts[pid]) store.attempts[pid] = [];
	store.attempts[pid].push(attempt);
	// Clear in place: the open editor keeps a reference to this draft object.
	const d = store.drafts[pid];
	if (d) d.a = d.l = d.p = d.c = d.full = '';
	else store.drafts[pid] = emptyDraft();
	saveNow();
}

/** Keeps the higher of the stored and new score for a Crim Pro twist set. */
export function recordSetScore(id: string, score: number) {
	const prev = store.crimpro.best[id];
	if (prev == null || score > prev) store.crimpro.best[id] = score;
	saveNow();
}

/** Logs one answered Crim Pro question. */
export function recordAnswer(qid: string, ok: boolean) {
	const s = store.crimpro.q[qid];
	if (s) {
		s.n++;
		if (ok) s.ok++;
		s.last = ok;
		s.at = Date.now();
	} else store.crimpro.q[qid] = { n: 1, ok: ok ? 1 : 0, last: ok, at: Date.now() };
}

export function logExam(log: ExamLog) {
	store.crimpro.exams.push(log);
	saveNow();
}

/** Replaces the score of the newest attempt (used when the student overrides the band). */
export function setLastScore(pid: string, score: number) {
	const a = store.attempts[pid];
	if (!a?.length) return;
	a[a.length - 1].score = score;
	a[a.length - 1].overridden = true;
	saveNow();
}

// ---------- backup ----------

export function exportJSON(): string {
	return JSON.stringify({ app: 'alac-consti', exportedAt: new Date().toISOString(), ...$state.snapshot(store) }, null, 2);
}

export function importJSON(text: string): { ok: true; count: number } | { ok: false; error: string } {
	try {
		const s = JSON.parse(text);
		if (!s || typeof s !== 'object' || !s.attempts || typeof s.attempts !== 'object') {
			return { ok: false, error: 'That file is not an ALAC backup.' };
		}
		store.attempts = s.attempts;
		store.drafts = s.drafts && typeof s.drafts === 'object' ? s.drafts : {};
		if (s.prefs) store.prefs = { ...store.prefs, ...s.prefs };
		// Backups made before Crim Pro existed have no `crimpro`; keep the current scores then.
		if (s.crimpro) store.crimpro = loadCrimPro(s.crimpro);
		return { ok: true, count: Object.keys(s.attempts).length };
	} catch {
		return { ok: false, error: 'That file could not be read. Choose the .json file you exported.' };
	}
}

export function resetAll() {
	const d = defaults();
	store.attempts = d.attempts;
	store.drafts = d.drafts;
	store.crimpro = d.crimpro;
}
