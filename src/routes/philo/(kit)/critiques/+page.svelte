<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';
	import { answerKey } from '$lib/answerkey.svelte';
	import { fmt } from '$lib/philo';
	import { CRITIQUES } from '$lib/philo-content';

	const steps: [string, string][] = [
		['“X holds that …”', 'One fair sentence, with the thinker’s own term.'],
		['“Its strength is …”', 'One sentence. Concede before you attack.'],
		['“But …”', 'The handout’s criticism, with the critic’s name.'],
		['“More fundamentally …”', 'Your own point, ideally with a Philippine case.'],
		['“X’s defender might reply …”', 'One sentence.'],
		['“On balance …”', 'Your position.']
	];
	let test = $state(true);
	let star = $state(false);
	const shown = new SvelteSet<string>();
	const visible = (id: string) => !test || answerKey.on || shown.has(id);
	const list = $derived(CRITIQUES.filter((c) => !star || c.star));
</script>

<svelte:head><title>Critiques · Legal Philo · 1Law-C</title></svelte:head>

<div class="stack" style="gap:16px">
	<p class="muted" style="max-width:68ch">
		A good critique concedes what an idea gets right before pressing where it fails. <b>The handout says</b> is what the
		readings themselves say; <b>Push further</b> is reasoning you can develop as your own. That second column is what earns
		marks from a professor who wants thinking.
	</p>

	<section class="blk k-doc">
		<h4>A reusable critique paragraph</h4>
		<ol class="steps">{#each steps as [t, d] (t)}<li><b class="legal">{t}</b> {d}</li>{/each}</ol>
	</section>

	<div class="row wrap" style="gap:10px">
		<div class="seg" role="group" aria-label="Mode">
			<button aria-pressed={test} onclick={() => ((test = true), shown.clear())}>Self-test</button>
			<button aria-pressed={!test} onclick={() => (test = false)}>Study</button>
		</div>
		<div class="seg" role="group" aria-label="Which ideas">
			<button aria-pressed={!star} onclick={() => (star = false)}>All ({CRITIQUES.length})</button>
			<button aria-pressed={star} onclick={() => (star = true)}>★ Likely only ({CRITIQUES.filter((c) => c.star).length})</button>
		</div>
	</div>

	<div class="grid">
		{#each list as c (c.id)}
			<article class="card cr">
				<div class="between" style="align-items:flex-start;gap:8px">
					<h3 class="legal">{c.idea}</h3>
					{#if c.star}<span class="tag tag-star">★</span>{/if}
				</div>
				{#if visible(c.id)}
					<div class="blk k-exc"><h4>What it gets right</h4><p>{@html fmt(c.right)}</p></div>
					<div class="blk trap"><h4>The handout says</h4><p>{@html fmt(c.weak)}</p></div>
					<div class="blk k-req"><h4>Push further</h4><p>{@html fmt(c.push)}</p></div>
				{:else}
					<p class="muted s">Name its strength, then its weakness, before you check.</p>
					<button class="btn btn-secondary btn-sm" style="align-self:flex-start" onclick={() => shown.add(c.id)}>Show critique</button>
				{/if}
			</article>
		{/each}
	</div>
</div>

<style>
	.s {
		font-size: 13.5px;
	}
	.steps {
		padding-left: 1.3em;
		display: grid;
		gap: 4px;
		font-size: 14.5px;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 1fr));
		gap: 10px;
	}
	.cr {
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
