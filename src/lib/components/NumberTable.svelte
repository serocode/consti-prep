<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';

	/** [number, what it is for, source]. In self-test mode the numbers blur until tapped. */
	let { rows, title = 'Numbers to memorize' }: { rows: [string, string, string][]; title?: string } = $props();

	let hide = $state(false);
	const shown = new SvelteSet<number>();
	function setHide(v: boolean) {
		hide = v;
		shown.clear();
	}
</script>

<div class="stack" style="gap:10px">
	<div class="between wrap">
		<h2 class="eyebrow">{title}</h2>
		<div class="seg" role="group" aria-label="Number visibility">
			<button aria-pressed={!hide} onclick={() => setHide(false)}>Show numbers</button>
			<button aria-pressed={hide} onclick={() => setHide(true)}>Hide numbers (self-test)</button>
		</div>
	</div>
	<div class="card" style="overflow-x:auto">
		<table>
			<thead><tr><th>Number</th><th>What it is for</th><th>Source</th></tr></thead>
			<tbody>
				{#each rows as [n, what, src], k (k)}
					{@const blurred = hide && !shown.has(k)}
					<tr>
						<td class="n num">
							{#if hide}
								<button class:blurred onclick={() => (shown.has(k) ? shown.delete(k) : shown.add(k))} aria-label={blurred ? `Reveal the number for: ${what}` : undefined}>{n}</button>
							{:else}{n}{/if}
						</td>
						<td>{what}</td>
						<td class="muted src">{src}</td>
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
		min-width: 9ch;
	}
	.n button {
		padding: 0;
		border: 0;
		background: none;
		font: inherit;
		text-align: left;
		cursor: pointer;
		transition: filter 0.15s;
	}
	.n button.blurred {
		filter: blur(6px);
		user-select: none;
	}
	.src {
		font-size: 13px;
	}
</style>
