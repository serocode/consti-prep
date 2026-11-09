<script lang="ts">
	import { BAND_SHORT, BANDS } from '$lib/rubric';

	let { score, onpick }: { score: number; onpick?: (n: number) => void } = $props();
	const order = [5, 4, 3, 2, 1, 0];
</script>

<div class="scale" role={onpick ? 'radiogroup' : undefined} aria-label="Rubric score">
	{#each order as n (n)}
		{#if onpick}
			<button type="button" role="radio" aria-checked={n === score} class:on={n === score} title={BANDS[n]} onclick={() => onpick(n)}>
				<b>{n}</b>{BAND_SHORT[n]}
			</button>
		{:else}
			<div class:on={n === score} title={BANDS[n]}><b>{n}</b>{BAND_SHORT[n]}</div>
		{/if}
	{/each}
</div>

<style>
	.scale {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 4px;
	}
	.scale > * {
		padding: 8px 6px;
		border-radius: 4px;
		background: var(--surface-2);
		font-size: 11.5px;
		color: var(--text-2);
		line-height: 1.3;
		min-height: 58px;
		text-align: left;
		border: 0;
		font-family: inherit;
	}
	.scale button {
		cursor: pointer;
	}
	.scale button:hover {
		background: var(--surface-3);
	}
	.scale b {
		display: block;
		font-size: 13px;
		color: var(--text);
		margin-bottom: 2px;
	}
	.scale .on,
	.scale button.on:hover {
		background: var(--accent-soft);
		box-shadow: inset 0 0 0 1.5px var(--accent);
		color: var(--text);
	}
	@media (max-width: 640px) {
		.scale {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
