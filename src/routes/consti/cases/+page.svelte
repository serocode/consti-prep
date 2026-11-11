<script lang="ts">
	import { page } from '$app/state';
	import { tick } from 'svelte';
	import raw from '$lib/data/consti-digests.json';
	import { LIKELY_CASES } from '$lib/focus/consti';
	import { CASES, PARTS, PART_SHORT, type PartNo } from '$lib/problems';
	import { md } from '$lib/text';

	const DIGEST = raw as Record<string, { facts: string; issue: string; ruling: string }>;
	let part = $state('all');
	let star = $state(false);
	let open: string | null = $state(null);
	const list = $derived(CASES.filter((c) => (part === 'all' || String(c.part) === part) && (!star || LIKELY_CASES[c.id])));

	// /consti/cases#c-sereno opens that digest.
	$effect(() => {
		const m = /^#c-(.+)$/.exec(page.url.hash);
		if (!m) return;
		open = m[1];
		tick().then(() => document.getElementById('c-' + m[1])?.scrollIntoView({ block: 'start' }));
	});
</script>

<svelte:head><title>Case digests · Consti I · 1Law-C</title></svelte:head>

<div class="stack" style="gap:12px">
	<p class="muted" style="max-width:66ch">
		Each of the 28 cases in four parts: Facts, Issue, Ruling, and Doctrine. Say the doctrine before you open a case. The
		digests are short on purpose. Read the full text of the ★ Likely cases.
	</p>
	<div class="row wrap" style="gap:10px">
		<div class="seg" role="group" aria-label="Part">
			<button aria-pressed={part === 'all'} onclick={() => (part = 'all')}>All parts</button>
			{#each [1, 2, 3, 4] as n (n)}
				<button aria-pressed={part === String(n)} onclick={() => (part = String(n))} title={PARTS[n as PartNo]}>{PART_SHORT[n as PartNo]}</button>
			{/each}
		</div>
		<div class="seg" role="group" aria-label="Which cases">
			<button aria-pressed={!star} onclick={() => (star = false)}>All cases</button>
			<button aria-pressed={star} onclick={() => (star = true)}>★ Likely only</button>
		</div>
	</div>

	{#each list as c (c.id)}
		{@const o = open === c.id}
		{@const d = DIGEST[c.id]}
		<article class="card dg" id="c-{c.id}">
			<button class="head" aria-expanded={o} onclick={() => (open = o ? null : c.id)}>
				<span class="t">
					<span class="name"><i>{c.name}</i></span>
					<span class="muted" style="font-size:13px">{c.cite}</span>
					<span class="row wrap" style="gap:6px">
						<span class="tag tag-line">{PART_SHORT[c.part]}</span>
						{#if LIKELY_CASES[c.id]}<span class="tag tag-star" title={LIKELY_CASES[c.id]}>★ Likely</span>{/if}
					</span>
				</span>
				<span class="chev" aria-hidden="true">{o ? '−' : '+'}</span>
			</button>
			{#if o}
				<div class="body">
					{#if LIKELY_CASES[c.id]}<p class="why-star"><b>★ Likely.</b> {LIKELY_CASES[c.id]}</p>{/if}
					<div class="blk plain"><h4>Facts</h4><p>{d.facts}</p></div>
					<div class="blk plain"><h4>Issue</h4><p>{d.issue}</p></div>
					<div class="blk plain"><h4>Ruling</h4><p>{d.ruling}</p></div>
					<div class="blk k-doc"><h4>Doctrine of the case</h4><p style="font-weight:600">{c.rule}</p></div>
					{#if c.doc.length}
						<div class="blk k-req"><h4>Points to remember</h4><ul>{#each c.doc as x, i (i)}<li>{@html md(x)}</li>{/each}</ul></div>
					{/if}
					<div class="blk trap"><h4>Exam trap</h4><p>{c.key}</p></div>
					<div class="row wrap">
						<a class="btn btn-primary btn-sm" href="/p/{c.id}-drill">Practice the case drill</a>
						<span class="muted" style="font-size:13px">Memory hook: {c.hook}</span>
					</div>
				</div>
			{/if}
		</article>
	{/each}
</div>

<style>
	.dg {
		scroll-margin-top: 80px;
	}
	.head {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 12px;
		align-items: start;
		padding: 14px 16px;
		background: none;
		border: 0;
		border-radius: 8px;
		text-align: left;
		cursor: pointer;
	}
	.head:hover {
		background: var(--surface-2);
	}
	.t {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
	}
	.name {
		font-family: var(--legal);
		font-size: 17px;
		font-weight: 600;
	}
	.chev {
		color: var(--text-2);
		font-size: 18px;
		line-height: 1.2;
	}
	.body {
		padding: 12px 16px 16px;
		border-top: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
