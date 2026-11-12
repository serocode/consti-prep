<script lang="ts">
	import Practice from '$lib/components/Practice.svelte';
	import { PROBLEM_BY_PID } from '$lib/pfr';

	let { data } = $props();
	const problem = $derived(PROBLEM_BY_PID[data.pid]);
</script>

<svelte:head><title>{problem.label} · PFR · 1Law-C</title></svelte:head>

{#key data.pid}
	<Practice {problem} />
{/key}
