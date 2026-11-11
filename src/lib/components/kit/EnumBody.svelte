<script lang="ts">
	import RateBar from './RateBar.svelte';
	import { KIND, cardKey, modelEnumeration, type KitEnum } from '$lib/kit';
	import type { Rating } from '$lib/store.svelte';
	import { md } from '$lib/text';
	import { answerKey } from '$lib/answerkey.svelte';

	let {
		e,
		mode,
		ratings,
		onstudy
	}: { e: KitEnum; mode: 'recall' | 'study'; ratings: Record<string, Rating>; onstudy?: () => void } = $props();

	// Per item: undefined = hidden, 'hint' = first words, 'show' = full item.
	let reveal: Record<number, 'hint' | 'show'> = $state({});
	const shown = (i: number) => answerKey.on || reveal[i] === 'show';
	const hintOf = (s: string) => {
		const w = s.replace(/\*\*/g, '').split(' ');
		return w.slice(0, w.length > 3 ? 2 : 1).join(' ') + ' …';
	};
	const kind = $derived(KIND[e.kind]);
</script>

{#if e.mem}
	<div class="blk k-mem">
		<h4>Memory aid</h4>
		<p class="legal" style="font-size:16px">{e.mem}</p>
	</div>
{/if}
{#if e.intro}<p class="muted">{@html md(e.intro)}</p>{/if}

{#if mode === 'recall'}
	<p class="muted" style="font-size:13.5px">
		{e.it.length} items{e.order ? ' · order matters' : ''}. Say each one and what it means, then check.
	</p>
	<ol class="slots">
		{#each e.it as [item, why], i (i)}
			<li class:open={shown(i)}>
				<span class="no legal">{i + 1}</span>
				<span class="tx">
					{#if shown(i)}
						<b>{@html md(item)}</b>{#if why}<br /><span class="muted">{@html md(why)}</span>{/if}
					{:else if reveal[i] === 'hint'}
						<i class="muted">{hintOf(item)}</i>
					{:else}
						<span class="faint">· · ·</span>
					{/if}
				</span>
				{#if !shown(i)}
					<span class="row" style="gap:4px">
						{#if !reveal[i]}<button class="btn btn-ghost btn-sm" onclick={() => (reveal[i] = 'hint')}>Hint</button>{/if}
						<button class="btn btn-secondary btn-sm" onclick={() => (reveal[i] = 'show')}>Show</button>
					</span>
				{/if}
			</li>
		{/each}
	</ol>
	<div class="row wrap">
		<button class="btn btn-ghost btn-sm" onclick={() => (reveal = Object.fromEntries(e.it.map((_, i) => [i, 'show'])))}>Show all</button>
		<button class="btn btn-ghost btn-sm" onclick={() => (reveal = {})}>Hide all again</button>
		{#if onstudy}<button class="btn btn-ghost btn-sm" onclick={onstudy}>Switch to study mode</button>{/if}
	</div>
{:else}
	<div class="blk {kind.blk}">
		<h4>{kind.label}{e.order ? ' · order matters' : ''}</h4>
		<ol class="items">
			{#each e.it as [item, why], i (i)}<li><b>{@html md(item)}</b>{#if why}<span>{@html md(why)}</span>{/if}</li>{/each}
		</ol>
	</div>
	{#if e.trap}<div class="blk trap"><h4>Exam trap</h4><p>{e.trap}</p></div>{/if}
	<details class="model">
		<summary>Model enumeration answer</summary>
		<p class="legal">{modelEnumeration(e)}</p>
	</details>
{/if}

<RateBar {ratings} k={cardKey.enum(e.id)} prompt="Could you write this list?" />
<p class="muted" style="font-size:12.5px">{e.src}</p>

<style>
	.slots {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.slots li {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 10px;
		align-items: start;
		padding: 8px 10px;
		border: 1px dashed var(--border-strong);
		border-radius: 6px;
		background: var(--surface);
	}
	.slots li.open {
		border-style: solid;
		border-color: var(--border);
	}
	.no {
		font-weight: 600;
		font-size: 17px;
		min-width: 1.4em;
	}
	.tx {
		min-width: 0;
		padding-top: 3px;
	}
	.items li {
		margin: 6px 0;
	}
	.items b {
		display: block;
	}
	.model summary {
		cursor: pointer;
		font-weight: 600;
		font-size: 14px;
	}
	.model p {
		margin-top: 8px;
		padding: 12px 14px;
		background: var(--surface-2);
		border: 1px solid var(--border);
		border-radius: 6px;
		line-height: 1.7;
	}
</style>
