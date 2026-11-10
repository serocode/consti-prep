<script lang="ts">
	import Practice from '$lib/components/Practice.svelte';
	import { BY_PID } from '$lib/problems';

	let { data } = $props();
	const problem = $derived(BY_PID[data.pid]);
</script>

<svelte:head><title>Problem {problem.no} · Consti I · 1Law-C</title></svelte:head>

{#key data.pid}
	<Practice {problem} />
{/key}
