<script lang="ts">
	import KitLayout from '$lib/components/kit/KitLayout.svelte';
	import { CRIMLAW } from '$lib/crimlaw';

	let { children } = $props();
</script>

<KitLayout kit={CRIMLAW} mid={[{ path: 'numbers', label: 'Numbers' }]}>
	{@render children()}
</KitLayout>
