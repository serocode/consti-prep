<script lang="ts">
	import { page } from '$app/state';
	import { PAST } from '$lib/pfr';
	import { md } from '$lib/text';
	import { answerKey } from '$lib/answerkey.svelte';

	const SECTIONS = { I: 'I · Multiple choice', II: 'II · True or false', III: 'III · Art. 147 or 148', IV: 'IV · Identify the regime', V: 'V · Donation status' } as const;
	type S = keyof typeof SECTIONS;

	let section: S | 'all' = $state('all');
	let doubtOnly = $state(false);
	let showAll = $state(false);
	let shown: Record<number, boolean> = $state({});

	// …/past#s-V opens part V.
	$effect(() => {
		const m = /^#s-(I|II|III|IV|V)$/.exec(page.url.hash);
		if (m) section = m[1] as S;
	});

	const items = $derived(PAST.map((x, i) => ({ ...x, i })).filter((x) => (section === 'all' || x.s === section) && (!doubtOnly || x.v === 'doubt')));
	const groups = $derived.by(() => {
		const out: { s: S; items: typeof items }[] = [];
		for (const x of items) {
			const g = out.at(-1);
			if (g && g.s === x.s) g.items.push(x);
			else out.push({ s: x.s, items: [x] });
		}
		return out;
	});
	const doubts = PAST.filter((x) => x.v === 'doubt').length;
	const LETTERS = 'ABCDEFG';
</script>

<svelte:head><title>Past exam · PFR · 1Law-C</title></svelte:head>

<div class="stack" style="gap:12px">
	<p class="muted" style="max-width:68ch">
		Every item from a past exam, with its answer key checked against the codal. <span class="tag tag-ok">Key checked</span>
		means the key is right. <span class="tag tag-warn">Doubtful key</span> means the codal points to a different answer
		({doubts} items): know both, and if the item comes back as an essay, explain using the article.
	</p>
	<div class="row wrap" style="gap:10px">
		<div class="seg" role="group" aria-label="Part">
			<button aria-pressed={section === 'all'} onclick={() => (section = 'all')}>All</button>
			{#each Object.entries(SECTIONS) as [k, v] (k)}
				<button aria-pressed={section === k} onclick={() => (section = k as S)} title={v}>{k}</button>
			{/each}
		</div>
		<div class="seg" role="group" aria-label="Which items">
			<button aria-pressed={!doubtOnly} onclick={() => (doubtOnly = false)}>All items</button>
			<button aria-pressed={doubtOnly} onclick={() => (doubtOnly = true)}>Doubtful keys only</button>
		</div>
		<div class="seg" role="group" aria-label="Mode">
			<button aria-pressed={!showAll} onclick={() => ((showAll = false), (shown = {}))}>Quiz me</button>
			<button aria-pressed={showAll} onclick={() => (showAll = true)}>Show answers</button>
		</div>
	</div>

	{#each groups as g (g.s)}
		<h2 class="eyebrow" style="margin-top:6px">{SECTIONS[g.s]}</h2>
		{#each g.items as x (x.i)}
			{@const open = showAll || shown[x.i] || answerKey.on}
			<article class="card item">
				<p class="stem">{@html md(x.q)}</p>
				{#if x.o.length > 2 || x.s === 'I'}
					<ol class="opts">{#each x.o as o, k (k)}<li><span class="l">{LETTERS[k]}.</span> {@html md(o)}</li>{/each}</ol>
				{/if}
				{#if open}
					<div class="ans">
						<p>
							<span class="muted">Answer key:</span> <b>{x.key}</b>
							<span class="tag {x.v === 'ok' ? 'tag-ok' : 'tag-warn'}">{x.v === 'ok' ? 'Key checked' : 'Doubtful key'}</span>
						</p>
						{#if x.v !== 'ok'}<p><span class="muted">The codal points to:</span> <b>{x.best}</b></p>{/if}
						{#if x.x}<p class="muted">{@html md(x.x)}</p>{/if}
					</div>
				{:else}
					<button class="btn btn-secondary btn-sm" style="align-self:flex-start" onclick={() => (shown[x.i] = true)}>Show answer</button>
				{/if}
			</article>
		{/each}
	{/each}
	{#if !items.length}<div class="card" style="padding:24px;text-align:center;color:var(--text-2)">Nothing in this filter.</div>{/if}
</div>

<style>
	.item {
		padding: 14px 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.stem {
		font-family: var(--legal);
		font-size: 16px;
		font-weight: 600;
		line-height: 1.45;
	}
	.opts {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 4px;
		font-size: 14.5px;
	}
	.l {
		font-weight: 600;
		color: var(--text-2);
		margin-right: 4px;
	}
	.ans {
		padding: 10px 12px;
		border-radius: 6px;
		background: var(--surface-2);
		display: flex;
		flex-direction: column;
		gap: 4px;
		font-size: 14.5px;
	}
</style>
