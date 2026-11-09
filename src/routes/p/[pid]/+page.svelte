<script lang="ts">
	import Practice from '$lib/components/Practice.svelte';
	import { BY_PID } from '$lib/problems';

	let { data } = $props();
	const problem = $derived(BY_PID[data.pid]);
</script>

<svelte:head><title>Problem {problem.no} · ALAC Consti Practice</title></svelte:head>

{#key data.pid}
	<Practice {problem} />
{/key}
