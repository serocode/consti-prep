<script lang="ts">
	import type { Kit } from '$lib/kit';

	/** 'all' or a group id as a string. */
	let { kit, value = $bindable('all'), label = 'Filter' }: { kit: Kit; value?: string; label?: string } = $props();
</script>

<div class="seg" role="group" aria-label={label}>
	<button aria-pressed={value === 'all'} onclick={() => (value = 'all')}>All</button>
	{#each kit.groups as g (g.id)}
		<button aria-pressed={value === String(g.id)} onclick={() => (value = String(g.id))} title={g.title}>{g.short}</button>
	{/each}
</div>
