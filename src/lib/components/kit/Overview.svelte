<script lang="ts">
	import { cardKey, type Kit } from '$lib/kit';
	import { bestScore } from '$lib/store.svelte';

	let { kit }: { kit: Kit } = $props();
	const st = $derived(kit.state());
	const r = $derived(st.ratings);
	const maxims = $derived(kit.maxims ?? []);
	const tally = (keys: string[]) => {
		const n = { got: 0, shaky: 0, blank: 0 };
		for (const k of keys) if (r[k]) n[r[k]]++;
		return { ...n, total: keys.length };
	};
	const enums = $derived(tally(kit.enums.map((e) => cardKey.enum(e.id))));
	const terms = $derived(tally([...kit.terms.map((t) => cardKey.term(t.id)), ...maxims.map((x) => cardKey.maxim(x.m))]));
	const answered = $derived(kit.problems.map((p) => bestScore(p.pid)).filter((b) => b >= 0));
	const avg = $derived(answered.length ? answered.reduce((a, b) => a + b, 0) / answered.length : 0);
	const weak = $derived(
		[
			...kit.enums.map((e) => cardKey.enum(e.id)),
			...kit.terms.map((t) => cardKey.term(t.id)),
			...maxims.map((x) => cardKey.maxim(x.m)),
			...(kit.cases ?? []).map((c) => cardKey.case(c.id))
		].filter(
			(k) => r[k] === 'blank' || r[k] === 'shaky'
		).length
	);
	const last = $derived(st.exams.at(-1));
	const x = $derived(st.exam);
</script>

<div class="stack" style="gap:16px">
	{#if x && !x.graded}
		<div class="note note-warn between wrap">
			<span>You have a mock exam {x.finished ? 'waiting to be checked' : 'in progress'}.</span>
			<a class="btn btn-primary btn-sm" href="{kit.base}/exam">{x.finished ? 'Check it' : 'Resume'}</a>
		</div>
	{/if}

	<div class="parts">
		<a class="card part" href="{kit.base}/enumerations">
			<span class="eyebrow">I · Enumeration</span>
			<b class="num">{enums.got}<small>/ {enums.total} lists known</small></b>
			<div class="bar"><i style="width:{(enums.got / enums.total) * 100}%"></i></div>
			<span class="muted s">Name every item and explain each in one line.{enums.shaky + enums.blank ? ` ${enums.shaky + enums.blank} need work.` : ''}</span>
		</a>
		<a class="card part" href="{kit.base}/terms">
			<span class="eyebrow">II · Definition of terms</span>
			<b class="num">{terms.got}<small>/ {terms.total} {maxims.length ? 'terms and maxims' : 'terms known'}</small></b>
			<div class="bar"><i style="width:{(terms.got / terms.total) * 100}%"></i></div>
			<span class="muted s">{kit.terms.length} terms{maxims.length ? ` and ${maxims.length} Latin maxims` : ''}. Define each in a sentence or two.</span>
		</a>
		<a class="card part" href="{kit.base}/problems">
			<span class="eyebrow">III · Problems (ALAC)</span>
			<b class="num">{answered.length}<small>/ {kit.problems.length} answered</small></b>
			<div class="bar"><i style="width:{(answered.length / kit.problems.length) * 100}%"></i></div>
			<span class="muted s">{answered.length ? `Average best score ${avg.toFixed(1)} / 5.` : 'Write in ALAC and self-check on the 0–5 rubric.'}</span>
		</a>
		<a class="card part exam" href="{kit.base}/exam">
			<span class="eyebrow">Put it together · Mock exam</span>
			<b class="num">{last ? Math.round((last.score / last.total) * 100) + '%' : '—'}<small>{last ? `last exam · ${last.score}/${last.total}` : 'not taken yet'}</small></b>
			<span class="muted s">All three parts, written, then marked against the model answers.</span>
		</a>
	</div>

	<div class="row wrap">
		<a class="btn btn-primary" href="{kit.base}/focus">★ Exam focus: start here</a>
		<a class="btn btn-secondary" href="{kit.base}/exam">Take a mock exam</a>
		<a class="btn btn-secondary" href="{kit.base}/drill">Flashcards{weak ? ` · ${weak} to review` : ''}</a>
	</div>

	<section class="card plan">
		<h2 class="eyebrow">A study order that works</h2>
		<ol>
			<li><b>Read the Exam focus.</b> The ranked list of likely questions tells you what to master first. ★ Likely items come before everything else.</li>
			<li><b>Learn the lists.</b> Enumerations in <i>Study mode</i>: memory aid first, then each item and its one-line explanation.</li>
			<li><b>Recall them cold.</b> Switch to <i>Recall mode</i> and fill the numbered slots before you tap Show. Rate each list.</li>
			<li><b>Define the terms.</b> Definitions in <i>Self-test</i>. Say the definition before you reveal it.</li>
			<li><b>Answer problems in ALAC.</b> Spot the topic (see the Answer guide), then write and self-check. Use Random problem so you can't guess the topic from the list.</li>
			<li><b>Sit a mock exam.</b> Mark yourself strictly. What you miss goes to the flashcards; drill those until the exam.</li>
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
