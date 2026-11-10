<script lang="ts">
	import TwistDrill from '$lib/components/crimpro/TwistDrill.svelte';
	import { SET_BY_ID } from '$lib/crimpro';

	let { data } = $props();
	const set = $derived(SET_BY_ID[data.set]);
</script>

<svelte:head><title>{set.title} · Crim Pro</title></svelte:head>

{#key data.set}
	<TwistDrill {set} />
{/key}
