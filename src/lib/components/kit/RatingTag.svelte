<script lang="ts">
	import type { Rating } from '$lib/store.svelte';

	let { ratings, k }: { ratings: Record<string, Rating>; k: string } = $props();
	const r = $derived(ratings[k]);
	const META = { got: ['tag-ok', 'Got it'], shaky: ['tag-warn', 'Shaky'], blank: ['tag-bad', 'Blank'] } as const;
</script>

{#if r}<span class="tag {META[r][0]}">{META[r][1]}</span>{/if}
