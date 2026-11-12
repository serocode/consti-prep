<script lang="ts">
	import { DISTINCTIONS } from '$lib/pfr';
	import { md } from '$lib/text';

	let star = $state(false);
	const list = $derived(DISTINCTIONS.filter((t) => !star || t.hot));
</script>

<svelte:head><title>Distinctions · PFR · 1Law-C</title></svelte:head>

<div class="stack" style="gap:12px">
	<p class="muted" style="max-width:66ch">
		Side-by-side comparisons of the pairs most often confused. For a “distinguish” question, write one sentence per row:
		“In X, …; in Y, ….”
	</p>
	<div class="seg" role="group" aria-label="Which tables" style="align-self:flex-start">
		<button aria-pressed={!star} onclick={() => (star = false)}>All ({DISTINCTIONS.length})</button>
		<button aria-pressed={star} onclick={() => (star = true)}>★ Likely only</button>
	</div>
	{#each list as t (t.t)}
		<section class="blk k-cls">
			<h4>{t.hot ? '★ ' : ''}{t.t}</h4>
			<div style="overflow-x:auto">
				<table>
					<thead><tr>{#each t.head as h, i (i)}<th>{h}</th>{/each}</tr></thead>
					<tbody>
						{#each t.rows as row, r (r)}
							<tr>{#each row as cell, i (i)}{#if i === 0}<th scope="row">{@html md(cell)}</th>{:else}<td>{@html md(cell)}</td>{/if}{/each}</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
	{/each}
</div>

<style>
	table {
		border-collapse: collapse;
		width: 100%;
		font-size: 14px;
	}
	th,
	td {
		border-bottom: 1px solid color-mix(in srgb, var(--fg-k) 22%, transparent);
		padding: 7px 8px;
		text-align: left;
		vertical-align: top;
	}
	tbody tr:last-child > * {
		border-bottom: 0;
	}
	thead th {
		font-size: 12.5px;
		color: var(--text-2);
	}
	tbody th {
		font-weight: 600;
		min-width: 120px;
	}
</style>
