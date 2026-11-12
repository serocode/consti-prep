<script lang="ts">
	import { page } from '$app/state';
	import { tick } from 'svelte';
	import RateBar from './kit/RateBar.svelte';
	import { cardKey } from '$lib/kit';
	import type { Rating } from '$lib/store.svelte';
	import type { Digest } from '$lib/digest';
	import { md } from '$lib/text';

	let {
		cases,
		groups = [],
		ratings,
		intro
	}: {
		cases: Digest[];
		groups?: { id: number; label: string; title?: string }[];
		/** When given, each digest can be rated for the Flashcards deck. */
		ratings?: Record<string, Rating>;
		intro?: string;
	} = $props();

	let group = $state('all');
	let star = $state(false);
	let hide = $state(false);
	let query = $state('');
	let open: string | null = $state(null);
	let shown: Record<string, boolean> = $state({});

	const label = $derived(Object.fromEntries(groups.map((g) => [g.id, g.label])));
	const q = $derived(query.trim().toLowerCase());
	const list = $derived(
		cases.filter(
			(c) =>
				(group === 'all' || String(c.group) === group) &&
				(!star || c.star) &&
				(!q || `${c.name} ${c.cite} ${c.facts} ${c.doctrine} ${label[c.group ?? 0] ?? ''}`.toLowerCase().includes(q))
		)
	);
	const anyStar = $derived(cases.some((c) => c.star));
	// "(1) … (2) …" means several issues.
	const issueLabel = (s: string) => (s.startsWith('(1)') ? 'Issues' : 'Issue');

	// …#c-<id> opens that digest.
	$effect(() => {
		const m = /^#c-(.+)$/.exec(page.url.hash);
		if (!m) return;
		open = m[1];
		tick().then(() => document.getElementById('c-' + m[1])?.scrollIntoView({ block: 'start' }));
	});
</script>

<div class="stack" style="gap:12px">
	<p class="muted" style="max-width:66ch">
		{intro ?? 'Each case in four parts: Facts, Issue, Ruling, and Doctrine of the case.'} Turn on <b>Hide doctrine</b>, read the
		facts, and say the doctrine before you check.
	</p>
	{#if cases.length > 8}
		<input type="search" bind:value={query} placeholder="Search a case or topic" aria-label="Search cases" />
	{/if}
	<div class="row wrap" style="gap:10px">
		{#if groups.length}
			<div class="seg" role="group" aria-label="Filter cases">
				<button aria-pressed={group === 'all'} onclick={() => (group = 'all')}>All</button>
				{#each groups as g (g.id)}
					<button aria-pressed={group === String(g.id)} onclick={() => (group = String(g.id))} title={g.title}>{g.label}</button>
				{/each}
			</div>
		{/if}
		{#if anyStar}
			<div class="seg" role="group" aria-label="Which cases">
				<button aria-pressed={!star} onclick={() => (star = false)}>All cases</button>
				<button aria-pressed={star} onclick={() => (star = true)}>★ Likely only</button>
			</div>
		{/if}
		<div class="seg" role="group" aria-label="Doctrine">
			<button aria-pressed={!hide} onclick={() => ((hide = false), (shown = {}))}>Show all</button>
			<button aria-pressed={hide} onclick={() => ((hide = true), (shown = {}))}>Hide doctrine</button>
		</div>
	</div>

	{#if !list.length}<div class="card empty">No case matches.</div>{/if}
	{#each list as c (c.id)}
		{@const o = open === c.id}
		<article class="card dg" id="c-{c.id}">
			<button class="head" aria-expanded={o} onclick={() => (open = o ? null : c.id)}>
				<span class="t">
					<span class="name"><i>{c.name}</i></span>
					<span class="muted" style="font-size:13px">{c.cite}</span>
					{#if c.group !== undefined || c.star}
						<span class="row wrap" style="gap:6px">
							{#if c.group !== undefined && label[c.group]}<span class="tag tag-line">{label[c.group]}</span>{/if}
							{#if c.star}<span class="tag tag-star" title={c.star}>★ Likely</span>{/if}
						</span>
					{/if}
				</span>
				<span class="chev" aria-hidden="true">{o ? '−' : '+'}</span>
			</button>
			{#if o}
				<div class="body">
					{#if c.star}<p class="why-star"><b>★ Likely.</b> {c.star}</p>{/if}
					<div class="blk plain"><h4>Facts</h4><p>{c.facts}</p></div>
					<div class="blk plain"><h4>{issueLabel(c.issue)}</h4><p>{c.issue}</p></div>
					<div class="blk plain"><h4>Ruling</h4><p>{c.ruling}</p></div>
					{#if !hide || shown[c.id]}
						<div class="blk k-doc"><h4>Doctrine of the case</h4><p style="font-weight:600">{@html md(c.doctrine)}</p></div>
						{#if c.points?.length}
							<div class="blk k-req"><h4>Points to remember</h4><ul>{#each c.points as x, i (i)}<li>{@html md(x)}</li>{/each}</ul></div>
						{/if}
						{#if c.link}<div class="blk k-cls"><h4>Rule it illustrates</h4><p>{c.link}</p></div>{/if}
						{#if c.trap}<div class="blk trap"><h4>Exam trap</h4><p>{c.trap}</p></div>{/if}
					{:else}
						<button class="btn btn-secondary btn-sm" style="align-self:flex-start" onclick={() => (shown[c.id] = true)}>Show the doctrine</button>
					{/if}
					{#if ratings}<RateBar {ratings} k={cardKey.case(c.id)} prompt="Could you state the doctrine?" />{/if}
					{#if c.practice || c.hook}
						<div class="row wrap">
							{#if c.practice}<a class="btn btn-primary btn-sm" href={c.practice.href}>{c.practice.label}</a>{/if}
							{#if c.hook}<span class="muted" style="font-size:13px">Memory hook: {c.hook}</span>{/if}
						</div>
					{/if}
				</div>
			{/if}
		</article>
	{/each}
</div>

<style>
	input[type='search'] {
		width: 100%;
		min-height: 42px;
		padding: 0 12px;
		background: var(--surface);
		border: 1px solid var(--border-strong);
		border-radius: 6px;
	}
	input[type='search']:focus {
		outline: none;
		border-color: var(--accent);
		box-shadow: var(--focus);
	}
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
	.empty {
		padding: 24px;
		text-align: center;
		color: var(--text-2);
	}
</style>
