<script lang="ts">
	import ExamGrade from './ExamGrade.svelte';
	import ExamPaper from './ExamPaper.svelte';
	import ExamSetup from './ExamSetup.svelte';
	import type { Kit } from '$lib/kit';

	let { kit }: { kit: Kit } = $props();
	// The exam lives in the store, so leaving mid-exam (or reloading) picks up where you were.
	const x = $derived(kit.state().exam);
</script>

{#if !x}
	{#key kit.id}<ExamSetup {kit} />{/key}
{:else if x.finished}
	{#key x.started}<ExamGrade {kit} {x} />{/key}
{:else}
	{#key x.started}<ExamPaper {kit} {x} />{/key}
{/if}
