<script lang="ts">
	import FocusView from '$lib/components/FocusView.svelte';
	import { RULES, SETS } from '$lib/crimpro';
	import { LIKELY_RULES, LIKELY_SETS, TOP } from '$lib/focus/crimpro';

	const five = [
		'Has the accused pleaded yet?',
		'Did the accused consent, or was it his own motion?',
		'Is the dismissal on the merits (evidence, speedy trial)?',
		'What is the penalty bracket?',
		'Is the judgment already final?'
	];
</script>

<svelte:head><title>Exam focus · Crim Pro · 1Law-C</title></svelte:head>

<FocusView top={TOP} subject="Crim Pro">
	<div class="grid">
		<section class="blk k-doc">
			<h4>Five questions that solve most twists</h4>
			<ol>{#each five as f (f)}<li>{f}</li>{/each}</ol>
		</section>
		<section class="blk plain">
			<h4>★ Likely rules ({Object.keys(LIKELY_RULES).length} of {RULES.length})</h4>
			<ul>
				{#each RULES.filter((r) => LIKELY_RULES[r.id]) as r (r.id)}
					<li><a href="/crimpro/rules#r{r.id}">Rule {r.id} · {r.name}</a> — {LIKELY_RULES[r.id]}</li>
				{/each}
			</ul>
		</section>
		<section class="blk plain">
			<h4>★ Likely twist sets ({Object.keys(LIKELY_SETS).length} of {SETS.length})</h4>
			<ul>
				{#each SETS.filter((s) => LIKELY_SETS[s.id]) as s (s.id)}
					<li><a href="/crimpro/drill/{s.id}">{s.title}</a> — {LIKELY_SETS[s.id]}</li>
				{/each}
			</ul>
		</section>
	</div>
</FocusView>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
		gap: 12px;
	}
</style>
