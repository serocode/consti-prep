<script lang="ts">
	import FocusView from '$lib/components/FocusView.svelte';
	import { LIKELY_CASES, TOP } from '$lib/focus/consti';
	import { CASES } from '$lib/problems';

	const flagged = CASES.filter((c) => LIKELY_CASES[c.id]);
</script>

<svelte:head><title>Exam focus · Consti I · 1Law-C</title></svelte:head>

<FocusView top={TOP} subject="Consti I">
	<section class="card" style="padding:14px 16px;display:flex;flex-direction:column;gap:8px">
		<h2 class="eyebrow">★ Likely cases ({flagged.length} of {CASES.length})</h2>
		<ul style="list-style:none;padding:0;display:grid;gap:6px;font-size:14.5px">
			{#each flagged as c (c.id)}
				<li><a href="/consti/cases#c-{c.id}"><i>{c.name}</i></a> <span class="muted">— {LIKELY_CASES[c.id]}</span></li>
			{/each}
		</ul>
	</section>
</FocusView>
