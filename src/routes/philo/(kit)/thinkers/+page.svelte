<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';
	import GroupSeg from '$lib/components/kit/GroupSeg.svelte';
	import { answerKey } from '$lib/answerkey.svelte';
	import { PHILO, fmt } from '$lib/philo';
	import { GROUPS, LESSONS, THINKERS } from '$lib/philo-content';

	let ch = $state('all');
	let query = $state('');
	let test = $state(false);
	const shown = new SvelteSet<string>();
	const visible = (id: string) => !test || answerKey.on || shown.has(id);

	const q = $derived(query.trim().toLowerCase());
	const lessons = $derived(
		GROUPS.filter((g) => g.id !== 14 && (ch === 'all' || String(g.id) === ch))
			.map((g) => ({ g, people: THINKERS.filter((t) => t.group === g.id && (!q || JSON.stringify(t).toLowerCase().includes(q))) }))
			.filter((x) => x.people.length || !q)
	);
</script>

<svelte:head><title>Thinkers · Legal Philo · 1Law-C</title></svelte:head>

<div class="stack" style="gap:12px">
	<p class="muted" style="max-width:68ch">
		Every thinker in the coverage, lesson by lesson, with their own terms. Name the thinker and the phrase in your answers
		(“Ehrlich’s living law”, “Pound’s social engineering”): precision reads as mastery. In <b>Self-test</b>, say the idea
		before you reveal it.
	</p>
	<input type="search" bind:value={query} placeholder="Search a thinker or term" aria-label="Search thinkers" />
	<div class="row wrap" style="gap:10px">
		<GroupSeg kit={PHILO} bind:value={ch} label="Filter by lesson" />
		<div class="seg" role="group" aria-label="Mode">
			<button aria-pressed={!test} onclick={() => (test = false)}>Study</button>
			<button aria-pressed={test} onclick={() => ((test = true), shown.clear())}>Self-test</button>
		</div>
	</div>

	{#if ch === '14'}
		<div class="card empty">Philippine jurisprudence has cases, not thinkers. See <a href="/philo/cases">Case digests</a>.</div>
	{:else if !lessons.length}
		<div class="card empty">No thinker matches “{query}”.</div>
	{/if}

	{#each lessons as { g, people } (g.id)}
		<section class="stack" style="gap:10px">
			<h2 class="eyebrow grp">{g.title}</h2>
			{#if !q}
				<div class="blk plain">
					<h4>The lesson in one line</h4>
					<p class="legal thesis">{@html fmt(LESSONS[g.id].thesis)}</p>
					{#if LESSONS[g.id].points.length}
						<ul>{#each LESSONS[g.id].points as p (p)}<li>{@html fmt(p)}</li>{/each}</ul>
					{/if}
				</div>
			{/if}
			<div class="grid">
				{#each people as t (t.id)}
					<article class="card th">
						<h3 class="legal">{t.name}</h3>
						<span class="row wrap" style="gap:4px">
							{#each t.terms as term (term)}<span class="tag tag-line">{@html fmt(term)}</span>{/each}
						</span>
						{#if visible(t.id)}
							<p>{@html fmt(t.idea)}</p>
							<p class="rem"><b>Remember as:</b> {t.remember}</p>
							{#if t.also}<p class="faint" style="font-size:12px">Also in: {t.also}</p>{/if}
						{:else}
							<button class="btn btn-secondary btn-sm" style="align-self:flex-start" onclick={() => shown.add(t.id)}>Show idea</button>
						{/if}
					</article>
				{/each}
			</div>
		</section>
	{/each}
</div>

<style>
	input[type='search'] {
		width: 100%;
		min-height: 42px;
		padding: 0 12px;
		background: var(--surface);
		border: 1px solid var(--border-strong);
		border-radius: 6px;
	}
	input[type='search']:focus {
		outline: none;
		border-color: var(--accent);
		box-shadow: var(--focus);
	}
	.grp {
		margin-top: 10px;
	}
	.thesis {
		font-size: 16px;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
		gap: 10px;
	}
	.th {
		padding: 14px 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		min-width: 0;
	}
	h3 {
		font-size: 17px;
		font-weight: 600;
	}
	.rem {
		font-size: 13.5px;
		padding: 8px 10px;
		border-radius: 6px;
		background: var(--accent-soft);
	}
	.empty {
		padding: 20px;
		text-align: center;
		color: var(--text-2);
	}
</style>
