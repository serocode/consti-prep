<script lang="ts">
	import { KIND_OF, fmt, words, type Essay } from '$lib/philo';

	/** The model answer for one essay question, then the answer formula as a self-check. */
	let { q, onticks }: { q: Essay; onticks?: (ticked: number, of: number) => void } = $props();
	const kind = $derived(KIND_OF[q.type]);
	let ticks: boolean[] = $state([]);
	function tick(i: number, v: boolean) {
		ticks[i] = v;
		onticks?.(ticks.filter(Boolean).length, kind.formula.length);
	}
</script>

<div class="blk k-doc">
	<h4>Model answer <span class="faint num">· {words(q.a.join(' '))} words</span></h4>
	{#each q.a as p, i (i)}<p class="legal model">{@html fmt(p)}</p>{/each}
</div>
<div class="blk k-req">
	<h4>Check yours. Did you…</h4>
	<ul class="checks">
		{#each kind.formula as f, i (i)}
			<li>
				<label><input type="checkbox" checked={!!ticks[i]} onchange={(e) => tick(i, e.currentTarget.checked)} /> {f}?</label>
			</li>
		{/each}
	</ul>
</div>

<style>
	.model {
		font-size: 16px;
		line-height: 1.65;
	}
	.checks {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 4px;
	}
	.checks label {
		display: flex;
		gap: 8px;
		align-items: flex-start;
		cursor: pointer;
		font-size: 14px;
	}
	.checks input {
		margin-top: 3px;
		accent-color: var(--accent);
	}
</style>
