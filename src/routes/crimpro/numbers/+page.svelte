<script lang="ts">
	import { NUMBERS } from '$lib/crimpro';
	import { SvelteSet } from 'svelte/reactivity';

	let hide = $state(false);
	const shown = new SvelteSet<number>();

	function setHide(v: boolean) {
		hide = v;
		shown.clear();
	}
	function reveal(k: number) {
		if (!hide) return;
		if (shown.has(k)) shown.delete(k);
		else shown.add(k);
	}
</script>

<svelte:head><title>Numbers · Crim Pro · 1Law-C</title></svelte:head>

<div class="stack" style="gap:12px">
	<p class="muted" style="max-width:64ch">Hide the numbers and test yourself. Tap a blurred number to check it.</p>
	<div class="seg" role="group" aria-label="Number visibility" style="align-self:flex-start">
		<button aria-pressed={!hide} onclick={() => setHide(false)}>Show numbers</button>
		<button aria-pressed={hide} onclick={() => setHide(true)}>Hide numbers (self-test)</button>
	</div>
	<div class="card" style="overflow-x:auto">
		<table>
			<thead><tr><th>Number</th><th>What it is for</th><th>Rule</th></tr></thead>
			<tbody>
				{#each NUMBERS as [n, what, rule], k (k)}
					{@const blurred = hide && !shown.has(k)}
					<tr>
						<td class="n num">
							{#if hide}
								<button class:blurred onclick={() => reveal(k)} aria-label={blurred ? `Reveal the number for: ${what}` : undefined}>{n}</button>
							{:else}
								{n}
							{/if}
						</td>
						<td>{what}</td>
						<td class="muted rule">Rule {rule}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	table {
		border-collapse: collapse;
		width: 100%;
		font-size: 14px;
	}
	th,
	td {
		border-bottom: 1px solid var(--border);
		padding: 8px 12px;
		text-align: left;
		vertical-align: top;
	}
	tbody tr:last-child td {
		border-bottom: 0;
	}
	th {
		font-size: 13px;
		font-weight: 600;
		color: var(--text-2);
	}
	.n {
		font-family: var(--legal);
		font-weight: 600;
		white-space: nowrap;
	}
	.n button {
		padding: 0;
		border: 0;
		background: none;
		font: inherit;
		cursor: pointer;
		transition: filter 0.15s;
	}
	.n button.blurred {
		filter: blur(6px);
		user-select: none;
	}
	.rule {
		font-size: 13px;
		white-space: nowrap;
	}
</style>
