<script lang="ts">
	import ExamResults from '$lib/components/crimpro/ExamResults.svelte';
	import ExamRun from '$lib/components/crimpro/ExamRun.svelte';
	import ExamSetup from '$lib/components/crimpro/ExamSetup.svelte';
	import { store } from '$lib/store.svelte';

	// The session lives in the store, so leaving mid-exam (or reloading) picks up where you were.
	const s = $derived(store.crimpro.session);
</script>

<svelte:head><title>{s?.kind === 'practice' ? 'Practice' : 'Mock exam'} · Crim Pro · 1Law-C</title></svelte:head>

{#if !s}
	<ExamSetup />
{:else if s.finished}
	{#key s.started}<ExamResults {s} />{/key}
{:else}
	{#key s.started}<ExamRun {s} />{/key}
{/if}
