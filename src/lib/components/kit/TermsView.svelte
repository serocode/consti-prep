<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';
	import GroupSeg from './GroupSeg.svelte';
	import RateBar from './RateBar.svelte';
	import RatingTag from './RatingTag.svelte';
	import { cardKey, type Kit } from '$lib/kit';
	import { answerKey } from '$lib/answerkey.svelte';

	let { kit }: { kit: Kit } = $props();
	const st = $derived(kit.state());
	const short = $derived(Object.fromEntries(kit.groups.map((g) => [g.id, g.short])));

	let ch = $state('all');
	let query = $state('');
	let test = $state(true);
	let star = $state(false);
	const likely = $derived(kit.focus.terms ?? {});
	const shown = new SvelteSet<string>();
	const visible = (k: string) => !test || answerKey.on || shown.has(k);

	const q = $derived(query.trim().toLowerCase());
	const terms = $derived(
		kit.terms.filter((t) => (ch === 'all' || String(t.group) === ch) && (!star || likely[t.id]) && (!q || `${t.t} ${t.d} ${t.x ?? ''}`.toLowerCase().includes(q)))
	);
	const maxims = $derived(
		(star ? [] : (kit.maxims ?? [])).filter((x) => (ch === 'all' || x.groups.includes(Number(ch))) && (!q || `${x.m} ${x.mean}`.toLowerCase().includes(q)))
	);

	function setTest(v: boolean) {
		test = v;
		shown.clear();
	}
</script>

<div class="stack" style="gap:12px">
	<p class="muted" style="max-width:66ch">
		Define the term in one or two sentences, then add the one point that
		keeps it from being confused with its neighbor. In self-test mode, say the definition before you reveal it.
	</p>
	<input type="search" bind:value={query} placeholder="Search a term" aria-label="Search definitions" />
	<div class="row wrap" style="gap:10px">
		<GroupSeg {kit} bind:value={ch} label="Filter by {kit.groupNoun}" />
		<div class="seg" role="group" aria-label="Mode">
			<button aria-pressed={test} onclick={() => setTest(true)}>Self-test</button>
			<button aria-pressed={!test} onclick={() => setTest(false)}>Study</button>
		</div>
		<div class="seg" role="group" aria-label="Which terms">
			<button aria-pressed={!star} onclick={() => (star = false)}>All</button>
			<button aria-pressed={star} onclick={() => (star = true)}>★ Likely only ({Object.keys(likely).length})</button>
		</div>
	</div>

	{#if terms.length}
		<h2 class="eyebrow" style="margin-top:6px">Terms ({terms.length})</h2>
		<div class="grid">
			{#each terms as t (t.id)}
				{@const k = cardKey.term(t.id)}
				<article class="card term">
					<div class="between" style="align-items:flex-start">
						<h3 class="legal">{t.t}</h3>
						<span class="row" style="gap:4px">{#if likely[t.id]}<span class="tag tag-star" title={likely[t.id]}>★</span>{/if}<RatingTag ratings={st.ratings} {k} /><span class="tag tag-line">{short[t.group]}</span></span>
					</div>
					{#if visible(k)}
						<p>{t.d}</p>
						{#if t.x}<p class="x"><b>Don’t confuse:</b> {t.x}</p>{/if}
						{#if likely[t.id]}<p class="faint" style="font-size:12.5px">★ Likely: {likely[t.id]}</p>{/if}
						<p class="faint" style="font-size:12px">{t.src}</p>
						{#if test}<RateBar ratings={st.ratings} {k} prompt="Did you have it?" />{/if}
					{:else}
						<button class="btn btn-secondary btn-sm" style="align-self:flex-start" onclick={() => shown.add(k)}>Show definition</button>
					{/if}
				</article>
			{/each}
		</div>
	{/if}

	{#if maxims.length}
		<h2 class="eyebrow" style="margin-top:10px">Latin maxims ({maxims.length})</h2>
		<div class="grid">
			{#each maxims as { m, mean, label } (m)}
				{@const k = cardKey.maxim(m)}
				<article class="card term">
					<div class="between" style="align-items:flex-start">
						<h3 class="legal"><i>{m}</i></h3>
						<span class="row" style="gap:4px"><RatingTag ratings={st.ratings} {k} /><span class="tag tag-line">{label}</span></span>
					</div>
					{#if visible(k)}
						<p>{mean}</p>
						{#if test}<RateBar ratings={st.ratings} {k} prompt="Did you have it?" />{/if}
					{:else}
						<button class="btn btn-secondary btn-sm" style="align-self:flex-start" onclick={() => shown.add(k)}>Show meaning</button>
					{/if}
				</article>
			{/each}
		</div>
	{/if}

	{#if !terms.length && !maxims.length}
		<div class="card empty">Nothing matches “{query}”{ch === 'all' ? '' : ` in ${short[Number(ch)]}`}.</div>
	{/if}
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
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
		gap: 10px;
	}
	.term {
		padding: 14px 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		min-width: 0;
	}
	h3 {
		font-size: 17px;
		font-weight: 600;
		line-height: 1.3;
	}
	.x {
		font-size: 13.5px;
		padding: 8px 10px;
		border-radius: 6px;
		background: var(--accent-soft);
	}
	.empty {
		padding: 24px;
		text-align: center;
		color: var(--text-2);
	}
</style>
