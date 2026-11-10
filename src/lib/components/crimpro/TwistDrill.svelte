<script lang="ts">
	import { tick, untrack } from 'svelte';
	import QuestionCard from './QuestionCard.svelte';
	import { Q_BY_ID, shuffled, type TwistSet } from '$lib/crimpro';
	import { recordAnswer, recordSetScore, store } from '$lib/store.svelte';

	let { set }: { set: TwistSet } = $props();

	let i = $state(0);
	let res: boolean[] = $state([]);
	let picked: number | null = $state(null);
	// The page remounts this component per set ({#key}), so seeding from the initial prop is intended.
	let order = $state(untrack(() => shuffled(set.qs[0].o.length)));
	let top: HTMLElement | undefined = $state();

	const ref = $derived(Q_BY_ID[`${set.id}-${i}`]);
	const finished = $derived(i >= set.qs.length);
	const score = $derived(res.filter(Boolean).length);

	function pick(oi: number) {
		if (picked !== null) return;
		picked = oi;
		res[i] = oi === ref.q.a;
		recordAnswer(ref.qid, res[i]);
	}

	async function next() {
		i++;
		picked = null;
		if (i < set.qs.length) order = shuffled(set.qs[i].o.length);
		else recordSetScore(set.id, score);
		window.scrollTo(0, 0);
		await tick();
		top?.focus({ preventScroll: true });
	}

	function restart() {
		i = 0;
		res = [];
		picked = null;
		order = shuffled(set.qs[0].o.length);
		window.scrollTo(0, 0);
	}

	function onkeydown(e: KeyboardEvent) {
		if (finished || picked === null || e.metaKey || e.ctrlKey || e.altKey) return;
		if (e.key === 'Enter' || e.key === 'ArrowRight') {
			// Enter on a focused link/button should do that element's job instead.
			if (e.key === 'Enter' && (e.target as HTMLElement).closest('a, button:not(:disabled)')) return;
			e.preventDefault();
			next();
		}
	}
</script>

<svelte:window {onkeydown} />

<div class="col">
	<div class="between" tabindex="-1" bind:this={top} style="outline:none">
		<a class="btn btn-ghost btn-sm" href="/crimpro">← All sets</a>
		{#if !finished}<span class="muted num" style="font-size:13px">Question {i + 1} of {set.qs.length}</span>{/if}
	</div>

	<div class="progress" aria-hidden="true">
		{#each set.qs as _, k (k)}
			<span class:ok={k < i && res[k]} class:no={k < i && !res[k]} class:cur={k === i && !finished}></span>
		{/each}
	</div>

	{#if !finished}
		<QuestionCard {ref} {order} {picked} reveal={picked !== null} locked={picked !== null} onpick={pick} />
		{#if picked !== null}
			<div class="row wrap">
				<button class="btn btn-primary" onclick={next}>{i + 1 < set.qs.length ? 'Next twist →' : 'See summary'}</button>
				<span class="faint hide-sm" style="font-size:12.5px">or press Enter</span>
			</div>
		{:else}
			<p class="faint hide-sm" style="font-size:12.5px">Keys: A–D or 1–4 to answer.</p>
		{/if}
	{:else}
		<div class="stack" style="gap:6px">
			<h2 class="sum-h num">{set.title}: {score} / {set.qs.length}</h2>
			<p class="muted">
				Read down the list. Each row shows the one fact that changed and where the answer landed. This is the pattern your
				professor tests.
				{#if store.crimpro.best[set.id] != null}Best so far: {store.crimpro.best[set.id]} / {set.qs.length}.{/if}
			</p>
		</div>
		<div class="card" style="overflow-x:auto">
			<table>
				<thead><tr><th>#</th><th>What changed</th><th>Answer</th><th><span class="sr-only">Result</span></th></tr></thead>
				<tbody>
					{#each set.qs as sq, k (k)}
						<tr>
							<td class="muted num">{k + 1}</td>
							<td>{sq.tw ?? set.base}</td>
							<td>{sq.o[sq.a]}</td>
							<td>
								{#if res[k]}<span class="tag tag-ok" aria-label="Correct">✓</span>{:else}<span class="tag tag-bad" aria-label="Wrong">✗</span>{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div class="row wrap">
			<button class="btn btn-primary" onclick={restart}>Try this set again</button>
			{#each set.rules as r (r)}
				<a class="btn btn-secondary" href="/crimpro/rules#r{r}">Review Rule {r}</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.progress {
		display: flex;
		gap: 4px;
	}
	.progress span {
		flex: 1;
		height: 6px;
		border-radius: 3px;
		background: var(--surface-3);
	}
	.progress span.ok {
		background: var(--success);
	}
	.progress span.no {
		background: var(--error);
	}
	.progress span.cur {
		background: var(--text);
	}
	.sum-h {
		font-size: 20px;
		font-weight: 600;
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
	tbody tr:last-child td {
		border-bottom: 0;
	}
	th {
		font-weight: 600;
		font-size: 13px;
		color: var(--text-2);
	}
</style>
