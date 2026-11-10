import { QUESTIONS, Q_BY_ID, SETS, sample, shuffled, type QRef } from './crimpro';
import { logExam, recordAnswer, store, type Session } from './store.svelte';

/** Where a session draws its questions from: everything, last answer wrong, never answered, or one rule. */
export type Source = 'all' | 'missed' | 'new' | `rule:${string}`;

export function pool(source: Source): QRef[] {
	const st = store.crimpro.q;
	if (source === 'missed') return QUESTIONS.filter((r) => st[r.qid]?.last === false);
	if (source === 'new') return QUESTIONS.filter((r) => !st[r.qid]);
	if (source.startsWith('rule:')) {
		const id = source.slice(5);
		return QUESTIONS.filter((r) => r.set.rules.includes(id));
	}
	return QUESTIONS;
}

export function sourceLabel(source: Source): string {
	if (source === 'missed') return 'questions you missed';
	if (source === 'new') return 'questions not yet answered';
	if (source.startsWith('rule:')) return `Rule ${source.slice(5)}`;
	return 'all rules';
}

export function startSession(opts: { kind: Session['kind']; qids: string[]; label: string; secsPerQ?: number }) {
	const now = Date.now();
	store.crimpro.session = {
		kind: opts.kind,
		label: opts.label,
		qids: opts.qids,
		orders: opts.qids.map((id) => shuffled(Q_BY_ID[id].q.o.length)),
		picks: opts.qids.map(() => null),
		i: 0,
		started: now,
		deadline: opts.kind === 'exam' && opts.secsPerQ ? now + opts.secsPerQ * opts.qids.length * 1000 : null,
		finished: null
	};
}

/** Draws `n` random questions from `source` and starts a session on them. Returns how many were drawn. */
export function startFrom(kind: Session['kind'], source: Source, n: number, secsPerQ = 0): number {
	const qs = sample(pool(source), n);
	if (!qs.length) return 0;
	const what = kind === 'exam' ? 'Mock exam' : 'Practice';
	startSession({ kind, qids: qs.map((r) => r.qid), label: `${what} · ${qs.length} questions · ${sourceLabel(source)}`, secsPerQ });
	return qs.length;
}

/** Practice mode: record the answer right away and lock it. Exam mode: answers stay editable until submit. */
export function answer(i: number, oi: number) {
	const s = store.crimpro.session;
	if (!s || s.finished) return;
	if (s.kind === 'practice') {
		if (s.picks[i] !== null) return;
		s.picks[i] = oi;
		recordAnswer(s.qids[i], oi === Q_BY_ID[s.qids[i]].q.a);
	} else s.picks[i] = oi;
}

export function scoreOf(s: Session): number {
	return s.qids.reduce((n, id, k) => n + (s.picks[k] === Q_BY_ID[id].q.a ? 1 : 0), 0);
}

export function submit() {
	const s = store.crimpro.session;
	if (!s || s.finished) return;
	// A timed exam ends at the deadline even if the tab was closed past it.
	const end = s.deadline ? Math.min(Date.now(), s.deadline) : Date.now();
	s.finished = end;
	if (s.kind === 'exam') {
		// Unanswered questions count against the score but are not logged as "missed".
		s.qids.forEach((id, k) => {
			if (s.picks[k] !== null) recordAnswer(id, s.picks[k] === Q_BY_ID[id].q.a);
		});
		logExam({
			at: end,
			label: s.label,
			total: s.qids.length,
			score: scoreOf(s),
			secs: Math.round((end - s.started) / 1000),
			timed: s.deadline !== null
		});
	}
}

export function endSession() {
	store.crimpro.session = null;
}

// ---------- progress ----------

export interface SetProgress {
	id: string;
	title: string;
	seen: number;
	right: number;
	total: number;
}

/** Per set: how many questions were answered, and how many were right on the latest try. */
export function setProgress(): SetProgress[] {
	const st = store.crimpro.q;
	return SETS.map((s) => {
		let seen = 0;
		let right = 0;
		s.qs.forEach((_, k) => {
			const x = st[`${s.id}-${k}`];
			if (x) {
				seen++;
				if (x.last) right++;
			}
		});
		return { id: s.id, title: s.title, seen, right, total: s.qs.length };
	});
}

export function fmtTime(secs: number): string {
	const s = Math.max(0, Math.round(secs));
	return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
