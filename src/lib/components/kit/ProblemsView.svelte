<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { tick } from 'svelte';
	import GroupSeg from './GroupSeg.svelte';
	import { scoreTag } from '$lib/rubric';
	import type { Kit, KitProblem, KitTopic } from '$lib/kit';
	import { attemptsFor, bestScore } from '$lib/store.svelte';

	let { kit }: { kit: Kit } = $props();
	const st = $derived(kit.state());

	let status: 'all' | 'new' | 'weak' = $state('all');
	const list = $derived(
		kit.problems.filter((p) => {
			if (st.ch !== 'all' && String(p.group) !== st.ch) return false;
			const b = bestScore(p.pid);
			if (status === 'new') return b < 0;
			if (status === 'weak') return b >= 0 && b < 4;
			return true;
		})
	);
	const topics = $derived.by(() => {
		const out: { topic: KitTopic; items: KitProblem[] }[] = [];
		for (const p of list) {
			const g = out.at(-1);
			if (g && g.topic.id === p.topic.id) g.items.push(p);
			else out.push({ topic: p.topic, items: [p] });
		}
		return out;
	});
	const done = $derived(kit.problems.filter((p) => bestScore(p.pid) >= 0).length);

	// …/problems#t-induction jumps to one topic (from the answer guide's topic spotter).
	$effect(() => {
		const m = /^#t-(.+)$/.exec(page.url.hash);
		if (!m) return;
		st.ch = 'all';
		status = 'all';
		tick().then(() => document.getElementById('t-' + m[1])?.scrollIntoView({ block: 'start' }));
	});

	function random() {
		const fresh = list.filter((p) => bestScore(p.pid) < 0);
		const from = fresh.length ? fresh : list;
		if (from.length) goto(from[Math.floor(Math.random() * from.length)].href);
	}
</script>

<div class="stack" style="gap:12px">
	<p class="muted" style="max-width:66ch">
		Scenario problems answered in ALAC. Write in the four boxes with the starters, check yourself
		against the model and the 0–5 rubric, then rebuild your answer. Use <b>Random problem</b> to practice spotting the issue
		cold, the way the exam will ask.
	</p>
	<GroupSeg {kit} bind:value={st.ch} label="Filter problems by {kit.groupNoun}" />
	<div class="between wrap">
		<div class="seg" role="group" aria-label="Status">
			<button aria-pressed={status === 'all'} onclick={() => (status = 'all')}>All</button>
			<button aria-pressed={status === 'new'} onclick={() => (status = 'new')}>Not yet</button>
			<button aria-pressed={status === 'weak'} onclick={() => (status = 'weak')}>Below 4</button>
		</div>
		<div class="row">
			<span class="muted num" style="font-size:13px">{done}/{kit.problems.length} answered</span>
			<button class="btn btn-primary btn-sm" onclick={random} disabled={!list.length}>Random problem</button>
		</div>
	</div>

	{#if !list.length}
		<div class="card empty">{status === 'weak' ? 'Nothing below 4 here.' : status === 'new' ? 'You have answered every problem in this filter.' : 'No problems here.'}</div>
	{/if}

	{#each topics as g (g.topic.id)}
		<section class="card group" id="t-{g.topic.id}">
			<div class="group-h">
				<h2>{g.topic.title}</h2>
				{#if kit.focus.topics?.[g.topic.id]}<span class="tag tag-star" title={kit.focus.topics[g.topic.id]}>★ Likely</span>{/if}
				<span class="muted cite">{g.topic.cite}</span>
			</div>
			<ul>
				{#each g.items as p (p.pid)}
					{@const b = bestScore(p.pid)}
					{@const n = attemptsFor(p.pid).length}
					<li>
						<a class="prow" href={p.href}>
							<span class="muted num no">{p.no}</span>
							<span class="lbl">
								<span class="pt">{p.label}</span>
								<span class="muted pf">{p.facts}</span>
							</span>
							{#if b >= 0}
								<span class="{scoreTag(b)} pill num" title="Best of {n} attempt{n > 1 ? 's' : ''}">{b}/5</span>
							{:else}
								<span class="tag pill">New</span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</div>

<style>
	.group {
		scroll-margin-top: 80px;
	}
	.group-h {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 4px 10px;
		padding: 14px 16px 8px;
	}
	.group-h h2 {
		font-size: 14.5px;
		font-weight: 600;
	}
	.cite {
		font-size: 13px;
	}
	ul {
		list-style: none;
		padding: 0;
	}
	.prow {
		display: flex;
		align-items: center;
		gap: 12px;
		min-height: 56px;
		padding: 10px 16px;
		border-top: 1px solid var(--border);
		text-decoration: none;
		color: var(--text);
	}
	.prow:hover {
		background: var(--surface-2);
	}
	.no {
		width: 24px;
		font-size: 12px;
	}
	.lbl {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.pt {
		font-weight: 600;
		font-size: 14px;
	}
	.pf {
		font-size: 13px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.pill {
		min-width: 44px;
		justify-content: center;
	}
	.empty {
		padding: 24px;
		text-align: center;
		color: var(--text-2);
	}
</style>
