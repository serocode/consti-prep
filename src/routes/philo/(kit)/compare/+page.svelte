<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';
	import { answerKey } from '$lib/answerkey.svelte';
	import { fmt } from '$lib/philo';
	import { PAIRS, SCHOOLS, SCHOOL_AXES, STAGES } from '$lib/philo-content';

	let test = $state(true);
	let star = $state(false);
	const shown = new SvelteSet<string>();
	const visible = (id: string) => !test || answerKey.on || shown.has(id);
	const pairs = $derived(PAIRS.filter((p) => !star || p.star));
</script>

<svelte:head><title>Differentiate · Legal Philo · 1Law-C</title></svelte:head>

<div class="stack" style="gap:20px">
	<p class="muted" style="max-width:68ch">
		Every school answers the same question, “where does law get its authority?” A differentiate answer starts with that
		common ground, then runs both sides through the same axes.
	</p>

	<section class="stack" style="gap:8px">
		<h2 class="h">The four schools side by side</h2>
		<div class="tw card">
			<table>
				<thead>
					<tr><th>Axis</th>{#each SCHOOLS as s (s)}<th>{s}</th>{/each}</tr>
				</thead>
				<tbody>
					{#each SCHOOL_AXES as [axis, ...cells] (axis)}
						<tr><th scope="row">{axis}</th>{#each cells as c, i (i)}<td>{c}</td>{/each}</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section class="stack" style="gap:10px">
		<h2 class="h">Likely pairings</h2>
		<div class="row wrap" style="gap:10px">
			<div class="seg" role="group" aria-label="Mode">
				<button aria-pressed={test} onclick={() => ((test = true), shown.clear())}>Self-test</button>
				<button aria-pressed={!test} onclick={() => (test = false)}>Study</button>
			</div>
			<div class="seg" role="group" aria-label="Which pairs">
				<button aria-pressed={!star} onclick={() => (star = false)}>All ({PAIRS.length})</button>
				<button aria-pressed={star} onclick={() => (star = true)}>★ Likely only ({PAIRS.filter((p) => p.star).length})</button>
			</div>
		</div>
		<div class="grid">
			{#each pairs as p (p.id)}
				<article class="card pr">
					<div class="between" style="align-items:flex-start;gap:8px">
						<h3 class="legal">{p.pair}</h3>
						{#if p.star}<span class="tag tag-star">★</span>{/if}
					</div>
					{#if visible(p.id)}
						<div class="blk k-exc"><h4>Common ground</h4><p>{@html fmt(p.common)}</p></div>
						<div class="blk k-req"><h4>Key difference</h4><p>{@html fmt(p.diff)}</p></div>
					{:else}
						<p class="muted s">Say the common ground first, then the difference.</p>
						<button class="btn btn-secondary btn-sm" style="align-self:flex-start" onclick={() => shown.add(p.id)}>Show</button>
					{/if}
				</article>
			{/each}
		</div>
	</section>

	<section class="stack" style="gap:8px">
		<h2 class="h">Five stage theories</h2>
		<div class="tw card">
			<table>
				<thead><tr><th>Thinker</th><th>What moves</th><th>Stages</th><th>Attitude to the last stage</th></tr></thead>
				<tbody>
					{#each STAGES as [who, what, stages, att] (who)}
						<tr><th scope="row">{who}</th><td>{what}</td><td>{stages}</td><td>{att}</td></tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="muted s">Contrast Savigny, for whom a people’s folk-soul is <i>stable</i> across generations, and Burke, for whom change should be slow and inherited.</p>
	</section>
</div>

<style>
	.h {
		font-size: 18px;
		font-weight: 600;
	}
	.s {
		font-size: 13.5px;
	}
	.tw {
		overflow-x: auto;
		padding: 0;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		font-size: 13.5px;
		line-height: 1.45;
	}
	th,
	td {
		padding: 9px 12px;
		text-align: left;
		vertical-align: top;
		border-bottom: 1px solid var(--border);
		min-width: 9rem;
	}
	thead th {
		background: var(--surface-2);
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--text-2);
	}
	tbody th {
		font-weight: 600;
	}
	tbody tr:last-child > * {
		border-bottom: 0;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 1fr));
		gap: 10px;
	}
	.pr {
		padding: 14px 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	h3 {
		font-size: 16.5px;
		font-weight: 600;
		line-height: 1.35;
	}
</style>
