<script lang="ts">
	import { CHAPTERS, CH_TITLE, ROMAN, RULES, TRAPS } from '$lib/statcon';
	import { store } from '$lib/store.svelte';
</script>

<svelte:head><title>Rules and traps · StatCon · 1Law-C</title></svelte:head>

<div class="stack" style="gap:12px">
	<p class="muted" style="max-width:66ch">
		Each row is a rule (purple) with its limit (green). The traps are the wrong answers examiners expect students to give.
	</p>
	{#each CHAPTERS as c (c)}
		<section class="stack" style="gap:10px" id="ch-{c}">
			<h2 class="ch">{CH_TITLE[c]}</h2>
			<div class="card" style="overflow-x:auto">
				<table>
					<thead><tr><th>Rule</th><th>In short</th><th>Limit</th></tr></thead>
					<tbody>
						{#each RULES[c] as [r, s, l] (r)}
							<tr><th scope="row" class="r">{r}</th><td>{s}</td><td class="l">{l}</td></tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="blk trap">
				<h4>Wrong answers examiners expect</h4>
				<ul>{#each TRAPS[c] as t (t)}<li>{t}</li>{/each}</ul>
			</div>
			<div class="row wrap">
				<a class="btn btn-secondary btn-sm" href="/statcon/enumerations#ch-{c}">Ch. {ROMAN[c]} enumerations</a>
				<a class="btn btn-ghost btn-sm" href="/statcon/problems" onclick={() => (store.statcon.ch = String(c))}>Ch. {ROMAN[c]} problems</a>
			</div>
		</section>
	{/each}
</div>

<style>
	.ch {
		font-size: 16px;
		font-weight: 600;
		margin-top: 10px;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		font-size: 14px;
	}
	th,
	td {
		border-bottom: 1px solid var(--border);
		padding: 8px 10px;
		text-align: left;
		vertical-align: top;
	}
	tbody tr:last-child > * {
		border-bottom: 0;
	}
	thead th {
		font-size: 13px;
		color: var(--text-2);
	}
	.r {
		background: var(--purple-soft);
		font-weight: 600;
		min-width: 180px;
	}
	.l {
		background: var(--success-soft);
	}
</style>
