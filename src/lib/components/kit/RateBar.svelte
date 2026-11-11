<script lang="ts">
	import type { Rating } from '$lib/store.svelte';

	/** `ratings` is the kit's rating map; `k` the card key (shared with the Flashcards tab). */
	let {
		ratings,
		k,
		onrate,
		prompt = 'How did you do?'
	}: { ratings: Record<string, Rating>; k: string; onrate?: (r: Rating) => void; prompt?: string } = $props();

	const cur = $derived(ratings[k]);
	const opts: [Rating, string][] = [
		['got', 'Got it'],
		['shaky', 'Shaky'],
		['blank', 'Went blank']
	];

	function rate(r: Rating) {
		ratings[k] = r;
		onrate?.(r);
	}
</script>

<div class="rate" role="group" aria-label={prompt}>
	<span class="muted" style="font-size:13px">{prompt}</span>
	{#each opts as [r, label] (r)}
		<button class="r-{r}" aria-pressed={cur === r} onclick={() => rate(r)}>{label}</button>
	{/each}
</div>

<style>
	.rate {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px;
	}
	button {
		min-height: 32px;
		padding: 0 12px;
		border-radius: 6px;
		border: 1.5px solid var(--border-strong);
		background: var(--surface);
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
	}
	.r-got[aria-pressed='true'] {
		background: var(--success-soft);
		border-color: var(--success);
		color: var(--success);
	}
	.r-shaky[aria-pressed='true'] {
		background: var(--warning-soft);
		border-color: var(--warning);
		color: var(--warning);
	}
	.r-blank[aria-pressed='true'] {
		background: var(--error-soft);
		border-color: var(--error);
		color: var(--error);
	}
</style>
