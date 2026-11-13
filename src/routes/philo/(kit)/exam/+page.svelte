<script lang="ts">
	import ModelAnswer from '$lib/components/philo/ModelAnswer.svelte';
	import { ESSAYS, ESSAY_BY_ID, KIND_OF, essayKey, fmt, kinds, words } from '$lib/philo';
	import { store } from '$lib/store.svelte';

	// One essay of each type, as on the professor's last exam. Ten minutes each.
	const MINUTES = 40;
	const st = $derived(store.philo);
	const x = $derived(st.pexam);
	const qs = $derived((x?.ids ?? []).map((id) => ESSAY_BY_ID[id]).filter(Boolean));
	let likelyOnly = $state(false);

	const ans = (id: string) => `x:${id}`;
	function start() {
		const ids = kinds.map((k) => {
			const pool = ESSAYS.filter((e) => e.type === k.id && (!likelyOnly || e.star));
			return pool[Math.floor(Math.random() * pool.length)].id;
		});
		for (const id of ids) delete st.essays[ans(id)];
		st.pexam = { ids, started: Date.now(), finished: null, marks: {}, graded: false };
		scrollTo({ top: 0 });
	}
	function finish() {
		if (!x) return;
		x.finished = Date.now();
		scrollTo({ top: 0 });
	}
	function discard() {
		if (confirm('Discard this mock exam and your answers?')) st.pexam = null;
	}

	// Timer while writing.
	let now = $state(Date.now());
	$effect(() => {
		if (!x || x.finished) return;
		const t = setInterval(() => (now = Date.now()), 1000);
		return () => clearInterval(t);
	});
	const secs = $derived(x ? Math.max(0, Math.round(((x.finished ?? now) - x.started) / 1000)) : 0);
	const left = $derived(MINUTES * 60 - secs);
	const clock = (s: number) => `${s < 0 ? '−' : ''}${Math.floor(Math.abs(s) / 60)}:${String(Math.abs(s) % 60).padStart(2, '0')}`;

	// Marking: the formula checklist sets a 0–5 mark; the buttons override it.
	const total = $derived(qs.length * 5);
	const score = $derived(qs.reduce((n, q) => n + (x?.marks[q.id] ?? 0), 0));
	const allMarked = $derived(qs.every((q) => x?.marks[q.id] !== undefined));
	function save() {
		if (!x) return;
		for (const q of qs) {
			const m = x.marks[q.id] ?? 0;
			st.ratings[essayKey(q.id)] = m >= 4 ? 'got' : m >= 2 ? 'shaky' : 'blank';
		}
		st.exams.push({ at: Date.now(), label: 'Mock exam', score, total, secs });
		x.graded = true;
		scrollTo({ top: 0 });
	}
	const TAG = { define: 'tag-en', differentiate: 'tag-teal', critique: 'tag-purple', opinion: 'tag-accent' } as const;
</script>

<svelte:head><title>Mock exam · Legal Philo · 1Law-C</title></svelte:head>

