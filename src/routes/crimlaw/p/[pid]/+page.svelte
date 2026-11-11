<script lang="ts">
	import Practice from '$lib/components/Practice.svelte';
	import { PROBLEM_BY_PID } from '$lib/crimlaw';

	let { data } = $props();
	const problem = $derived(PROBLEM_BY_PID[data.pid]);
</script>

<svelte:head><title>{problem.label} · Crim Law I · 1Law-C</title></svelte:head>

{#key data.pid}
	<Practice {problem} />
{/key}
