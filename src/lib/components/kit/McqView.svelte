<script lang="ts">
	import { page } from '$app/state';
	import McqChoices from '../McqChoices.svelte';
	import GroupSeg from './GroupSeg.svelte';
	import { shuffled } from '$lib/crimpro';
	import { index, type Kit, type KitMcq } from '$lib/kit';
	import { canShuffle } from '$lib/mcq';

	let { kit }: { kit: Kit } = $props();
	const st = $derived(kit.state());
	const mcqs = $derived(kit.mcqs ?? []);
	const byId = $derived(index(mcqs, 'id'));
	const label = $derived(Object.fromEntries(kit.groups.map((g) => [g.id, g.short])));

	let mode: 'topic' | 'chains' = $state('topic');
	let group = $state('all');
	let only: 'all' | 'star' | 'new' | 'missed' = $state('all');

	// …/mcq#g-2 opens part 2; #chains opens the linked chains.
	$effect(() => {
		const h = page.url.hash;
		const g = /^#g-(\d+)$/.exec(h);
		if (g) {
			mode = 'topic';
			group = g[1];
			only = 'all';
		} else if (h === '#chains') mode = 'chains';
	});

	// Choices are shuffled once per visit, so the answer is not always in the same slot. A plain cache, not
	// state: it is filled while rendering, and "Try again" re-renders through the answer it clears.
	const orders: Record<string, number[]> = {};
	const orderOf = (m: KitMcq) => (orders[m.id] ??= canShuffle(m) ? shuffled(m.o.length) : m.o.map((_, i) => i));

	const picked = (m: KitMcq) => st.mcq[m.id] ?? null;
	const list = $derived(
		mcqs.filter((m) => {
			if (group !== 'all' && String(m.group) !== group) return false;
			const p = st.mcq[m.id];
			if (only === 'star') return m.star;
			if (only === 'new') return p === undefined;
			if (only === 'missed') return p !== undefined && p !== m.a;
			return true;
		})
	);
	const answered = $derived(mcqs.filter((m) => st.mcq[m.id] !== undefined));
	const right = $derived(answered.filter((m) => st.mcq[m.id] === m.a).length);

	// Questions that build on an earlier one show that earlier question as context in the topic list.
	const prev = $derived.by(() => {
		const out: Record<string, { stems: string[]; chain: string }> = {};
		for (const c of kit.chains ?? []) {
			c.steps.forEach((s, i) => {
				if (s.ctx)
					out[s.id] = { stems: c.steps.slice(0, i).map((x) => byId[x.id].q), chain: c.title };
			});
		}
		return out;
	});

	function retry(m: KitMcq) {
		delete st.mcq[m.id];
		delete orders[m.id];
	}
	let armed = $state(false);
	function reset() {
		if (!armed) {
			armed = true;
			setTimeout(() => (armed = false), 3000);
			return;
		}
		st.mcq = {};
		armed = false;
	}
</script>

{#snippet card(m: KitMcq, n: number, tw?: string)}
	{@const p = picked(m)}
	<article class="card mq" id="q-{m.id}">
		<div class="row wrap" style="gap:6px">
			<span class="muted num" style="font-size:12.5px">{n}</span>
			<span class="tag tag-line">{label[m.group]}</span>
			{#if m.star}<span class="tag tag-star">★ Likely</span>{/if}
		</div>
		{#if tw}
			<div class="twist"><span class="eyebrow">What changed</span><p class="legal">{tw}</p></div>
		{:else if prev[m.id]}
			<details class="ctx">
				<summary>Builds on {prev[m.id].stems.length === 1 ? 'an earlier question' : 'earlier questions'} ({prev[m.id].chain})</summary>
				<ol>{#each prev[m.id].stems as s, i (i)}<li>{s}</li>{/each}</ol>
			</details>
		{/if}
		<McqChoices q={m} order={orderOf(m)} picked={p} reveal={p !== null} locked={p !== null} keys={false} onpick={(oi) => (st.mcq[m.id] = oi)} />
		{#if p !== null}<button class="btn btn-ghost btn-sm" style="align-self:flex-start" onclick={() => retry(m)}>Try again</button>{/if}
	</article>
{/snippet}

<div class="stack" style="gap:12px">
	<p class="muted" style="max-width:66ch">
		Tricky multiple choice. Tap an answer to see if it is right, why each wrong choice is wrong, and the rule behind it. In
		<b>Linked chains</b>, each question changes one fact from the one before it; name what changed before you answer.
	</p>
	<div class="row wrap" style="gap:10px">
		<div class="seg" role="group" aria-label="Mode">
			<button aria-pressed={mode === 'topic'} onclick={() => (mode = 'topic')}>By topic</button>
			<button aria-pressed={mode === 'chains'} onclick={() => (mode = 'chains')}>Linked chains ({kit.chains?.length ?? 0})</button>
		</div>
		<span class="muted num" style="font-size:13px">Answered {answered.length} of {mcqs.length} · {right} correct</span>
	</div>

	{#if mode === 'topic'}
		<GroupSeg {kit} bind:value={group} label="Filter questions by {kit.groupNoun}" />
		<div class="between wrap">
			<div class="seg" role="group" aria-label="Which questions">
				<button aria-pressed={only === 'all'} onclick={() => (only = 'all')}>All</button>
				<button aria-pressed={only === 'star'} onclick={() => (only = 'star')}>★ Likely</button>
				<button aria-pressed={only === 'new'} onclick={() => (only = 'new')}>Not answered</button>
				<button aria-pressed={only === 'missed'} onclick={() => (only = 'missed')}>Missed</button>
			</div>
			<button class="btn btn-ghost btn-sm" onclick={reset}>{armed ? 'Tap again to reset' : 'Reset answers'}</button>
		</div>
		<p class="muted num" style="font-size:13px">{list.length} shown</p>
		{#if !list.length}
			<div class="card empty">{only === 'missed' ? 'No missed questions here.' : only === 'new' ? 'You have answered every question here.' : 'Nothing in this filter.'}</div>
		{/if}
		{#each list as m (m.id)}{@render card(m, mcqs.indexOf(m) + 1)}{/each}
	{:else}
		{#each kit.chains ?? [] as c (c.id)}
			<section class="stack chain" style="gap:10px">
				<h2 class="ch">{c.title} <span class="muted num" style="font-size:13px;font-weight:400">· {c.steps.length} linked questions</span></h2>
				{#each c.steps as s, i (s.id)}{@render card(byId[s.id], i + 1, s.tw)}{/each}
			</section>
		{/each}
	{/if}
</div>

<style>
	.mq {
		padding: 14px 16px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		scroll-margin-top: 80px;
	}
	.twist {
		padding: 10px 12px;
		border-radius: 8px;
		background: var(--accent-soft);
		border: 1px solid var(--accent-line);
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.twist .eyebrow {
		color: var(--accent-text);
	}
	.ctx {
		font-size: 13.5px;
		color: var(--text-2);
	}
	.ctx summary {
		cursor: pointer;
		font-weight: 600;
	}
	.ctx ol {
		margin-top: 6px;
		padding-left: 1.3em;
		display: grid;
		gap: 4px;
	}
	.chain {
		margin-top: 8px;
	}
	.ch {
		font-size: 16px;
		font-weight: 600;
	}
	.empty {
		padding: 24px;
		text-align: center;
		color: var(--text-2);
	}
</style>