<div class="stack" style="gap:16px">
	{#if !x || x.graded}
		{#if x?.graded}
			<div class="card result">
				<span class="eyebrow">Last mock exam</span>
				<b class="num big">{score}<small>/ {total} · {Math.round((score / total) * 100)}%</small></b>
				<span class="muted s">Took {clock(secs)}. Each question is now rated in Essay practice, so weak ones come up for review.</span>
			</div>
		{/if}
		<section class="card setup">
			<h2 class="h">Mock exam: one essay of each type</h2>
			<p class="muted" style="max-width:66ch">
				Four questions, picked at random: <b>define, differentiate, critique, opinion</b>. Give yourself {MINUTES} minutes, about
				ten per question. Then check each answer against the model and its formula, and mark it out of 5.
			</p>
			<div class="seg" role="group" aria-label="Questions from">
				<button aria-pressed={!likelyOnly} onclick={() => (likelyOnly = false)}>All questions</button>
				<button aria-pressed={likelyOnly} onclick={() => (likelyOnly = true)}>★ Likely only</button>
			</div>
			<button class="btn btn-primary" style="align-self:flex-start" onclick={start}>{x ? 'Start a new exam' : 'Start the exam'}</button>
		</section>
		{#if st.exams.length}
			<section class="stack" style="gap:6px">
				<h2 class="eyebrow">Past mock exams</h2>
				{#each st.exams.slice().reverse().slice(0, 8) as e (e.at)}
					<div class="card past between">
						<span>{new Date(e.at).toLocaleDateString()} · {clock(e.secs)}</span>
						<b class="num">{e.score}/{e.total}</b>
					</div>
				{/each}
			</section>
		{/if}
	{:else if !x.finished}
		<div class="note between wrap timer" class:note-bad={left < 0}>
			<span><b class="num">{clock(left)}</b> {left < 0 ? 'over time' : 'left'} · write one paragraph per question</span>
			<button class="btn btn-ghost btn-sm" onclick={discard}>Discard</button>
		</div>
		{#each qs as q, i (q.id)}
			<article class="card qx">
				<div class="between" style="align-items:flex-start;gap:10px">
					<h3 class="legal"><span class="no num">{i + 1}.</span> {@html fmt(q.q)}</h3>
					<span class="tag {TAG[q.type]}">{KIND_OF[q.type].name}</span>
				</div>
				<textarea rows="7" bind:value={st.essays[ans(q.id)]} placeholder={KIND_OF[q.type].first} aria-label="Answer to question {i + 1}"></textarea>
				<span class="faint num s">{words(st.essays[ans(q.id)] ?? '')} words</span>
			</article>
		{/each}
		<button class="btn btn-primary" style="align-self:flex-start" onclick={finish}>Finish and check</button>
	{:else}
		<div class="note between wrap">
			<span>Check each answer against the model. Ticking the formula sets a mark; adjust it if you need to.</span>
			<b class="num">{score}/{total}</b>
		</div>
		{#each qs as q, i (q.id)}
			<article class="card qx">
				<div class="between" style="align-items:flex-start;gap:10px">
					<h3 class="legal"><span class="no num">{i + 1}.</span> {@html fmt(q.q)}</h3>
					<span class="tag {TAG[q.type]}">{KIND_OF[q.type].name}</span>
				</div>
				<div class="blk plain">
					<h4>Your answer <span class="faint num">· {words(st.essays[ans(q.id)] ?? '')} words</span></h4>
					<p class="legal mine">{st.essays[ans(q.id)]?.trim() || '(blank)'}</p>
				</div>
				<ModelAnswer {q} onticks={(t, of) => (x.marks[q.id] = Math.round((t / of) * 5))} />
				<div class="row wrap" style="gap:8px">
					<span class="muted s">Mark</span>
					<div class="seg" role="group" aria-label="Mark for question {i + 1}">
						{#each [0, 1, 2, 3, 4, 5] as n (n)}
							<button aria-pressed={x.marks[q.id] === n} onclick={() => (x.marks[q.id] = n)}>{n}</button>
						{/each}
					</div>
				</div>
			</article>
		{/each}
		<div class="row wrap">
			<button class="btn btn-primary" disabled={!allMarked} onclick={save}>Save result · {score}/{total}</button>
			{#if !allMarked}<span class="muted s">Mark every question first.</span>{/if}
		</div>
	{/if}
</div>

<style>
	.h {
		font-size: 18px;
		font-weight: 600;
	}
	.s {
		font-size: 13px;
	}
	.setup,
	.result {
		padding: 16px 18px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.big {
		font-size: 30px;
		font-weight: 600;
		letter-spacing: -0.02em;
	}
	.big small {
		font-size: 14px;
		color: var(--text-2);
		font-weight: 500;
		margin-left: 6px;
		letter-spacing: 0;
	}
	.past {
		padding: 10px 14px;
		font-size: 14px;
	}
	.timer {
		position: sticky;
		top: 64px;
		z-index: 5;
	}
	.timer:not(:global(.note-bad)) {
		background: var(--surface);
		border: 1px solid var(--border);
	}
	.qx {
		padding: 14px 16px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	h3 {
		font-size: 17px;
		font-weight: 600;
		line-height: 1.35;
	}
	.no {
		color: var(--accent-text);
	}
	.mine {
		white-space: pre-wrap;
		font-size: 16px;
	}
</style>
