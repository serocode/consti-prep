<script lang="ts">
	import CaseDigests from '$lib/components/CaseDigests.svelte';
	import { CASES, TENSIONS } from '$lib/philo-content';
	import { fmt } from '$lib/philo';
	import { store } from '$lib/store.svelte';
</script>

<svelte:head><title>Case digests · Legal Philo · 1Law-C</title></svelte:head>

<div class="stack" style="gap:20px">
	<CaseDigests
		cases={CASES}
		ratings={store.philo.ratings}
		intro="The Philippine jurisprudence handouts, plus Philippine Blooming Mills. Each case shows the legal-philosophy idea it illustrates: cite it to prove a thinker’s idea is living Philippine doctrine."
	/>

	<section class="stack" style="gap:8px">
		<h2 class="h">Tensions worth raising in an essay</h2>
		<div class="grid">
			{#each TENSIONS as [t, d] (t)}
				<div class="blk plain">
					<h4>{t}</h4>
					<p>{@html fmt(d)}</p>
				</div>
			{/each}
		</div>
	</section>
</div>

<style>
	.h {
		font-size: 18px;
		font-weight: 600;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
		gap: 10px;
	}
</style>
