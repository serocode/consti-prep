<script lang="ts">
	import { cardKey } from '$lib/kit';
	import { ESSAYS, PHILO, essayKey } from '$lib/philo';
	import { CASES } from '$lib/philo-content';
	import { store } from '$lib/store.svelte';

	const st = $derived(store.philo);
	const r = $derived(st.ratings);
	const tally = (keys: string[]) => {
		const n = { got: 0, shaky: 0, blank: 0 };
		for (const k of keys) if (r[k]) n[r[k]]++;
		return { ...n, total: keys.length, weak: n.shaky + n.blank };
	};
	const essays = $derived(tally(ESSAYS.map((e) => essayKey(e.id))));
	const terms = $derived(tally(PHILO.terms.map((t) => cardKey.term(t.id))));
	const enums = $derived(tally(PHILO.enums.map((e) => cardKey.enum(e.id))));
	const cases = $derived(tally(CASES.map((c) => cardKey.case(c.id))));
	const weak = $derived(terms.weak + enums.weak + cases.weak);
	const last = $derived(st.exams.at(-1));
	const x = $derived(st.pexam);
	const pct = (n: number, d: number) => (d ? (n / d) * 100 : 0);
</script>

<svelte:head><title>Legal Philo · 1Law-C</title></svelte:head>

<div class="stack" style="gap:16px">
	{#if x && !x.graded}
		<div class="note note-warn between wrap">
			<span>You have a mock exam {x.finished ? 'waiting to be checked' : 'in progress'}.</span>
			<a class="btn btn-primary btn-sm" href="/philo/exam">{x.finished ? 'Check it' : 'Resume'}</a>
		</div>
	{/if}

	<div class="parts">
		<a class="card part" href="/philo/essays">
			<span class="eyebrow">Essays · define, differentiate, critique, opinion</span>
			<b class="num">{essays.got}<small>/ {essays.total} questions you can write</small></b>
			<div class="bar"><i style="width:{pct(essays.got, essays.total)}%"></i></div>
			<span class="muted s">Write first, then check against a short model answer.{essays.weak ? ` ${essays.weak} need work.` : ''}</span>
		</a>
		<a class="card part" href="/philo/terms">
			<span class="eyebrow">Definition of terms</span>
			<b class="num">{terms.got}<small>/ {terms.total} terms known</small></b>
			<div class="bar"><i style="width:{pct(terms.got, terms.total)}%"></i></div>
			<span class="muted s">Each thinker’s own terms, and what not to confuse them with.</span>
		</a>
		<a class="card part" href="/philo/enumerations">
			<span class="eyebrow">Enumeration</span>
			<b class="num">{enums.got}<small>/ {enums.total} lists known</small></b>
			<div class="bar"><i style="width:{pct(enums.got, enums.total)}%"></i></div>
			<span class="muted s">Types of authority, Hart’s objections, Pound’s postulates, classes of custom.</span>
		</a>
		<a class="card part" href="/philo/cases">
			<span class="eyebrow">Case digests</span>
			<b class="num">{cases.got}<small>/ {cases.total} doctrines known</small></b>
			<div class="bar"><i style="width:{pct(cases.got, cases.total)}%"></i></div>
			<span class="muted s">The Philippine cases that prove the theory is living doctrine.</span>
		</a>
		<a class="card part exam" href="/philo/exam">
			<span class="eyebrow">Put it together · Mock exam</span>
			<b class="num">{last ? Math.round(pct(last.score, last.total)) + '%' : '—'}<small>{last ? `last exam · ${last.score}/${last.total}` : 'not taken yet'}</small></b>
			<span class="muted s">One essay of each type, written, then checked against the model answers.</span>
		</a>
	</div>

	<div class="row wrap">
		<a class="btn btn-primary" href="/philo/focus">★ Exam focus: start here</a>
		<a class="btn btn-secondary" href="/philo/exam">Take a mock exam</a>
		<a class="btn btn-secondary" href="/philo/drill">Flashcards{weak ? ` · ${weak} to review` : ''}</a>
	</div>

	<section class="card plan">
		<h2 class="eyebrow">A study order that works</h2>
		<ol>
			<li><b>Read the Exam focus.</b> The ranked questions and the #1 model answer show what the professor tests: thinking, not recall.</li>
			<li><b>Learn the four answer formulas.</b> The Answer guide gives each type’s formula, first line and trap.</li>
			<li><b>Know who said what.</b> Thinkers and Definitions in <i>Self-test</i>. Name the thinker and the phrase every time.</li>
			<li><b>Anchor in Philippine cases.</b> Case digests with <i>Hide doctrine</i>. Each case proves a thinker’s idea.</li>
			<li><b>Practice the hard verbs.</b> Differentiate and Critiques: say the common ground or the strength before you check.</li>
			<li><b>Write essays.</b> Essay practice in <i>Write</i> mode, then tick off the formula against the model.</li>
			<li><b>Sit a mock exam.</b> One of each type in 40 minutes. What you miss goes to the flashcards.</li>
		</ol>
	</section>
</div>

<style>
	.parts {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
		gap: 10px;
	}
	.part {
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 6px;
		color: var(--text);
		text-decoration: none;
	}
	.part:hover {
		border-color: var(--border-strong);
		background: var(--surface-2);
	}
	.part b {
		font-size: 26px;
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.1;
	}
	.part b small {
		font-size: 13px;
		color: var(--text-2);
		font-weight: 500;
		margin-left: 4px;
		letter-spacing: 0;
	}
	.part .s {
		font-size: 13px;
	}
	.exam {
		border-color: var(--accent-line);
		background: var(--accent-soft);
	}
	.plan {
		padding: 16px 18px;
	}
	.plan ol {
		margin-top: 8px;
		padding-left: 1.3em;
		display: grid;
		gap: 6px;
		font-size: 14.5px;
	}
</style>
